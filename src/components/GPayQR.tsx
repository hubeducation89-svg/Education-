import React, { useState } from "react";
import { Copy, Check, QrCode, ShieldCheck, Smartphone, ExternalLink } from "lucide-react";

interface GPayQRProps {
  amount?: string | number;
  noteTitle?: string;
  className?: string;
}

export function GPayQR({ amount = "1", noteTitle = "Education Hub Quiz", className = "" }: GPayQRProps) {
  const [copied, setCopied] = useState(false);
  const upiId = "8168707120@upi";
  const gpayNumber = "8168707120";

  const numAmount = typeof amount === "string" ? amount.replace(/[^0-9.]/g, "") : amount;
  const upiPayload = `upi://pay?pa=8168707120@upi&pn=Gunjan%20Gaur&am=${numAmount || "1"}&cu=INR&tn=${encodeURIComponent(noteTitle)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiPayload)}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(gpayNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center w-full max-w-sm mx-auto ${className}`}>
      {/* Brand Header */}
      <div className="flex items-center justify-between w-full mb-3 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black text-slate-800 tracking-wide">Google Pay (GPay) / UPI</span>
        </div>
        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          ₹{numAmount || "1"}
        </span>
      </div>

      {/* Direct UPI Payment Button for Mobile Users */}
      <div className="w-full mb-3.5">
        <a
          href={upiPayload}
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
        >
          <Smartphone className="w-4 h-4" />
          <span>Pay ₹{numAmount || "1"} via UPI App (GPay/PhonePe)</span>
          <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-80" />
        </a>
        <p className="text-[10px] text-slate-400 text-center mt-1 sm:hidden">
          Tap above to launch GPay, PhonePe, or Paytm directly
        </p>
      </div>

      <div className="flex items-center gap-2 w-full my-1">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">or scan QR code</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      {/* QR Code Container */}
      <div className="relative p-2.5 bg-slate-50 border-2 border-dashed border-emerald-400 rounded-2xl my-2.5 group">
        <img
          src={qrUrl}
          alt="GPay QR Code - 8168707120"
          className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded-xl"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const fallback = document.getElementById("qr-fallback");
            if (fallback) fallback.style.display = "flex";
          }}
        />
        
        {/* Visual Fallback if network blocks QR API */}
        <div 
          id="qr-fallback" 
          className="hidden w-40 h-40 sm:w-44 sm:h-44 flex-col items-center justify-center bg-slate-100 rounded-xl p-3 text-center"
        >
          <QrCode className="w-14 h-14 text-emerald-600 mb-2" />
          <span className="text-[11px] font-bold text-slate-800">Scan via GPay / UPI</span>
          <span className="text-[10px] text-slate-500 font-mono">8168707120@upi</span>
        </div>

        {/* Center UPI Badge on QR */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded-md shadow-md border border-slate-200 flex items-center gap-1">
          <span className="text-[10px] font-black text-indigo-700">GPay</span>
        </div>
      </div>

      {/* UPI / GPay Number Box */}
      <div className="w-full bg-slate-50 rounded-xl p-2.5 border border-slate-200 flex items-center justify-between gap-2 mt-1">
        <div className="text-left overflow-hidden">
          <span className="text-[10px] text-slate-400 block font-semibold leading-none">GPay / UPI Number</span>
          <span className="font-mono font-black text-slate-900 text-sm sm:text-base tracking-wider leading-tight">
            {gpayNumber}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      <div className="text-[10px] text-slate-500 font-medium mt-2.5 text-center flex items-center justify-center gap-1">
        <span>Verified Payee:</span>
        <span className="font-bold text-slate-700">Gunjan Gaur</span>
      </div>
    </div>
  );
}
