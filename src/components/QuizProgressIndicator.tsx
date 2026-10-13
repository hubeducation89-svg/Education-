import React from "react";
import { Check, CheckCircle2, Circle } from "lucide-react";

interface QuizProgressIndicatorProps {
  currentIndex: number;
  totalQuestions: number;
  selectedAnswers: Record<number, number>;
  onSelectIndex: (index: number) => void;
  showQuestionTrack?: boolean;
}

export function QuizProgressIndicator({
  currentIndex,
  totalQuestions,
  selectedAnswers,
  onSelectIndex,
  showQuestionTrack = true,
}: QuizProgressIndicatorProps) {
  const answeredCount = Object.keys(selectedAnswers).length;
  const answeredPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const currentStepPercent = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;
  const remainingCount = Math.max(0, totalQuestions - answeredCount);

  // SVG Circular parameters
  const size = 56;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Answered progress stroke
  const strokeDashoffset = circumference - (answeredPercent / 100) * circumference;

  return (
    <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs mb-6">
      {/* Top Header: Circular Indicator + Details + Linear Bar */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3">
        {/* Circular Progress Gauge */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="rotate-[-90deg] drop-shadow-xs"
            aria-label={`Progress: ${answeredPercent}%`}
          >
            {/* Background track circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Active progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#quizGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="quizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered label inside circle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[12px] sm:text-[13px] font-black text-slate-800 leading-none">
              {answeredPercent}%
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
              Done
            </span>
          </div>
        </div>

        {/* Text Info & Stats Pills */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                Question {currentIndex + 1}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                of {totalQuestions}
              </span>
            </div>

            {/* Answered / Remaining badge pills */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{answeredCount} Answered</span>
              </span>
              {remainingCount > 0 ? (
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg">
                  {remainingCount} Left
                </span>
              ) : (
                <span className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-lg">
                  All Answered!
                </span>
              )}
            </div>
          </div>

          {/* Linear Progress Bar with glowing gradient */}
          <div className="relative w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden shadow-inner">
            {/* Background position marker (subtle) */}
            <div
              className="absolute inset-y-0 left-0 bg-slate-300/60 rounded-full transition-all duration-300"
              style={{ width: `${currentStepPercent}%` }}
              title={`Position: Q${currentIndex + 1}`}
            />
            {/* Answered progress fill with vibrant gradient */}
            <div
              className="relative h-full bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${answeredPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Question Step Indicator Track */}
      {showQuestionTrack && totalQuestions > 1 && (
        <div className="pt-2 border-t border-slate-200/70">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5 px-0.5">
            <span>Question Navigator (Click number to jump):</span>
            <span className="font-mono text-[10px] text-slate-400">
              Q{currentIndex + 1}/{totalQuestions} active
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar touch-pan-x">
            {Array.from({ length: totalQuestions }, (_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;

              let styleClasses = "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200";

              if (isCurrent && isAnswered) {
                // Current & answered: strong ring with emerald base
                styleClasses = "bg-emerald-600 text-white font-black ring-2 ring-indigo-500 ring-offset-1 scale-105 shadow-xs";
              } else if (isCurrent) {
                // Current not answered yet: strong indigo ring
                styleClasses = "bg-[#0f2147] text-white font-black ring-2 ring-amber-400 ring-offset-1 scale-105 shadow-xs";
              } else if (isAnswered) {
                // Answered previously: neat emerald
                styleClasses = "bg-emerald-500 hover:bg-emerald-600 text-white font-bold border-transparent";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs flex items-center justify-center shrink-0 border transition-all duration-150 cursor-pointer active:scale-95 ${styleClasses}`}
                  title={`Go to Question ${idx + 1} (${isAnswered ? "Answered" : "Not answered yet"})`}
                  aria-label={`Question ${idx + 1}`}
                >
                  {isAnswered && !isCurrent ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
