import React from "react";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import cProgrammingImg from "./assets/images/c_programming_1781763456792.jpg";
import cppProgrammingImg from "./assets/images/cpp_programming_1781763474090.jpg";
import mathematicsImg from "./assets/images/mathematics_1781763486454.jpg";
import digitalMarketingImg from "./assets/images/digital_marketing_1781763499123.jpg";
import webDevelopmentImg from "./assets/images/web_development_1781763513779.jpg";
import computerBasicsImg from "./assets/images/computer_basics_1781763530033.jpg";
import youtubeCourseImg from "./assets/images/youtube_course_image_1781764178786.jpg";
import socialMediaCourseImg from "./assets/images/social_media_course_image_1781764195156.jpg";

export type CourseModule = {
  name: string;
  videoLink?: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  duration?: string;
  videoLink?: string;
  modules: CourseModule[];
};

export const COURSES: Course[] = [
  {
    id: "digital-electronics",
    title: "1. Logical Organization/Digital Electronics",
    description: "Learn about logic gates, boolean algebra, circuits and digital systems.",
    icon: BookOpen,
    image: mathematicsImg,
    duration: "6 Weeks",
    videoLink: "https://www.youtube.com/watch?v=eG7y1Bj7kHA&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU",
    modules: [
      { name: "Number System", videoLink: "https://www.youtube.com/watch?v=eG7y1Bj7kHA&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU" },
      { name: "Conversions (Decimal to Another Base)", videoLink: "https://www.youtube.com/watch?v=d1BzpKg4qO4&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=2" },
      { name: "Conversions (Any base to Decimal)", videoLink: "https://www.youtube.com/watch?v=jgWHt6Q6vIs&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=4" },
      { name: "Conversions (Octal to Hexadecimal)", videoLink: "https://www.youtube.com/watch?v=BvbpHpcOkaw&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=3" },
      { name: "Binary Arithmetic", videoLink: "https://www.youtube.com/watch?v=CSDOuImPdNM&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=5" },
      { name: "1s and 2s Complements (Part -1)", videoLink: "https://www.youtube.com/watch?v=ezHoH1vukMM&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=7" },
      { name: "Subtraction Using 1's and 2's Complements", videoLink: "https://www.youtube.com/watch?v=d8aVQRX_QR4&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=12" },
      { name: "Weighted Codes", videoLink: "https://www.youtube.com/watch?v=rJ7CuTJRGlE&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=13" },
      { name: "BCD Codes", videoLink: "https://www.youtube.com/watch?v=N5zRPkmgD14&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=15" },
      { name: "Decoder", videoLink: "https://www.youtube.com/watch?v=l6Q60LUC27o&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=17" },
      { name: "3-8 Decoder", videoLink: "https://www.youtube.com/watch?v=Q3Zk0RjR3ak&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=41" },
      { name: "Encoder", videoLink: "https://www.youtube.com/watch?v=goOMgFQVXu0&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=45" },
      { name: "Logic Gates", videoLink: "https://www.youtube.com/watch?v=z_-rwLbCCzw&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=46" },
      { name: "Universal and Special Gates", videoLink: "https://www.youtube.com/watch?v=CMFv2L71S5A&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=58" },
      { name: "Nand and Nor Gate as universal Gates", videoLink: "https://www.youtube.com/watch?v=sWSfkOWdg2M&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=59" },
      { name: "Boolean Algebra (Logical Operation)", videoLink: "https://www.youtube.com/watch?v=-VBfWdht6zc&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=20" },
      { name: "Boolean Algebra Questions", videoLink: "https://www.youtube.com/watch?v=_EF68Wznqz0&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=52" },
      { name: "Solve Boolean Expression Using Boolean Algebra Rules", videoLink: "https://www.youtube.com/watch?v=mVNxWINCeBE&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=54" },
      { name: "K-Maps full Explanation", videoLink: "https://www.youtube.com/watch?v=tiuYFG37Klg&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=62" },
      { name: "K-Maps rules for simplification", videoLink: "https://www.youtube.com/watch?v=VdJqMTrn9sU&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=63" },
      { name: "Boolean Functions Representation (Minterms/Maxterms)", videoLink: "https://www.youtube.com/watch?v=hBY_0sA8FWw&list=PLj5dCxvv9c4YUOe4ZdR3ckjT_UR20BLpU&index=65" }
    ],
  },
  {
    id: "ms-office",
    title: "2. MS Office Course",
    description: "Master Microsoft Word, Excel, PowerPoint, and other office tools.",
    icon: BookOpen,
    image: computerBasicsImg,
    duration: "4-6 Weeks",
    videoLink: "http://youtube.com/watch?v=zFIfqi6c03s&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M",
    modules: [
      { name: "MS Word Basic Introduction", videoLink: "https://www.youtube.com/watch?v=-J_aVpG2zQk&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=67" },
      { name: "MS Word Home Tab Part-1", videoLink: "https://www.youtube.com/watch?v=yVKyL4WW1fo&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=66" },
      { name: "MS Word Home Tab Part-2", videoLink: "https://www.youtube.com/watch?v=wRQq1VBIgjU&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=61" },
      { name: "MS Word Insert Tab Part-1", videoLink: "https://www.youtube.com/watch?v=aQ1P2hX-bfE&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=60" },
      { name: "MS Word Insert Tab Part-2", videoLink: "https://www.youtube.com/watch?v=m7edkmUl-yo&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=58" },
      { name: "MS Word User Interface", videoLink: "https://www.youtube.com/watch?v=MFIhmEmAf40&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=57" },
      { name: "Create Random Paragraph", videoLink: "https://www.youtube.com/watch?v=ZesDXDNv4Oo&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=45" },
      { name: "Create Index Page", videoLink: "https://www.youtube.com/watch?v=Uefzv6BJttU&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=41" },
      { name: "Mail Merge in MS Word", videoLink: "https://www.youtube.com/watch?v=2Mh1veD1Cps&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=36" },
      { name: "Create Notebook Page in MS Word", videoLink: "https://www.youtube.com/watch?v=Mq115oGKg64&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=35" },
      { name: "MS Excel Chapter 1 View Tab", videoLink: "https://www.youtube.com/watch?v=9RkEqSmjX7k&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=32" },
      { name: "MS Excel Customize Ribbon and Quick Access Tool Bar", videoLink: "https://www.youtube.com/watch?v=4Wd-HspeL9g&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=30" },
      { name: "Creating and Modifying Workbooks", videoLink: "https://www.youtube.com/watch?v=1YMASAc6YYg&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=31" },
      { name: "Insert Delete Cells", videoLink: "https://www.youtube.com/watch?v=G2UY2UlLw1k&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=27" },
      { name: "Entering and Updating Data", videoLink: "https://www.youtube.com/watch?v=Nz8drAkqy-s&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=26" },
      { name: "Moving Data within a Workbook", videoLink: "https://www.youtube.com/watch?v=M1CvT71P8z0&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=24" },
      { name: "Review Tab- Proofing in Excel", videoLink: "https://www.youtube.com/watch?v=gV1hkZ38by8&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=23" },
      { name: "Format as Table in MS Excel", videoLink: "https://www.youtube.com/watch?v=HPEl5uaWlGo&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=22" },
      { name: "Give names to groups of Data", videoLink: "https://www.youtube.com/watch?v=0kzUO8CoH3g&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=21" },
      { name: "Absolute and Relative Reference in MS Excel", videoLink: "https://www.youtube.com/watch?v=xKadzHGmrWA&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=10" },
      { name: "Summarizing Data using some conditions", videoLink: "https://www.youtube.com/watch?v=AQ7nBUxY_JA&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=6" },
      { name: "Array Formula in MS Excel", videoLink: "https://www.youtube.com/watch?v=rhtjdOir6Ow&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=3" },
      { name: "Finding and Correcting Errors in Calculations", videoLink: "https://www.youtube.com/watch?v=83NZUamX0oQ&list=PLj5dCxvv9c4Znmi27ElKKv-sYIMFUxM3M&index=2" }
    ],
  },
  {
    id: "c-programming",
    title: "3. C Programming Course",
    description: "Learn the fundamentals of programming from beginner to advanced level.",
    icon: BookOpen,
    image: cProgrammingImg,
    duration: "6–8 Weeks",
    videoLink: "https://www.youtube.com/watch?v=Sp6t6tPzegQ&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm",
    modules: [
      { name: "Introduction to C Language", videoLink: "https://www.youtube.com/watch?v=Sp6t6tPzegQ&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm" },
      { name: "Structure of C Language", videoLink: "https://www.youtube.com/watch?v=VUcxaSrT94U&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=2" },
      { name: "History of C Language", videoLink: "https://www.youtube.com/watch?v=qkXiMK8ZT0I&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=3" },
      { name: "Character Set, Reserved Words", videoLink: "https://www.youtube.com/watch?v=rcYs0ErDoGc&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=4" },
      { name: "Installation and Basic C Program", videoLink: "https://www.youtube.com/watch?v=bJtC1fPWU10&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=5" },
      { name: "Variables and Identifier", videoLink: "https://www.youtube.com/watch?v=5P5Tz2B3PjM&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=6" },
      { name: "Data Types", videoLink: "https://www.youtube.com/watch?v=Bd2SQ9GtVrY&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=7" },
      { name: "Operators", videoLink: "https://www.youtube.com/watch?v=NL4FIyDOCoA&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=8" },
      { name: "Relational Operators", videoLink: "https://www.youtube.com/watch?v=gQnJdRrLKh0&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=9" },
      { name: "Logical Operators", videoLink: "https://www.youtube.com/watch?v=IUmM1AGp6ug&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=10" },
      { name: "Statements in C-language", videoLink: "https://www.youtube.com/watch?v=rm_SzIwWl9c&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=11" },
      { name: "Conditional Statements", videoLink: "https://www.youtube.com/watch?v=BW2uokcjZBk&list=PLj5dCxvv9c4bE1s3VhREiwpjX1wYsBYkm&index=12" },
      { name: "Loops" },
      { name: "Arrays" },
      { name: "Functions" },
      { name: "Pointers" },
      { name: "Structures" },
      { name: "Mini Projects" }
    ],
  },
  {
    id: "mathematics",
    title: "4. Mathematics Fundamentals",
    description: "Build strong logic with algebra, geometry, trigonometry, and calculus concepts.",
    icon: BookOpen,
    image: mathematicsImg,
    duration: "8 Weeks",
    modules: [
      { name: "Rational Numbers", videoLink: "https://www.youtube.com/watch?v=0tORaF67s7M" },
      { name: "Basic Algebra" },
      { name: "Geometry Basics" },
      { name: "Trigonometry" },
      { name: "Differentiation", videoLink: "https://www.youtube.com/watch?v=AsQXNMxicdU" },
      { name: "Calculus Introduction" },
      { name: "Probability" },
      { name: "Arithmetic Mean", videoLink: "https://www.youtube.com/watch?v=_30PF6RGSbc&t=13s" },
      { name: "Statistics" }
    ],
  },
  {
    id: "cpp-programming",
    title: "5. C++ Programming Language",
    description: "Master object-oriented programming, classes, pointers, memory management, and advanced features.",
    icon: BookOpen,
    image: cppProgrammingImg,
    duration: "6–8 Weeks",
    modules: [
      { name: "Introduction to C++" },
      { name: "OOP Concepts" },
      { name: "Classes & Objects" },
      { name: "Inheritance" },
      { name: "Polymorphism" },
      { name: "Templates" },
      { name: "STL Basics" }
    ],
  },
  {
    id: "science-course",
    title: "6. Science Course",
    description: "Explore the fundamental concepts of Science, including Physics, Chemistry, and Biology.",
    icon: BookOpen,
    image: mathematicsImg,
    duration: "4-6 Weeks",
    videoLink: "https://www.youtube.com/watch?v=dJjd1w9TbWc&list=PLj5dCxvv9c4ZpXcgucyv0mFduBOQccuzG",
    modules: [
      { name: "Introduction to Science", videoLink: "https://www.youtube.com/watch?v=dJjd1w9TbWc&list=PLj5dCxvv9c4ZpXcgucyv0mFduBOQccuzG" },
      { name: "Physics Fundamentals" },
      { name: "Chemistry Fundamentals" },
      { name: "Biology Fundamentals" }
    ],
  },
];

export const BLOG_POSTS = [
  {
    id: "1",
    title: "What is Digital Marketing?",
    summary: "Understand how businesses grow using online marketing techniques.",
    date: "June 10, 2026",
  },
  {
    id: "2",
    title: "Why Learning C Programming is Important",
    summary: "Build strong programming logic and coding fundamentals.",
    date: "June 12, 2026",
  },
  {
    id: "3",
    title: "What is SEO and Why It Matters",
    summary: "Learn how websites rank higher on search engines.",
    date: "June 14, 2026",
  },
  {
    id: "4",
    title: "Top Career Opportunities in Digital Marketing",
    summary: "Explore future career options in the digital industry.",
    date: "June 15, 2026",
  },
  {
    id: "5",
    title: "How Students Can Learn Faster",
    summary: "Simple study techniques to improve learning speed.",
    date: "June 16, 2026",
  },
  {
    id: "6",
    title: "Mastering MS Office: Why Every Student Needs It",
    summary: "Discover why MS Word, Excel, and PowerPoint are essential skills for your academic and professional journey.",
    date: "June 18, 2026",
  },
  {
    id: "7",
    title: "An Introduction to Digital Electronics",
    summary: "A beginner's guide to understanding logic gates, boolean algebra, and digital circuits.",
    date: "June 20, 2026",
  },
  {
    id: "8",
    title: "C vs C++: Which Language Should You Learn First?",
    summary: "Explore the key differences between C and C++ and find out which one fits your learning goals better.",
    date: "June 22, 2026",
  },
  {
    id: "9",
    title: "How to Build a Strong Foundation in Mathematics",
    summary: "Tips and strategies for mastering algebra, calculus, and geometry to excel in STEM fields.",
    date: "June 24, 2026",
  },
  {
    id: "10",
    title: "The Importance of Science in Daily Life",
    summary: "Explore the fascinating applications of Physics, Chemistry, and Biology in our everyday world.",
    date: "June 26, 2026",
  },
];
