"use client"

import Link from "next/link";
import Facebook from "../../../public/svg/Facebook_black.svg";
import Mail from "../../../public/svg/Instagram_black.svg";
import Tiktok from "../../../public/svg/Instagram_black-3.svg";
import Instagram from "../../../public/svg/Instagram_black-2.svg";
import LinkedIn from "../../../public/svg/Instagram_black-1.svg";
import Twitter from "../../../public/svg/X.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Footer = () => {
  const tFooter = useTranslations("Footer");
  const [particleData, setParticleData] = useState([]);
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 3 + Math.random() * 4
    }));
    setParticleData(particles);
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gradient-to-br from-[#134A8F] via-[#1e5ba8] to-[#0d3a78] text-white py-12 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/3 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/4 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/6 rounded-full animate-spin"></div>
      </div>

     
      {mounted && (
        <div className="absolute inset-0">
          {particleData.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
         
          {/* About Section */}
          <div className="flex justify-center md:justify-start text-center md:text-start group">
            <div className="w-full transform transition-all duration-700 hover:translate-y-[-10px]">
              <h2 className="text-xl font-semibold mb-4 relative overflow-hidden">
                <span className="inline-block transition-all duration-500 group-hover:text-yellow-300 ">
                  {tFooter("about")}
                  
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-500 group-hover:w-full"></div>
              </h2>
            
              <ul className="space-y-4 mb-10">
                {[
                  { href: "/#vision", text: tFooter("our_goals") },
                  { href: "/#vision", text: tFooter("our_vision") },
                  { href: "/#team", text: tFooter("our_team") },
                  { href: "/#projects", text: tFooter("our_projects") }
                ].map((item, index) => (
                  <li key={index} className="transform transition-all duration-300 hover:translate-x-3 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}>
                    <Link href={item.href} className="animated-underline relative group/link">
                      <span className="transition-all duration-300 group-hover/link:text-cyan-300">
                        {item.text}
                      </span>
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover/link:w-3"></div>
                    </Link>
                  </li>
                ))}
                <div className="h-[1px] w-full md:hidden bg-gradient-to-r from-transparent via-gray-400 to-transparent mt-10 animate-pulse"></div>
              </ul>
            </div>
          </div>

          {/* Objectives Section */}
          <div className="flex justify-center md:justify-start text-center md:text-start group">
            <div className="w-full transform transition-all duration-700 hover:translate-y-[-10px]">
              <h2 className="text-xl font-semibold mb-4 relative overflow-hidden">
                <span className="inline-block transition-all duration-500 group-hover:text-green-300 ">
                  {tFooter("objectives")}
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-500 group-hover:w-full"></div>
              </h2>
             
              <ul className="space-y-4 mb-10">
                {[
                  tFooter("objective_1"),
                  tFooter("objective_2"),
                  tFooter("objective_3"),
                  tFooter("objective_4"),
                  tFooter("objective_5"),
                  tFooter("objective_6")
                ].map((objective, index) => (
                  <li key={index} className="transform transition-all duration-300 hover:translate-x-2 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}>
                    <h1 className="animated-underline relative group/obj cursor-default">
                      <span className="transition-all duration-300 group-hover/obj:text-green-300">
                        {objective}
                      </span>
                      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0.5 bg-green-300 transition-all duration-300 group-hover/obj:w-2"></div>
                    </h1>
                  </li>
                ))}
                <div className="h-[1px] w-full md:hidden bg-gradient-to-r from-transparent via-gray-400 to-transparent mt-10 mb-6 animate-pulse"></div>
              </ul>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="flex justify-center md:justify-end text-center md:text-start group">
            <div className="w-full transform transition-all duration-700 hover:translate-y-[-10px]">
              <h2 className="text-xl font-semibold mb-4 relative overflow-hidden">
                <span className="inline-block transition-all duration-500 group-hover:text-pink-300 ">
                  {tFooter("values")}
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 transition-all duration-500 group-hover:w-full"></div>
              </h2>
             
              <ul className="space-y-4">
                {[
                  tFooter("value_1"),
                  tFooter("value_2"),
                  tFooter("value_3"),
                  tFooter("value_4"),
                  tFooter("value_5")
                ].map((value, index) => (
                  <li key={index} className="transform transition-all duration-300 hover:translate-x-2 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}>
                    <h1 className="animated-underline relative group/val cursor-default">
                      <span className="transition-all duration-300 group-hover/val:text-pink-300">
                        {value}
                      </span>
                      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0.5 bg-pink-300 transition-all duration-300 group-hover/val:w-2"></div>
                    </h1>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-end mt-12 space-x-4">
          {[
            { href: "mailto:info@wayunion.org", icon: Mail, alt: "Email", color: "hover:bg-red-100" },
            { href: "https://www.linkedin.com/company/worldazeyouth-union/", icon: LinkedIn, alt: "LinkedIn", color: "hover:bg-blue-100" },
            { href: "https://www.instagram.com/worldazeyouth.az?igsh=MWdibm1yeGh5c3l2YQ%3D%3D&utm_source=qr", icon: Instagram, alt: "Instagram", color: "hover:bg-pink-100" },
            { href: "https://www.facebook.com/share/18pYkGSpof/?mibextid=wwXIfr", icon: Facebook, alt: "Facebook", color: "hover:bg-blue-100" },
            { href: "https://x.com/wayunion_az", icon: Twitter, alt: "Twitter", color: "hover:bg-gray-100" },
            { href: "https://www.tiktok.com/@worldazeyouth?_t=ZS-8waeBGgZAAb&_r=1", icon: Tiktok, alt: "TikTok", color: "hover:bg-black" }
          ].map((social, index) => (
            <Link
              key={index}
              href={social.href}
              className={`bg-white rounded-full p-2 text-blue-800 ${social.color} transition-all duration-300 
                         transform hover:scale-125 hover:rotate-12 hover:shadow-lg animate-bounce`}
              style={{ animationDelay: `${index * 0.2}s`, animationDuration: '2s' }}
            >
              <Image
                className="h-5 w-5 transition-all duration-300"
                priority
                src={social.icon}
                alt={social.alt}
              />
            </Link>
          ))}
        </div>

        {/* Developer Credits */}
        <div className="border-t border-white/20 mt-8 pt-6 flex items-center justify-center space-x-3 text-sm text-white/80 group">
          <svg 
            className="w-4 h-4 animate-pulse group-hover:animate-spin transition-all duration-300" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" 
              fill="currentColor"
            />
          </svg>
          <span className="transition-all duration-300 group-hover:text-white">Coded by</span>
          <a 
            href="https://www.linkedin.com/in/rauf-huseynzade/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="animated-underline font-medium  transition-all duration-300 transform hover:scale-110 hover:text-yellow-300"
          >
            H.Rauf
          </a>
          <span className="transition-all duration-300 group-hover:text-white">&</span>
          <a 
            href="https://www.linkedin.com/in/hikmetnasibli/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="animated-underline font-medium  transition-all duration-300 transform hover:scale-110 hover:text-yellow-300"
          >
            P.Farid
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-underline {
          position: relative;
          overflow: hidden;
        }
        
        .animated-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transition: left 0.5s ease;
        }
        
        .animated-underline:hover::after {
          left: 100%;
        }
      `}</style>
    </footer>
  );
};

export default Footer;