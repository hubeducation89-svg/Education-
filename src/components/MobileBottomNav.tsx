import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, FileText, HelpCircle, LayoutDashboard } from "lucide-react";

export function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
      isActive: currentPath === "/",
    },
    {
      label: "Courses",
      path: "/courses",
      icon: BookOpen,
      isActive: currentPath.startsWith("/courses"),
    },
    {
      label: "Notes",
      path: "/notes",
      icon: FileText,
      isActive: currentPath.startsWith("/notes"),
    },
    {
      label: "Quiz",
      path: "/quiz",
      icon: HelpCircle,
      badge: "₹1",
      isActive: currentPath.startsWith("/quiz"),
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      isActive: currentPath.startsWith("/dashboard"),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_24px_rgba(15,33,71,0.08)] md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center min-h-[44px] py-1 transition-all rounded-xl ${
                active
                  ? "text-[#0f2147] font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    active ? "bg-[#ffb703]/25 text-[#0f2147] scale-105" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      active ? "stroke-[2.5]" : "stroke-[1.8]"
                    }`}
                  />
                </div>
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3.5 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 leading-none ${
                  active ? "text-[#0f2147] font-extrabold" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
              {active && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb703] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
