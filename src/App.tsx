/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { Chatbot } from "./components/Chatbot";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Courses } from "./pages/Courses";
import { Notes } from "./pages/Notes";
import { Quiz } from "./pages/Quiz";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          <MobileBottomNav />
          <Chatbot />
        </div>
      </Router>
    </AppProvider>
  );
}
