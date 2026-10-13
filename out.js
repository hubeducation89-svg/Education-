// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// src/App.tsx
import { BrowserRouter as Router, Routes as Routes2, Route as Route2 } from "react-router-dom";

// src/context.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
var AppContext = createContext(null);
var DEFAULT_STATE = {
  role: "student",
  userName: "Alex Learner",
  progress: {},
  messages: [
    {
      id: "msg1",
      senderId: "teacher1",
      senderName: "Gunjan Gaur",
      receiverId: "student1",
      text: "Welcome to Education Hub! Let me know if you need help with your courses.",
      timestamp: Date.now() - 864e5
    }
  ]
};
function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("edu-hub-state");
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  });
  useEffect(() => {
    localStorage.setItem("edu-hub-state", JSON.stringify(state));
  }, [state]);
  const setRole = (role) => {
    setState((s) => ({ ...s, role }));
  };
  const markModuleComplete = (courseId, moduleName) => {
    setState((s) => {
      const courseProgress = s.progress[courseId] || { completedModules: [] };
      if (!courseProgress.completedModules.includes(moduleName)) {
        return {
          ...s,
          progress: {
            ...s.progress,
            [courseId]: {
              ...courseProgress,
              completedModules: [...courseProgress.completedModules, moduleName]
            }
          }
        };
      }
      return s;
    });
  };
  const sendMessage = (text, receiverId) => {
    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: state.role === "student" ? "student1" : "teacher1",
      senderName: state.userName,
      receiverId,
      text,
      timestamp: Date.now()
    };
    setState((s) => ({
      ...s,
      messages: [...s.messages, newMessage]
    }));
  };
  return /* @__PURE__ */ jsx(AppContext.Provider, { value: { state, setRole, markModuleComplete, sendMessage }, children });
}
function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

// src/components/Navbar.tsx
import { Link } from "react-router-dom";

// node_modules/lucide-react/dist/esm/createLucideIcon.js
import { forwardRef as forwardRef2, createElement as createElement2 } from "react";

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

// node_modules/lucide-react/dist/esm/Icon.js
import { forwardRef, createElement } from "react";

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef2(
    ({ className, ...props }, ref) => createElement2(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/arrow-left.js
var __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
var ArrowLeft = createLucideIcon("arrow-left", __iconNode);

// node_modules/lucide-react/dist/esm/icons/arrow-right.js
var __iconNode2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
var ArrowRight = createLucideIcon("arrow-right", __iconNode2);

// node_modules/lucide-react/dist/esm/icons/book-open.js
var __iconNode3 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
var BookOpen = createLucideIcon("book-open", __iconNode3);

// node_modules/lucide-react/dist/esm/icons/book.js
var __iconNode4 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
];
var Book = createLucideIcon("book", __iconNode4);

// node_modules/lucide-react/dist/esm/icons/circle-alert.js
var __iconNode5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
var CircleAlert = createLucideIcon("circle-alert", __iconNode5);

// node_modules/lucide-react/dist/esm/icons/circle-check-big.js
var __iconNode6 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
var CircleCheckBig = createLucideIcon("circle-check-big", __iconNode6);

// node_modules/lucide-react/dist/esm/icons/circle-check.js
var __iconNode7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
var CircleCheck = createLucideIcon("circle-check", __iconNode7);

// node_modules/lucide-react/dist/esm/icons/circle-play.js
var __iconNode8 = [
  [
    "path",
    {
      d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
      key: "kmsa83"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var CirclePlay = createLucideIcon("circle-play", __iconNode8);

// node_modules/lucide-react/dist/esm/icons/clock.js
var __iconNode9 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var Clock = createLucideIcon("clock", __iconNode9);

// node_modules/lucide-react/dist/esm/icons/eye.js
var __iconNode10 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
var Eye = createLucideIcon("eye", __iconNode10);

// node_modules/lucide-react/dist/esm/icons/facebook.js
var __iconNode11 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
var Facebook = createLucideIcon("facebook", __iconNode11);

// node_modules/lucide-react/dist/esm/icons/instagram.js
var __iconNode12 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
var Instagram = createLucideIcon("instagram", __iconNode12);

// node_modules/lucide-react/dist/esm/icons/layout-dashboard.js
var __iconNode13 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
var LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode13);

// node_modules/lucide-react/dist/esm/icons/loader-circle.js
var __iconNode14 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
var LoaderCircle = createLucideIcon("loader-circle", __iconNode14);

// node_modules/lucide-react/dist/esm/icons/log-in.js
var __iconNode15 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
var LogIn = createLucideIcon("log-in", __iconNode15);

// node_modules/lucide-react/dist/esm/icons/mail.js
var __iconNode16 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
var Mail = createLucideIcon("mail", __iconNode16);

// node_modules/lucide-react/dist/esm/icons/map-pin.js
var __iconNode17 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
var MapPin = createLucideIcon("map-pin", __iconNode17);

// node_modules/lucide-react/dist/esm/icons/message-square.js
var __iconNode18 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
var MessageSquare = createLucideIcon("message-square", __iconNode18);

// node_modules/lucide-react/dist/esm/icons/phone.js
var __iconNode19 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
var Phone = createLucideIcon("phone", __iconNode19);

// node_modules/lucide-react/dist/esm/icons/send.js
var __iconNode20 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
var Send = createLucideIcon("send", __iconNode20);

// node_modules/lucide-react/dist/esm/icons/sparkles.js
var __iconNode21 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
var Sparkles = createLucideIcon("sparkles", __iconNode21);

// node_modules/lucide-react/dist/esm/icons/target.js
var __iconNode22 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
var Target = createLucideIcon("target", __iconNode22);

// node_modules/lucide-react/dist/esm/icons/user.js
var __iconNode23 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
var User = createLucideIcon("user", __iconNode23);

// node_modules/lucide-react/dist/esm/icons/users.js
var __iconNode24 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var Users = createLucideIcon("users", __iconNode24);

// node_modules/lucide-react/dist/esm/icons/x.js
var __iconNode25 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
var X = createLucideIcon("x", __iconNode25);

// node_modules/lucide-react/dist/esm/icons/youtube.js
var __iconNode26 = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
var Youtube = createLucideIcon("youtube", __iconNode26);

// src/assets/images/edu_hub_logo_1781763284457.jpg
var edu_hub_logo_1781763284457_default = "./edu_hub_logo_1781763284457-T5FMEQH3.jpg";

// src/components/Navbar.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Navbar() {
  return /* @__PURE__ */ jsx2("nav", { className: "bg-[#0f2147] border-b border-[#0f2147] sticky top-0 z-50 shadow-md", children: /* @__PURE__ */ jsx2("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-[80px] items-center", children: [
    /* @__PURE__ */ jsx2("div", { className: "flex flex-shrink-0 items-center", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx2("div", { className: "w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 shadow-sm", children: /* @__PURE__ */ jsx2("img", { src: edu_hub_logo_1781763284457_default, alt: "Education Hub Logo", className: "w-full h-full rounded-full object-contain", referrerPolicy: "no-referrer" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-extrabold text-2xl text-white tracking-wide leading-none hidden sm:block", children: [
          "EDUCATION ",
          /* @__PURE__ */ jsx2("span", { className: "text-[#ffb703]", children: "HUB" })
        ] }),
        /* @__PURE__ */ jsx2("span", { className: "font-cursive text-[#ffb703] text-sm tracking-widest hidden sm:block italic", children: "Gunjan Gaur" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex space-x-8", children: [
      /* @__PURE__ */ jsx2(Link, { to: "/", className: "text-gray-100 hover:text-[#ffb703] font-medium transition-colors", children: "Home" }),
      /* @__PURE__ */ jsx2(Link, { to: "/about", className: "text-gray-100 hover:text-[#ffb703] font-medium transition-colors", children: "About Us" }),
      /* @__PURE__ */ jsx2(Link, { to: "/courses", className: "text-gray-100 hover:text-[#ffb703] font-medium transition-colors", children: "Courses" }),
      /* @__PURE__ */ jsx2(Link, { to: "/blog", className: "text-gray-100 hover:text-[#ffb703] font-medium transition-colors", children: "Blog" }),
      /* @__PURE__ */ jsx2(Link, { to: "/contact", className: "text-gray-100 hover:text-[#ffb703] font-medium transition-colors", children: "Contact Us" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none bg-white text-[#0f2147] shadow-sm hover:bg-gray-100 h-10 px-5 py-2", children: [
        /* @__PURE__ */ jsx2(LayoutDashboard, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx2("span", { className: "hidden sm:inline", children: "Dashboard" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "inline-flex items-center gap-2 justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none bg-[#ffb703] text-[#0f2147] shadow hover:bg-yellow-500 h-10 px-5 py-2", children: [
        /* @__PURE__ */ jsx2(LogIn, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx2("span", { className: "hidden sm:inline", children: "Login" })
      ] })
    ] })
  ] }) }) });
}

// src/components/Footer.tsx
import { Link as Link2 } from "react-router-dom";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Footer() {
  return /* @__PURE__ */ jsx3("footer", { className: "bg-[#0f2147] text-blue-100 border-t border-slate-700", children: /* @__PURE__ */ jsxs2("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
    /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center md:items-start", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center md:justify-start gap-3 mb-6", children: [
          /* @__PURE__ */ jsx3("div", { className: "bg-white p-1 rounded-full inline-flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsx3("img", { src: edu_hub_logo_1781763284457_default, alt: "Education Hub Logo", className: "h-12 w-12 object-contain rounded-full", referrerPolicy: "no-referrer" }) }),
          /* @__PURE__ */ jsxs2("div", { className: "flex flex-col justify-center text-left", children: [
            /* @__PURE__ */ jsxs2("span", { className: "font-extrabold text-2xl text-white tracking-wide leading-none", children: [
              "EDUCATION ",
              /* @__PURE__ */ jsx3("span", { className: "text-[#ffb703]", children: "HUB" })
            ] }),
            /* @__PURE__ */ jsx3("span", { className: "font-cursive text-[#ffb703] text-sm tracking-widest italic", children: "Gunjan Gaur" })
          ] })
        ] }),
        /* @__PURE__ */ jsx3("p", { className: "max-w-xs text-blue-200", children: "Empowering students with practical skills and quality education. A place to learn, grow & build your future." })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center md:items-start", children: [
        /* @__PURE__ */ jsx3("h4", { className: "font-bold text-white text-lg mb-6 uppercase tracking-wider", children: "Quick Links" }),
        /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-3 font-medium", children: [
          /* @__PURE__ */ jsx3(Link2, { to: "/", className: "text-blue-200 hover:text-[#ffb703] transition-colors inline-block transition-transform hover:translate-x-1", children: "Home" }),
          /* @__PURE__ */ jsx3(Link2, { to: "/about", className: "text-blue-200 hover:text-[#ffb703] transition-colors inline-block transition-transform hover:translate-x-1", children: "About Us" }),
          /* @__PURE__ */ jsx3(Link2, { to: "/courses", className: "text-blue-200 hover:text-[#ffb703] transition-colors inline-block transition-transform hover:translate-x-1", children: "Courses" }),
          /* @__PURE__ */ jsx3(Link2, { to: "/blog", className: "text-blue-200 hover:text-[#ffb703] transition-colors inline-block transition-transform hover:translate-x-1", children: "Blog" }),
          /* @__PURE__ */ jsx3(Link2, { to: "/contact", className: "text-blue-200 hover:text-[#ffb703] transition-colors inline-block transition-transform hover:translate-x-1", children: "Contact Us" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center md:items-start", children: [
        /* @__PURE__ */ jsx3("h4", { className: "font-bold text-white text-lg mb-6 uppercase tracking-wider", children: "Follow Us" }),
        /* @__PURE__ */ jsxs2("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx3("a", { href: "https://www.youtube.com/@EducationHubbyGUNJANGAUR", target: "_blank", rel: "noopener noreferrer", className: "bg-white/5 p-3 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1", children: /* @__PURE__ */ jsx3(Youtube, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx3("a", { href: "#", className: "bg-white/5 p-3 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1", children: /* @__PURE__ */ jsx3(Instagram, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx3("a", { href: "https://www.facebook.com/hubeducation89", target: "_blank", rel: "noopener noreferrer", className: "bg-white/5 p-3 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1", children: /* @__PURE__ */ jsx3(Facebook, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx3("a", { href: "#", className: "bg-white/5 p-3 rounded-full hover:bg-[#ffb703] hover:text-[#0f2147] transition-all transform hover:-translate-y-1", children: /* @__PURE__ */ jsx3(Send, { className: "w-5 h-5" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "border-t border-slate-700/50 mt-16 pt-8 text-center text-sm font-medium text-blue-200/60", children: /* @__PURE__ */ jsxs2("p", { children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " EDUCATION HUB By Gunjan Gaur. All Rights Reserved."
    ] }) })
  ] }) });
}

// src/components/Chatbot.tsx
import { useState as useState2, useRef, useEffect as useEffect2 } from "react";

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// src/components/Chatbot.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Chatbot() {
  const [isOpen, setIsOpen] = useState2(false);
  const [messages, setMessages] = useState2([
    { role: "model", text: "Hi! I am the Education Hub assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState2("");
  const [isLoading, setIsLoading] = useState2(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect2(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages
        })
      });
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages([...newMessages, { role: "model", text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: "model", text: "Sorry, I am having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: clsx_default(
          "fixed bottom-6 right-6 p-4 bg-[#0f2147] text-white rounded-full shadow-2xl hover:bg-[#1a365d] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center",
          isOpen ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"
        ),
        "aria-label": "Open chat",
        children: [
          /* @__PURE__ */ jsx4(MessageSquare, { className: "w-7 h-7" }),
          /* @__PURE__ */ jsx4("span", { className: "absolute -top-2 -right-2 bg-[#ffb703] text-[#0f2147] text-xs font-bold px-2 py-1 rounded-full border-2 border-white", children: "New" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs3(
      "div",
      {
        className: clsx_default(
          "fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        ),
        children: [
          /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between p-4 bg-[#0f2147] text-white rounded-t-2xl", children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx4("div", { className: "bg-white/10 p-2 rounded-full", children: /* @__PURE__ */ jsx4(MessageSquare, { className: "w-5 h-5 text-[#ffb703]" }) }),
              /* @__PURE__ */ jsxs3("div", { children: [
                /* @__PURE__ */ jsx4("h3", { className: "font-bold text-sm", children: "Education Hub Assistant" }),
                /* @__PURE__ */ jsx4("p", { className: "text-xs text-blue-200", children: "Online | Ready to help" })
              ] })
            ] }),
            /* @__PURE__ */ jsx4(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "p-2 hover:bg-white/10 rounded-full transition-colors",
                "aria-label": "Close chat",
                children: /* @__PURE__ */ jsx4(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50", children: [
            messages.map((msg, index) => /* @__PURE__ */ jsx4(
              "div",
              {
                className: clsx_default(
                  "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user" ? "bg-[#ffb703] text-[#0f2147] ml-auto rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 mr-auto rounded-bl-sm shadow-sm"
                ),
                children: msg.text
              },
              index
            )),
            isLoading && /* @__PURE__ */ jsxs3("div", { className: "bg-white border border-slate-200 text-slate-700 max-w-[85%] p-4 rounded-2xl rounded-bl-sm mr-auto shadow-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsx4("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: "0ms" } }),
              /* @__PURE__ */ jsx4("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: "150ms" } }),
              /* @__PURE__ */ jsx4("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: "300ms" } })
            ] }),
            /* @__PURE__ */ jsx4("div", { ref: messagesEndRef })
          ] }),
          /* @__PURE__ */ jsxs3("form", { onSubmit: handleSend, className: "p-4 bg-white border-t border-slate-100 rounded-b-2xl flex gap-2", children: [
            /* @__PURE__ */ jsx4(
              "input",
              {
                type: "text",
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Type your message...",
                className: "flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#0f2147] focus:ring-1 focus:ring-[#0f2147] transition-all bg-slate-50",
                disabled: isLoading
              }
            ),
            /* @__PURE__ */ jsx4(
              "button",
              {
                type: "submit",
                disabled: !input.trim() || isLoading,
                className: "p-3 bg-[#0f2147] text-white rounded-full hover:bg-[#1a365d] active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center shrink-0",
                children: isLoading ? /* @__PURE__ */ jsx4(LoaderCircle, { className: "w-4 h-4 animate-spin text-[#ffb703]" }) : /* @__PURE__ */ jsx4(Send, { className: "w-4 h-4 text-[#ffb703]" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}

// src/pages/Home.tsx
import { Link as Link3 } from "react-router-dom";

// src/assets/images/c_programming_1781763456792.jpg
var c_programming_1781763456792_default = "./c_programming_1781763456792-L6FIR25X.jpg";

// src/assets/images/cpp_programming_1781763474090.jpg
var cpp_programming_1781763474090_default = "./cpp_programming_1781763474090-MFA2JR7W.jpg";

// src/assets/images/mathematics_1781763486454.jpg
var mathematics_1781763486454_default = "./mathematics_1781763486454-IHH2EBLR.jpg";

// src/assets/images/computer_basics_1781763530033.jpg
var computer_basics_1781763530033_default = "./computer_basics_1781763530033-QM4S6NG6.jpg";

// src/data.ts
var COURSES = [
  {
    id: "digital-electronics",
    title: "1. Logical Organization/Digital Electronics",
    description: "Learn about logic gates, boolean algebra, circuits and digital systems.",
    icon: BookOpen,
    image: mathematics_1781763486454_default,
    duration: "6 Weeks",
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
    ]
  },
  {
    id: "ms-office",
    title: "2. MS Office Course",
    description: "Master Microsoft Word, Excel, PowerPoint, and other office tools.",
    icon: BookOpen,
    image: computer_basics_1781763530033_default,
    duration: "4-6 Weeks",
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
    ]
  },
  {
    id: "c-programming",
    title: "3. C Programming Course",
    description: "Learn the fundamentals of programming from beginner to advanced level.",
    icon: BookOpen,
    image: c_programming_1781763456792_default,
    duration: "6\u20138 Weeks",
    videoLink: "https://www.youtube.com/@EducationHubbyGUNJANGAUR",
    // Channel link as fallback if exact video isn't found
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
    ]
  },
  {
    id: "mathematics",
    title: "4. Mathematics Fundamentals",
    description: "Build strong logic with algebra, geometry, trigonometry, and calculus concepts.",
    icon: BookOpen,
    image: mathematics_1781763486454_default,
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
    ]
  },
  {
    id: "cpp-programming",
    title: "5. C++ Programming Language",
    description: "Master object-oriented programming, classes, pointers, memory management, and advanced features.",
    icon: BookOpen,
    image: cpp_programming_1781763474090_default,
    duration: "6\u20138 Weeks",
    modules: [
      { name: "Introduction to C++" },
      { name: "OOP Concepts" },
      { name: "Classes & Objects" },
      { name: "Inheritance" },
      { name: "Polymorphism" },
      { name: "Templates" },
      { name: "STL Basics" }
    ]
  }
];
var BLOG_POSTS = [
  {
    id: "1",
    title: "What is Digital Marketing?",
    summary: "Understand how businesses grow using online marketing techniques.",
    date: "June 10, 2026"
  },
  {
    id: "2",
    title: "Why Learning C Programming is Important",
    summary: "Build strong programming logic and coding fundamentals.",
    date: "June 12, 2026"
  },
  {
    id: "3",
    title: "What is SEO and Why It Matters",
    summary: "Learn how websites rank higher on search engines.",
    date: "June 14, 2026"
  },
  {
    id: "4",
    title: "Top Career Opportunities in Digital Marketing",
    summary: "Explore future career options in the digital industry.",
    date: "June 15, 2026"
  },
  {
    id: "5",
    title: "How Students Can Learn Faster",
    summary: "Simple study techniques to improve learning speed.",
    date: "June 16, 2026"
  }
];

// src/assets/images/hero_illustration_1781763701194.jpg
var hero_illustration_1781763701194_default = "./hero_illustration_1781763701194-IPRRDVOA.jpg";

// src/pages/Home.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function Home() {
  return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxs4("section", { className: "relative overflow-hidden bg-white", children: [
      /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 top-0 w-full h-[600px] bg-gradient-to-br from-[#0f2147] via-[#0f2147] to-[#1a365d] rounded-br-[100px] lg:rounded-br-[200px]" }),
      /* @__PURE__ */ jsx5("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-20 lg:pt-32 lg:pb-32", children: /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs4("div", { className: "text-left space-y-8 z-10", children: [
          /* @__PURE__ */ jsxs4("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 text-[#ffb703] font-medium text-sm shadow-sm", children: [
            /* @__PURE__ */ jsx5(Sparkles, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx5("span", { className: "tracking-widest uppercase", children: "Learn | Grow | Achieve" })
          ] }),
          /* @__PURE__ */ jsxs4("h1", { className: "text-4xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]", children: [
            "EDUCATION ",
            /* @__PURE__ */ jsx5("span", { className: "text-[#ffb703]", children: "HUB" }),
            /* @__PURE__ */ jsx5("span", { className: "block text-2xl lg:text-4xl font-cursive font-normal mt-4 text-[#e2e8f0]", children: "by Gunjan Gaur" })
          ] }),
          /* @__PURE__ */ jsx5("p", { className: "text-xl text-blue-100 max-w-lg leading-relaxed pt-2", children: "Empowering students with practical skills and quality education. Join our community and build a brighter future." }),
          /* @__PURE__ */ jsxs4("div", { className: "flex flex-wrap gap-4 pt-4", children: [
            /* @__PURE__ */ jsxs4(Link3, { to: "/courses", className: "inline-flex justify-center items-center gap-2 px-8 py-4 border border-transparent text-lg font-bold rounded-full text-[#0f2147] bg-[#ffb703] hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,183,3,0.4)] hover:shadow-[0_0_25px_rgba(255,183,3,0.6)] transition-all duration-200 transform hover:-translate-y-1", children: [
              "Explore Courses",
              /* @__PURE__ */ jsx5(ArrowRight, { className: "w-5 h-5" })
            ] }),
            /* @__PURE__ */ jsxs4(Link3, { to: "/about", className: "inline-flex justify-center items-center gap-2 px-8 py-4 border-2 border-slate-600/50 text-lg font-bold rounded-full text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 ease-in-out transform hover:-translate-y-1", children: [
              /* @__PURE__ */ jsx5(CirclePlay, { className: "w-5 h-5 text-gray-300" }),
              "Our Story"
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-700/50 mt-8", children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center sm:items-start text-white gap-2", children: [
              /* @__PURE__ */ jsx5("div", { className: "bg-[#1a365d] p-3 rounded-full", children: /* @__PURE__ */ jsx5(BookOpen, { className: "w-5 h-5 text-[#ffb703]" }) }),
              /* @__PURE__ */ jsx5("span", { className: "text-xs font-bold uppercase tracking-wider text-center sm:text-left", children: "Quality Content" })
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center sm:items-start text-white gap-2", children: [
              /* @__PURE__ */ jsx5("div", { className: "bg-[#1a365d] p-3 rounded-full", children: /* @__PURE__ */ jsx5(CircleCheckBig, { className: "w-5 h-5 text-[#ffb703]" }) }),
              /* @__PURE__ */ jsx5("span", { className: "text-xs font-bold uppercase tracking-wider text-center sm:text-left", children: "Smart Learning" })
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center sm:items-start text-white gap-2", children: [
              /* @__PURE__ */ jsx5("div", { className: "bg-[#1a365d] p-3 rounded-full", children: /* @__PURE__ */ jsx5(ArrowRight, { className: "w-5 h-5 text-[#ffb703]" }) }),
              /* @__PURE__ */ jsx5("span", { className: "text-xs font-bold uppercase tracking-wider text-center sm:text-left", children: "Better Future" })
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center sm:items-start text-white gap-2", children: [
              /* @__PURE__ */ jsx5("div", { className: "bg-[#1a365d] p-3 rounded-full", children: /* @__PURE__ */ jsx5(Sparkles, { className: "w-5 h-5 text-[#ffb703]" }) }),
              /* @__PURE__ */ jsx5("span", { className: "text-xs font-bold uppercase tracking-wider text-center sm:text-left", children: "Your Success" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "relative hidden lg:block z-10 pl-8", children: [
          /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 bg-[#ffb703] blur-3xl opacity-20 transform scale-110 rounded-full" }),
          /* @__PURE__ */ jsxs4("div", { className: "relative border-[8px] border-white rounded-[3rem] shadow-2xl overflow-hidden bg-white transform rotate-2 hover:rotate-0 transition-transform duration-500", children: [
            /* @__PURE__ */ jsx5("img", { src: hero_illustration_1781763701194_default, alt: "Education Hub Banner", className: "w-full h-[450px] object-cover" }),
            /* @__PURE__ */ jsxs4("div", { className: "absolute top-6 -left-6 bg-[#0f2147] p-4 rounded-xl shadow-xl border border-slate-700 flex items-center gap-4 animate-bounce-slow", children: [
              /* @__PURE__ */ jsx5("div", { className: "bg-[#ffb703] p-2 rounded-lg", children: /* @__PURE__ */ jsx5(CircleCheckBig, { className: "w-5 h-5 text-[#0f2147]" }) }),
              /* @__PURE__ */ jsxs4("div", { className: "pr-2", children: [
                /* @__PURE__ */ jsx5("div", { className: "font-bold text-white text-sm", children: "Expert Guidance" }),
                /* @__PURE__ */ jsx5("div", { className: "text-xs text-blue-200", children: "Learn from the best" })
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx5("section", { className: "py-20 px-4 bg-[#f8faff]", children: /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs4("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-3xl md:text-5xl font-extrabold text-[#0f2147] mb-4", children: "Why Choose Us?" }),
        /* @__PURE__ */ jsx5("div", { className: "w-24 h-1 bg-[#ffb703] mx-auto rounded-full" })
      ] }),
      /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8", children: [
        "Expert Guidance",
        "Practical Learning Approach",
        "Affordable Courses",
        "Career-Oriented Training",
        "Beginner Friendly Content",
        "Certificate Courses"
      ].map((feature, i) => /* @__PURE__ */ jsxs4("div", { className: "flex gap-4 p-6 border-b-4 border-transparent hover:border-[#ffb703] rounded-2xl shadow-sm bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1", children: [
        /* @__PURE__ */ jsx5("div", { className: "bg-[#ffb703]/10 p-3 rounded-full h-fit mt-1", children: /* @__PURE__ */ jsx5(CircleCheckBig, { className: "w-6 h-6 text-[#ffb703] flex-shrink-0" }) }),
        /* @__PURE__ */ jsx5("div", { className: "font-bold text-[#0f2147] text-lg lg:text-xl pt-2", children: feature })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxs4("section", { className: "py-20 px-4 bg-white relative", children: [
      /* @__PURE__ */ jsx5("div", { className: "absolute left-0 top-0 w-64 h-64 bg-[#ffb703]/5 rounded-full blur-3xl -ml-32 -mt-32" }),
      /* @__PURE__ */ jsxs4("div", { className: "max-w-7xl mx-auto relative z-10", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-col md:flex-row justify-between items-end mb-12", children: [
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx5("h2", { className: "text-3xl md:text-5xl font-extrabold text-[#0f2147] mb-4", children: "Popular Courses" }),
            /* @__PURE__ */ jsx5("div", { className: "w-24 h-1 bg-[#ffb703] rounded-full" })
          ] }),
          /* @__PURE__ */ jsxs4(Link3, { to: "/courses", className: "hidden md:inline-flex justify-center items-center gap-2 px-6 py-3 border border-[#0f2147] text-base font-bold rounded-full text-[#0f2147] bg-transparent hover:bg-[#0f2147] hover:text-white transition-colors", children: [
            "View all courses ",
            /* @__PURE__ */ jsx5(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: COURSES.slice(0, 3).map((course, i) => /* @__PURE__ */ jsxs4("div", { className: "bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col", children: [
          /* @__PURE__ */ jsxs4("div", { className: "relative overflow-hidden", children: [
            course.image && /* @__PURE__ */ jsx5("img", { src: course.image, alt: course.title, className: "w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500", referrerPolicy: "no-referrer" }),
            /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 bg-gradient-to-t from-[rgba(15,33,71,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6", children: /* @__PURE__ */ jsx5("span", { className: "text-[#ffb703] font-bold text-sm tracking-widest uppercase", children: "Explore Module" }) })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "p-8 flex-1 flex flex-col", children: [
            /* @__PURE__ */ jsx5("h3", { className: "font-extrabold text-xl text-[#0f2147] mb-3 leading-tight group-hover:text-blue-700 transition-colors", children: course.title }),
            /* @__PURE__ */ jsx5("p", { className: "text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1", children: course.description }),
            /* @__PURE__ */ jsxs4(Link3, { to: "/courses", className: "text-[#ffb703] font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto uppercase tracking-wider", children: [
              "Learn More ",
              /* @__PURE__ */ jsx5(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }, course.id)) }),
        /* @__PURE__ */ jsx5("div", { className: "text-center mt-12 md:hidden", children: /* @__PURE__ */ jsxs4(Link3, { to: "/courses", className: "inline-flex justify-center items-center gap-2 px-8 py-4 border border-[#0f2147] font-bold rounded-full text-[#0f2147] hover:bg-[#0f2147] hover:text-white transition-colors w-full", children: [
          "View all courses ",
          /* @__PURE__ */ jsx5(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("section", { className: "py-24 px-4 text-center bg-[#0f2147] relative overflow-hidden", children: [
      /* @__PURE__ */ jsx5("div", { className: "absolute top-0 right-0 w-96 h-96 bg-[#1a365d] rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2" }),
      /* @__PURE__ */ jsxs4("div", { className: "max-w-6xl mx-auto relative z-10", children: [
        /* @__PURE__ */ jsxs4("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx5("h2", { className: "text-3xl md:text-5xl font-extrabold text-white mb-4", children: "Student Success" }),
          /* @__PURE__ */ jsx5("div", { className: "w-24 h-1 bg-[#ffb703] mx-auto rounded-full" })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-20", children: [
          /* @__PURE__ */ jsxs4("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transform hover:-translate-y-2 transition-transform", children: [
            /* @__PURE__ */ jsx5("div", { className: "text-5xl font-extrabold text-[#ffb703] mb-4", children: "500+" }),
            /* @__PURE__ */ jsx5("div", { className: "text-blue-100 font-medium text-lg uppercase tracking-wider", children: "Students Trained" })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transform hover:-translate-y-2 transition-transform", children: [
            /* @__PURE__ */ jsx5("div", { className: "text-5xl font-extrabold text-[#ffb703] mb-4", children: "100+" }),
            /* @__PURE__ */ jsx5("div", { className: "text-blue-100 font-medium text-lg uppercase tracking-wider", children: "Practical Projects" })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transform hover:-translate-y-2 transition-transform flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx5("div", { className: "mb-4", children: /* @__PURE__ */ jsx5(Users, { className: "w-12 h-12 text-[#ffb703]" }) }),
            /* @__PURE__ */ jsx5("div", { className: "text-blue-100 font-medium text-lg uppercase tracking-wider", children: "Growing Community" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative", children: [
          /* @__PURE__ */ jsx5("div", { className: "absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#ffb703] text-[#0f2147] font-extrabold px-8 py-3 rounded-full text-lg shadow-lg", children: "Testimonials" }),
          /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-6", children: [
            /* @__PURE__ */ jsxs4("div", { className: "bg-[#f8faff] p-8 rounded-2xl text-left border border-slate-100 relative", children: [
              /* @__PURE__ */ jsx5("div", { className: "text-8xl text-slate-200 font-serif absolute top-4 right-4 opacity-50", children: '"' }),
              /* @__PURE__ */ jsx5("p", { className: "italic text-slate-700 text-lg relative z-10 font-medium", children: "The teaching style is simple and easy to understand. Highly recommended!" }),
              /* @__PURE__ */ jsxs4("div", { className: "mt-6 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx5("div", { className: "w-10 h-10 rounded-full bg-[#0f2147] flex items-center justify-center text-white font-bold", children: "S" }),
                /* @__PURE__ */ jsx5("div", { className: "font-bold text-[#0f2147]", children: "Student" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "bg-[#f8faff] p-8 rounded-2xl text-left border border-slate-100 relative", children: [
              /* @__PURE__ */ jsx5("div", { className: "text-8xl text-slate-200 font-serif absolute top-4 right-4 opacity-50", children: '"' }),
              /* @__PURE__ */ jsx5("p", { className: "italic text-slate-700 text-lg relative z-10 font-medium", children: "Best platform for learning digital skills. Helped me build a great foundation." }),
              /* @__PURE__ */ jsxs4("div", { className: "mt-6 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx5("div", { className: "w-10 h-10 rounded-full bg-[#ffb703] flex items-center justify-center text-[#0f2147] font-bold", children: "A" }),
                /* @__PURE__ */ jsx5("div", { className: "font-bold text-[#0f2147]", children: "Alumnus" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

// src/pages/About.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function About() {
  return /* @__PURE__ */ jsxs5("div", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen", children: [
    /* @__PURE__ */ jsxs5("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx6("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "About Education Hub" }),
      /* @__PURE__ */ jsx6("p", { className: "text-xl text-indigo-600 font-medium", children: "By Gunjan Gaur" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "prose prose-lg text-gray-700 mb-16 mx-auto", children: [
      /* @__PURE__ */ jsx6("p", { children: "Education Hub By Gunjan Gaur is an educational platform dedicated to helping students learn modern skills that are useful in academics and career growth." }),
      /* @__PURE__ */ jsx6("p", { children: "Our mission is to provide quality education in simple language so that every learner can understand and apply knowledge practically." }),
      /* @__PURE__ */ jsx6("p", { children: "We focus on skill development, practical training, and career-building courses." })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs5("div", { className: "bg-indigo-50 p-8 rounded-2xl border border-indigo-100", children: [
        /* @__PURE__ */ jsx6(Target, { className: "w-10 h-10 text-indigo-600 mb-4" }),
        /* @__PURE__ */ jsx6("h2", { className: "text-2xl font-bold text-gray-900 mb-3", children: "Our Mission" }),
        /* @__PURE__ */ jsx6("p", { className: "text-gray-700", children: "To make quality education accessible for every student." })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "bg-blue-50 p-8 rounded-2xl border border-blue-100", children: [
        /* @__PURE__ */ jsx6(Eye, { className: "w-10 h-10 text-blue-600 mb-4" }),
        /* @__PURE__ */ jsx6("h2", { className: "text-2xl font-bold text-gray-900 mb-3", children: "Our Vision" }),
        /* @__PURE__ */ jsx6("p", { className: "text-gray-700", children: "To create skilled and confident learners for the future." })
      ] })
    ] })
  ] });
}

// src/pages/Courses.tsx
import { Link as Link4 } from "react-router-dom";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function Courses() {
  return /* @__PURE__ */ jsxs6("div", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen", children: [
    /* @__PURE__ */ jsxs6("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx7("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Our Courses" }),
      /* @__PURE__ */ jsx7("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Explore our range of practical and skill-based courses designed to help you succeed." })
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20", children: [
      /* @__PURE__ */ jsx7("div", { className: "lg:col-span-2 space-y-8", children: COURSES.map((course, index) => /* @__PURE__ */ jsxs6("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row", children: [
        course.image && /* @__PURE__ */ jsx7("div", { className: "sm:w-1/3 bg-gray-100 flex-shrink-0", children: /* @__PURE__ */ jsx7("img", { src: course.image, alt: course.title, className: "w-full h-48 sm:h-full object-cover", referrerPolicy: "no-referrer" }) }),
        /* @__PURE__ */ jsxs6("div", { className: "p-6 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-3 justify-between mb-2", children: [
            /* @__PURE__ */ jsx7("h3", { className: "text-xl font-bold text-gray-900", children: course.title }),
            /* @__PURE__ */ jsx7("div", { className: "bg-indigo-50 p-2 rounded-lg text-indigo-600 hidden sm:block", children: /* @__PURE__ */ jsx7(course.icon, { className: "w-5 h-5 " }) })
          ] }),
          /* @__PURE__ */ jsx7("p", { className: "text-gray-600 mb-4 flex-1", children: course.description }),
          course.duration && /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2 mb-6 text-sm text-gray-500", children: [
            /* @__PURE__ */ jsx7(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxs6("span", { children: [
              "Duration: ",
              /* @__PURE__ */ jsx7("span", { className: "font-medium text-gray-800", children: course.duration })
            ] })
          ] }),
          /* @__PURE__ */ jsx7("div", { children: /* @__PURE__ */ jsx7(Link4, { to: `/dashboard/course/${course.id}`, className: "text-sm font-medium text-indigo-600 hover:text-indigo-700", children: "Start Learning \u2192" }) })
        ] })
      ] }, course.id)) }),
      /* @__PURE__ */ jsx7("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs6("div", { className: "bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24", children: [
        /* @__PURE__ */ jsx7("h3", { className: "text-xl font-bold text-gray-900 mb-6", children: "Why Students Choose Us" }),
        /* @__PURE__ */ jsx7("ul", { className: "space-y-4", children: [
          "Practical Learning",
          "Easy Language Teaching",
          "Career-Focused Skills",
          "Beginner Friendly",
          "Real Projects",
          "Certificates Available"
        ].map((feature, i) => /* @__PURE__ */ jsxs6("li", { className: "flex items-center gap-3 text-gray-700", children: [
          /* @__PURE__ */ jsx7(CircleCheckBig, { className: "w-5 h-5 text-green-500" }),
          /* @__PURE__ */ jsx7("span", { children: feature })
        ] }, i)) }),
        /* @__PURE__ */ jsx7("div", { className: "mt-8 pt-8 border-t border-gray-200", children: /* @__PURE__ */ jsx7(Link4, { to: "/contact", className: "block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors", children: "Contact For Details" }) })
      ] }) })
    ] })
  ] });
}

// src/pages/Blog.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function Blog() {
  return /* @__PURE__ */ jsxs7("div", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen", children: [
    /* @__PURE__ */ jsxs7("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx8("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Latest Articles" }),
      /* @__PURE__ */ jsx8("p", { className: "text-xl text-gray-600", children: "Insights, tips, and career advice for students and professionals." })
    ] }),
    /* @__PURE__ */ jsx8("div", { className: "space-y-8", children: BLOG_POSTS.map((post, index) => /* @__PURE__ */ jsxs7("article", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-colors", children: [
      /* @__PURE__ */ jsxs7("div", { className: "text-sm text-indigo-600 font-medium mb-2", children: [
        "Blog ",
        index + 1
      ] }),
      /* @__PURE__ */ jsx8("h2", { className: "text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors cursor-pointer", children: post.title }),
      /* @__PURE__ */ jsx8("p", { className: "text-gray-600 text-lg mb-4", children: post.summary }),
      /* @__PURE__ */ jsx8("div", { className: "flex items-center text-sm text-gray-500", children: /* @__PURE__ */ jsx8("time", { children: post.date }) })
    ] }, post.id)) })
  ] });
}

// src/pages/Contact.tsx
import { useState as useState3 } from "react";
import { Fragment as Fragment2, jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function Contact() {
  const [status, setStatus] = useState3("idle");
  const [formData, setFormData] = useState3({ name: "", email: "", phone: "", message: "" });
  const [errorMessage, setErrorMessage] = useState3("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5e3);
    } catch (err) {
      setErrorMessage(err.message || "Failed to send message. Please try again later.");
      setStatus("error");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return /* @__PURE__ */ jsxs8("div", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen", children: [
    /* @__PURE__ */ jsxs8("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx9("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Get In Touch" }),
      /* @__PURE__ */ jsx9("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "We would love to hear from you. Have questions about our courses or need guidance? Reach out." })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24", children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx9("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Contact Details" }),
        /* @__PURE__ */ jsxs8("div", { className: "space-y-6 mb-12 text-lg text-gray-700", children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx9("div", { className: "w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx9(Phone, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxs8("div", { children: [
              /* @__PURE__ */ jsx9("span", { className: "block font-medium", children: "Phone" }),
              /* @__PURE__ */ jsx9("span", { children: "+91 9017042682" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx9("div", { className: "w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx9(Mail, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxs8("div", { children: [
              /* @__PURE__ */ jsx9("span", { className: "block font-medium", children: "Email" }),
              /* @__PURE__ */ jsx9("span", { children: "hubeducation89@gmail.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx9("div", { className: "w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx9(MapPin, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxs8("div", { children: [
              /* @__PURE__ */ jsx9("span", { className: "block font-medium", children: "Address" }),
              /* @__PURE__ */ jsx9("span", { children: "Haryana, India" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx9("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Follow Us" }),
        /* @__PURE__ */ jsxs8("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx9("a", { href: "https://www.youtube.com/@EducationHubbyGUNJANGAUR", target: "_blank", rel: "noopener noreferrer", className: "w-12 h-12 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors", children: /* @__PURE__ */ jsx9(Youtube, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsx9("a", { href: "#", className: "w-12 h-12 bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-full flex items-center justify-center transition-colors", children: /* @__PURE__ */ jsx9(Instagram, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsx9("a", { href: "https://www.facebook.com/hubeducation89", target: "_blank", rel: "noopener noreferrer", className: "w-12 h-12 bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors", children: /* @__PURE__ */ jsx9(Facebook, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs8("a", { href: "#", className: "w-12 h-12 bg-gray-100 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-full flex items-center justify-center transition-colors", children: [
            /* @__PURE__ */ jsx9(Send, { className: "w-6 h-6" }),
            " "
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden", children: [
        status === "success" && /* @__PURE__ */ jsxs8("div", { className: "absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm animate-in fade-in duration-300", children: [
          /* @__PURE__ */ jsx9(CircleCheck, { className: "w-16 h-16 text-green-500 mb-4" }),
          /* @__PURE__ */ jsx9("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Message Sent!" }),
          /* @__PURE__ */ jsx9("p", { className: "text-gray-600", children: "Thank you for reaching out. We will get back to you shortly." })
        ] }),
        /* @__PURE__ */ jsx9("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Send a Message" }),
        status === "error" && /* @__PURE__ */ jsxs8("div", { className: "mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3", children: [
          /* @__PURE__ */ jsx9(CircleAlert, { className: "w-5 h-5 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsx9("p", { children: errorMessage })
        ] }),
        /* @__PURE__ */ jsxs8("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx9("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Name *" }),
            /* @__PURE__ */ jsx9("input", { type: "text", id: "name", required: true, value: formData.name, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow", placeholder: "Your full name" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx9("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email *" }),
            /* @__PURE__ */ jsx9("input", { type: "email", id: "email", required: true, value: formData.email, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow", placeholder: "your@email.com" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx9("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone Number (Optional)" }),
            /* @__PURE__ */ jsx9("input", { type: "tel", id: "phone", value: formData.phone, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow", placeholder: "+91 XXX XXX XXXX" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx9("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700 mb-1", children: "Message *" }),
            /* @__PURE__ */ jsx9("textarea", { id: "message", required: true, value: formData.message, onChange: handleChange, rows: 4, className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow resize-none", placeholder: "Tell us how we can help you..." })
          ] }),
          /* @__PURE__ */ jsx9(
            "button",
            {
              type: "submit",
              disabled: status === "loading",
              className: "w-full bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-400",
              children: status === "loading" ? /* @__PURE__ */ jsxs8(Fragment2, { children: [
                /* @__PURE__ */ jsx9(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
                "Sending..."
              ] }) : "Submit"
            }
          )
        ] })
      ] })
    ] })
  ] });
}

// src/pages/Dashboard.tsx
import { useState as useState4 } from "react";
import { Link as Link5, Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i = 0; i < array1.length; i++) {
    combinedArray[i] = array1[i];
  }
  for (let i = 0; i < array2.length; i++) {
    combinedArray[array1.length + i] = array2[i];
  }
  return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i = 0; i < validatorsLength; i++) {
    const validatorObj = validators[i];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
var createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i = 0; i < len; i++) {
    const classDefinition = classGroup[i];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, value] = entries[i];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
var getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const part = parts[i];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
var createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
var createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i = 0; i < modifiers.length; i++) {
      const modifier = modifiers[i];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
  ...createClassGroupUtils(config)
});
var createPostfixLookupClassGroupIds = (config) => {
  const lookup = /* @__PURE__ */ Object.create(null);
  const classGroupIds = config.postfixLookupClassGroups;
  if (classGroupIds) {
    for (let i = 0; i < classGroupIds.length; i++) {
      lookup[classGroupIds[i]] = true;
    }
  }
  return lookup;
};
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers,
    postfixLookupClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId;
    if (hasPostfixModifier) {
      const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
      classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
      const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
      if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
        classGroupId = classGroupIdWithPostfix;
        hasPostfixModifier = false;
      }
    } else {
      classGroupId = getClassGroupId(baseClassName);
    }
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
var twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [isNamedContainerQuery],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": scaleColor()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": scaleColor()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// src/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/pages/Dashboard.tsx
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function StudentProgress() {
  const { state } = useAppContext();
  return /* @__PURE__ */ jsxs9("div", { children: [
    /* @__PURE__ */ jsx10("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "My Learning Progress" }),
    /* @__PURE__ */ jsx10("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: COURSES.map((course) => {
      const progress = state.progress[course.id] || { completedModules: [] };
      const completedCount = progress.completedModules.length;
      const totalCount = course.modules.length;
      const percent = totalCount === 0 ? 0 : Math.round(completedCount / totalCount * 100);
      return /* @__PURE__ */ jsxs9("div", { className: "bg-white p-6 rounded-xl border border-gray-200 shadow-sm", children: [
        /* @__PURE__ */ jsxs9("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsx10("h3", { className: "font-bold text-lg text-gray-900", children: course.title }),
          /* @__PURE__ */ jsxs9("span", { className: "text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded", children: [
            percent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx10("div", { className: "w-full bg-gray-200 rounded-full h-2.5 mb-6", children: /* @__PURE__ */ jsx10("div", { className: "bg-indigo-600 h-2.5 rounded-full", style: { width: `${percent}%` } }) }),
        /* @__PURE__ */ jsxs9("div", { className: "text-sm text-gray-600 mb-4", children: [
          completedCount,
          " of ",
          totalCount,
          " modules completed"
        ] }),
        /* @__PURE__ */ jsx10(Link5, { to: `/dashboard/course/${course.id}`, className: "text-indigo-600 font-medium hover:text-indigo-800 text-sm", children: "Continue Learning \u2192" })
      ] }, course.id);
    }) })
  ] });
}
function TeacherMessaging() {
  const { state, sendMessage } = useAppContext();
  const [msgText, setMsgText] = useState4("");
  const sortedMessages = [...state.messages].sort((a, b) => a.timestamp - b.timestamp);
  const handleSend = (e) => {
    e.preventDefault();
    if (msgText.trim()) {
      sendMessage(msgText.trim(), state.role === "teacher" ? "student1" : "teacher1");
      setMsgText("");
    }
  };
  return /* @__PURE__ */ jsxs9("div", { className: "flex flex-col h-[600px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxs9("div", { className: "bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx10("h2", { className: "text-xl font-bold text-gray-900", children: state.role === "teacher" ? "Student Messages" : "Teacher Messages" }),
      /* @__PURE__ */ jsxs9("span", { className: "text-sm font-medium text-gray-500", children: [
        "Logged in as: ",
        state.role
      ] })
    ] }),
    /* @__PURE__ */ jsx10("div", { className: "flex-1 overflow-y-auto p-6 space-y-4", children: sortedMessages.map((msg) => {
      const isMe = msg.senderId === (state.role === "teacher" ? "teacher1" : "student1");
      return /* @__PURE__ */ jsxs9("div", { className: cn("flex flex-col", isMe ? "items-end" : "items-start"), children: [
        /* @__PURE__ */ jsx10("div", { className: "text-xs text-gray-500 mb-1 mx-1", children: msg.senderName }),
        /* @__PURE__ */ jsx10("div", { className: cn(
          "px-4 py-2 rounded-2xl max-w-[80%]",
          isMe ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
        ), children: msg.text })
      ] }, msg.id);
    }) }),
    /* @__PURE__ */ jsx10("div", { className: "p-4 bg-white border-t border-gray-200", children: /* @__PURE__ */ jsxs9("form", { onSubmit: handleSend, className: "flex gap-2", children: [
      /* @__PURE__ */ jsx10(
        "input",
        {
          type: "text",
          value: msgText,
          onChange: (e) => setMsgText(e.target.value),
          placeholder: "Type your message...",
          className: "flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        }
      ),
      /* @__PURE__ */ jsx10("button", { type: "submit", className: "bg-indigo-600 text-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition", children: /* @__PURE__ */ jsx10(Send, { className: "w-5 h-5" }) })
    ] }) })
  ] });
}
function CourseViewer() {
  const { courseId } = useParams();
  const { state, markModuleComplete } = useAppContext();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return /* @__PURE__ */ jsx10(Navigate, { to: "/dashboard" });
  const progress = state.progress[course.id] || { completedModules: [] };
  return /* @__PURE__ */ jsxs9("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxs9("div", { className: "bg-indigo-600 px-6 py-8 text-white relative", children: [
      /* @__PURE__ */ jsxs9("button", { onClick: () => navigate(-1), className: "absolute top-4 left-4 text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium", children: [
        /* @__PURE__ */ jsx10(ArrowLeft, { className: "w-4 h-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsx10("h2", { className: "text-3xl font-bold mt-4", children: course.title }),
      /* @__PURE__ */ jsx10("p", { className: "opacity-90 mt-2", children: course.description }),
      course.videoLink && /* @__PURE__ */ jsx10("div", { className: "mt-6", children: /* @__PURE__ */ jsxs9("a", { href: course.videoLink, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors", children: [
        /* @__PURE__ */ jsx10("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", children: /* @__PURE__ */ jsx10("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
        "Watch Video on YouTube"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs9("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx10("h3", { className: "text-xl font-bold text-gray-900 mb-6", children: "Interactive Modules" }),
      /* @__PURE__ */ jsx10("div", { className: "space-y-4", children: course.modules.map((module, idx) => {
        const isCompleted = progress.completedModules.includes(module.name);
        return /* @__PURE__ */ jsxs9("div", { className: cn(
          "p-4 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors",
          isCompleted ? "bg-indigo-50 border-indigo-100" : "bg-white border-gray-200"
        ), children: [
          /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx10("div", { className: "w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-sm shrink-0", children: idx + 1 }),
            /* @__PURE__ */ jsx10("span", { className: cn("font-medium break-words", isCompleted ? "text-indigo-900" : "text-gray-800"), children: module.name })
          ] }),
          /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-4 self-end md:self-auto", children: [
            module.videoLink && /* @__PURE__ */ jsxs9("a", { href: module.videoLink, target: "_blank", rel: "noopener noreferrer", className: "text-red-600 hover:text-red-800 flex items-center gap-1.5 text-sm font-medium transition-colors", children: [
              /* @__PURE__ */ jsx10("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", children: /* @__PURE__ */ jsx10("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
              "Watch Topic"
            ] }),
            state.role === "student" && /* @__PURE__ */ jsxs9(
              "button",
              {
                onClick: () => markModuleComplete(course.id, module.name),
                disabled: isCompleted,
                className: cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition",
                  isCompleted ? "text-green-600 bg-green-50" : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                ),
                children: [
                  /* @__PURE__ */ jsx10(CircleCheckBig, { className: "w-4 h-4" }),
                  isCompleted ? "Completed" : "Mark Done"
                ]
              }
            )
          ] })
        ] }, idx);
      }) })
    ] })
  ] });
}
function Dashboard() {
  const { state, setRole } = useAppContext();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx10("div", { className: "min-h-screen bg-gray-50 py-8 px-4 pl-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs9("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row gap-8", children: [
    /* @__PURE__ */ jsx10("div", { className: "w-full md:w-64 shrink-0", children: /* @__PURE__ */ jsxs9("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm p-4 sticky top-24", children: [
      /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-3 mb-8 px-2", children: [
        /* @__PURE__ */ jsx10("div", { className: "w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx10(User, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxs9("div", { children: [
          /* @__PURE__ */ jsx10("div", { className: "font-bold text-gray-900", children: state.userName }),
          /* @__PURE__ */ jsxs9("div", { className: "text-xs text-gray-500 capitalize", children: [
            state.role,
            " Account"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs9("nav", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs9(Link5, { to: "/dashboard", className: "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 font-medium", children: [
          /* @__PURE__ */ jsx10(Book, { className: "w-5 h-5 text-gray-400" }),
          state.role === "teacher" ? "Course Management" : "My Learning"
        ] }),
        /* @__PURE__ */ jsxs9(Link5, { to: "/dashboard/messages", className: "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 font-medium", children: [
          /* @__PURE__ */ jsx10(MessageSquare, { className: "w-5 h-5 text-gray-400" }),
          "Messages"
        ] })
      ] }),
      /* @__PURE__ */ jsxs9("div", { className: "mt-8 pt-8 border-t border-gray-100 px-2", children: [
        /* @__PURE__ */ jsx10("p", { className: "text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider", children: "Demo Controls" }),
        /* @__PURE__ */ jsxs9(
          "button",
          {
            onClick: () => setRole(state.role === "student" ? "teacher" : "student"),
            className: "w-full text-left text-sm text-indigo-600 font-medium px-3 py-2 rounded-md hover:bg-indigo-50",
            children: [
              "Switch to ",
              state.role === "student" ? "Teacher" : "Student",
              " View"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx10("div", { className: "flex-1", children: /* @__PURE__ */ jsxs9(Routes, { children: [
      /* @__PURE__ */ jsx10(Route, { path: "/", element: /* @__PURE__ */ jsx10(StudentProgress, {}) }),
      /* @__PURE__ */ jsx10(Route, { path: "messages", element: /* @__PURE__ */ jsx10(TeacherMessaging, {}) }),
      /* @__PURE__ */ jsx10(Route, { path: "course/:courseId", element: /* @__PURE__ */ jsx10(CourseViewer, {}) })
    ] }) })
  ] }) });
}

// src/App.tsx
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function App() {
  return /* @__PURE__ */ jsx11(AppProvider, { children: /* @__PURE__ */ jsx11(Router, { children: /* @__PURE__ */ jsxs10("div", { className: "flex flex-col min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx11(Navbar, {}),
    /* @__PURE__ */ jsx11("main", { className: "flex-1", children: /* @__PURE__ */ jsxs10(Routes2, { children: [
      /* @__PURE__ */ jsx11(Route2, { path: "/", element: /* @__PURE__ */ jsx11(Home, {}) }),
      /* @__PURE__ */ jsx11(Route2, { path: "/about", element: /* @__PURE__ */ jsx11(About, {}) }),
      /* @__PURE__ */ jsx11(Route2, { path: "/courses", element: /* @__PURE__ */ jsx11(Courses, {}) }),
      /* @__PURE__ */ jsx11(Route2, { path: "/blog", element: /* @__PURE__ */ jsx11(Blog, {}) }),
      /* @__PURE__ */ jsx11(Route2, { path: "/contact", element: /* @__PURE__ */ jsx11(Contact, {}) }),
      /* @__PURE__ */ jsx11(Route2, { path: "/dashboard/*", element: /* @__PURE__ */ jsx11(Dashboard, {}) })
    ] }) }),
    /* @__PURE__ */ jsx11(Footer, {}),
    /* @__PURE__ */ jsx11(Chatbot, {})
  ] }) }) });
}

// src/main.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx12(StrictMode, { children: /* @__PURE__ */ jsx12(App, {}) })
);
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-left.js:
lucide-react/dist/esm/icons/arrow-right.js:
lucide-react/dist/esm/icons/book-open.js:
lucide-react/dist/esm/icons/book.js:
lucide-react/dist/esm/icons/circle-alert.js:
lucide-react/dist/esm/icons/circle-check-big.js:
lucide-react/dist/esm/icons/circle-check.js:
lucide-react/dist/esm/icons/circle-play.js:
lucide-react/dist/esm/icons/clock.js:
lucide-react/dist/esm/icons/eye.js:
lucide-react/dist/esm/icons/facebook.js:
lucide-react/dist/esm/icons/instagram.js:
lucide-react/dist/esm/icons/layout-dashboard.js:
lucide-react/dist/esm/icons/loader-circle.js:
lucide-react/dist/esm/icons/log-in.js:
lucide-react/dist/esm/icons/mail.js:
lucide-react/dist/esm/icons/map-pin.js:
lucide-react/dist/esm/icons/message-square.js:
lucide-react/dist/esm/icons/phone.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/target.js:
lucide-react/dist/esm/icons/user.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/icons/youtube.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.546.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
