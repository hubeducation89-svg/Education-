import React, { useState, useMemo } from "react";
import { Link, Routes, Route, useNavigate, useParams, Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context";
import { COURSES } from "../data";
import { comprehensiveNotes, NoteItem } from "./Notes";
import { quizCategories } from "./Quiz";
import { SUBJECT_QUIZ_CATEGORIES } from "../data/quizData";
import { GPayQR } from "../components/GPayQR";
import { DashboardCertificates } from "../components/DashboardCertificates";
import { COURSE_CERTIFICATE_CONFIGS } from "../data/certificatesData";
import { 
  CheckCircle, 
  MessageSquare, 
  Book, 
  User, 
  ArrowLeft, 
  Send, 
  FileText, 
  HelpCircle, 
  Download, 
  Copy, 
  Check, 
  Phone, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Eye, 
  Award,
  Clock,
  Filter,
  X,
  Shuffle
} from "lucide-react";
import { cn } from "../lib/utils";

// Sub-components for the dashboard
function StudentProgress() {
  const { state } = useAppContext();
  
  const earnedCertificatesCount = useMemo(() => {
    return COURSES.filter(course => {
      const progress = state.progress[course.id] || { completedModules: [] };
      const isModsDone = course.modules.length > 0 && progress.completedModules.length >= course.modules.length;
      const cfg = COURSE_CERTIFICATE_CONFIGS[course.id];
      const isQuizPassed = Boolean(cfg && state.quizResults?.[cfg.quizSubjectId]?.passed);
      return isModsDone && isQuizPassed;
    }).length;
  }, [state.progress, state.quizResults]);

  return (
    <div>
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-[#0f2147] to-indigo-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="bg-amber-400 text-slate-950 text-xs font-black uppercase px-2.5 py-0.5 rounded-full inline-block mb-2">
              Student Dashboard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Welcome back, {state.userName}!</h2>
            <p className="text-indigo-200 text-sm mt-1">
              Your personalized hub for course modules, study notes, skill quizzes, and completion certificates by Gunjan Gaur.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/dashboard/notes"
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors backdrop-blur flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" /> Notes
            </Link>
            <Link
              to="/dashboard/quizzes"
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors backdrop-blur flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Quizzes
            </Link>
            <Link
              to="/dashboard/certificates"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Award className="w-3.5 h-3.5" /> Certificates ({earnedCertificatesCount})
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div>
            <span className="text-xs text-indigo-300 block">Enrolled Courses</span>
            <span className="text-xl sm:text-2xl font-black">{COURSES.length}</span>
          </div>
          <div>
            <span className="text-xs text-indigo-300 block">Available Notes</span>
            <span className="text-xl sm:text-2xl font-black">{comprehensiveNotes.length}</span>
          </div>
          <div>
            <span className="text-xs text-indigo-300 block">Practice Quizzes</span>
            <span className="text-xl sm:text-2xl font-black">{quizCategories.length}</span>
          </div>
          <div>
            <span className="text-xs text-indigo-300 block">Certificates Earned</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">
              {earnedCertificatesCount} / {COURSES.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Enrolled Courses & Progress</h3>
        <Link to="/courses" className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">
          Explore All Courses &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COURSES.map(course => {
          const progress = state.progress[course.id] || { completedModules: [] };
          const completedCount = progress.completedModules.length;
          const totalCount = course.modules.length;
          const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
          const cfg = COURSE_CERTIFICATE_CONFIGS[course.id];
          const isQuizPassed = Boolean(cfg && state.quizResults?.[cfg.quizSubjectId]?.passed);
          const isCertEarned = percent === 100 && isQuizPassed;
          
          return (
            <div key={course.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-900">{course.title}</h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {percent}% Done
                </span>
              </div>

              {/* Certificate Quick Badge on Course Card */}
              {isCertEarned ? (
                <div className="mb-4 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between text-amber-950 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Official Certificate Unlocked! 🎓</span>
                  </span>
                  <Link to="/dashboard/certificates" className="text-indigo-600 hover:underline text-[11px] font-extrabold">
                    View / Download &rarr;
                  </Link>
                </div>
              ) : (
                <div className="mb-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Reqs: {completedCount}/{totalCount} modules</span>
                  <span className={isQuizPassed ? "text-emerald-700 font-bold" : "text-amber-700 font-medium"}>
                    {isQuizPassed ? "Quiz Passed ✅" : "Quiz Pending ⚠️"}
                  </span>
                </div>
              )}

              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-5 overflow-hidden">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${percent}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                <span>{completedCount} of {totalCount} modules completed</span>
                {course.duration && <span className="text-slate-400 uppercase font-semibold">{course.duration}</span>}
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link to={`/dashboard/course/${course.id}`} className="text-indigo-600 font-bold hover:text-indigo-800 text-xs inline-flex items-center gap-1">
                  Continue Learning &rarr;
                </Link>
                {course.videoLink && (
                  <a href={course.videoLink} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 text-xs font-semibold">
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Dedicated Notes Section for the Dashboard
function DashboardNotes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [downloadModalNote, setDownloadModalNote] = useState<NoteItem | null>(null);
  const [copiedGPay, setCopiedGPay] = useState(false);

  const copyGPayNumber = () => {
    navigator.clipboard.writeText("8168707120");
    setCopiedGPay(true);
    setTimeout(() => setCopiedGPay(false), 2500);
  };

  const categories = ["All", "Programming", "Office Productivity", "Computer Science", "Web & AI", "Science & Math"];

  const filtered = useMemo(() => {
    return comprehensiveNotes.filter(n => {
      const matchCat = selectedCategory === "All" || n.category === selectedCategory;
      const matchQuery = searchQuery.trim() === "" ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Study Notes & PDFs</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Curated revision notes by Gunjan Gaur. Click Download on any note to open the direct payment option.
          </p>
        </div>
        <Link
          to="/notes"
          className="text-xs text-indigo-600 font-bold hover:underline"
        >
          View Full Public Catalog &rarr;
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes (e.g. C, Excel, AI)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#0f2147] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(note => (
          <div key={note.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
            <div className={`p-4 ${note.coverColor} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <FileText className={`w-6 h-6 ${note.iconColor}`} />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{note.category}</span>
              </div>
              <span className="text-xs font-extrabold bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-slate-900 shadow-2xs">
                {note.price}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-900 text-base mb-1.5 leading-snug">{note.title}</h3>
              <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">{note.description}</p>
              
              <div className="text-[11px] text-slate-500 font-medium mb-4 flex items-center justify-between">
                <span>{note.pages} Pages</span>
                <span className="text-emerald-700 font-bold">Verified by Gunjan Gaur</span>
              </div>

              <div className="mt-auto space-y-2 pt-2 border-t border-slate-100">
                <Link
                  to={`/quiz?topic=${encodeURIComponent(note.title)}&category=${encodeURIComponent(note.category)}`}
                  className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Practice Quiz</span>
                </Link>

                <button
                  onClick={() => setDownloadModalNote(note)}
                  className="w-full py-2.5 bg-[#0f2147] hover:bg-[#1a3673] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Download PDF ({note.price})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct GPay Payment Modal (Appears ONLY on clicking download) */}
      {downloadModalNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl text-center border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex flex-col items-center justify-center mx-auto mb-3">
              <span className="text-[9px] font-bold text-emerald-800 leading-none">UPI</span>
              <span className="text-lg font-black leading-none mt-0.5">GPay</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              Google Pay (GPay) Checkout
            </h3>
            
            <p className="text-slate-600 text-xs mb-4">
              Get full access to <span className="font-bold text-slate-900">{downloadModalNote.title}</span> ({downloadModalNote.pages} pages).
            </p>

            {/* GPay QR & UPI Box */}
            <GPayQR
              amount={downloadModalNote.price}
              noteTitle={downloadModalNote.title}
              className="mb-4 shadow-sm"
            />

            <div className="space-y-2">
              <a
                href={`https://wa.me/919017042682?text=${encodeURIComponent(
                  `Hello Gunjan Gaur Ma'am, I have made GPay payment of ${downloadModalNote.price} to 8168707120 for "${downloadModalNote.title}". Please send me the complete PDF.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Send Screenshot on WhatsApp</span>
              </a>

              <button
                onClick={() => setDownloadModalNote(null)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dedicated Quiz Section for the Dashboard
function DashboardQuizzes() {
  const { state } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Programming", "Office Productivity", "Computer Science", "Web & AI", "Science & Math"];

  const filtered = useMemo(() => {
    return SUBJECT_QUIZ_CATEGORIES.filter(q => {
      if (selectedCategory === "All") return true;
      return q.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Practice Quizzes & Tests</h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-amber-300">
              ⚡ Real-Time Shuffled
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Questions randomly change in real time on every attempt. Curated by Gunjan Gaur.
          </p>
        </div>
        <Link to="/quiz" className="text-xs text-indigo-600 font-bold hover:underline inline-flex items-center gap-1">
          <span>Full Interactive Arena</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar touch-pan-x">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-[#0f2147] text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(quiz => (
          <div key={quiz.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className={`p-5 bg-gradient-to-r ${quiz.color} text-white`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold bg-white/20 backdrop-blur px-2.5 py-0.5 rounded-full">
                  {quiz.category}
                </span>
                <span className="text-[11px] font-extrabold bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                  {quiz.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold">{quiz.title}</h3>
              <p className="text-xs text-white/80 mt-0.5">{quiz.subtitle}</p>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2 mb-5 text-xs text-slate-600 font-medium">
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-4 h-4 text-indigo-600" />
                    <span>{quiz.pool.length}+ Pool Questions</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Random Order
                  </span>
                </div>
                {state.quizResults?.[quiz.id]?.passed ? (
                  <div className="flex items-center justify-between bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-950 font-bold text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>Certificate Qualifying: Passed ({state.quizResults[quiz.id].percent}%)</span>
                    </div>
                    <Link to="/dashboard/certificates" className="text-indigo-600 hover:underline text-[10px] font-extrabold">
                      View Certificate &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      <span>Qualifies for Course Certificate (≥ 60%)</span>
                    </span>
                    <span className="text-amber-700 font-semibold">Pending</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Timed Real-Time Sets</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-indigo-50/60 p-2 rounded-xl border border-indigo-100 text-indigo-900 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Visual Progress & Radial Indicator</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/dashboard/notes`}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  View Related Notes
                </Link>

                <Link
                  to={`/quiz?topic=${encodeURIComponent(quiz.title)}&category=${encodeURIComponent(quiz.category)}`}
                  className="py-2 px-4 bg-[#0f2147] hover:bg-[#ffb703] hover:text-slate-900 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm active:scale-98"
                >
                  <Shuffle className="w-3 h-3 text-amber-300" />
                  <span>Start Random Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherMessaging() {
  const { state, sendMessage } = useAppContext();
  const [msgText, setMsgText] = useState("");
  
  // A simple view of messages
  const sortedMessages = [...state.messages].sort((a, b) => a.timestamp - b.timestamp);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (msgText.trim()) {
      sendMessage(msgText.trim(), state.role === "teacher" ? "student1" : "teacher1");
      setMsgText("");
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          {state.role === "teacher" ? "Student Messages" : "Teacher Messages"}
        </h2>
        <span className="text-sm font-medium text-gray-500">
          Logged in as: {state.role}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {sortedMessages.map(msg => {
          const isMe = msg.senderId === (state.role === "teacher" ? "teacher1" : "student1");
          return (
            <div key={msg.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
              <div className="text-xs text-gray-500 mb-1 mx-1">{msg.senderName}</div>
              <div className={cn(
                "px-4 py-2 rounded-2xl max-w-[80%]",
                isMe ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
              )}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
          />
          <button type="submit" className="bg-indigo-600 text-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function CourseViewer() {
  const { courseId } = useParams();
  const { state, markModuleComplete, markAllModulesComplete } = useAppContext();
  const navigate = useNavigate();
  
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return <Navigate to="/dashboard" />;

  const progress = state.progress[course.id] || { completedModules: [] };
  const completedCount = progress.completedModules.length;
  const totalCount = course.modules.length;
  const isAllModulesDone = totalCount > 0 && completedCount >= totalCount;
  const config = COURSE_CERTIFICATE_CONFIGS[course.id];
  const quizResult = config ? state.quizResults?.[config.quizSubjectId] : undefined;
  const isQuizPassed = Boolean(quizResult?.passed && quizResult.percent >= (config?.minPassPercent || 60));
  const isCertUnlocked = isAllModulesDone && isQuizPassed;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-[#0f2147] px-6 py-8 text-white relative">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <h2 className="text-3xl font-bold mt-4">{course.title}</h2>
        <p className="opacity-90 mt-2">{course.description}</p>
        
        {course.videoLink && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={course.videoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch Video on YouTube
            </a>

            <Link
              to="/dashboard/certificates"
              className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-xs"
            >
              <Award className="w-4 h-4" />
              <span>Check Certificate Status</span>
            </Link>
          </div>
        )}
      </div>

      {/* Certificate Progress Bar Callout */}
      <div className={`p-4 sm:p-5 border-b text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isCertUnlocked 
          ? "bg-amber-50 border-amber-200 text-amber-950 font-medium" 
          : "bg-slate-50 border-slate-200 text-slate-700"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
            isCertUnlocked ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-600"
          }`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm">
              {isCertUnlocked 
                ? "Course Completed! Official Certificate Available 🎓" 
                : "Course Completion Certificate Progress"}
            </div>
            <div className="text-slate-600 text-[11px] mt-0.5">
              <span>Modules: {completedCount}/{totalCount} completed • </span>
              <span className={isQuizPassed ? "text-emerald-700 font-bold" : "text-amber-700 font-semibold"}>
                Quiz: {isQuizPassed ? `Passed (${quizResult?.percent}%)` : "Pending Assessment"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCertUnlocked ? (
            <Link
              to="/dashboard/certificates"
              className="px-4 py-2 bg-[#0f2147] hover:bg-[#1a3673] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <span>View & Download Certificate &rarr;</span>
            </Link>
          ) : (
            <>
              {config && (
                <Link
                  to={`/quiz?subject=${config.quizSubjectId}`}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black text-xs flex items-center gap-1 shadow-2xs"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isQuizPassed ? "Quiz Passed ✅" : "Take Quiz (₹1)"}</span>
                </Link>
              )}
              {!isAllModulesDone && (
                <button
                  onClick={() => markAllModulesComplete(course.id, course.modules.map(m => m.name))}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-semibold text-xs transition-colors"
                  title="Mark all modules complete for demo"
                >
                  Mark All Done
                </button>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Interactive Modules ({completedCount}/{totalCount})</h3>
          {!isAllModulesDone && (
            <button
              onClick={() => markAllModulesComplete(course.id, course.modules.map(m => m.name))}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline"
            >
              Mark All Modules Complete
            </button>
          )}
        </div>
        <div className="space-y-4">
          {course.modules.map((module, idx) => {
            const isCompleted = progress.completedModules.includes(module.name);
            return (
              <div key={idx} className={cn(
                "p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors",
                isCompleted ? "bg-indigo-50 border-indigo-100" : "bg-white border-gray-200"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <span className={cn("font-medium break-words", isCompleted ? "text-indigo-900 font-bold" : "text-gray-800")}>
                    {module.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 self-end md:self-auto">
                  {module.videoLink && (
                    <a href={module.videoLink} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 flex items-center gap-1.5 text-xs font-semibold transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch Topic
                    </a>
                  )}
                  {state.role === "student" && (
                    <button
                      onClick={() => markModuleComplete(course.id, module.name)}
                      disabled={isCompleted}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition",
                        isCompleted 
                          ? "text-green-700 bg-green-50" 
                          : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                      )}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {isCompleted ? "Completed" : "Mark Done"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { state, setRole } = useAppContext();
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === "/dashboard") {
      return (
        (location.pathname === "/dashboard" || location.pathname === "/dashboard/") &&
        !location.pathname.includes("/notes") &&
        !location.pathname.includes("/quizzes") &&
        !location.pathname.includes("/messages") &&
        !location.pathname.includes("/certificates")
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-5 sm:py-8 px-3 sm:px-6 lg:px-8 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Mobile Horizontal Segmented Nav */}
        <div className="md:hidden w-full space-y-2">
          {/* Profile Quick Bar */}
          <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-200 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs"
                title="Double tap to switch demo role"
                onClick={() => setRole(state.role === "student" ? "teacher" : "student")}
              >
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-gray-900">{state.userName}</div>
                <div className="text-[10px] text-indigo-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {state.role} • Gunjan Gaur Hub
                </div>
              </div>
            </div>
            <Link
              to="/courses"
              className="text-[10px] font-bold text-indigo-600 hover:underline"
            >
              Browse &rarr;
            </Link>
          </div>

          {/* Horizontal Scrollable Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap shrink-0 transition-colors",
                isCurrent("/dashboard")
                  ? "bg-[#0f2147] text-white shadow-2xs"
                  : "text-gray-700 hover:bg-slate-100"
              )}
            >
              <Book className="w-3.5 h-3.5 text-amber-400" />
              <span>Courses</span>
            </Link>

            <Link
              to="/dashboard/notes"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap shrink-0 transition-colors",
                isCurrent("/dashboard/notes")
                  ? "bg-[#0f2147] text-white shadow-2xs"
                  : "text-gray-700 hover:bg-slate-100"
              )}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-500" />
              <span>Study Notes</span>
            </Link>

            <Link
              to="/dashboard/quizzes"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap shrink-0 transition-colors",
                isCurrent("/dashboard/quizzes")
                  ? "bg-[#0f2147] text-white shadow-2xs"
                  : "text-gray-700 hover:bg-slate-100"
              )}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Quizzes (₹1)</span>
            </Link>

            <Link
              to="/dashboard/certificates"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap shrink-0 transition-colors",
                isCurrent("/dashboard/certificates")
                  ? "bg-[#0f2147] text-white shadow-2xs"
                  : "text-gray-700 hover:bg-slate-100"
              )}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Certificates</span>
            </Link>

            <Link
              to="/dashboard/messages"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap shrink-0 transition-colors",
                isCurrent("/dashboard/messages")
                  ? "bg-[#0f2147] text-white shadow-2xs"
                  : "text-gray-700 hover:bg-slate-100"
              )}
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
              <span>Messages</span>
            </Link>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-24">
            {/* Student Profile Info */}
            <div className="flex items-center gap-3 mb-6 p-2 bg-slate-50 rounded-xl border border-slate-100">
              <div 
                className="w-11 h-11 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold shadow-xs cursor-pointer"
                title="Double click to switch demo role"
                onDoubleClick={() => setRole(state.role === "student" ? "teacher" : "student")}
              >
                <User className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <div className="font-extrabold text-sm text-gray-900 truncate">{state.userName}</div>
                <div className="text-[11px] text-indigo-600 font-semibold capitalize flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {state.role} Hub
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              <Link 
                to="/dashboard" 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors",
                  isCurrent("/dashboard") 
                    ? "bg-[#0f2147] text-white shadow-xs" 
                    : "text-gray-700 hover:bg-slate-100"
                )}
              >
                <Book className="w-4 h-4 text-amber-400" />
                <span>My Courses</span>
              </Link>

              <Link 
                to="/dashboard/notes" 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors",
                  isCurrent("/dashboard/notes") 
                    ? "bg-[#0f2147] text-white shadow-xs" 
                    : "text-gray-700 hover:bg-slate-100"
                )}
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>Study Notes</span>
              </Link>

              <Link 
                to="/dashboard/quizzes" 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors",
                  isCurrent("/dashboard/quizzes") 
                    ? "bg-[#0f2147] text-white shadow-xs" 
                    : "text-gray-700 hover:bg-slate-100"
                )}
              >
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Practice Quizzes</span>
              </Link>

              <Link 
                to="/dashboard/certificates" 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors",
                  isCurrent("/dashboard/certificates") 
                    ? "bg-[#0f2147] text-white shadow-xs" 
                    : "text-gray-700 hover:bg-slate-100"
                )}
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Certificates</span>
              </Link>

              <Link 
                to="/dashboard/messages" 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors",
                  isCurrent("/dashboard/messages") 
                    ? "bg-[#0f2147] text-white shadow-xs" 
                    : "text-gray-700 hover:bg-slate-100"
                )}
              >
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span>Messages</span>
              </Link>
            </nav>

            {/* Quick External Links */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-1">
              <Link to="/courses" className="text-[11px] text-slate-500 hover:text-indigo-600 block px-2 py-1 font-semibold">
                Browse Courses &rarr;
              </Link>
              <Link to="/quiz" className="text-[11px] text-slate-500 hover:text-indigo-600 block px-2 py-1 font-semibold">
                Quiz Arena &rarr;
              </Link>
            </div>

            {/* Demo controls hidden from production */}
            {(window.location.hostname.includes("ais-dev") || window.location.search.includes("admin=true") || window.location.hostname === "localhost") && (
              <div className="mt-6 pt-6 border-t border-gray-100 px-2">
                <p className="text-[10px] text-gray-400 mb-1.5 font-bold uppercase tracking-wider">Demo Switcher</p>
                <button 
                  onClick={() => setRole(state.role === "student" ? "teacher" : "student")}
                  className="w-full text-left text-xs text-indigo-600 font-semibold px-2 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Switch to {state.role === "student" ? "Teacher" : "Student"} View
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<StudentProgress />} />
            <Route path="notes" element={<DashboardNotes />} />
            <Route path="quizzes" element={<DashboardQuizzes />} />
            <Route path="certificates" element={<DashboardCertificates />} />
            <Route path="messages" element={<TeacherMessaging />} />
            <Route path="course/:courseId" element={<CourseViewer />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}
