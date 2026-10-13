import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";
import { Download, FileText, ShoppingCart, Search, CheckCircle, BookOpen, X, Sparkles, Eye, Filter, Copy, Check, HelpCircle, Phone, ArrowRight } from "lucide-react";
import React, { useState, useMemo } from "react";
import { GPayQR } from "../components/GPayQR";

export interface NoteItem {
  id: number;
  title: string;
  category: "Programming" | "Office Productivity" | "Computer Science" | "Web & AI" | "Science & Math";
  description: string;
  price: string;
  originalPrice?: string;
  pages: number;
  coverColor: string;
  iconColor: string;
  badge?: string;
  topics: string[];
  chapters: string[];
  sampleHighlight: string;
}

export const comprehensiveNotes: NoteItem[] = [
  {
    id: 1,
    title: "C Programming Complete Notes",
    category: "Programming",
    description: "Complete handwritten & typed notes covering basic syntax to advanced pointers, memory allocation, arrays, and file handling with solved examples.",
    price: "₹99",
    originalPrice: "₹199",
    pages: 120,
    coverColor: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "Bestseller",
    topics: ["Variables & Data Types", "Control Structures", "Functions & Recursion", "Pointers & DMA", "File Handling"],
    chapters: [
      "1. Introduction to C Language & Compilers",
      "2. Operators, Expressions & Control Statements",
      "3. Arrays (1D, 2D) & String Manipulation",
      "4. Functions, Parameter Passing & Recursion",
      "5. Pointers, Memory Addresses & Dynamic Allocation (malloc, calloc)",
      "6. Structures, Unions & Enums",
      "7. File I/O (fopen, fprintf, fscanf, fclose)",
      "8. Frequently Asked Viva & University Questions"
    ],
    sampleHighlight: "Features memory diagrams for pointers and 50+ fully commented practical C programs."
  },
  {
    id: 2,
    title: "C++ Object Oriented Programming (OOPs)",
    category: "Programming",
    description: "In-depth guide on Classes, Objects, Inheritance, Polymorphism, Operator Overloading, Virtual Functions, and Standard Template Library (STL).",
    price: "₹149",
    originalPrice: "₹249",
    pages: 150,
    coverColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badge: "Popular",
    topics: ["Classes & Objects", "Inheritance Types", "Virtual Functions", "Templates & STL", "Exception Handling"],
    chapters: [
      "1. Evolution from C to C++ and Principles of OOP",
      "2. Encapsulation, Classes, Access Specifiers & Constructors",
      "3. Destructors and Copy Constructors",
      "4. Single, Multilevel, Multiple & Hierarchical Inheritance",
      "5. Compile-time vs Runtime Polymorphism & Virtual Tables",
      "6. Friend Functions & Operator Overloading",
      "7. Function & Class Templates",
      "8. STL Containers (vector, list, map, set) and Algorithms"
    ],
    sampleHighlight: "Contains real-world OOP design patterns and solved university exam paper problems."
  },
  {
    id: 3,
    title: "MS Excel Basic to Advanced Mastery Guide",
    category: "Office Productivity",
    description: "Master modern spreadsheets: 100+ formulas (VLOOKUP, XLOOKUP, INDEX-MATCH), Pivot Tables, Dashboard charts, Data Validation & Conditional Formatting.",
    price: "₹79",
    originalPrice: "₹149",
    pages: 95,
    coverColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: "Must-Have",
    topics: ["XLOOKUP & VLOOKUP", "Pivot Tables & Slicers", "Financial Formulas", "Data Validation", "Shortcuts Cheat Sheet"],
    chapters: [
      "1. Interface, Grid Anatomy & Essential Keyboard Shortcuts",
      "2. Mathematical & Statistical Formulas (SUM, AVERAGE, COUNTIF, SUMIFS)",
      "3. Text & Date Functions (CONCAT, TEXTSPLIT, DATEDIF)",
      "4. Advanced Lookups (VLOOKUP, HLOOKUP, XLOOKUP, INDEX/MATCH)",
      "5. Logical Functions (IF, IFS, AND, OR, SWITCH)",
      "6. Pivot Tables, Calculated Fields & Interactive Slicers",
      "7. Dynamic Charts, Sparklines & Executive Dashboards",
      "8. Data Cleaning, Remove Duplicates & Flash Fill"
    ],
    sampleHighlight: "Includes a 2-page printable Excel Shortcut Cheat Sheet for instant speed boost."
  },
  {
    id: 4,
    title: "MS Word & Document Formatting Handbook",
    category: "Office Productivity",
    description: "Professional report formatting, official letters, resume designing, Mail Merge automation, Table of Contents generation, and typography.",
    price: "₹49",
    originalPrice: "₹99",
    pages: 70,
    coverColor: "bg-sky-100",
    iconColor: "text-sky-600",
    topics: ["Mail Merge", "Styles & Headings", "Page Breaks & Sections", "Resume Templates", "Print Layouts"],
    chapters: [
      "1. MS Word Environment & Paragraph Typography Rules",
      "2. Using Styles & Auto Table of Contents",
      "3. Section Breaks, Headers/Footers & Different First Page",
      "4. Table Design, Cell Alignment & Formulas inside Word",
      "5. Mail Merge with Excel Recipient Lists",
      "6. Inserting Citations, Bibliographies & Footnotes",
      "7. Converting to PDF & Document Security Settings"
    ],
    sampleHighlight: "Step-by-step illustrations for setting up flawless project reports and academic theses."
  },
  {
    id: 5,
    title: "HTML5 & CSS3 Web Development Quick Notes",
    category: "Web & AI",
    description: "Concise modern web design notes: Semantic HTML, CSS Box Model, Flexbox, CSS Grid, Responsive Media Queries, and CSS Animations.",
    price: "₹119",
    originalPrice: "₹199",
    pages: 110,
    coverColor: "bg-orange-100",
    iconColor: "text-orange-600",
    badge: "New",
    topics: ["Semantic HTML5", "Flexbox Layout", "CSS Grid", "Responsive Design", "Transitions & Keyframes"],
    chapters: [
      "1. HTML Document Tree, Meta Tags & SEO Fundamentals",
      "2. Semantic Elements (header, nav, main, section, footer)",
      "3. Forms, Input Types, Validation & Attributes",
      "4. CSS Selectors, Specificity & Box Model (margin, border, padding)",
      "5. Flexbox: Justify-content, Align-items & Flex properties",
      "6. CSS Grid: Template Columns, Rows & Grid Areas",
      "7. Mobile-First Media Queries & Responsive Typography",
      "8. CSS Transitions, Transforms & Animation Keyframes"
    ],
    sampleHighlight: "Packed with visual cheat-sheets for every Flexbox and CSS Grid layout property."
  },
  {
    id: 6,
    title: "Logical Organization of Computers (LOC)",
    category: "Computer Science",
    description: "Clear notes on Number Systems, Boolean Algebra, Logic Gates, Karnaugh Maps (K-Maps), Multiplexers, Decoders, Flip-Flops & Counters.",
    price: "₹120",
    originalPrice: "₹199",
    pages: 105,
    coverColor: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "Core Subject",
    topics: ["Number Systems", "Logic Gates & Truth Tables", "K-Map Minimization", "Combinational Circuits", "Sequential Flip-Flops"],
    chapters: [
      "1. Binary, Octal, Decimal & Hexadecimal Number Conversion",
      "2. Binary Arithmetic, 1's & 2's Complement",
      "3. Boolean Postulates, De Morgan's Laws & Duals",
      "4. SOP, POS & Karnaugh Map (K-Map) Simplification (2, 3 & 4 variables)",
      "5. Adders, Subtractors, Multiplexers & Demultiplexers",
      "6. Encoders, Decoders & Code Converters",
      "7. Latches & Flip-Flops (SR, JK, D, T Flip-Flops & Race Condition)",
      "8. Registers & Synchronous/Asynchronous Counters"
    ],
    sampleHighlight: "Detailed step-by-step solved K-Map exercises and circuit diagrams."
  },
  {
    id: 7,
    title: "AI Tools & Prompt Engineering Handbook",
    category: "Web & AI",
    description: "A practical guide to leveraging AI for students and professionals: ChatGPT, Gemini, Claude, prompt strategies, image generation, and productivity tools.",
    price: "₹99",
    originalPrice: "₹199",
    pages: 85,
    coverColor: "bg-violet-100",
    iconColor: "text-violet-600",
    badge: "Trending",
    topics: ["Prompt Engineering", "ChatGPT for Study", "AI Research Tools", "Resume & Cover Letters", "Productivity Automation"],
    chapters: [
      "1. How Large Language Models (LLMs) Work Simply Explained",
      "2. Core Prompting Frameworks (Role, Context, Task, Constraints)",
      "3. Using AI for Fast Exam Revision, Summarization & Coding Help",
      "4. Best AI Tools for Research Papers, Notes & Literature Review",
      "5. AI Tools for Presentations (Slides generation, Visuals)",
      "6. Ethics, Hallucinations & Verifying AI Answers",
      "7. 50+ High-Value Ready-to-Use Prompts for Students"
    ],
    sampleHighlight: "Curated prompt templates tested for study notes, code debugging, and interview prep."
  },
  {
    id: 8,
    title: "Digital Marketing & Social Media Strategy",
    category: "Web & AI",
    description: "Complete guide covering Search Engine Optimization (SEO), Keyword Research, YouTube Channel Growth, Google Ads, and Social Media Branding.",
    price: "₹149",
    originalPrice: "₹249",
    pages: 90,
    coverColor: "bg-amber-100",
    iconColor: "text-amber-600",
    topics: ["On-Page & Off-Page SEO", "YouTube SEO", "Content Marketing", "Meta & Google Ads", "Analytics"],
    chapters: [
      "1. Digital Marketing Fundamentals & Funnel Architecture",
      "2. Keyword Research & Search Intent Analysis",
      "3. On-Page SEO (Title, Meta, URL structure, Headings, Schema)",
      "4. Off-Page SEO, Backlinks & Domain Authority",
      "5. YouTube Optimization: Titles, Thumbnails, Tags & Retention",
      "6. Social Media Campaign Strategy (Instagram, LinkedIn)",
      "7. Tracking Conversions with Google Analytics & Search Console"
    ],
    sampleHighlight: "Includes a practical YouTube channel growth checklist used by Gunjan Gaur."
  },
  {
    id: 9,
    title: "Computer Basics & Operating Systems",
    category: "Office Productivity",
    description: "Fundamental computer operations, hardware components (CPU, RAM, ROM, Storage), Windows OS settings, file system management, and internet safety.",
    price: "₹49",
    originalPrice: "₹99",
    pages: 65,
    coverColor: "bg-teal-100",
    iconColor: "text-teal-600",
    topics: ["Hardware Architecture", "Memory Hierarchy", "Windows Management", "Internet Security", "Essential Shortcuts"],
    chapters: [
      "1. What is a Computer: Block Diagram & Working Principles",
      "2. Primary Memory (RAM, ROM, Cache) vs Secondary Storage (HDD, SSD)",
      "3. Input & Output Peripherals Explained",
      "4. Operating System Roles: Process, Memory & File Management",
      "5. Windows Settings, Task Manager, Control Panel & Command Prompt Basics",
      "6. Safe Browsing, Anti-Virus, Phishing & Password Security",
      "7. Computer Troubleshooting FAQ"
    ],
    sampleHighlight: "Clear diagrams illustrating computer architecture and internal components."
  },
  {
    id: 10,
    title: "Foundation Mathematics for STEM & Coding",
    category: "Science & Math",
    description: "Essential mathematics for computer science and competitive exams: Set Theory, Boolean Logic, Matrices, Coordinate Geometry, and Calculus basics.",
    price: "₹129",
    originalPrice: "₹199",
    pages: 140,
    coverColor: "bg-rose-100",
    iconColor: "text-rose-600",
    topics: ["Set Theory & Relations", "Matrices & Determinants", "Algebraic Equations", "Calculus Essentials", "Probability Basics"],
    chapters: [
      "1. Sets, Relations & Functions with Real-world Mapping",
      "2. Propositional Logic, Truth Tables & Logical Equivalence",
      "3. Matrices Operations, Transpose, Inverse & Cramer's Rule",
      "4. Coordinate Geometry & Linear Equations",
      "5. Limits, Continuity & Differentiation Fundamentals",
      "6. Integration Formulas & Standard Techniques",
      "7. Permutations, Combinations & Probability"
    ],
    sampleHighlight: "Formula sheets with memory tricks for quick revision before exams."
  },
  {
    id: 11,
    title: "General Science (Physics & Chemistry) Exam Notes",
    category: "Science & Math",
    description: "High-yield revision notes covering core Physics (Motion, Electricity, Light, Energy) and Chemistry (Atomic Structure, Periodic Table, Chemical Bonding).",
    price: "₹99",
    originalPrice: "₹169",
    pages: 125,
    coverColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
    topics: ["Newton's Laws", "Current Electricity", "Ray Optics", "Periodic Table", "Chemical Reactions"],
    chapters: [
      "1. Units, Dimensions & Laws of Motion",
      "2. Work, Energy & Power Principles",
      "3. Light: Reflection, Refraction, Lenses & Mirrors",
      "4. Current Electricity, Ohm's Law & Circuit Calculations",
      "5. Atomic Structure, Electrons, Protons & Neutrons",
      "6. Periodic Classification of Elements & Periodic Trends",
      "7. Acids, Bases, Salts & Chemical Reactions",
      "8. Metals, Non-Metals & Everyday Chemistry"
    ],
    sampleHighlight: "Key formulas, ray diagrams, and solved numerical questions in bilingual format."
  },
  {
    id: 12,
    title: "Data Structures & Algorithms (DSA) Foundation Notes",
    category: "Programming",
    description: "Clear explanations of core DSA: Arrays, Singly & Doubly Linked Lists, Stacks, Queues, Binary Trees, and Searching/Sorting Algorithms in C/C++.",
    price: "₹159",
    originalPrice: "₹299",
    pages: 160,
    coverColor: "bg-slate-100",
    iconColor: "text-slate-700",
    badge: "Advanced",
    topics: ["Time Complexity Big-O", "Linked Lists", "Stack & Queue", "Binary Search Trees", "Sorting Algorithms"],
    chapters: [
      "1. Algorithm Analysis & Asymptotic Notations (Big-O, Omega, Theta)",
      "2. Arrays & Multi-Dimensional Matrix Operations",
      "3. Singly, Doubly & Circular Linked List Implementations",
      "4. Stack Operations (Infix to Postfix conversion, Parentheses matching)",
      "5. Queue & Circular Queue Implementations",
      "6. Binary Trees, Traversals (Inorder, Preorder, Postorder) & BST",
      "7. Searching (Linear, Binary) & Sorting (Bubble, Insertion, Merge, Quick)",
      "8. Top 30 Coding Interview Problems Solved"
    ],
    sampleHighlight: "Step-by-step tracing diagrams for pointer manipulation and recursive sorting."
  }
];

export function Notes() {
  const [purchasingId, setPurchasingId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePreviewNote, setActivePreviewNote] = useState<NoteItem | null>(null);
  const [downloadModalNote, setDownloadModalNote] = useState<NoteItem | null>(null);
  const [copiedGPay, setCopiedGPay] = useState<boolean>(false);

  const copyGPayNumber = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText("8168707120");
    setCopiedGPay(true);
    setTimeout(() => setCopiedGPay(false), 2500);
  };

  const categories = [
    "All",
    "Programming",
    "Office Productivity",
    "Computer Science",
    "Web & AI",
    "Science & Math"
  ];

  const filteredNotes = useMemo(() => {
    return comprehensiveNotes.filter((note) => {
      const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handlePurchase = (note: NoteItem) => {
    setPurchasingId(note.id);
    setTimeout(() => {
      setPurchasingId(null);
      setDownloadModalNote(note);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 pb-24 md:pb-16">
      <SEO 
        title="Download Premium Notes | Education Hub" 
        description="Download comprehensive handwritten and typed PDF notes for C, C++, Excel, Word, HTML, CSS, AI Tools, Logical Organization, Math and Science by Gunjan Gaur. GPay 8168707120." 
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold tracking-wide uppercase mb-2 sm:mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Curated Study Material
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0f2147] mb-2 sm:mb-4 tracking-tight">
            Course Notes & Study Material
          </h1>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            High-yield, easy-to-understand PDF notes prepared by <span className="font-semibold text-slate-800">Gunjan Gaur</span> to help you master concepts, excel in practicals, and score top marks in exams.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-3.5 sm:p-6 rounded-2xl shadow-xs border border-slate-200 mb-6 sm:mb-10">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes (e.g. C++, Excel, AI, K-Map)..."
                className="w-full pl-10 sm:pl-11 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs sm:text-sm bg-slate-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-200 w-5 h-5 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs font-medium text-slate-500 hidden md:block">
              Showing <span className="font-bold text-slate-800">{filteredNotes.length}</span> study guides
            </div>
          </div>

          {/* Filter Pills with Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-3 sm:pt-4 mt-2 border-t border-slate-100 no-scrollbar touch-pan-x">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#0f2147] text-white shadow-xs font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-slate-200">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">No notes found</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-4">No study guides matched "{searchQuery}". Try a different search term.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="text-indigo-600 font-semibold text-xs sm:text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col hover:-translate-y-1"
            >
              {/* Header Visual */}
              <div className={`h-40 ${note.coverColor} flex items-center justify-center p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent"></div>
                <FileText className={`w-20 h-20 ${note.iconColor} transform group-hover:scale-110 transition-transform duration-300 relative z-10`} />
                
                {/* Badge if available */}
                {note.badge && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-black shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {note.badge}
                  </div>
                )}

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
                  <span>{note.price}</span>
                  {note.originalPrice && (
                    <span className="text-xs line-through text-slate-400 font-normal">
                      {note.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    {note.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {note.pages} Pages
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {note.title}
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed">
                  {note.description}
                </p>

                {/* Topics Covered Tag Cloud */}
                <div className="mb-5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {note.topics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                  {note.topics.length > 3 && (
                    <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
                      +{note.topics.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Area */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                  {/* Topic Quiz Quick Access */}
                  <Link
                    to={`/quiz?topic=${encodeURIComponent(note.title)}&category=${encodeURIComponent(note.category)}`}
                    className="w-full inline-flex items-center justify-between gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-amber-50 text-amber-950 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-colors shadow-2xs group-hover:border-amber-400"
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Attempt Quiz (Real-Time Random Qs)</span>
                    </div>
                    <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-extrabold">
                      ₹1
                    </span>
                  </Link>

                  {/* Action Buttons: Chapters & Download PDF (Direct GPay Payment Modal) */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActivePreviewNote(note)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      Chapters
                    </button>

                    <button
                      onClick={() => handlePurchase(note)}
                      disabled={purchasingId === note.id}
                      className="inline-flex items-center justify-center gap-1.5 bg-[#0f2147] text-white py-2.5 px-3 rounded-xl text-xs font-black hover:bg-[#1a3673] transition-colors disabled:opacity-70 shadow-sm"
                    >
                      {purchasingId === note.id ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-amber-300" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Syllabus Preview Modal */}
      {activePreviewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  Table of Contents & Syllabus
                </span>
                <h3 className="text-xl font-bold">{activePreviewNote.title}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  {activePreviewNote.pages} Pages • Prepared by Gunjan Gaur
                </p>
              </div>
              <button
                onClick={() => setActivePreviewNote(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                💡 <span className="font-semibold">Author Note:</span> {activePreviewNote.sampleHighlight}
              </div>

              {/* Quiz link in chapters modal */}
              <Link
                to={`/quiz?topic=${encodeURIComponent(activePreviewNote.title)}&category=${encodeURIComponent(activePreviewNote.category)}`}
                onClick={() => setActivePreviewNote(null)}
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold text-xs flex items-center justify-between hover:bg-indigo-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  Practice Quiz for {activePreviewNote.title}
                </span>
                <span className="text-indigo-600 font-extrabold text-[11px]">Start ↗</span>
              </Link>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Chapters Included in this PDF:
                </h4>
                <ul className="space-y-2">
                  {activePreviewNote.chapters.map((chap, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{chap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer with GPay info */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[11px] text-slate-500 block">PDF Price • GPAY: <strong className="text-emerald-700 font-mono">8168707120</strong></span>
                <span className="text-lg font-black text-slate-900">{activePreviewNote.price}</span>
              </div>
              <button
                onClick={() => {
                  const n = activePreviewNote;
                  setActivePreviewNote(null);
                  handlePurchase(n);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f2147] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#1a3673] transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Proceed with GPay: 8168707120
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GPay Payment & Download Checkout Modal */}
      {downloadModalNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl text-center border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Top */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex flex-col items-center justify-center mx-auto mb-3 shadow-sm">
              <span className="text-[10px] font-bold text-emerald-800 leading-none">UPI</span>
              <span className="text-xl font-black leading-none mt-0.5">GPay</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-1">
              Google Pay (GPay) Checkout
            </h3>
            
            <p className="text-slate-600 text-xs sm:text-sm mb-4">
              Get full access to <span className="font-bold text-slate-900">{downloadModalNote.title}</span> ({downloadModalNote.pages} pages).
            </p>

            {/* Official GPay QR & Card Box */}
            <GPayQR
              amount={downloadModalNote.price}
              noteTitle={downloadModalNote.title}
              className="mb-4 shadow-sm"
            />

            {/* Buttons & WhatsApp Action */}
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/919017042682?text=${encodeURIComponent(
                  `Hello Gunjan Gaur Ma'am, I have made the GPay payment of ${downloadModalNote.price} to 8168707120 for "${downloadModalNote.title}". Please send me the complete PDF notes.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Send Payment Screenshot on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  // Trigger sample download simulation
                  const element = document.createElement("a");
                  const file = new Blob([
                    `EDUCATION HUB by Gunjan Gaur\n${downloadModalNote.title}\nTotal Pages: ${downloadModalNote.pages}\nPrice: ${downloadModalNote.price}\nOfficial GPay Number: 8168707120\nSupport WhatsApp: +91 9017042682\n\nChapters:\n` +
                    downloadModalNote.chapters.join("\n") +
                    `\n\nTo unlock the full 100+ pages PDF, pay via GPay to 8168707120 and send screenshot on WhatsApp: 9017042682.`
                  ], { type: 'text/plain' });
                  element.href = URL.createObjectURL(file);
                  element.download = `${downloadModalNote.title.replace(/\s+/g, "_")}_Syllabus_Sample.txt`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Download Sample / Syllabus Outline</span>
              </button>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  to={`/quiz?topic=${encodeURIComponent(downloadModalNote.title)}&category=${encodeURIComponent(downloadModalNote.category)}`}
                  onClick={() => setDownloadModalNote(null)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Attempt Quiz for this Topic ↗</span>
                </Link>

                <button
                  onClick={() => setDownloadModalNote(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-1 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

