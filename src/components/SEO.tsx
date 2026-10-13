import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function SEO({ title, description, keywords }: SEOProps) {
  const defaultTitle = "Education Hub by Gunjan Gaur";
  const defaultDescription = "Learn from Education Hub by GUNJAN GAUR. Get free courses on C Programming, C++, Logical Organization, Digital Marketing, Computer Basics, MS Office, and Science. Watch full high-quality video tutorials on our YouTube channel.";
  const defaultKeywords = "Education Hub by GUNJAN GAUR, Gunjan Gaur, Gunjan Gaur YouTube, free programming courses, learn C programming, learn C++, Logical organization computer, Computer basics, MS Office course, Science course, digital marketing tutorials online, best computer courses by Gunjan Gaur, programming for beginners, Education Hub videos";

  useEffect(() => {
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || defaultDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = description || defaultDescription;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords || defaultKeywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = keywords || defaultKeywords;
      document.head.appendChild(meta);
    }
  }, [title, description, keywords]);

  return null;
}
