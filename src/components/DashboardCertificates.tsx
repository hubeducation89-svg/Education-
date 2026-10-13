import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context";
import { COURSES, Course } from "../data";
import { 
  COURSE_CERTIFICATE_CONFIGS, 
  CourseCertificateConfig, 
  generateCertificateId, 
  getCertificateHonour 
} from "../data/certificatesData";
import { CertificateModal } from "./CertificateModal";
import { 
  Award, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  Download, 
  Eye, 
  HelpCircle, 
  Lock, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  User, 
  Edit3, 
  ShieldCheck, 
  Check, 
  Share2,
  FileCheck2
} from "lucide-react";
import confetti from "canvas-confetti";

export function DashboardCertificates() {
  const { state, setUserName, markAllModulesComplete } = useAppContext();
  const [filter, setFilter] = useState<"all" | "earned" | "in-progress">("all");
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(state.userName);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditingName(false);
      showToast("Updated certificate name!");
    }
  };

  // Compute status for all courses
  const courseStatuses = useMemo(() => {
    return COURSES.map((course) => {
      const config: CourseCertificateConfig | undefined = COURSE_CERTIFICATE_CONFIGS[course.id];
      const progress = state.progress[course.id] || { completedModules: [] };
      const completedModulesCount = progress.completedModules.length;
      const totalModulesCount = course.modules.length;
      const isModulesCompleted = totalModulesCount > 0 && completedModulesCount >= totalModulesCount;

      // Quiz result check
      const quizSubjectId = config?.quizSubjectId || "";
      const quizResult = state.quizResults?.[quizSubjectId];
      const isQuizPassed = Boolean(quizResult && quizResult.passed && quizResult.percent >= (config?.minPassPercent || 60));

      const isEarned = isModulesCompleted && isQuizPassed;

      return {
        course,
        config: config || {
          courseId: course.id,
          courseTitle: course.title,
          quizSubjectId: "",
          quizTitle: "Course Quiz",
          minPassPercent: 60,
          skillsLearned: ["Core Concepts", "Practical Exercises"],
          shortCode: "EDUHUB",
          category: "General",
          instructorName: "Gunjan Gaur",
          instructorTitle: "Lead Educator",
          duration: course.duration || "4 Weeks"
        },
        progress,
        completedModulesCount,
        totalModulesCount,
        modulesPercent: totalModulesCount > 0 ? Math.round((completedModulesCount / totalModulesCount) * 100) : 0,
        isModulesCompleted,
        quizResult,
        isQuizPassed,
        isEarned
      };
    });
  }, [state.progress, state.quizResults]);

  const earnedCount = courseStatuses.filter((c) => c.isEarned).length;
  const inProgressCount = courseStatuses.length - earnedCount;

  const filteredStatuses = useMemo(() => {
    if (filter === "earned") return courseStatuses.filter((c) => c.isEarned);
    if (filter === "in-progress") return courseStatuses.filter((c) => !c.isEarned);
    return courseStatuses;
  }, [courseStatuses, filter]);

  // Quick Action for Evaluator/Student to mark all modules complete
  const handleQuickCompleteModules = (course: Course) => {
    const allNames = course.modules.map((m) => m.name);
    markAllModulesComplete(course.id, allNames);
    showToast(`All ${course.modules.length} modules marked complete for "${course.title}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0f2147] text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-2.5 animate-in slide-in-from-top text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0f2147] via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Official Accreditation Program</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Course Completion Certificates
            </h1>

            <p className="text-indigo-200 text-xs sm:text-sm mt-2 leading-relaxed">
              Earn and download verified completion certificates by finishing all course curriculum modules and passing the subject quiz with a score of 60% or higher.
            </p>

            {/* Recipient Name Customization Box */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-indigo-300">Printed Name on Certificate:</span>
              {isEditingName ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-white text-slate-900 text-xs font-bold border border-amber-400 focus:outline-none"
                    placeholder="Enter full name"
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-2.5 py-1 bg-amber-400 text-slate-950 rounded-lg font-black text-xs hover:bg-amber-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="px-2 py-1 text-white/70 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                    {state.userName}
                  </span>
                  <button
                    onClick={() => {
                      setTempName(state.userName);
                      setIsEditingName(true);
                    }}
                    className="text-amber-300 hover:text-amber-200 text-xs font-semibold flex items-center gap-1 underline underline-offset-2"
                  >
                    <Edit3 className="w-3 h-3" /> Change
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Overall Stats Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 w-full md:w-auto shrink-0 min-w-[240px]">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
              <span className="text-xs text-indigo-200 font-medium">Earned Certificates</span>
              <span className="text-2xl font-black text-amber-400">{earnedCount} / {COURSES.length}</span>
            </div>

            <div className="space-y-1.5 text-xs text-indigo-100">
              <div className="flex justify-between">
                <span className="text-indigo-300">Pass Criteria:</span>
                <span className="font-bold text-white">100% Modules + Quiz ≥ 60%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-300">Signatory:</span>
                <span className="font-bold text-white">Gunjan Gaur</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-300">Format:</span>
                <span className="font-bold text-emerald-300">HD PNG & PDF Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-[#0f2147] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Courses ({COURSES.length})
          </button>

          <button
            onClick={() => setFilter("earned")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === "earned"
                ? "bg-[#0f2147] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Earned ({earnedCount})</span>
          </button>

          <button
            onClick={() => setFilter("in-progress")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === "in-progress"
                ? "bg-[#0f2147] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            In Progress ({inProgressCount})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filteredStatuses.length}</span> certificate tracks
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStatuses.map((item) => {
          const { course, config, completedModulesCount, totalModulesCount, modulesPercent, isModulesCompleted, quizResult, isQuizPassed, isEarned } = item;
          const certId = generateCertificateId(course.id, state.userName);
          const scorePercent = quizResult?.percent ?? 0;
          const honour = isQuizPassed ? getCertificateHonour(scorePercent) : null;

          return (
            <div
              key={course.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col ${
                isEarned
                  ? "border-amber-300 shadow-md ring-1 ring-amber-200/60"
                  : "border-slate-200 shadow-xs hover:shadow-sm"
              }`}
            >
              {/* Card Header Header with Status Banner */}
              <div
                className={`p-5 flex items-start justify-between gap-3 ${
                  isEarned
                    ? "bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/70"
                    : "bg-slate-50 border-b border-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                      isEarned
                        ? "bg-amber-400 text-slate-950"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isEarned ? (
                      <Award className="w-6 h-6 stroke-[2.2]" />
                    ) : (
                      <Lock className="w-5 h-5 stroke-[2]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {config.category} • {course.duration || "Self-Paced"}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {isEarned ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-1 rounded-full border border-emerald-200 shrink-0 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>UNLOCKED</span>
                  </span>
                ) : (
                  <span className="bg-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>IN PROGRESS</span>
                  </span>
                )}
              </div>

              {/* Card Body & 2-Step Requirement Progress */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                {/* 2-Step Requirement Checklist */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Certificate Requirements:
                  </div>

                  {/* Step 1: Modules Progress */}
                  <div
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                      isModulesCompleted
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isModulesCompleted
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-600 font-bold text-[11px]"
                        }`}
                      >
                        {isModulesCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "1"}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold flex items-center gap-1.5 truncate">
                          <span>Course Modules ({completedModulesCount}/{totalModulesCount})</span>
                          {isModulesCompleted && (
                            <span className="text-[10px] text-emerald-700 font-black">100% Done</span>
                          )}
                        </div>
                        <div className="w-32 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isModulesCompleted ? "bg-emerald-600" : "bg-indigo-600"
                            }`}
                            style={{ width: `${modulesPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {!isModulesCompleted && (
                      <Link
                        to={`/dashboard/course/${course.id}`}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline shrink-0"
                      >
                        Finish Modules
                      </Link>
                    )}
                  </div>

                  {/* Step 2: Quiz Result */}
                  <div
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                      isQuizPassed
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isQuizPassed
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-600 font-bold text-[11px]"
                        }`}
                      >
                        {isQuizPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "2"}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate">
                          Qualifying Quiz (Min 60%)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {isQuizPassed ? (
                            <span className="text-emerald-700 font-bold">
                              Passed with {scorePercent}% score ({honour?.grade})
                            </span>
                          ) : quizResult ? (
                            <span className="text-amber-700 font-medium">
                              Last Attempt: {quizResult.percent}% (Needs ≥ 60%)
                            </span>
                          ) : (
                            <span>Assessment required for certificate issue</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/quiz?subject=${config.quizSubjectId}&category=${encodeURIComponent(config.category)}`}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                        isQuizPassed
                          ? "text-slate-600 bg-slate-100 hover:bg-slate-200"
                          : "text-amber-900 bg-amber-400 hover:bg-amber-300 shadow-2xs font-black"
                      }`}
                    >
                      {isQuizPassed ? "Retake Quiz" : "Take Quiz (₹1)"}
                    </Link>
                  </div>
                </div>

                {/* Unlocked Details or Demo Helper */}
                {isEarned ? (
                  <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Credential ID:</span>
                      <span className="font-mono font-bold text-slate-900">{certId}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Honours:</span>
                      <span className="font-bold text-amber-900">{honour?.title}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Instructor:</span>
                      <span className="font-bold text-slate-900">{config.instructorName}</span>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Both steps needed to unlock diploma</span>
                    <button
                      onClick={() => handleQuickCompleteModules(course)}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold underline"
                      title="For testing: marks all modules for this course complete"
                    >
                      Test Unlock Modules
                    </button>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100">
                  {isEarned ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCourseForModal(course)}
                        className="flex-1 py-2.5 px-4 bg-[#0f2147] hover:bg-[#1a3673] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-300" />
                        <span>View Certificate</span>
                      </button>

                      <button
                        onClick={() => setSelectedCourseForModal(course)}
                        className="py-2.5 px-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        title="Download Certificate PNG"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard/course/${course.id}`}
                        className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Go to Course ({completedModulesCount}/{totalModulesCount})</span>
                      </Link>

                      <Link
                        to={`/quiz?subject=${config.quizSubjectId}`}
                        className="py-2.5 px-3.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Pass Quiz</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Certificate View & Download Modal */}
      {selectedCourseForModal && (
        <CertificateModal
          course={selectedCourseForModal}
          config={
            COURSE_CERTIFICATE_CONFIGS[selectedCourseForModal.id] || {
              courseId: selectedCourseForModal.id,
              courseTitle: selectedCourseForModal.title,
              quizSubjectId: "",
              quizTitle: "Subject Quiz",
              minPassPercent: 60,
              skillsLearned: ["Subject Mastery", "Applied Projects"],
              shortCode: "EDUHUB",
              category: "Core",
              instructorName: "Gunjan Gaur",
              instructorTitle: "Lead Educator & Founder",
              duration: selectedCourseForModal.duration || "4 Weeks"
            }
          }
          studentName={state.userName}
          quizResult={state.quizResults?.[COURSE_CERTIFICATE_CONFIGS[selectedCourseForModal.id]?.quizSubjectId || ""]}
          onClose={() => setSelectedCourseForModal(null)}
          onUpdateName={(newName) => {
            setUserName(newName);
            showToast("Certificate name updated!");
          }}
        />
      )}
    </div>
  );
}
