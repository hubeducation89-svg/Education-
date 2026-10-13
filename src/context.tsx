import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "teacher";

export type Message = {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string;
  timestamp: number;
};

export type Progress = {
  [courseId: string]: {
    completedModules: string[];
  };
};

export type QuizResultRecord = {
  subjectId: string;
  subjectTitle: string;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  attemptedAt: number;
};

type AppState = {
  role: UserRole;
  userName: string;
  progress: Progress;
  quizResults: { [subjectId: string]: QuizResultRecord };
  messages: Message[];
};

type AppContextType = {
  state: AppState;
  setRole: (role: UserRole) => void;
  setUserName: (name: string) => void;
  markModuleComplete: (courseId: string, moduleName: string) => void;
  markAllModulesComplete: (courseId: string, allModuleNames: string[]) => void;
  resetCourseProgress: (courseId: string) => void;
  recordQuizResult: (result: QuizResultRecord) => void;
  sendMessage: (text: string, receiverId: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_STATE: AppState = {
  role: "student",
  userName: "Ravi Kumar",
  progress: {
    // Pre-completed science-course gives user 1 earned certificate out of the box
    "science-course": {
      completedModules: [
        "Introduction to Science",
        "Physics Fundamentals",
        "Chemistry Fundamentals",
        "Biology Fundamentals"
      ]
    },
    // Partial progress for C programming so student sees real progress tracking
    "c-programming": {
      completedModules: [
        "Introduction to C Language",
        "Structure of C Language",
        "History of C Language",
        "Character Set, Reserved Words",
        "Installation and Basic C Program",
        "Variables and Identifier",
        "Data Types",
        "Operators",
        "Relational Operators",
        "Logical Operators",
        "Statements in C-language",
        "Conditional Statements"
      ]
    }
  },
  quizResults: {
    // STEM quiz passed for science course
    "stem-math-science": {
      subjectId: "stem-math-science",
      subjectTitle: "STEM Mathematics & Science Quiz",
      score: 7,
      total: 8,
      percent: 88,
      passed: true,
      attemptedAt: Date.now() - 86400000 * 2
    }
  },
  messages: [
    {
      id: "msg1",
      senderId: "teacher1",
      senderName: "Gunjan Gaur",
      receiverId: "student1",
      text: "Welcome to Education Hub! Finish your course modules and pass the subject quizzes to earn and download your verified course completion certificates.",
      timestamp: Date.now() - 86400000,
    }
  ],
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem("edu-hub-state");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          progress: {
            ...DEFAULT_STATE.progress,
            ...(parsed.progress || {})
          },
          quizResults: {
            ...DEFAULT_STATE.quizResults,
            ...(parsed.quizResults || {})
          }
        };
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem("edu-hub-state", JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const setRole = (role: UserRole) => {
    setState((s) => ({ ...s, role }));
  };

  const setUserName = (name: string) => {
    if (!name.trim()) return;
    setState((s) => ({ ...s, userName: name.trim() }));
  };

  const markModuleComplete = (courseId: string, moduleName: string) => {
    setState((s) => {
      const courseProgress = s.progress[courseId] || { completedModules: [] };
      if (!courseProgress.completedModules.includes(moduleName)) {
        return {
          ...s,
          progress: {
            ...s.progress,
            [courseId]: {
              ...courseProgress,
              completedModules: [...courseProgress.completedModules, moduleName],
            },
          },
        };
      }
      return s;
    });
  };

  const markAllModulesComplete = (courseId: string, allModuleNames: string[]) => {
    setState((s) => ({
      ...s,
      progress: {
        ...s.progress,
        [courseId]: {
          completedModules: [...allModuleNames],
        },
      },
    }));
  };

  const resetCourseProgress = (courseId: string) => {
    setState((s) => ({
      ...s,
      progress: {
        ...s.progress,
        [courseId]: {
          completedModules: [],
        },
      },
    }));
  };

  const recordQuizResult = (result: QuizResultRecord) => {
    setState((s) => ({
      ...s,
      quizResults: {
        ...s.quizResults,
        [result.subjectId]: result,
      },
    }));
  };

  const sendMessage = (text: string, receiverId: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: state.role === "student" ? "student1" : "teacher1",
      senderName: state.userName,
      receiverId,
      text,
      timestamp: Date.now(),
    };
    setState((s) => ({
      ...s,
      messages: [...s.messages, newMessage],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setRole,
        setUserName,
        markModuleComplete,
        markAllModulesComplete,
        resetCourseProgress,
        recordQuizResult,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
