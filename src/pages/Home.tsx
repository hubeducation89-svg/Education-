import { Link } from "react-router-dom";
import { CheckCircle, Users, BookOpen, Sparkles, ArrowRight, PlayCircle, FileText, HelpCircle, Phone, Award } from "lucide-react";
import { COURSES } from "../data";
import heroImg from "../assets/images/hero_illustration_1781763701194.jpg";
import { SEO } from "../components/SEO";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO title="Home" />
      
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden bg-[#0f2147] text-white">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a365d] rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ffb703]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 pb-12 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Motto Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb703]/15 border border-[#ffb703]/30 text-[#ffb703] font-semibold text-xs tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Learn • Grow • Achieve</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.15]">
                EDUCATION <span className="text-[#ffb703]">HUB</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-cursive font-normal mt-2 text-[#ffb703] italic">
                  by Gunjan Gaur
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-blue-100 max-w-xl leading-relaxed">
                Empowering students with practical coding, computer fundamentals, and tech skills. Watch free YouTube lessons, download verified study notes, and attempt quizzes.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link 
                  to="/courses" 
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-base font-bold rounded-2xl text-[#0f2147] bg-[#ffb703] hover:bg-yellow-400 shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link 
                  to="/quiz" 
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-base font-bold rounded-2xl text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all active:scale-[0.98]"
                >
                  <HelpCircle className="w-4 h-4 text-[#ffb703]" />
                  <span>Attempt Quiz (₹1)</span>
                </Link>
              </div>

              {/* Mobile Quick Highlight Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
                <Link
                  to="/notes"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 transition-colors block text-left"
                >
                  <FileText className="w-4 h-4 text-amber-300 mb-1" />
                  <div className="text-xs font-bold text-white">PDF Notes</div>
                  <div className="text-[10px] text-blue-200">12+ Subjects</div>
                </Link>

                <Link
                  to="/quiz"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 transition-colors block text-left"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-400 mb-1" />
                  <div className="text-xs font-bold text-white">₹1 Quiz</div>
                  <div className="text-[10px] text-blue-200">Instant Score</div>
                </Link>

                <Link
                  to="/courses"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 transition-colors block text-left"
                >
                  <BookOpen className="w-4 h-4 text-sky-400 mb-1" />
                  <div className="text-xs font-bold text-white">Free Videos</div>
                  <div className="text-[10px] text-blue-200">YouTube Lab</div>
                </Link>

                <a
                  href="tel:9017042682"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 transition-colors block text-left"
                >
                  <Phone className="w-4 h-4 text-rose-400 mb-1" />
                  <div className="text-xs font-bold text-white">Helpline</div>
                  <div className="text-[10px] text-blue-200">9017042682</div>
                </a>
              </div>
            </div>
            
            {/* Visual/Image Content - Visible on all devices! */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-900 group">
                <img 
                  src={heroImg} 
                  alt="Education Hub by Gunjan Gaur - Best Programming and Science Courses" 
                  className="w-full h-64 sm:h-80 lg:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#0f2147]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#ffb703] text-slate-900 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white">Guided by Gunjan Gaur</div>
                      <div className="text-[10px] text-blue-200">Practical Computer Lab & Online Training</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 px-4 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f2147] mb-2">Why Choose Us?</h2>
            <div className="w-16 h-1 bg-[#ffb703] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {[
              "Expert Guidance",
              "Practical Learning",
              "Affordable Courses",
              "Career Oriented",
              "Beginner Friendly",
              "Certificate Ready",
            ].map((feature, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 p-4 sm:p-5 rounded-2xl shadow-xs bg-white border border-slate-100 hover:shadow-md transition-all">
                <div className="bg-[#ffb703]/15 p-2 rounded-xl text-[#0f2147] shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#ffb703]" />
                </div>
                <div className="font-bold text-[#0f2147] text-sm sm:text-base pt-0.5">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-12 sm:py-16 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f2147] mb-2">Popular Courses</h2>
              <div className="w-16 h-1 bg-[#ffb703] rounded-full"></div>
            </div>
            <Link to="/courses" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#0f2147] hover:text-indigo-600 transition-colors">
              <span>View all courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.slice(0, 3).map((course) => (
              <div key={course.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col">
                <div className="relative overflow-hidden aspect-video bg-slate-100">
                  {course.image && (
                    <img 
                      src={course.image} 
                      alt={`${course.title} free video course by Gunjan Gaur`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      referrerPolicy="no-referrer" 
                    />
                  )}
                  <div className="absolute top-3 left-3 bg-[#0f2147]/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Video Class
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-[#0f2147] mb-2 group-hover:text-blue-700 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <Link
                      to={`/dashboard/course/${course.id}`}
                      className="text-xs font-bold text-[#0f2147] hover:text-indigo-600 inline-flex items-center gap-1"
                    >
                      Start Free &rarr;
                    </Link>
                    <a 
                      href={course.videoLink || course.modules[0]?.videoLink || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#ffb703] font-bold text-xs inline-flex items-center gap-1 hover:underline"
                    >
                      Watch Video <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:hidden">
            <Link to="/courses" className="inline-flex justify-center items-center gap-2 px-6 py-3 border border-[#0f2147] font-bold rounded-2xl text-[#0f2147] text-sm w-full">
              <span>View all courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Student Success Section */}
      <section className="py-12 sm:py-16 px-4 text-center bg-[#0f2147] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-2">Student Community</h2>
            <div className="w-16 h-1 bg-[#ffb703] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-4xl font-black text-[#ffb703]">500+</div>
              <div className="text-blue-100 font-semibold text-[11px] sm:text-sm mt-1">Students</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-4xl font-black text-[#ffb703]">100+</div>
              <div className="text-blue-100 font-semibold text-[11px] sm:text-sm mt-1">Projects</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-4xl font-black text-[#ffb703]">12+</div>
              <div className="text-blue-100 font-semibold text-[11px] sm:text-sm mt-1">Notes & Quizzes</div>
            </div>
          </div>

          {/* Testimonial preview */}
          <div className="bg-white text-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl max-w-2xl mx-auto text-left">
            <p className="italic text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              "The C Programming course and handwritten notes cleared all my doubts. Gunjan ma'am explains concepts very well in simple language with practical code."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0f2147] flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <div>
                <div className="font-extrabold text-sm text-[#0f2147]">Amit Kumar</div>
                <div className="text-[11px] text-slate-500">Student • Education Hub</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
