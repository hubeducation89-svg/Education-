import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { GPayQR } from "../components/GPayQR";
import { QuizProgressIndicator } from "../components/QuizProgressIndicator";
import { useAppContext } from "../context";
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Sparkles, 
  FileText, 
  Shuffle, 
  RefreshCw, 
  Zap, 
  Phone, 
  X, 
  QrCode,
  Check,
  CheckCheck,
  Flame,
  Layers,
  ChevronRight
} from "lucide-react";
import { 
  SUBJECT_QUIZ_CATEGORIES, 
  getRandomizedQuestionsForSubject, 
  Question, 
  SubjectQuizCategory 
} from "../data/quizData";

// Backwards-compatible export for any other components importing quizCategories
export const quizCategories = SUBJECT_QUIZ_CATEGORIES.map(sub => ({
  id: sub.id,
  title: sub.title,
  subtitle: sub.subtitle,
  category: sub.category,
  badge: sub.badge,
  color: sub.color,
  iconBg: sub.iconBg,
  questions: getRandomizedQuestionsForSubject(sub.id, 5)
}));

export function Quiz() {
  const { recordQuizResult } = useAppContext();
  const [searchParams] = useSearchParams();
  const topicParam = searchParams.get("topic") || "";
  const catParam = searchParams.get("category") || "";

  // Find matching subject if coming from notes or courses link
  const defaultSubject = useMemo(() => {
    if (!topicParam && !catParam) return null;
    return SUBJECT_QUIZ_CATEGORIES.find(s => 
      s.title.toLowerCase().includes(topicParam.toLowerCase()) || 
      topicParam.toLowerCase().includes(s.title.toLowerCase()) ||
      topicParam.toLowerCase().includes(s.id.toLowerCase()) ||
      (catParam && s.category.toLowerCase().includes(catParam.toLowerCase()))
    ) || null;
  }, [topicParam, catParam]);

  const [paymentModalSubject, setPaymentModalSubject] = useState<SubjectQuizCategory | null>(defaultSubject);
  const [selectedSubject, setSelectedSubject] = useState<SubjectQuizCategory | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showExplanations, setShowExplanations] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300); // Dynamic timer
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [questionCountPref, setQuestionCountPref] = useState<number>(8);
  const [shuffleToast, setShuffleToast] = useState<string | null>(null);
  const [shufflingAnimation, setShufflingAnimation] = useState<boolean>(false);

  // Auto-dismiss shuffle notification toast
  useEffect(() => {
    if (!shuffleToast) return;
    const timer = setTimeout(() => {
      setShuffleToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [shuffleToast]);

  // Countdown timer for active quiz session
  useEffect(() => {
    if (!selectedSubject || isSubmitted || activeQuestions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedSubject, isSubmitted, activeQuestions]);

  /**
   * Real-time Random Questions Generator for a Subject
   */
  const loadRandomizedQuestions = (subject: SubjectQuizCategory, count = questionCountPref) => {
    setShufflingAnimation(true);
    const randomized = getRandomizedQuestionsForSubject(subject.id, count, true);
    
    setActiveQuestions(randomized);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowExplanations(false);
    setTimeLeft(count * 60); // 1 minute per question

    setTimeout(() => {
      setShufflingAnimation(false);
    }, 400);

    return randomized;
  };

  /**
   * Start Quiz after fee unlock
   */
  const startQuizAfterPayment = (subject: SubjectQuizCategory) => {
    setPaymentModalSubject(null);
    setSelectedSubject(subject);
    loadRandomizedQuestions(subject);
    setShuffleToast(`⚡ Fresh real-time questions generated for ${subject.title}!`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Real-Time Shuffle button trigger
   */
  const handleRealTimeShuffle = () => {
    if (!selectedSubject) return;
    loadRandomizedQuestions(selectedSubject);
    setShuffleToast(`🔀 Subject questions & options randomized in real time!`);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    if (!activeQuestions.length) return { score: 0, total: 0, percent: 0 };
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const total = activeQuestions.length;
    return {
      score: correct,
      total,
      percent: Math.round((correct / total) * 100)
    };
  };

  // Automatically record quiz result in student dashboard context
  useEffect(() => {
    if (isSubmitted && selectedSubject && activeQuestions.length > 0) {
      const result = calculateScore();
      recordQuizResult({
        subjectId: selectedSubject.id,
        subjectTitle: selectedSubject.title,
        score: result.score,
        total: result.total,
        percent: result.percent,
        passed: result.percent >= 60,
        attemptedAt: Date.now()
      });
    }
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const uniqueCategories = ["All", "Programming", "Office Productivity", "Computer Science", "Web & AI", "Science & Math"];

  const filteredSubjects = SUBJECT_QUIZ_CATEGORIES.filter(s => {
    if (filterCategory === "All") return true;
    return s.category === filterCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 pb-24 md:pb-16 relative">
      <SEO
        title="Interactive Quizzes | Education Hub"
        description="Attempt topic-wise interactive quizzes for C Programming, C++, Python, MS Excel, HTML/CSS, Logical Organization, AI Tools, and Science by Gunjan Gaur with real-time question randomization."
      />

      {/* Floating Shuffle Toast Notification */}
      {shuffleToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#0f2147] text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3 animate-in slide-in-from-top duration-300 max-w-sm">
          <Shuffle className="w-5 h-5 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: "1.5s" }} />
          <div className="text-xs font-semibold leading-tight">
            {shuffleToast}
          </div>
          <button 
            onClick={() => setShuffleToast(null)}
            className="text-white/60 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold tracking-wide uppercase mb-2 sm:mb-3 shadow-xs border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Real-Time Dynamic Question Bank</span>
            <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.2 rounded-full uppercase tracking-wider font-mono">
              Live
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0f2147] tracking-tight mb-2 sm:mb-3">
            Subject-Wise Practice Quizzes
          </h1>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto mb-4">
            Practice hand-crafted objective questions designed by <span className="font-semibold text-slate-900">Gunjan Gaur</span>. 
            Questions are <span className="text-indigo-700 font-bold underline decoration-amber-400">randomly selected in real time</span> from our subject bank on every attempt.
          </p>

          {/* Real-time randomization feature badge banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white px-4 py-2 rounded-2xl border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Real-time Shuffling Active
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
              <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
              Questions & options change dynamically
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              ₹1 Token Fee per attempt
            </span>
          </div>
        </div>

        {/* View Switcher: Subject Selection vs Active Quiz Session */}
        {!selectedSubject ? (
          <div>
            {/* Category Filter Pills & Question Count Preference */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
              {/* Category Pills */}
              <div className="w-full sm:w-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar touch-pan-x">
                {uniqueCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                      filterCategory === cat
                        ? "bg-[#0f2147] text-white shadow-md scale-102"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Questions per test toggle */}
              <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-semibold text-slate-800">Set Length:</span>
                {[5, 8, 10].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCountPref(cnt)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                      questionCountPref === cnt
                        ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredSubjects.map(subject => (
                <div
                  key={subject.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                  {/* Card Header Gradient */}
                  <div className={`p-5 sm:p-6 bg-gradient-to-r ${subject.color} text-white relative`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {subject.category}
                      </span>
                      <span className="text-[11px] font-black bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
                        {subject.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black mb-1 group-hover:text-amber-200 transition-colors">
                      {subject.title}
                    </h3>
                    <p className="text-white/85 text-xs font-medium line-clamp-1">
                      {subject.subtitle}
                    </p>

                    <div className="absolute bottom-2 right-3 opacity-15">
                      <Shuffle className="w-16 h-16" />
                    </div>
                  </div>

                  {/* Card Content & Features */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5 mb-5">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {subject.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold bg-slate-50 p-2 rounded-xl">
                          <Shuffle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{subject.pool.length}+ Pool Questions</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold bg-slate-50 p-2 rounded-xl">
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          <span>Random Order</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200/60">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          Attempt Token Fee:
                        </span>
                        <span className="font-extrabold text-sm text-emerald-950">
                          ₹1 Only
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setPaymentModalSubject(subject)}
                        className="w-full py-3 bg-[#0f2147] hover:bg-[#ffb703] hover:text-slate-900 text-white rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pay ₹1 & Attempt Randomized Quiz</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                      </button>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <Link
                          to="/notes"
                          className="text-slate-500 hover:text-indigo-600 font-medium inline-flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          Related Notes
                        </Link>

                        <button
                          onClick={() => {
                            setSelectedSubject(subject);
                            loadRandomizedQuestions(subject);
                            setShuffleToast(`🔀 Real-time randomized questions loaded for ${subject.title}!`);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 hover:underline"
                        >
                          <Shuffle className="w-3 h-3 text-indigo-500" />
                          Direct Random Preview &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Active Interactive Quiz Session with Real-Time Question Randomizer */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-3xl mx-auto">
            {/* Session Top Bar */}
            <div className={`p-5 sm:p-6 bg-gradient-to-r ${selectedSubject.color} text-white`}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="text-xs text-white/80 hover:text-white inline-flex items-center gap-1.5 font-bold bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-xl transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> All Subjects
                </button>

                {/* Real-Time Live Subject Switcher Dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedSubject.id}
                    onChange={(e) => {
                      const nextSub = SUBJECT_QUIZ_CATEGORIES.find(s => s.id === e.target.value);
                      if (nextSub) {
                        setSelectedSubject(nextSub);
                        loadRandomizedQuestions(nextSub);
                        setShuffleToast(`Switched to ${nextSub.title} with randomized questions!`);
                      }
                    }}
                    className="bg-black/25 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-white/20 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  >
                    {SUBJECT_QUIZ_CATEGORIES.map(s => (
                      <option key={s.id} value={s.id} className="text-slate-900 bg-white">
                        {s.title}
                      </option>
                    ))}
                  </select>

                  {!isSubmitted && (
                    <>
                      <div className="hidden sm:flex bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-xl items-center gap-1.5 border border-white/20 text-xs text-white font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{Object.keys(selectedAnswers).length}/{activeQuestions.length} answered</span>
                      </div>

                      <div className="bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/20">
                        <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                        <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black">{selectedSubject.title}</h2>
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Real-Time Active
                    </span>
                  </div>
                  <p className="text-xs text-white/80 mt-0.5">{selectedSubject.subtitle}</p>
                </div>

                {/* Real-Time Shuffle Questions Action Button */}
                {!isSubmitted && (
                  <button
                    onClick={handleRealTimeShuffle}
                    disabled={shufflingAnimation}
                    className="self-start sm:self-auto bg-white/20 hover:bg-white text-white hover:text-slate-900 border border-white/30 px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                    title="Generate brand new random questions for this subject in real-time"
                  >
                    <Shuffle className={`w-3.5 h-3.5 ${shufflingAnimation ? "animate-spin" : ""}`} />
                    <span>🔀 Real-Time Shuffle (नया रैंडम सेट)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quiz Body */}
            {!isSubmitted && activeQuestions.length > 0 ? (
              <div className="p-5 sm:p-8">
                {/* Visual Progress Bar & Circular Indicator */}
                <QuizProgressIndicator
                  currentIndex={currentQuestionIndex}
                  totalQuestions={activeQuestions.length}
                  selectedAnswers={selectedAnswers}
                  onSelectIndex={(idx) => setCurrentQuestionIndex(idx)}
                  showQuestionTrack={true}
                />

                {/* Question Box */}
                <div className="mb-8">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug">
                      {activeQuestions[currentQuestionIndex].question}
                    </h3>
                    {activeQuestions[currentQuestionIndex].difficulty && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                        {activeQuestions[currentQuestionIndex].difficulty}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {activeQuestions[currentQuestionIndex].options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-sm sm:text-base font-medium flex items-center justify-between ${
                            isSelected
                              ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-500/30 shadow-xs"
                              : "bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                isSelected
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{option}</span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuestionIndex < activeQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-[#0f2147] text-white text-xs font-bold hover:bg-[#1a3673] transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsSubmitted(true)}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-md active:scale-98"
                      >
                        <Award className="w-4 h-4" /> Submit Test
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Quiz Scorecard & Results Screen */
              <div className="p-6 sm:p-10 text-center">
                {(() => {
                  const result = calculateScore();
                  const isPass = result.percent >= 60;
                  return (
                    <div>
                      {/* Circular Score Indicator Gauge */}
                      <div className="relative w-28 h-28 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#e2e8f0"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke={isPass ? "#10b981" : "#f59e0b"}
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 42}
                            strokeDashoffset={2 * Math.PI * 42 - (result.percent / 100) * (2 * Math.PI * 42)}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-2xl font-black ${isPass ? "text-emerald-700" : "text-amber-700"}`}>
                            {result.percent}%
                          </span>
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                            Score
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                        {isPass ? "Outstanding Performance! 🎉" : "Good Effort! Practice More 💪"}
                      </h3>
                      
                      <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                        You scored <span className="font-extrabold text-slate-900">{result.score}</span> out of{" "}
                        <span className="font-extrabold text-slate-900">{result.total}</span> questions ({result.percent}%).
                      </p>

                      {/* Score metrics box */}
                      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 text-center">
                        <div>
                          <span className="text-xs text-slate-400 block font-bold">Total</span>
                          <span className="text-xl font-black text-slate-900">{result.total}</span>
                        </div>
                        <div>
                          <span className="text-xs text-emerald-600 block font-bold">Correct</span>
                          <span className="text-xl font-black text-emerald-600">{result.score}</span>
                        </div>
                        <div>
                          <span className="text-xs text-rose-500 block font-bold">Wrong</span>
                          <span className="text-xl font-black text-rose-500">
                            {result.total - result.score}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Qualification Callout */}
                      {isPass ? (
                        <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-3 shadow-2xs">
                          <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-extrabold text-amber-950 flex items-center gap-1.5">
                              <span>Certificate Requirement Fulfilled! 🎓</span>
                              <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">QUALIFIED</span>
                            </div>
                            <div className="text-amber-800 mt-1 leading-relaxed">
                              You passed with {result.percent}%! Finish all modules for this subject's course to claim and download your verified course completion certificate.
                            </div>
                            <Link
                              to="/dashboard/certificates"
                              className="inline-flex items-center gap-1.5 font-bold text-indigo-700 hover:text-indigo-900 mt-2.5 underline underline-offset-2"
                            >
                              <span>View Certificate Status in Student Dashboard &rarr;</span>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-md mx-auto mb-6 p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-left flex items-center gap-3 text-xs text-slate-600">
                          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                          <div>
                            Passing score of 60% is required for course completion certificate. You can retake this quiz anytime with fresh randomized questions.
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        <button
                          onClick={() => setShowExplanations(!showExplanations)}
                          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          {showExplanations ? "Hide Explanations" : "Review All Answers & Explanations"}
                        </button>

                        {/* Real-time Retake with New Random Questions */}
                        <button
                          onClick={() => {
                            if (selectedSubject) {
                              loadRandomizedQuestions(selectedSubject);
                              setShuffleToast(`🔀 New randomized questions loaded for ${selectedSubject.title}!`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
                        >
                          <Shuffle className="w-3.5 h-3.5" />
                          Attempt New Random Questions (नए प्रश्न)
                        </button>

                        <button
                          onClick={() => setSelectedSubject(null)}
                          className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-2"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          Choose Another Subject
                        </button>

                        <Link
                          to="/dashboard/certificates"
                          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors flex items-center gap-2 shadow-xs"
                        >
                          <Award className="w-3.5 h-3.5" />
                          View Course Certificates
                        </Link>

                        <Link
                          to="/notes"
                          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-300" />
                          Download Notes (GPay: 8168707120)
                        </Link>
                      </div>

                      {/* Detailed Questions & Answers Breakdown */}
                      {showExplanations && (
                        <div className="text-left pt-6 border-t border-slate-200 space-y-6 animate-in fade-in">
                          <h4 className="text-lg font-bold text-slate-900 text-center">
                            Detailed Answer Explanations
                          </h4>
                          {activeQuestions.map((q, qIndex) => {
                            const userAnswer = selectedAnswers[qIndex];
                            const isCorrect = userAnswer === q.correctIndex;
                            return (
                              <div
                                key={q.id}
                                className={`p-5 rounded-2xl border ${
                                  isCorrect
                                    ? "bg-emerald-50/50 border-emerald-200"
                                    : "bg-rose-50/50 border-rose-200"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                                    {qIndex + 1}. {q.question}
                                  </h5>
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1 shrink-0 ${
                                      isCorrect
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-rose-100 text-rose-800"
                                    }`}
                                  >
                                    {isCorrect ? "Correct" : "Incorrect"}
                                  </span>
                                </div>

                                <div className="text-xs space-y-1 mb-3">
                                  <p className="text-slate-600">
                                    <span className="font-bold text-slate-700">Your Answer:</span>{" "}
                                    {userAnswer !== undefined ? q.options[userAnswer] : "Skipped"}
                                  </p>
                                  <p className="text-emerald-700 font-bold">
                                    <span>Correct Answer:</span> {q.options[q.correctIndex]}
                                  </p>
                                </div>

                                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                                  <span className="font-bold text-slate-900 block mb-0.5">Explanation:</span>
                                  {q.explanation}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Pay ₹1 to Attempt Quiz Modal with GPay QR and Real-time Random Questions Preview */}
        {paymentModalSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setPaymentModalSubject(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Token Fee: ₹1 Only
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">
                Unlock {paymentModalSubject.title}
              </h3>
              
              <p className="text-xs text-slate-600 mb-2">
                Scan the GPay QR below or pay ₹1 to <strong className="text-slate-800 font-mono">8168707120</strong> to attempt the test with verified answers.
              </p>

              {/* Real-time feature pill in modal */}
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 text-[11px] font-semibold py-1.5 px-3 rounded-xl mb-4 flex items-center justify-center gap-1.5">
                <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
                <span>{paymentModalSubject.pool.length}+ Questions in pool • Real-time shuffle active!</span>
              </div>

              {/* GPay QR Code Component */}
              <GPayQR 
                amount="1" 
                noteTitle={paymentModalSubject.title} 
                className="mb-4"
              />

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => startQuizAfterPayment(paymentModalSubject)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>I Have Paid ₹1 • Start Randomized Test</span>
                </button>

                <a
                  href={`https://wa.me/919017042682?text=${encodeURIComponent(
                    `Hello Gunjan Gaur Ma'am, I have paid ₹1 via GPay to 8168707120 for "${paymentModalSubject.title}". Starting the test now!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Send Screenshot on WhatsApp (+91 9017042682)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
