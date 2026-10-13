import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Award, 
  Download, 
  Printer, 
  X, 
  Check, 
  Copy, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Edit3, 
  Calendar,
  BookOpen
} from "lucide-react";
import { 
  CourseCertificateConfig, 
  generateCertificateId, 
  getCertificateHonour 
} from "../data/certificatesData";
import { Course } from "../data";
import { QuizResultRecord } from "../context";

interface CertificateModalProps {
  course: Course;
  config: CourseCertificateConfig;
  studentName: string;
  quizResult?: QuizResultRecord;
  completionDate?: string;
  onClose: () => void;
  onUpdateName?: (newName: string) => void;
}

export function CertificateModal({
  course,
  config,
  studentName,
  quizResult,
  completionDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }),
  onClose,
  onUpdateName
}: CertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentName, setCurrentName] = useState(studentName);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const scorePercent = quizResult?.percent ?? 85;
  const honour = getCertificateHonour(scorePercent);
  const certId = generateCertificateId(course.id, currentName);

  // Trigger celebration confetti on open
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas not supported
    }
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(certId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2200);
  };

  const handleSaveName = () => {
    if (currentName.trim()) {
      setIsEditingName(false);
      if (onUpdateName) {
        onUpdateName(currentName.trim());
      }
    }
  };

  /**
   * Generates a high-resolution, pixel-perfect PNG using HTML5 Canvas
   */
  const handleDownloadImage = () => {
    setIsDownloading(true);

    try {
      const width = 1600;
      const height = 1100;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // 1. Background Parchment / Cream Texture
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#ffffff");
      bgGrad.addColorStop(0.5, "#fafaf9");
      bgGrad.addColorStop(1, "#f5f5f4");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle watermarked diagonal background lines
      ctx.save();
      ctx.strokeStyle = "rgba(15, 33, 71, 0.02)";
      ctx.lineWidth = 1;
      for (let x = -height; x < width + height; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Outer Border (Deep Navy Blue #0f2147)
      ctx.strokeStyle = "#0f2147";
      ctx.lineWidth = 14;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // 3. Middle Gold Inset Border (#d97706 & #f59e0b)
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 4;
      ctx.strokeRect(52, 52, width - 104, height - 104);

      // 4. Inner Fine Navy Line
      ctx.strokeStyle = "rgba(15, 33, 71, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(64, 64, width - 128, height - 128);

      // Decorative Corner Brackets (Antique Gold)
      const drawCorner = (cx: number, cy: number, rot: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.fillStyle = "#d97706";
        ctx.fillRect(-15, -15, 30, 4);
        ctx.fillRect(-15, -15, 4, 30);
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCorner(75, 75, 0);
      drawCorner(width - 75, 75, Math.PI / 2);
      drawCorner(width - 75, height - 75, Math.PI);
      drawCorner(75, height - 75, -Math.PI / 2);

      // 5. Header: Institution Name & Brand
      ctx.textAlign = "center";
      
      // Top Emblem Text
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillStyle = "#d97706";
      ctx.fillText("★ ★ ★   OFFICIAL ACCREDITATION OF MERIT   ★ ★ ★", width / 2, 125);

      // Organization Name
      ctx.font = "900 42px 'Inter', sans-serif";
      ctx.fillStyle = "#0f2147";
      ctx.fillText("EDUCATION HUB", width / 2, 185);

      // Sub-brand By Gunjan Gaur
      ctx.font = "italic 600 24px 'Georgia', serif";
      ctx.fillStyle = "#4338ca";
      ctx.fillText("Founded & Mentored by Gunjan Gaur", width / 2, 225);

      // Decorative Divider Line with Diamond
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 250, 255);
      ctx.lineTo(width / 2 + 250, 255);
      ctx.stroke();

      ctx.fillStyle = "#d97706";
      ctx.beginPath();
      ctx.arc(width / 2, 255, 6, 0, Math.PI * 2);
      ctx.fill();

      // Certificate Title
      ctx.font = "bold 20px 'Inter', sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.letterSpacing = "6px";
      ctx.fillText("CERTIFICATE OF COMPLETION & ACHIEVEMENT", width / 2, 310);

      // Presentation Text
      ctx.font = "italic 22px 'Georgia', serif";
      ctx.fillStyle = "#475569";
      ctx.fillText("This is to proudly certify that", width / 2, 380);

      // Student Name (Prominent & Elegant)
      ctx.font = "bold 56px 'Georgia', serif";
      ctx.fillStyle = "#0f2147";
      ctx.fillText(currentName, width / 2, 455);

      // Underline for student name
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const nameWidth = ctx.measureText(currentName).width;
      ctx.moveTo(width / 2 - nameWidth / 2 - 20, 475);
      ctx.lineTo(width / 2 + nameWidth / 2 + 20, 475);
      ctx.stroke();

      // Course statement
      ctx.font = "20px 'Inter', sans-serif";
      ctx.fillStyle = "#475569";
      ctx.fillText(
        "has successfully completed all modules and passed the comprehensive assessment for:",
        width / 2,
        525
      );

      // Course Title
      ctx.font = "800 38px 'Inter', sans-serif";
      ctx.fillStyle = "#1e1b4b";
      ctx.fillText(config.courseTitle, width / 2, 580);

      // Curriculum & Honour Details
      ctx.font = "600 19px 'Inter', sans-serif";
      ctx.fillStyle = "#0f766e";
      ctx.fillText(
        `Curriculum: ${course.modules.length} Modules Completed   •   Score: ${scorePercent}% (${honour.grade})   •   ${honour.title}`,
        width / 2,
        630
      );

      // Key Skills Acquired
      ctx.font = "16px 'Inter', sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText(
        `Verified Competencies: ${config.skillsLearned.slice(0, 4).join("  •  ")}`,
        width / 2,
        665
      );

      // 6. Signatures and Seal Section
      const bottomY = 870;

      // Left: Date & Credential ID
      ctx.textAlign = "left";
      ctx.font = "bold 15px 'Inter', sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("DATE OF ISSUANCE", 160, bottomY - 35);
      ctx.font = "600 18px 'Inter', sans-serif";
      ctx.fillStyle = "#0f2147";
      ctx.fillText(completionDate, 160, bottomY - 10);

      ctx.font = "bold 13px 'Inter', sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("CREDENTIAL VERIFICATION ID", 160, bottomY + 30);
      ctx.font = "700 15px monospace";
      ctx.fillStyle = "#1e293b";
      ctx.fillText(certId, 160, bottomY + 52);

      // Center: Official Gold Seal
      ctx.save();
      const sealX = width / 2;
      const sealY = bottomY;

      // Rosette / Seal Outer Ring
      ctx.beginPath();
      ctx.arc(sealX, sealY, 65, 0, Math.PI * 2);
      const sealGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, 65);
      sealGrad.addColorStop(0, "#fde68a");
      sealGrad.addColorStop(0.7, "#d97706");
      sealGrad.addColorStop(1, "#b45309");
      ctx.fillStyle = sealGrad;
      ctx.fill();

      // Inner ring
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sealX, sealY, 52, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.stroke();

      // Seal text
      ctx.textAlign = "center";
      ctx.font = "bold 13px 'Inter', sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("VERIFIED", sealX, sealY - 14);
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText("★ 100% ★", sealX, sealY + 8);
      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.fillText("AUTHENTIC", sealX, sealY + 26);
      ctx.restore();

      // Right: Instructor Signature
      ctx.textAlign = "right";
      
      // Signature text in cursive script
      ctx.font = "italic bold 34px 'Brush Script MT', 'Dancing Script', cursive, Georgia";
      ctx.fillStyle = "#0f2147";
      ctx.fillText("Gunjan Gaur", width - 160, bottomY - 30);

      // Signature Underline
      ctx.strokeStyle = "#0f2147";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width - 340, bottomY - 15);
      ctx.lineTo(width - 160, bottomY - 15);
      ctx.stroke();

      // Instructor Title
      ctx.font = "bold 16px 'Inter', sans-serif";
      ctx.fillStyle = "#0f2147";
      ctx.fillText("Gunjan Gaur", width - 160, bottomY + 12);
      ctx.font = "14px 'Inter', sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Lead Educator & Founder, Education Hub", width - 160, bottomY + 34);
      ctx.font = "13px 'Inter', sans-serif";
      ctx.fillStyle = "#059669";
      ctx.fillText("Verified Digital Instructor Credential", width - 160, bottomY + 54);

      // Convert to PNG and Trigger Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanCourseTitle = course.title.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 25);
      const cleanStudentName = currentName.replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `Certificate_${cleanCourseTitle}_${cleanStudentName}.png`;
      link.href = dataUrl;
      link.click();

      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Canvas export failed:", err);
      setIsDownloading(false);
    }
  };

  /**
   * Triggers browser print (A4 landscape)
   */
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="print:hidden p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Official Completion Certificate
              </h3>
              <p className="text-[11px] text-slate-400">
                Verified by Gunjan Gaur • ID: {certId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print or Save as PDF"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors text-xs font-semibold hidden sm:flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? "Generating HD..." : "Download PNG"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-4 sm:p-8 bg-slate-100 overflow-x-auto flex justify-center">
          <div 
            ref={certificateRef}
            id="printable-certificate"
            className="w-full max-w-[850px] bg-stone-50 border-8 border-[#0f2147] rounded-xl p-6 sm:p-10 shadow-xl relative text-center select-none"
            style={{
              boxShadow: "0 20px 40px -15px rgba(15, 33, 71, 0.25)"
            }}
          >
            {/* Inset Gold Border */}
            <div className="border-2 border-amber-600 rounded-lg p-5 sm:p-8 relative bg-white/70 backdrop-blur-xs">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-600"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-600"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-600"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-600"></div>

              {/* Top Seal & Organization */}
              <div className="text-center mb-4">
                <span className="text-[11px] font-bold text-amber-600 tracking-widest uppercase block mb-1">
                  ★ ★ ★ OFFICIAL CERTIFICATE OF COMPLETION ★ ★ ★
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-[#0f2147] tracking-wider uppercase font-serif">
                  EDUCATION HUB
                </h1>
                <p className="text-indigo-800 font-serif italic text-xs sm:text-sm font-semibold">
                  Mentored & Founded by Gunjan Gaur
                </p>
                <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-2"></div>
              </div>

              {/* Certificate Purpose */}
              <div className="my-4">
                <p className="text-xs sm:text-sm text-slate-500 font-serif italic mb-1">
                  This is proudly presented to
                </p>

                {/* Recipient Name */}
                <div className="my-2 sm:my-3">
                  {isEditingName ? (
                    <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
                      <input
                        type="text"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        className="text-lg sm:text-2xl font-bold font-serif text-[#0f2147] text-center border-b-2 border-indigo-600 focus:outline-none bg-transparent px-2 py-0.5"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-bold"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="group inline-flex items-center justify-center gap-2">
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f2147] font-serif border-b-2 border-amber-500/80 pb-1 px-4">
                        {currentName}
                      </h2>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="print:hidden text-slate-400 hover:text-indigo-600 p-1 opacity-70 group-hover:opacity-100 transition-opacity"
                        title="Edit name for certificate"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-3 leading-relaxed">
                  for successfully finishing all curriculum modules and passing the qualifying examination with honors in
                </p>

                {/* Course Name */}
                <h3 className="text-lg sm:text-2xl font-black text-[#0f2147] mt-2 mb-1 tracking-tight">
                  {config.courseTitle}
                </h3>

                <div className="inline-flex items-center gap-2 mt-1 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-900 text-xs font-bold">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{honour.title} • Score: {scorePercent}%</span>
                </div>
              </div>

              {/* Skills Tagline */}
              <div className="text-[11px] text-slate-500 my-4 max-w-md mx-auto hidden sm:block">
                <span>Verified Skills: </span>
                <span className="font-semibold text-slate-700">
                  {config.skillsLearned.join(" · ")}
                </span>
              </div>

              {/* Bottom Verification & Signatures */}
              <div className="grid grid-cols-3 items-end pt-6 mt-4 border-t border-slate-200/80 text-left">
                
                {/* Date & Serial */}
                <div className="text-left space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Issue Date
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {completionDate}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    ID: {certId}
                  </div>
                </div>

                {/* Golden Emblem Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-white flex flex-col items-center justify-center p-1 shadow-md border-2 border-white">
                    <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 mb-0.5 text-white" />
                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-center leading-none">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Instructor Signature */}
                <div className="text-right space-y-0.5">
                  <div className="font-serif italic text-lg sm:text-xl font-bold text-[#0f2147] tracking-tight">
                    Gunjan Gaur
                  </div>
                  <div className="w-28 ml-auto h-0.5 bg-slate-400 my-0.5"></div>
                  <div className="text-xs font-bold text-slate-800">
                    Gunjan Gaur
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Educator & Founder, Education Hub
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Bottom Action Footer (Hidden on print) */}
        <div className="print:hidden p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">
              {certId}
            </span>
            <button
              onClick={handleCopyId}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId ? "Copied ID!" : "Copy ID"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `🎓 I have successfully completed the course "${config.courseTitle}" with ${scorePercent}% on Education Hub by Gunjan Gaur! Certificate ID: ${certId}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Share</span>
            </a>

            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0f2147] hover:bg-[#1a3673] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>
                {downloadSuccess ? "Downloaded Successfully!" : isDownloading ? "Generating..." : "Download High-Res PNG"}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
