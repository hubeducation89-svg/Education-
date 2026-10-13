import { Link } from "react-router-dom";
import { Youtube, Instagram, Facebook, Send, Globe, Phone } from "lucide-react";
import logoImg from "../assets/images/edu_hub_logo_1781763284457.jpg";

export function Footer() {
  return (
    <footer className="bg-[#0f2147] text-blue-100 border-t border-slate-700/80 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start md:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="bg-white p-1 rounded-full inline-flex items-center justify-center shadow-md">
                <img src={logoImg} alt="Education Hub Logo" className="h-11 w-11 object-contain rounded-full" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col justify-center text-left">
                <span className="font-extrabold text-xl text-white tracking-wide leading-none">
                  EDUCATION <span className="text-[#ffb703]">HUB</span>
                </span>
                <span className="font-cursive text-[#ffb703] text-xs sm:text-sm tracking-widest italic mt-0.5">
                  by Gunjan Gaur
                </span>
              </div>
            </div>
            <p className="max-w-md text-blue-200/90 text-sm leading-relaxed mb-4">
              Empowering students with practical programming, computer literacy, and modern tech skills. Learn, Grow & Achieve with Gunjan Gaur.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-amber-300">
              <a href="tel:9017042682" className="flex items-center gap-1.5 hover:underline">
                <Phone className="w-3.5 h-3.5" /> +91 9017042682
              </a>
              <span className="text-white/30">•</span>
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white">GPay: 8168707120</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider text-amber-400">Quick Links</h4>
            <div className="flex flex-col gap-2.5 font-medium text-sm">
              <Link to="/" className="text-blue-200 hover:text-[#ffb703] transition-colors">Home</Link>
              <Link to="/about" className="text-blue-200 hover:text-[#ffb703] transition-colors">About Us</Link>
              <Link to="/courses" className="text-blue-200 hover:text-[#ffb703] transition-colors">Courses</Link>
              <Link to="/notes" className="text-blue-200 hover:text-[#ffb703] transition-colors">PDF Notes</Link>
              <Link to="/quiz" className="text-blue-200 hover:text-[#ffb703] transition-colors">Practice Quiz (₹1)</Link>
              <Link to="/contact" className="text-blue-200 hover:text-[#ffb703] transition-colors">Contact Us</Link>
              <a href="https://education-hub-ivory.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#ffb703] hover:underline font-semibold inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Official Portal ↗
              </a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider text-amber-400">Follow Us</h4>
            <div className="flex gap-3 mb-4">
              <a href="https://www.youtube.com/@EducationHubbyGUNJANGAUR" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" className="bg-white/10 p-2.5 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="bg-white/10 p-2.5 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/hubeducation89" target="_blank" rel="noopener noreferrer" aria-label="Facebook Page" className="bg-white/10 p-2.5 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Telegram" className="bg-white/10 p-2.5 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1">
                <Send className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-blue-200/70">
              Subscribe to our YouTube channel for free tutorials and exam prep sessions.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 mt-10 pt-6 text-center text-xs font-medium text-blue-200/60">
          <p>&copy; {new Date().getFullYear()} EDUCATION HUB by Gunjan Gaur. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
