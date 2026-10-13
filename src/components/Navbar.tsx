import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LogIn, 
  LayoutDashboard, 
  Menu, 
  X, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Home, 
  Phone, 
  Globe, 
  Sparkles, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import logoImg from "../assets/images/edu_hub_logo_1781763284457.jpg";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Courses", path: "/courses" },
    { label: "Notes", path: "/notes" },
    { 
      label: "Quiz", 
      path: "/quiz", 
      badge: "₹1" 
    },
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-[#0f2147] border-b border-[#142a5c] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[72px] sm:h-[80px] items-center">
          {/* Logo & Brand Name */}
          <div className="flex flex-shrink-0 items-center">
            <Link 
              to="/" 
              onClick={closeMenu}
              className="flex items-center gap-2.5 sm:gap-3 group"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center p-1 shadow-sm shrink-0 border border-amber-300/40">
                <img 
                  src={logoImg} 
                  alt="Education Hub Logo" 
                  className="w-full h-full rounded-full object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-lg sm:text-2xl text-white tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                  EDUCATION <span className="text-[#ffb703]">HUB</span>
                </span>
                <span className="font-cursive text-[#ffb703] text-xs sm:text-sm tracking-widest italic -mt-0.5">
                  by Gunjan Gaur
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors relative text-sm ${
                  isActive(link.path)
                    ? "text-[#ffb703] font-bold"
                    : "text-gray-100 hover:text-[#ffb703]"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -top-2.5 -right-3.5 px-1.5 py-0.2 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full shadow-xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 sm:gap-2 justify-center rounded-full text-xs sm:text-sm font-bold transition-all focus-visible:outline-none bg-white text-[#0f2147] shadow-sm hover:bg-gray-100 h-9 sm:h-10 px-3.5 sm:px-5 py-2 active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-700" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* Desktop Login Button */}
            <button className="hidden sm:inline-flex items-center gap-2 justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none bg-[#ffb703] text-[#0f2147] shadow hover:bg-yellow-500 h-10 px-5 py-2 active:scale-95">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none border border-white/15"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={closeMenu}
          />

          {/* Drawer Content */}
          <div className="relative w-[85%] max-w-sm bg-[#0f2147] text-white h-full shadow-2xl flex flex-col z-10 border-l border-white/10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0b1935]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-white rounded-full p-1 shrink-0">
                  <img src={logoImg} alt="Logo" className="w-full h-full rounded-full object-contain" />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white tracking-wide">
                    EDUCATION <span className="text-[#ffb703]">HUB</span>
                  </div>
                  <div className="font-cursive text-[#ffb703] text-[11px] italic">
                    by Gunjan Gaur
                  </div>
                </div>
              </div>
              <button
                onClick={closeMenu}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status / Welcome */}
            <div className="px-4 py-3 bg-gradient-to-r from-amber-500/20 via-transparent to-transparent border-b border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Learn • Grow • Achieve
              </span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
                Interactive
              </span>
            </div>

            {/* Navigation Links */}
            <div className="p-3 space-y-1 flex-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? "bg-[#ffb703] text-slate-950 font-bold shadow-sm"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {link.path === "/" && <Home className="w-4 h-4 text-amber-300" />}
                      {link.path === "/about" && <Sparkles className="w-4 h-4 text-amber-300" />}
                      {link.path === "/courses" && <BookOpen className="w-4 h-4 text-amber-300" />}
                      {link.path === "/notes" && <FileText className="w-4 h-4 text-amber-300" />}
                      {link.path === "/quiz" && <HelpCircle className="w-4 h-4 text-amber-300" />}
                      {link.path === "/blog" && <BookOpen className="w-4 h-4 text-amber-300" />}
                      {link.path === "/contact" && <Phone className="w-4 h-4 text-amber-300" />}
                      <span>{link.label}</span>
                    </div>
                    {link.badge ? (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${active ? "bg-slate-950 text-white" : "bg-amber-400 text-slate-950"}`}>
                        {link.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    )}
                  </Link>
                );
              })}

              {/* Student Dashboard in Menu */}
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive("/dashboard")
                    ? "bg-[#ffb703] text-slate-950 font-bold"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-amber-300" />
                  <span>Student Dashboard</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>

              {/* Official Portal External Link */}
              <a
                href="https://education-hub-ivory.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-amber-300 hover:bg-white/10 transition-colors border border-amber-300/20 mt-2"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-amber-300" />
                  <span>Official Portal</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>

            {/* Quick Helpline & Payment Info in Drawer */}
            <div className="p-4 bg-[#0a1630] border-t border-white/10 space-y-2.5">
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Support & Verification
              </div>
              <a
                href="tel:9017042682"
                className="flex items-center gap-2.5 text-xs text-slate-200 hover:text-amber-300"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">Call / WhatsApp</span>
                  <span className="font-bold">+91 9017042682</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-slate-200 pt-1">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                  ₹
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">GPay Number</span>
                  <span className="font-mono font-bold text-amber-300">8168707120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
