export interface CourseCertificateConfig {
  courseId: string;
  courseTitle: string;
  quizSubjectId: string;
  quizTitle: string;
  minPassPercent: number; // 60%
  skillsLearned: string[];
  shortCode: string;
  category: string;
  instructorName: string;
  instructorTitle: string;
  duration: string;
}

export const COURSE_CERTIFICATE_CONFIGS: Record<string, CourseCertificateConfig> = {
  "science-course": {
    courseId: "science-course",
    courseTitle: "Science Course (Physics, Chemistry & Biology)",
    quizSubjectId: "stem-math-science",
    quizTitle: "STEM Mathematics & Science Quiz",
    minPassPercent: 60,
    skillsLearned: ["Physics Fundamentals", "Chemical Reactions & Matter", "Biological Principles", "Scientific Inquiry"],
    shortCode: "SCI",
    category: "Science & Math",
    instructorName: "Gunjan Gaur",
    instructorTitle: "Lead Educator & Founder, Education Hub",
    duration: "4-6 Weeks"
  },
  "c-programming": {
    courseId: "c-programming",
    courseTitle: "C Programming Masterclass",
    quizSubjectId: "c-programming",
    quizTitle: "C Programming Quiz",
    minPassPercent: 60,
    skillsLearned: ["Pointers & Memory Models", "Structures & Dynamic Allocation", "Bitwise Operators", "Modular Programming"],
    shortCode: "CPROG",
    category: "Programming",
    instructorName: "Gunjan Gaur",
    instructorTitle: "Lead Educator & Founder, Education Hub",
    duration: "6–8 Weeks"
  },
  "cpp-programming": {
    courseId: "cpp-programming",
    courseTitle: "C++ Object-Oriented Programming",
    quizSubjectId: "cpp-oops",
    quizTitle: "C++ (OOPs) Quiz",
    minPassPercent: 60,
    skillsLearned: ["OOP Architecture", "Virtual Functions & Polymorphism", "STL Containers", "Templates & RAII Memory"],
    shortCode: "CPPOOP",
    category: "Programming",
    instructorName: "Gunjan Gaur",
    instructorTitle: "Lead Educator & Founder, Education Hub",
    duration: "6–8 Weeks"
  },
  "ms-office": {
    courseId: "ms-office",
    courseTitle: "Microsoft Office & Excel Professional",
    quizSubjectId: "ms-excel",
    quizTitle: "MS Excel & Office Productivity Quiz",
    minPassPercent: 60,
    skillsLearned: ["MS Word Formatting & Indexing", "Excel Formulas & Lookups", "Pivot Tables & Data Summaries", "Mail Merge"],
    shortCode: "MSOFF",
    category: "Office Productivity",
    instructorName: "Gunjan Gaur",
    instructorTitle: "Lead Educator & Founder, Education Hub",
    duration: "4-6 Weeks"
  },
  "digital-electronics": {
    courseId: "digital-electronics",
    courseTitle: "Logical Organization & Digital Electronics",
    quizSubjectId: "loc-digital",
    quizTitle: "Logical Organization & Digital Electronics Quiz",
    minPassPercent: 60,
    skillsLearned: ["Number Systems & Conversions", "Logic Gates & K-Maps", "Decoders & Multiplexers", "Boolean Algebra"],
    shortCode: "DIGELEC",
    category: "Computer Science",
    instructorName: "Gunjan Gaur",
    instructorTitle: "Lead Educator & Founder, Education Hub",
    duration: "6 Weeks"
  },
  "mathematics": {
    courseId: "mathematics",
    courseTitle: "Mathematics Fundamentals & Calculus",
    quizSubjectId: "stem-math-science",
    quizTitle: "STEM Mathematics & Science Quiz",
    minPassPercent: 60,
    skillsLearned: ["Algebra & Trigonometry", "Differentiation & Limits", "Probability & Statistics", "Analytical Problem Solving"],
    shortCode: "MATH",
    category: "Science & Math",
    instructorName: "Gunjan Gaur",
    instructorTitle: "Lead Educator & Founder, Education Hub",
    duration: "8 Weeks"
  }
};

/**
 * Generates an official, verifiable Certificate ID
 */
export function generateCertificateId(courseId: string, studentName: string): string {
  const config = COURSE_CERTIFICATE_CONFIGS[courseId];
  const code = config?.shortCode || "EDUHUB";
  const sanitized = studentName.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "STU";
  const year = new Date().getFullYear();
  return `EDU-${year}-${code}-${sanitized}8168`;
}

/**
 * Returns honour badge and label based on quiz score
 */
export function getCertificateHonour(scorePercent: number): {
  title: string;
  badgeColor: string;
  grade: string;
} {
  if (scorePercent >= 90) {
    return {
      title: "Passed with High Distinction",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      grade: "A+ (Distinction)"
    };
  }
  if (scorePercent >= 75) {
    return {
      title: "Passed with Honors",
      badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
      grade: "A (First Class)"
    };
  }
  return {
    title: "Passed with Merit",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    grade: "B+ (Merit)"
  };
}
