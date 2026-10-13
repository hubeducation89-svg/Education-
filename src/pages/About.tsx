import { Target, Eye, MapPin, Phone, Youtube, Globe, CheckCircle2, Award, Users, Laptop, Sparkles } from "lucide-react";
import { SEO } from "../components/SEO";
import storefrontImg from "../assets/images/center_storefront_1791815084825.jpg";

export function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 pb-24 md:pb-16">
      <SEO 
        title="About Us" 
        description="Learn more about Education Hub by Gunjan Gaur. Our modern computer training center, mission, vision, and comprehensive courses."
      />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Learn • Grow • Achieve
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f2147] tracking-tight mb-2 sm:mb-4">
            About Education Hub
          </h1>
          <p className="text-base sm:text-xl text-[#0f2147]/80 font-medium max-w-2xl mx-auto">
            Founded & Guided by <span className="text-amber-600 font-bold">Gunjan Gaur</span>
          </p>
        </div>

        {/* Storefront Feature Banner */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            {/* Storefront Image */}
            <div className="lg:col-span-7 relative group overflow-hidden bg-slate-900">
              <img
                src={storefrontImg}
                alt="Education Hub by Gunjan Gaur Learning Center Storefront"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 lg:min-h-[420px] lg:max-h-[520px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
              <div className="absolute bottom-3 left-3 right-3 text-white lg:hidden">
                <span className="bg-amber-500 text-slate-900 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                  Education Hub Center
                </span>
                <p className="text-xs font-semibold mt-1">Gunjan Gaur with our students & modern computer lab</p>
              </div>
            </div>

            {/* Storefront Content & Details */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-4 w-fit">
                <Award className="w-4 h-4" />
                Trusted Learning Destination
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                Empowering Students with Practical Skills & Future Readiness
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                Education Hub by Gunjan Gaur is committed to bridging the gap between theoretical knowledge and real-world technology skills. From beginner computer literacy to programming, web development, and modern AI tools, we guide every student step by step.
              </p>

              {/* Direct Info Pills */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Helpline & WhatsApp</span>
                    <a href="tel:9017042682" className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                      +91 9017042682
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Official YouTube Channel</span>
                    <span className="font-bold text-slate-900">Education Hub by GUNJAN GAUR</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Official Portal</span>
                    <a
                      href="https://education-hub-ivory.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 transition-colors break-all"
                    >
                      education-hub-ivory.vercel.app
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Core Values from the Center Display */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Students Choose Education Hub
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Key highlights that make our training environment unique and effective
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Easy Explanations</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Complex programming and mathematics concepts broken down into simple, intuitive Hindi-English explanations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Practical Learning</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hands-on practice on real computers with exercises in C, Excel, HTML, and AI tools for true skill retention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Beginner Friendly</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No prior coding background needed. We start from absolute fundamentals to build deep confidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Youtube className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">100% Free Content</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hundreds of comprehensive video tutorials available completely free on YouTube for learners everywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-700 leading-relaxed">
              To make quality education accessible, affordable, and actionable for every student, eliminating hesitation around technology, programming, and STEM subjects through empathetic, practical teaching.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-slate-100 p-8 rounded-3xl border border-blue-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#0f2147] text-white flex items-center justify-center mb-5 shadow-sm">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-700 leading-relaxed">
              To nurture an empowered generation of skilled, tech-savvy thinkers who excel in their academics, achieve meaningful careers, and confidently adapt to emerging digital and AI landscapes.
            </p>
          </div>
        </div>

        {/* Topics We Teach */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Curriculum & Skill Domains
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-8">
            Tailored study modules covering school/college curriculum, vocational computer courses, and modern industry tech.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "C Programming",
              "C++ (OOPs)",
              "MS Excel (Basic to Advanced)",
              "MS Word & PowerPoint",
              "HTML & CSS Web Design",
              "Digital Marketing & SEO",
              "Artificial Intelligence & Tools",
              "Logical Organization of Computers",
              "Computer Fundamentals",
              "School & College Mathematics",
              "Physics & Chemistry Essentials",
            ].map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

