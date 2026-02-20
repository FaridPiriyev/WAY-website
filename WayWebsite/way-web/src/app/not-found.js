"use client";

import React, { useState, useEffect } from "react";
import { Home, ArrowLeft, Sparkles, Star } from "lucide-react";

import { useTranslations } from 'next-intl';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [starData, setStarData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("error");

  useEffect(() => {
    
    const stars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
      animationDuration: Math.random() * 2 + 2
    }));
    setStarData(stars);
    setMounted(true);
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoBack = () => window.history.back();
  const handleGoHome = () => (window.location.href = "/");

  const FloatingElement = ({ delay = 0, size = 20, top = "20%", left = "20%" }) => (
    <div
      className="absolute opacity-20 animate-bounce"
      style={{
        top,
        left,
        animationDelay: `${delay}s`,
        animationDuration: "3s",
      }}
    >
      <div className="bg-blue-400 rounded-full blur-sm" style={{ width: size, height: size }} />
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, rgba(79, 70, 229, 0.2) 50%, rgba(30, 41, 59, 0.9) 100%)`,
        }}
      />

      {/* Floating elements */}
      <FloatingElement delay={0} size={30} top="10%" left="10%" />
      <FloatingElement delay={1} size={20} top="20%" left="80%" />
      <FloatingElement delay={2} size={25} top="70%" left="15%" />
      <FloatingElement delay={0.5} size={15} top="60%" left="85%" />
      <FloatingElement delay={1.5} size={35} top="40%" left="70%" />

    
      {mounted && (
        <div className="absolute inset-0">
          {starData.map((star) => (
            <Star
              key={star.id}
              className="absolute text-white opacity-30 animate-pulse"
              size={star.size}
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: `${star.animationDuration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div
          className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Logo */}
          <div className="mb-8 animate-fadeInDown">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-6 border border-white/20">
                <img src="/images/logos/waylogo.png" alt="WAYO Logo" className="h-40 w-auto filter drop-shadow-2xl" />
              </div>
            </div>
          </div>

          {/* 404 Title */}
          <div className="mb-8 relative">
            <h1
              className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-700 to-blue-800 mb-4 animate-pulse select-none"
              style={{
                textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                animation: "float 6s ease-in-out infinite",
              }}
            >
              404
            </h1>

            <div className="relative">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full"></div>
              <div className="absolute inset-0 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("page_not_found")}
            </h2>
            <div className="relative">
              <p className="text-xl text-blue-500 mb-6 max-w-2xl mx-auto leading-relaxed">
                {t("not_found_message")}
              </p>
              <Sparkles className="absolute -top-2 -right-4 text-yellow-400 animate-spin" size={20} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={handleGoHome}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Home size={24} className="transition-transform group-hover:rotate-12" />
                <span>{t("home")}</span>
              </div>
            </button>

            <button
              onClick={handleGoBack}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/10"
            >
              <div className="relative flex items-center justify-center gap-3">
                <ArrowLeft size={24} className="transition-transform group-hover:-translate-x-1" />
                <span>{t("go_back")}</span>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
            <p className="text-blue-200/80 text-lg">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">
                {t("organization_name")}
              </span>
              <br />
              <span className="text-sm">{t("slogan")}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
}