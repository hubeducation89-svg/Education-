import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import clsx from 'clsx';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am the Education Hub assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Fetch response from backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages([...newMessages, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'model', text: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 p-4 bg-[#0f2147] text-white rounded-full shadow-2xl hover:bg-[#1a365d] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center",
          isOpen ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"
        )}
        aria-label="Open chat"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-2 -right-2 bg-[#ffb703] text-[#0f2147] text-xs font-bold px-2 py-1 rounded-full border-2 border-white">New</span>
      </button>

      {/* Chat Window */}
      <div
        className={clsx(
          "fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#0f2147] text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full">
              <MessageSquare className="w-5 h-5 text-[#ffb703]" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Education Hub Assistant</h3>
              <p className="text-xs text-blue-200">Online | Ready to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={clsx(
                "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-[#ffb703] text-[#0f2147] ml-auto rounded-br-sm" 
                  : "bg-white border border-slate-200 text-slate-700 mr-auto rounded-bl-sm shadow-sm"
              )}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white border border-slate-200 text-slate-700 max-w-[85%] p-4 rounded-2xl rounded-bl-sm mr-auto shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#0f2147] focus:ring-1 focus:ring-[#0f2147] transition-all bg-slate-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-[#0f2147] text-white rounded-full hover:bg-[#1a365d] active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#ffb703]" /> : <Send className="w-4 h-4 text-[#ffb703]" />}
          </button>
        </form>
      </div>
    </>
  );
}
