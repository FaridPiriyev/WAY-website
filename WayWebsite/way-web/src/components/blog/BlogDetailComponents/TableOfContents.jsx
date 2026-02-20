import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";


export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");

  const t = useTranslations("TableOfContents");

  useEffect(() => {
    const mockHeadings = [
      { id: "giris", title: t("items.introduction"), level: 2 },
      { id: "ana-mezmun", title: t("items.mainContent"), level: 2 },
      { id: "tarixsel-kontekst", title: t("items.historicalContext"), level: 3 },
      { id: "muasir-baxis", title: t("items.modernPerspective"), level: 3 },
      { id: "netice", title: t("items.conclusion"), level: 2 }
    ];
    setHeadings(mockHeadings);
  }, [content, t]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHeading(id);
    }
  };

  return (
    <div className="sticky top-8">
      <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="font-bold text-gray-900 mb-6 flex items-center text-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          {t("headingTitle")}
        </h3>
        <ul className="space-y-2">
          {headings.map((heading, index) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full p-3 rounded-xl transition-all duration-300 text-sm group ${
                  heading.level === 3 ? "ml-4" : ""
                } ${
                  activeHeading === heading.id 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative">
                  {heading.title}
                  <span className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-current rounded-full transition-all duration-300 ${
                    activeHeading === heading.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}></span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
