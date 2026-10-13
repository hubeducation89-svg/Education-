import React, { useState } from "react";
import { Phone, Mail, MapPin, Globe, Youtube, Instagram, Facebook, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SEO } from "../components/SEO";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send message. Please try again later.");
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen pb-24 md:pb-16">
      <SEO title="Contact" />
      <div className="text-center mb-8 sm:mb-16">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f2147] mb-2 sm:mb-4">Get In Touch</h1>
        <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto">
          We would love to hear from you. Have questions about our courses or need guidance? Reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info & Socials */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>
          <div className="space-y-6 mb-12 text-lg text-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-medium">Phone</span>
                <a href="tel:9017042682" className="hover:text-indigo-600 transition-colors">+91 9017042682</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-medium">Email</span>
                <a href="mailto:hubeducation89@gmail.com" className="hover:text-indigo-600 transition-colors">hubeducation89@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-medium">Official Portal</span>
                <a 
                  href="https://education-hub-ivory.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-600 font-bold hover:underline"
                >
                  education-hub-ivory.vercel.app
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-medium">Address</span>
                <span>Haryana, India</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
          <div className="flex gap-4">
            <a href="https://www.youtube.com/@EducationHubbyGUNJANGAUR" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-full flex items-center justify-center transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/hubeducation89" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-full flex items-center justify-center transition-colors">
              <Send className="w-6 h-6" /> {/* Telegram placeholder */}
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          {status === "success" && (
            <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm animate-in fade-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">Thank you for reaching out. We will get back to you shortly.</p>
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
          
          {status === "error" && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow" placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
              <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow" placeholder="+91 XXX XXX XXXX" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea id="message" required value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-shadow resize-none" placeholder="Tell us how we can help you..."></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-400"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
