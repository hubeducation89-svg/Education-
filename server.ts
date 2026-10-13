import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const smtpEmail = process.env.SMTP_EMAIL;
      const smtpPassword = process.env.SMTP_PASSWORD;

      if (!smtpEmail || !smtpPassword) {
        console.warn("SMTP_EMAIL or SMTP_PASSWORD is not set. Logging the message instead of sending an email.");
        console.log(`\nNew Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}\n`);
        return res.json({ success: true, message: "Message received (logged locally)" });
      }

      // Configure Nodemailer for Gmail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpEmail,
          pass: smtpPassword, // Use an App Password if using Gmail with 2FA
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: smtpEmail, // Sending to the same email or change to your preferred receiver
        subject: `New message from ${name} (Education Hub Contact Form)`,
        text: `You have received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage:\n${message}`,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");

      res.json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Email Error:", error);
      res.status(500).json({ error: error.message || "Failed to send email" });
    }
  });

  // Sitemap Route
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    const domain = "https://educationhub.in"; // Fallback/default domain

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/courses</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/notes</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${domain}/dashboard</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
    
    res.send(sitemap);
  });

  // API Route for Gemini Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are a helpful and friendly chatbot assistant for 'Education Hub', an online learning platform. Provide concise and informative answers about the platform and learning in general.",
        },
      });

      // We simulate history by sending the message, but real implementation would need 
      // the SDK to support history init properly if needed.
      // For simplicity, we just send the new message with context if possible, 
      // or we can recreate the state. With `@google/genai`, ideally we'd pass history into `create`. 
      // Let's check if `@google/genai` allows history. In SKILL.md, no history passing is shown for chat. 
      // We will just do `ai.models.generateContent` with a combined prompt, or use `contents` array.
      
      let contents = [];
      if (history && history.length > 0) {
        contents = history.map((msg: any) => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        }));
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: "You are a helpful and friendly chatbot assistant for 'Education Hub by Gunjan Gaur', an online learning platform. Provide concise and informative answers about the platform, courses available (C Programming, Mathematics, C++, Digital Electronics, MS Office), and learning in general.",
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} - Fresh Boot`);
  });
}

startServer();
