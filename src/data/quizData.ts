/**
 * Comprehensive Subject-Wise Quiz Question Pool & Real-Time Randomization Engine
 * Curated for Education Hub by Gunjan Gaur
 */

export interface RawQuestion {
  id: number | string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export interface Question {
  id: number | string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export interface SubjectQuizCategory {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  color: string;
  iconBg: string;
  description: string;
  pool: RawQuestion[];
}

export const SUBJECT_QUIZ_CATEGORIES: SubjectQuizCategory[] = [
  {
    id: "c-programming",
    title: "C Programming Quiz",
    subtitle: "Pointers, Memory, Structures, Loops & Logic",
    category: "Programming",
    badge: "Core Subject",
    color: "from-blue-600 to-indigo-700",
    iconBg: "bg-blue-100 text-blue-700",
    description: "Deep dive into pointers, dynamic allocation, bitwise operations, and memory models.",
    pool: [
      {
        id: "c-1",
        question: "Which format specifier is used to print the memory address of a pointer in C?",
        options: ["%d", "%u", "%p", "%x"],
        correctAnswer: "%p",
        explanation: "%p is specifically designed in ANSI C to print pointer values (memory addresses) in hexadecimal notation.",
        difficulty: "Beginner"
      },
      {
        id: "c-2",
        question: "What does the 'malloc()' function return before typecasting?",
        options: ["int*", "char*", "void*", "float*"],
        correctAnswer: "void*",
        explanation: "malloc() allocates uninitialized memory block and returns a generic pointer of type 'void*' which can be cast into any pointer type.",
        difficulty: "Intermediate"
      },
      {
        id: "c-3",
        question: "Which operator is known as the indirection or dereference operator in C?",
        options: ["&", "*", "->", "."],
        correctAnswer: "*",
        explanation: "The asterisk (*) when used with an existing pointer variable accesses or modifies the value stored at that address.",
        difficulty: "Beginner"
      },
      {
        id: "c-4",
        question: "What is the standard size of an 'int' on modern 32-bit and 64-bit GCC/Clang compilers?",
        options: ["2 Bytes", "4 Bytes", "8 Bytes", "Depends on RAM clock"],
        correctAnswer: "4 Bytes",
        explanation: "On standard modern 32-bit and 64-bit systems using GCC or MSVC, standard 'int' is 4 bytes (32 bits).",
        difficulty: "Beginner"
      },
      {
        id: "c-5",
        question: "Which function deallocates memory previously reserved by malloc() or calloc()?",
        options: ["delete()", "free()", "dealloc()", "release()"],
        correctAnswer: "free()",
        explanation: "'free()' is defined in <stdlib.h> to return dynamically allocated heap memory back to the operating system.",
        difficulty: "Beginner"
      },
      {
        id: "c-6",
        question: "What will be the output of `sizeof(\"A\")` in C?",
        options: ["1", "2", "4", "Compiler Error"],
        correctAnswer: "2",
        explanation: "In C, string literals like \"A\" include the implicit terminating null character '\\0', making its total length 2 bytes.",
        difficulty: "Intermediate"
      },
      {
        id: "c-7",
        question: "Which keyword in C keeps a local variable's value persistent across multiple function calls?",
        options: ["extern", "auto", "register", "static"],
        correctAnswer: "static",
        explanation: "A 'static' local variable is allocated in the data segment rather than the call stack, preserving its value throughout program execution.",
        difficulty: "Intermediate"
      },
      {
        id: "c-8",
        question: "What is a 'dangling pointer' in C?",
        options: [
          "A pointer pointing to NULL",
          "A pointer pointing to a deallocated/freed memory location",
          "A pointer that has never been initialized",
          "A pointer to another pointer"
        ],
        correctAnswer: "A pointer pointing to a deallocated/freed memory location",
        explanation: "A dangling pointer points to memory that has been freed via free() or out of scope, which can cause undefined behavior if accessed.",
        difficulty: "Advanced"
      },
      {
        id: "c-9",
        question: "Which preprocessor directive is used to prevent multiple inclusions of header files?",
        options: ["#import", "#include", "#pragma once / #ifndef guard", "#define guard"],
        correctAnswer: "#pragma once / #ifndef guard",
        explanation: "Include guards using `#ifndef ... #define ... #endif` or `#pragma once` protect header files from redundant compilation.",
        difficulty: "Intermediate"
      },
      {
        id: "c-10",
        question: "What is the result of the bitwise operation `5 & 3`?",
        options: ["7", "1", "0", "8"],
        correctAnswer: "1",
        explanation: "In binary: 5 is 101, 3 is 011. Performing bitwise AND: 101 & 011 = 001, which is decimal 1.",
        difficulty: "Intermediate"
      },
      {
        id: "c-11",
        question: "What is the return value of `printf(\"Hello\")`?",
        options: ["0", "1", "5", "void"],
        correctAnswer: "5",
        explanation: "printf() returns the total number of characters successfully printed to standard output. 'Hello' has 5 characters.",
        difficulty: "Intermediate"
      },
      {
        id: "c-12",
        question: "Which of the following is NOT a valid storage class specifier in C?",
        options: ["volatile", "register", "extern", "static"],
        correctAnswer: "volatile",
        explanation: "'volatile' is a type qualifier (like 'const'), not a storage class specifier (which are auto, register, static, extern).",
        difficulty: "Advanced"
      },
      {
        id: "c-13",
        question: "How are multidimensional arrays stored in memory in C?",
        options: ["Column-major order", "Row-major order", "Hash tables", "Linked lists"],
        correctAnswer: "Row-major order",
        explanation: "C stores 2D and N-D arrays contiguously in row-major order: elements of the first row followed immediately by the second row.",
        difficulty: "Intermediate"
      },
      {
        id: "c-14",
        question: "What is the difference between `calloc(n, size)` and `malloc(n * size)`?",
        options: [
          "calloc initializes all allocated bytes to zero; malloc leaves memory uninitialized",
          "calloc is faster than malloc",
          "malloc is stored in stack; calloc in heap",
          "There is no difference"
        ],
        correctAnswer: "calloc initializes all allocated bytes to zero; malloc leaves memory uninitialized",
        explanation: "calloc() automatically zeros out the allocated block, whereas malloc() leaves garbage values in the allocated block.",
        difficulty: "Intermediate"
      },
      {
        id: "c-15",
        question: "What does the function `strcat(dest, src)` do?",
        options: [
          "Compares two strings",
          "Appends src string to the end of dest string",
          "Finds the length of dest",
          "Copies src to dest replacing old content"
        ],
        correctAnswer: "Appends src string to the end of dest string",
        explanation: "strcat() concatenates the null-terminated source string onto the end of the destination string buffer.",
        difficulty: "Beginner"
      }
    ]
  },
  {
    id: "cpp-oops",
    title: "C++ (OOPs) Quiz",
    subtitle: "Classes, Virtual Functions, Inheritance & STL",
    category: "Programming",
    badge: "Core Subject",
    color: "from-indigo-600 to-purple-700",
    iconBg: "bg-indigo-100 text-indigo-700",
    description: "Master Object-Oriented concepts, polymorphism, templates, standard template library, and modern C++.",
    pool: [
      {
        id: "cpp-1",
        question: "Which OOP concept enables the same function name to exhibit different behaviors based on calling context?",
        options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
        correctAnswer: "Polymorphism",
        explanation: "Polymorphism ('many forms') allows functions or operators to act differently depending on the types or objects passed.",
        difficulty: "Beginner"
      },
      {
        id: "cpp-2",
        question: "Which keyword is utilized in C++ to achieve runtime polymorphism (late binding)?",
        options: ["inline", "virtual", "friend", "template"],
        correctAnswer: "virtual",
        explanation: "Declaring member functions as 'virtual' tells the compiler to resolve method calls dynamically at runtime using a virtual table (vtable).",
        difficulty: "Intermediate"
      },
      {
        id: "cpp-3",
        question: "Can a constructor in C++ be declared as virtual?",
        options: [
          "Yes, constructors can be virtual",
          "No, constructors cannot be virtual",
          "Only in abstract base classes",
          "Only when default destructor is virtual"
        ],
        correctAnswer: "No, constructors cannot be virtual",
        explanation: "A constructor cannot be virtual because the vtable pointer (vptr) has not been constructed yet when the object is instantiated.",
        difficulty: "Intermediate"
      },
      {
        id: "cpp-4",
        question: "Which STL container guarantees elements remain strictly sorted in ascending order with unique keys?",
        options: ["std::vector", "std::list", "std::set", "std::stack"],
        correctAnswer: "std::set",
        explanation: "std::set uses a Self-Balancing Binary Search Tree (Red-Black tree) to maintain unique elements in sorted order with O(log n) lookups.",
        difficulty: "Intermediate"
      },
      {
        id: "cpp-5",
        question: "What is a class containing at least one pure virtual function (`= 0`) called?",
        options: ["Final Class", "Abstract Class", "Static Class", "Singleton Class"],
        correctAnswer: "Abstract Class",
        explanation: "A class with at least one pure virtual function is an Abstract Class and cannot be instantiated directly without derived implementations.",
        difficulty: "Beginner"
      },
      {
        id: "cpp-6",
        question: "Why should a base class destructor almost always be declared as `virtual`?",
        options: [
          "To allow multiple constructors",
          "To ensure the derived class destructor is invoked when deleting via a base pointer",
          "To increase allocation speed",
          "To make private members protected"
        ],
        correctAnswer: "To ensure the derived class destructor is invoked when deleting via a base pointer",
        explanation: "Without a virtual destructor, deleting a derived object through a base pointer causes undefined behavior and resource/memory leaks.",
        difficulty: "Advanced"
      },
      {
        id: "cpp-7",
        question: "Which access specifier in C++ allows derived classes to access members while keeping them private to external code?",
        options: ["public", "protected", "private", "friend"],
        correctAnswer: "protected",
        explanation: "'protected' members are accessible within the base class and any inheriting child classes, but inaccessible to outside callers.",
        difficulty: "Beginner"
      },
      {
        id: "cpp-8",
        question: "What is the time complexity of looking up an element in `std::unordered_map` on average?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(1)",
        explanation: "std::unordered_map is implemented using a hash table, offering constant average time complexity O(1) for searches.",
        difficulty: "Intermediate"
      },
      {
        id: "cpp-9",
        question: "Which operator CANNOT be overloaded in C++?",
        options: ["+", "==", ":: (scope resolution)", "[]"],
        correctAnswer: ":: (scope resolution)",
        explanation: "C++ forbids overloading the scope resolution operator (::), dot member operator (.), sizeof, and ternary conditional (?:).",
        difficulty: "Intermediate"
      },
      {
        id: "cpp-10",
        question: "What is RAII in modern C++ programming?",
        options: [
          "Runtime Automated Instruction Interface",
          "Resource Acquisition Is Initialization",
          "Recursive Algorithm Iteration Index",
          "Random Access Memory Allocation"
        ],
        correctAnswer: "Resource Acquisition Is Initialization",
        explanation: "RAII binds the lifecycle of resources (memory, file handles, locks) to object lifetime, ensuring automatic cleanup in destructors.",
        difficulty: "Advanced"
      },
      {
        id: "cpp-11",
        question: "What is the Diamond Problem in C++ inheritance and how is it resolved?",
        options: [
          "Ambiguous base class copies resolved by Virtual Inheritance",
          "Memory exhaustion resolved by smart pointers",
          "Template instantiation errors resolved by concepts",
          "Multiple constructors conflict resolved by namespaces"
        ],
        correctAnswer: "Ambiguous base class copies resolved by Virtual Inheritance",
        explanation: "When two derived classes inherit from one base and a fourth inherits both, `virtual inheritance` ensures only one instance of base exists.",
        difficulty: "Advanced"
      },
      {
        id: "cpp-12",
        question: "Which smart pointer in modern C++ maintains exclusive ownership and cannot be copied?",
        options: ["std::shared_ptr", "std::unique_ptr", "std::weak_ptr", "std::auto_ptr"],
        correctAnswer: "std::unique_ptr",
        explanation: "std::unique_ptr represents exclusive ownership; copy constructor is deleted and it can only be moved with std::move().",
        difficulty: "Intermediate"
      }
    ]
  },
  {
    id: "python-programming",
    title: "Python Programming Quiz",
    subtitle: "Data Structures, OOP, List Comprehensions & Libraries",
    category: "Programming",
    badge: "High Demand",
    color: "from-amber-500 to-emerald-600",
    iconBg: "bg-amber-100 text-amber-800",
    description: "Assess Python syntax, dictionaries, lambdas, slicing, decorators, and runtime paradigms.",
    pool: [
      {
        id: "py-1",
        question: "Which of the following built-in data types in Python is IMMUTABLE?",
        options: ["list", "dict", "tuple", "set"],
        correctAnswer: "tuple",
        explanation: "Tuples in Python cannot be modified (added, removed, or changed) once initialized; they are immutable sequences.",
        difficulty: "Beginner"
      },
      {
        id: "py-2",
        question: "What is the output of `[i**2 for i in range(4)]` in Python?",
        options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 1, 4, 9, 16]", "[0, 2, 4, 6]"],
        correctAnswer: "[0, 1, 4, 9]",
        explanation: "range(4) produces 0, 1, 2, 3. Squaring each yields 0, 1, 4, and 9.",
        difficulty: "Beginner"
      },
      {
        id: "py-3",
        question: "What keyword is used to create an anonymous one-line function in Python?",
        options: ["def", "func", "lambda", "inline"],
        correctAnswer: "lambda",
        explanation: "'lambda' expressions define small, anonymous inline functions such as `lambda x: x * 2`.",
        difficulty: "Beginner"
      },
      {
        id: "py-4",
        question: "What does the `pass` statement do in Python?",
        options: [
          "Skips the next line of code",
          "A null placeholder statement that does nothing",
          "Exits the loop immediately",
          "Returns true from a function"
        ],
        correctAnswer: "A null placeholder statement that does nothing",
        explanation: "'pass' acts as a syntactical placeholder when code is required syntactically but no execution is needed.",
        difficulty: "Beginner"
      },
      {
        id: "py-5",
        question: "What is the purpose of the `__init__` method in Python classes?",
        options: [
          "To destroy class instances",
          "To act as the class constructor initializing instance attributes",
          "To define private variables only",
          "To import external modules"
        ],
        correctAnswer: "To act as the class constructor initializing instance attributes",
        explanation: "`__init__` is the initialiser method called automatically when creating a new instance of a class.",
        difficulty: "Beginner"
      },
      {
        id: "py-6",
        question: "What does `*args` and `**kwargs` represent in Python function definitions?",
        options: [
          "Pointers and references",
          "Variable positional arguments and variable keyword arguments",
          "Integer multiplication and exponentiation",
          "Private and protected class variables"
        ],
        correctAnswer: "Variable positional arguments and variable keyword arguments",
        explanation: "*args collects excess positional arguments as a tuple, while **kwargs collects keyword arguments as a dictionary.",
        difficulty: "Intermediate"
      },
      {
        id: "py-7",
        question: "What will `print(\"Python\"[::-1])` output?",
        options: ["Python", "nohtyP", "P", "Error"],
        correctAnswer: "nohtyP",
        explanation: "String slicing with step -1 (`[::-1]`) reverses the sequence from end to beginning.",
        difficulty: "Beginner"
      },
      {
        id: "py-8",
        question: "What is a Python Generator and what keyword turns a function into one?",
        options: ["return", "yield", "generator", "produce"],
        correctAnswer: "yield",
        explanation: "A function containing `yield` produces a generator that yields values on demand, saving memory.",
        difficulty: "Intermediate"
      },
      {
        id: "py-9",
        question: "What is the GIL in standard CPython implementation?",
        options: [
          "Global Interpreter Lock allowing only one native thread to execute Python bytecode at once",
          "General Interface Library for GUIs",
          "Graphical Instruction Layout",
          "Garbage Item Locator"
        ],
        correctAnswer: "Global Interpreter Lock allowing only one native thread to execute Python bytecode at once",
        explanation: "The GIL (Global Interpreter Lock) synchronizes threads in CPython to prevent race conditions on memory references.",
        difficulty: "Advanced"
      },
      {
        id: "py-10",
        question: "Which collection in the `collections` module provides a FIFO queue with O(1) appends and pops on both ends?",
        options: ["deque", "Counter", "OrderedDict", "defaultdict"],
        correctAnswer: "deque",
        explanation: "`collections.deque` (double-ended queue) provides O(1) performance for insertions and deletions on both ends.",
        difficulty: "Intermediate"
      }
    ]
  },
  {
    id: "ms-excel",
    title: "MS Excel & Office Productivity Quiz",
    subtitle: "Formulas, Lookups, Pivot Tables, Shortcuts & Reports",
    category: "Office Productivity",
    badge: "Job Essential",
    color: "from-emerald-600 to-teal-700",
    iconBg: "bg-emerald-100 text-emerald-700",
    description: "Hands-on Excel mastery for accountants, office assistants, data analysts, and corporate jobs.",
    pool: [
      {
        id: "xl-1",
        question: "Which modern Excel function replaces both VLOOKUP and HLOOKUP with bidirectional search?",
        options: ["SEARCH()", "XLOOKUP()", "MATCHX()", "LOOKUP2D()"],
        correctAnswer: "XLOOKUP()",
        explanation: "XLOOKUP works both vertically and horizontally, defaults to exact match, and doesn't require left-to-right table restrictions.",
        difficulty: "Intermediate"
      },
      {
        id: "xl-2",
        question: "What is the shortcut key to toggle Absolute Cell Reference ($) in an Excel formula?",
        options: ["F2", "F4", "F8", "Ctrl + Shift + $"],
        correctAnswer: "F4",
        explanation: "Pressing F4 while editing a cell reference cycles between $A$1, A$1, $A1, and A1.",
        difficulty: "Beginner"
      },
      {
        id: "xl-3",
        question: "Which character MUST every formula or calculation in Microsoft Excel begin with?",
        options: ["#", "=", "@", ":"],
        correctAnswer: "=",
        explanation: "Every formula, arithmetic calculation, or function call in Excel must start with an equal sign (=).",
        difficulty: "Beginner"
      },
      {
        id: "xl-4",
        question: "Which tool in Excel allows you to summarize and slice thousands of data rows without writing code?",
        options: ["Pivot Table", "Mail Merge", "Macro Recorder", "Format Painter"],
        correctAnswer: "Pivot Table",
        explanation: "Pivot Tables allow interactive cross-tabulation, aggregation (sum, count, avg), grouping, and filtering in seconds.",
        difficulty: "Beginner"
      },
      {
        id: "xl-5",
        question: "Which function counts cells based on multiple criteria in Excel?",
        options: ["COUNT()", "COUNTA()", "COUNTIF()", "COUNTIFS()"],
        correctAnswer: "COUNTIFS()",
        explanation: "COUNTIFS() evaluates multiple ranges and conditions, counting rows where all criteria match.",
        difficulty: "Beginner"
      },
      {
        id: "xl-6",
        question: "What error appears in Excel when a formula attempts to divide a number by zero?",
        options: ["#VALUE!", "#REF!", "#DIV/0!", "#NAME?"],
        correctAnswer: "#DIV/0!",
        explanation: "#DIV/0! explicitly indicates mathematical division by zero or an empty cell treated as zero.",
        difficulty: "Beginner"
      },
      {
        id: "xl-7",
        question: "Which shortcut automatically calculates and inserts the AutoSum formula for a selected column?",
        options: ["Ctrl + S", "Alt + =", "Shift + F3", "Ctrl + Shift + A"],
        correctAnswer: "Alt + =",
        explanation: "Pressing 'Alt + =' instantly writes `=SUM(...)` across the adjacent contiguous numbers.",
        difficulty: "Beginner"
      },
      {
        id: "xl-8",
        question: "What does the error `#REF!` mean in an Excel formula?",
        options: [
          "Formula contains misspelled function name",
          "Cell reference is invalid, often because referenced cells were deleted",
          "Number format is too wide for cell",
          "Division by zero error"
        ],
        correctAnswer: "Cell reference is invalid, often because referenced cells were deleted",
        explanation: "#REF! occurs when a referenced cell or worksheet range has been deleted or moved.",
        difficulty: "Beginner"
      },
      {
        id: "xl-9",
        question: "Which feature changes the background or font color of a cell based on rules (e.g. scores > 90)?",
        options: ["Conditional Formatting", "Style Manager", "Data Validation", "Goal Seek"],
        correctAnswer: "Conditional Formatting",
        explanation: "Conditional Formatting dynamically highlights cells with colors, data bars, or icons matching user criteria.",
        difficulty: "Beginner"
      },
      {
        id: "xl-10",
        question: "What feature in Excel restricts users to entering values only from a drop-down list?",
        options: ["Freeze Panes", "Data Validation", "Protect Sheet", "Solver"],
        correctAnswer: "Data Validation",
        explanation: "Data Validation (List criteria) creates structured drop-down picklists and prevents invalid data entry.",
        difficulty: "Beginner"
      },
      {
        id: "xl-11",
        question: "Which function combines text strings from different cells separated by a delimiter (e.g., commas)?",
        options: ["CONCATENATE()", "TEXTJOIN()", "SPLIT()", "JOINCELLS()"],
        correctAnswer: "TEXTJOIN()",
        explanation: "TEXTJOIN(delimiter, ignore_empty, text1, ...) effortlessly merges multiple text ranges with custom separators.",
        difficulty: "Intermediate"
      },
      {
        id: "xl-12",
        question: "What is the shortcut to flash fill patterns down a column in Excel?",
        options: ["Ctrl + E", "Ctrl + D", "Ctrl + R", "Ctrl + F"],
        correctAnswer: "Ctrl + E",
        explanation: "Ctrl + E triggers Excel's AI-based Flash Fill to automatically complete patterns (like extracting first names).",
        difficulty: "Intermediate"
      }
    ]
  },
  {
    id: "html-css",
    title: "HTML5 & CSS3 Web Design Quiz",
    subtitle: "Flexbox, Grid, Box Model, Responsive & Semantic Tags",
    category: "Web & AI",
    badge: "Practical",
    color: "from-orange-500 to-amber-600",
    iconBg: "bg-orange-100 text-orange-700",
    description: "Modern responsive web development skills, layouts, CSS variables, and clean markup.",
    pool: [
      {
        id: "web-1",
        question: "Which HTML5 semantic element is intended for independent self-contained syndicatable content?",
        options: ["<section>", "<article>", "<aside>", "<main>"],
        correctAnswer: "<article>",
        explanation: "<article> designates standalone content suitable for news feeds, blog entries, or forum comments.",
        difficulty: "Beginner"
      },
      {
        id: "web-2",
        question: "In CSS Flexbox, which property aligns items along the MAIN axis?",
        options: ["align-items", "justify-content", "align-content", "flex-wrap"],
        correctAnswer: "justify-content",
        explanation: "'justify-content' aligns items along the main axis, while 'align-items' governs cross-axis alignment.",
        difficulty: "Beginner"
      },
      {
        id: "web-3",
        question: "What constitutes the CSS Box Model from inside to outside?",
        options: [
          "Content -> Padding -> Border -> Margin",
          "Content -> Margin -> Border -> Padding",
          "Margin -> Border -> Padding -> Content",
          "Border -> Content -> Padding -> Margin"
        ],
        correctAnswer: "Content -> Padding -> Border -> Margin",
        explanation: "The CSS box model layers from innermost to outermost: Content, Padding, Border, and Margin.",
        difficulty: "Beginner"
      },
      {
        id: "web-4",
        question: "Which CSS unit scales relative to the font-size of the ROOT (`<html>`) element?",
        options: ["em", "rem", "vh", "%"],
        correctAnswer: "rem",
        explanation: "'rem' means 'Root EM', and directly multiplies against the root element's font-size (usually 16px).",
        difficulty: "Beginner"
      },
      {
        id: "web-5",
        question: "Which CSS property enables responsive grid tracks using flexible fractional units like '1fr 2fr'?",
        options: ["display: flex", "display: grid", "display: inline-block", "display: table"],
        correctAnswer: "display: grid",
        explanation: "CSS Grid allows powerful 2D multi-track column/row layouts with fractional 'fr' units.",
        difficulty: "Beginner"
      },
      {
        id: "web-6",
        question: "What does the `z-index` property control in CSS?",
        options: [
          "Text zoom size",
          "The stacking order of positioned elements along the 3D Z-axis",
          "Image compression ratio",
          "Border radius curvature"
        ],
        correctAnswer: "The stacking order of positioned elements along the 3D Z-axis",
        explanation: "z-index specifies which overlapping elements appear in front or behind on positioned elements.",
        difficulty: "Beginner"
      },
      {
        id: "web-7",
        question: "Which HTML attribute specifies an alternative text for an image if it fails to load or for screen readers?",
        options: ["title", "src", "alt", "href"],
        correctAnswer: "alt",
        explanation: "The 'alt' attribute ensures accessibility compliance and fallback text when media fails to display.",
        difficulty: "Beginner"
      },
      {
        id: "web-8",
        question: "How do you apply styles only to mobile screens with a max width of 768px in CSS?",
        options: [
          "@media (max-width: 768px) { ... }",
          "@screen mobile: 768px { ... }",
          "@responsive 768px { ... }",
          "@viewport <= 768px { ... }"
        ],
        correctAnswer: "@media (max-width: 768px) { ... }",
        explanation: "CSS media queries using `@media (max-width: 768px)` apply conditional stylesheets to smaller viewports.",
        difficulty: "Beginner"
      },
      {
        id: "web-9",
        question: "What does `box-sizing: border-box` do in CSS?",
        options: [
          "Adds a double black border around the box",
          "Includes padding and border within the element's total declared width and height",
          "Forces margin to zero",
          "Rounds all four corners"
        ],
        correctAnswer: "Includes padding and border within the element's total declared width and height",
        explanation: "'border-box' prevents widths from growing when padding or borders are added, greatly simplifying calculations.",
        difficulty: "Intermediate"
      },
      {
        id: "web-10",
        question: "Which pseudo-class applies styling when a user places their mouse pointer over an element?",
        options: [":focus", ":active", ":hover", ":visited"],
        correctAnswer: ":hover",
        explanation: "`:hover` matches interactive elements when the user designates them with a pointing device.",
        difficulty: "Beginner"
      }
    ]
  },
  {
    id: "loc-digital",
    title: "Logical Organization & Digital Electronics Quiz",
    subtitle: "Logic Gates, Boolean Algebra, K-Maps, Counters & Flip-Flops",
    category: "Computer Science",
    badge: "Exam Favorite",
    color: "from-purple-600 to-pink-700",
    iconBg: "bg-purple-100 text-purple-700",
    description: "Hardware architecture, boolean theorems, combinational logic, and sequential memory elements.",
    pool: [
      {
        id: "loc-1",
        question: "Which of the following gate pairs are universally recognized as 'Universal Gates'?",
        options: ["AND & OR", "NAND & NOR", "XOR & XNOR", "NOT & BUFFER"],
        correctAnswer: "NAND & NOR",
        explanation: "NAND and NOR can synthesize any boolean logic circuit or basic logic gate without other gate types.",
        difficulty: "Beginner"
      },
      {
        id: "loc-2",
        question: "According to De Morgan's Law, what is `(A + B)'` algebraically equal to?",
        options: ["A' + B'", "A' . B'", "A . B", "(A . B)'"],
        correctAnswer: "A' . B'",
        explanation: "De Morgan's first theorem states: The complement of a logical sum is the product of individual complements: (A + B)' = A' . B'.",
        difficulty: "Beginner"
      },
      {
        id: "loc-3",
        question: "How many cells are present in a 4-variable Karnaugh Map (K-Map)?",
        options: ["8", "16", "32", "64"],
        correctAnswer: "16",
        explanation: "A K-Map for n variables has 2^n cells. For 4 variables (A, B, C, D), 2^4 = 16 cells.",
        difficulty: "Beginner"
      },
      {
        id: "loc-4",
        question: "What is the primary operational distinction between combinational and sequential logic circuits?",
        options: [
          "Combinational uses gates; sequential uses capacitors",
          "Sequential circuits contain memory feedback; combinational circuits depend solely on present inputs",
          "Combinational circuits require crystal clocks; sequential do not",
          "There is no architectural difference"
        ],
        correctAnswer: "Sequential circuits contain memory feedback; combinational circuits depend solely on present inputs",
        explanation: "Sequential circuits retain state memory (past inputs via flip-flops), while combinational outputs strictly reflect immediate inputs.",
        difficulty: "Intermediate"
      },
      {
        id: "loc-5",
        question: "What is the forbidden / invalid condition in an active-high SR Flip-Flop?",
        options: ["S = 0, R = 0", "S = 1, R = 0", "S = 0, R = 1", "S = 1, R = 1"],
        correctAnswer: "S = 1, R = 1",
        explanation: "When both Set (S) and Reset (R) are active 1, both Q and Q' simultaneously strive to be 0, creating a race condition.",
        difficulty: "Intermediate"
      },
      {
        id: "loc-6",
        question: "What is the 2's complement of the binary number `1010`?",
        options: ["0101", "0110", "1100", "0011"],
        correctAnswer: "0110",
        explanation: "1's complement of 1010 is 0101. Adding 1: 0101 + 1 = 0110.",
        difficulty: "Intermediate"
      },
      {
        id: "loc-7",
        question: "Which flip-flop eliminates the invalid state of the SR flip-flop by toggling when both inputs are 1?",
        options: ["D Flip-Flop", "T Flip-Flop", "JK Flip-Flop", "Master-Slave RS"],
        correctAnswer: "JK Flip-Flop",
        explanation: "The JK flip-flop toggles its output state when J = 1 and K = 1, avoiding the undefined race condition.",
        difficulty: "Intermediate"
      },
      {
        id: "loc-8",
        question: "What is the hexadecimal equivalent of binary `11111111`?",
        options: ["FF", "FE", "100", "255"],
        correctAnswer: "FF",
        explanation: "Binary 1111 is hex F, so 1111 1111 equals hexadecimal FF (decimal 255).",
        difficulty: "Beginner"
      },
      {
        id: "loc-9",
        question: "Which combinational circuit selects binary data from one of 2^n input lines and directs it to a single output line?",
        options: ["Decoder", "Multiplexer (MUX)", "Demultiplexer", "Encoder"],
        correctAnswer: "Multiplexer (MUX)",
        explanation: "A Multiplexer acts as a data selector funneling one of many input signals to a single common output.",
        difficulty: "Intermediate"
      },
      {
        id: "loc-10",
        question: "In Boolean algebra, what is `A + A'` equal to?",
        options: ["0", "1", "A", "2A"],
        correctAnswer: "1",
        explanation: "The law of complementation states that a boolean variable ORed with its complement is always 1.",
        difficulty: "Beginner"
      }
    ]
  },
  {
    id: "computer-basics",
    title: "Computer Fundamentals & IT Quiz",
    subtitle: "Hardware, Memory, Operating Systems, Networking & Security",
    category: "Office Productivity",
    badge: "Foundations",
    color: "from-teal-600 to-cyan-700",
    iconBg: "bg-teal-100 text-teal-700",
    description: "Core computer literacy, storage architectures, networking protocols, and essential IT concepts.",
    pool: [
      {
        id: "cb-1",
        question: "Which computer memory is volatile and loses all stored data when electricity is shut off?",
        options: ["ROM", "Hard Disk Drive (HDD)", "RAM (Random Access Memory)", "Solid State Drive"],
        correctAnswer: "RAM (Random Access Memory)",
        explanation: "RAM stores active programs and variables dynamically, losing its data immediately when power is lost.",
        difficulty: "Beginner"
      },
      {
        id: "cb-2",
        question: "What component is referred to as the 'Brain' of the computer, executing calculations and instructions?",
        options: ["RAM", "Motherboard", "Central Processing Unit (CPU)", "Power Supply Unit"],
        correctAnswer: "Central Processing Unit (CPU)",
        explanation: "The CPU performs arithmetic, logical comparisons, control flow, and input/output dispatching.",
        difficulty: "Beginner"
      },
      {
        id: "cb-3",
        question: "Which Windows shortcut key opens the Task Manager directly in one keystroke?",
        options: ["Ctrl + Alt + Del", "Ctrl + Shift + Esc", "Win + R", "Alt + F4"],
        correctAnswer: "Ctrl + Shift + Esc",
        explanation: "Ctrl + Shift + Esc directly opens the Windows Task Manager bypassing intermediate lock menus.",
        difficulty: "Beginner"
      },
      {
        id: "cb-4",
        question: "In binary computing, 1 Gigabyte (GB) equals how many Megabytes (MB)?",
        options: ["1000 MB", "1024 MB", "512 MB", "2048 MB"],
        correctAnswer: "1024 MB",
        explanation: "In base-2 binary computing, 1 GB = 2^10 MB = 1024 Megabytes.",
        difficulty: "Beginner"
      },
      {
        id: "cb-5",
        question: "What is a phishing attack in cybersecurity?",
        options: [
          "Overheating a CPU with excessive mining scripts",
          "Deceiving victims into revealing passwords or OTPs via deceptive emails/links",
          "A hardware fault on Ethernet cables",
          "Scanning for virus signatures"
        ],
        correctAnswer: "Deceiving victims into revealing passwords or OTPs via deceptive emails/links",
        explanation: "Phishing impersonates legitimate services (banks, emails) to trick unsuspecting users into divulging secrets.",
        difficulty: "Beginner"
      },
      {
        id: "cb-6",
        question: "What protocol resolves domain names like 'google.com' into IP addresses?",
        options: ["HTTP", "DNS (Domain Name System)", "FTP", "DHCP"],
        correctAnswer: "DNS (Domain Name System)",
        explanation: "DNS translates human-friendly domain names into machine-routable numerical IP addresses.",
        difficulty: "Beginner"
      },
      {
        id: "cb-7",
        question: "What does SSD stand for in modern PC storage?",
        options: [
          "Solid State Drive",
          "Serial Storage Disk",
          "System Software Device",
          "Synchronous Speed Drive"
        ],
        correctAnswer: "Solid State Drive",
        explanation: "SSDs use flash memory with no moving mechanical parts, offering vastly superior read/write speeds over HDDs.",
        difficulty: "Beginner"
      },
      {
        id: "cb-8",
        question: "Which layer of the OSI model does an IP address operate on?",
        options: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"],
        correctAnswer: "Network Layer",
        explanation: "The Network Layer (Layer 3) handles packet routing, logical addressing (IPv4/IPv6), and path determination.",
        difficulty: "Intermediate"
      },
      {
        id: "cb-9",
        question: "What is the primary function of BIOS / UEFI stored in computer ROM?",
        options: [
          "Running web browsers",
          "Performing Power-On Self-Test (POST) and booting the Operating System",
          "Defragmenting hard disks",
          "Scanning for computer viruses"
        ],
        correctAnswer: "Performing Power-On Self-Test (POST) and booting the Operating System",
        explanation: "BIOS/UEFI initiates hardware checks (POST) and loads the OS bootloader into RAM on startup.",
        difficulty: "Intermediate"
      },
      {
        id: "cb-10",
        question: "What does GUI stand for in operating systems?",
        options: [
          "General User Interface",
          "Graphical User Interface",
          "Global Unified Integration",
          "Grouped User Interaction"
        ],
        correctAnswer: "Graphical User Interface",
        explanation: "GUI allows users to interact with electronic devices through visual icons, windows, and graphical indicators.",
        difficulty: "Beginner"
      }
    ]
  },
  {
    id: "ai-tools",
    title: "AI Tools & Modern Tech Quiz",
    subtitle: "Prompt Engineering, LLMs, ChatGPT, Agents & Safety",
    category: "Web & AI",
    badge: "Trending",
    color: "from-violet-600 to-indigo-800",
    iconBg: "bg-violet-100 text-violet-700",
    description: "Modern artificial intelligence literacy, prompting strategies, and generative models.",
    pool: [
      {
        id: "ai-1",
        question: "In prompt engineering, what does 'Few-Shot Prompting' entail?",
        options: [
          "Asking questions in under 5 words",
          "Providing 2-5 demonstration input-output examples to guide model style and format",
          "Querying multiple models in parallel",
          "Limiting AI execution to single-thread"
        ],
        correctAnswer: "Providing 2-5 demonstration input-output examples to guide model style and format",
        explanation: "Few-shot prompting gives example demonstrations before asking the new question, boosting accuracy.",
        difficulty: "Intermediate"
      },
      {
        id: "ai-2",
        question: "What does 'Hallucination' refer to in generative AI and LLMs?",
        options: [
          "The AI rendering vivid 3D shapes",
          "The model confidently asserting factually incorrect or fabricated statements",
          "The CPU running at high temperatures",
          "The API response taking too long"
        ],
        correctAnswer: "The model confidently asserting factually incorrect or fabricated statements",
        explanation: "Hallucinations occur when an LLM produces plausible-sounding yet untrue facts with high linguistic fluency.",
        difficulty: "Beginner"
      },
      {
        id: "ai-3",
        question: "What does 'LLM' stand for in contemporary AI technologies?",
        options: [
          "Logical Learning Machine",
          "Large Language Model",
          "Linear Logic Matrix",
          "Layered Learning Mechanism"
        ],
        correctAnswer: "Large Language Model",
        explanation: "LLM stands for Large Language Model, trained on billions of parameters to understand and generate human text.",
        difficulty: "Beginner"
      },
      {
        id: "ai-4",
        question: "Which component of a prompt instructs the AI on who to embody (e.g. 'Act as a Senior C Tutor')?",
        options: ["Constraint", "Role / Persona", "Temperature", "Grounding"],
        correctAnswer: "Role / Persona",
        explanation: "Assigning a Persona focuses vocabulary, depth, perspective, and domain expertise in the output.",
        difficulty: "Beginner"
      },
      {
        id: "ai-5",
        question: "What parameter in generative models controls the randomness or creativity of the generated output?",
        options: ["Batch Size", "Temperature", "Epochs", "Learning Rate"],
        correctAnswer: "Temperature",
        explanation: "Higher temperature (e.g. 0.9) increases output diversity/creativity; lower temperature (0.1) produces deterministic output.",
        difficulty: "Intermediate"
      },
      {
        id: "ai-6",
        question: "What is 'Chain-of-Thought' (CoT) prompting?",
        options: [
          "Linking multiple computers with Ethernet",
          "Encouraging the AI model to write out intermediate reasoning steps before delivering the final answer",
          "Writing code without comments",
          "Streaming output letter-by-letter"
        ],
        correctAnswer: "Encouraging the AI model to write out intermediate reasoning steps before delivering the final answer",
        explanation: "Chain-of-thought prompting forces the model to articulate logic sequentially, drastically cutting reasoning errors.",
        difficulty: "Intermediate"
      },
      {
        id: "ai-7",
        question: "What is 'RAG' (Retrieval-Augmented Generation) in modern AI applications?",
        options: [
          "Random Audio Generation",
          "Fetching external verified documents/data to feed into the prompt context for accurate answers",
          "Redundant Array of Graphics",
          "Reinforcement Agent Gate"
        ],
        correctAnswer: "Fetching external verified documents/data to feed into the prompt context for accurate answers",
        explanation: "RAG grounds LLM outputs in verified real-world knowledge from custom databases or documents.",
        difficulty: "Advanced"
      }
    ]
  },
  {
    id: "stem-math-science",
    title: "Mathematics & Science Quiz",
    subtitle: "Matrices, Physics Electricity, Chemistry pH & Calculus",
    category: "Science & Math",
    badge: "Board & Exam",
    color: "from-rose-600 to-pink-700",
    iconBg: "bg-rose-100 text-rose-700",
    description: "STEM foundations taught by Gunjan Gaur for competitive entrance and university exams.",
    pool: [
      {
        id: "stem-1",
        question: "What is the determinant of an identity matrix (I) of any dimension?",
        options: ["0", "1", "-1", "Equal to dimension n"],
        correctAnswer: "1",
        explanation: "The determinant of any Identity Matrix is always 1 because diagonal product is 1 and all other elements are 0.",
        difficulty: "Beginner"
      },
      {
        id: "stem-2",
        question: "According to Ohm's Law, what is the exact relationship between Voltage (V), Current (I), and Resistance (R)?",
        options: ["V = I / R", "V = I * R", "I = V * R", "R = V * I"],
        correctAnswer: "V = I * R",
        explanation: "Ohm's law states that potential difference V is directly proportional to current I, yielding V = I * R.",
        difficulty: "Beginner"
      },
      {
        id: "stem-3",
        question: "What is the pH value of pure neutral water at 25°C?",
        options: ["0", "14", "7", "5.5"],
        correctAnswer: "7",
        explanation: "Pure water has equal H+ and OH- ion concentrations at standard 25°C, corresponding to a neutral pH of 7.",
        difficulty: "Beginner"
      },
      {
        id: "stem-4",
        question: "Which law states that 'To every action, there is an equal and opposite reaction'?",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Law of Universal Gravitation"
        ],
        correctAnswer: "Newton's Third Law",
        explanation: "Newton's Third Law governs forces between interacting objects: forces always occur in matched opposite pairs.",
        difficulty: "Beginner"
      },
      {
        id: "stem-5",
        question: "If a set S has 4 elements, how many subsets does its Power Set P(S) contain?",
        options: ["8", "12", "16", "24"],
        correctAnswer: "16",
        explanation: "The cardinality of the power set for n elements is 2^n. For n = 4: 2^4 = 16 distinct subsets.",
        difficulty: "Beginner"
      },
      {
        id: "stem-6",
        question: "What is the derivative of `sin(x)` with respect to x?",
        options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
        correctAnswer: "cos(x)",
        explanation: "The standard fundamental derivative d/dx[sin(x)] = cos(x).",
        difficulty: "Beginner"
      },
      {
        id: "stem-7",
        question: "What is the speed of light in vacuum approximately?",
        options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^10 m/s", "340 m/s"],
        correctAnswer: "3 x 10^8 m/s",
        explanation: "Light travels in vacuum at approximately 299,792,458 meters per second (~3 x 10^8 m/s).",
        difficulty: "Beginner"
      },
      {
        id: "stem-8",
        question: "Which gas is primarily liberated when dilute hydrochloric acid (HCl) reacts with zinc granules?",
        options: ["Oxygen (O2)", "Hydrogen (H2)", "Chlorine (Cl2)", "Carbon dioxide (CO2)"],
        correctAnswer: "Hydrogen (H2)",
        explanation: "Zn + 2HCl -> ZnCl2 + H2. Active metals react with acids to evolve Hydrogen gas.",
        difficulty: "Beginner"
      }
    ]
  },
  {
    id: "tally-accounting",
    title: "Tally Prime & Accounting Quiz",
    subtitle: "Ledgers, Vouchers, GST, Debit/Credit & Balance Sheet",
    category: "Office Productivity",
    badge: "Commerce & Job",
    color: "from-amber-600 to-yellow-700",
    iconBg: "bg-amber-100 text-amber-700",
    description: "Financial accounting standards, golden rules, Tally shortcut keys, and GST entries.",
    pool: [
      {
        id: "tal-1",
        question: "According to the Golden Rules of Accounting, what is the rule for Real Accounts?",
        options: [
          "Debit the receiver, Credit the giver",
          "Debit what comes in, Credit what goes out",
          "Debit all expenses, Credit all incomes",
          "Debit liability, Credit asset"
        ],
        correctAnswer: "Debit what comes in, Credit what goes out",
        explanation: "For Real Accounts (tangible assets like cash, machinery, furniture): Debit what comes in, Credit what goes out.",
        difficulty: "Beginner"
      },
      {
        id: "tal-2",
        question: "Which shortcut key in Tally is used to record a Contra Voucher (Cash/Bank transfers)?",
        options: ["F4", "F5", "F6", "F7"],
        correctAnswer: "F4",
        explanation: "F4 opens the Contra voucher, used exclusively for internal fund movements between Cash and Bank accounts.",
        difficulty: "Beginner"
      },
      {
        id: "tal-3",
        question: "Which shortcut key in Tally is used to record a Payment Voucher?",
        options: ["F4", "F5", "F6", "F8"],
        correctAnswer: "F5",
        explanation: "F5 in Tally opens Payment Voucher for recording all cash or bank expenditures.",
        difficulty: "Beginner"
      },
      {
        id: "tal-4",
        question: "Which shortcut key in Tally is used to record a Receipt Voucher?",
        options: ["F5", "F6", "F7", "F9"],
        correctAnswer: "F6",
        explanation: "F6 in Tally brings up the Receipt voucher for money received via cash or bank.",
        difficulty: "Beginner"
      },
      {
        id: "tal-5",
        question: "What type of voucher is recorded using shortcut key F8 in Tally?",
        options: ["Sales Voucher", "Purchase Voucher", "Journal Voucher", "Contra Voucher"],
        correctAnswer: "Sales Voucher",
        explanation: "F8 brings up the Sales voucher for billing and credit/cash sales transactions.",
        difficulty: "Beginner"
      },
      {
        id: "tal-6",
        question: "Under which group should 'Rent Paid' ledger be created in Tally?",
        options: ["Direct Expenses", "Indirect Expenses", "Current Liabilities", "Indirect Incomes"],
        correctAnswer: "Indirect Expenses",
        explanation: "Administrative and operational overheads like office rent, electricity, and salaries fall under 'Indirect Expenses'.",
        difficulty: "Beginner"
      },
      {
        id: "tal-7",
        question: "What does GST stand for in Indian taxation?",
        options: [
          "General Sales Tariff",
          "Goods and Services Tax",
          "Government Revenue System",
          "Gross Sales Total"
        ],
        correctAnswer: "Goods and Services Tax",
        explanation: "GST stands for Goods and Services Tax, a comprehensive multi-stage destination-based indirect tax.",
        difficulty: "Beginner"
      },
      {
        id: "tal-8",
        question: "In an intra-state transaction (within same state), which two GST components are levied equally?",
        options: ["IGST only", "CGST and SGST", "UTGST and IGST", "TDS and TCS"],
        correctAnswer: "CGST and SGST",
        explanation: "Within the same state, tax is split 50/50 between Central GST (CGST) and State GST (SGST).",
        difficulty: "Intermediate"
      }
    ]
  }
];

/**
 * Modern Fisher-Yates shuffle array algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Real-time question generator for a subject:
 * Picks randomized questions from the subject pool,
 * shuffles the questions order in real-time,
 * and shuffles the options inside each question while properly re-mapping the correct index.
 */
export function getRandomizedQuestionsForSubject(
  subjectId: string, 
  count = 10,
  randomizeOptions = true
): Question[] {
  const subject = SUBJECT_QUIZ_CATEGORIES.find(s => s.id === subjectId);
  if (!subject || !subject.pool || subject.pool.length === 0) {
    return [];
  }

  // Shuffle entire pool for this subject
  const shuffledPool = shuffleArray(subject.pool);
  
  // Pick subset (min of requested count or pool length)
  const selectedSubset = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

  // Convert raw questions into Question format with randomized options
  return selectedSubset.map((rawQ, index) => {
    let options = [...rawQ.options];
    if (randomizeOptions) {
      options = shuffleArray(options);
    }
    const correctIndex = options.indexOf(rawQ.correctAnswer);

    return {
      id: `${rawQ.id}-${Date.now()}-${index}`,
      question: rawQ.question,
      options,
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
      explanation: rawQ.explanation,
      difficulty: rawQ.difficulty
    };
  });
}
