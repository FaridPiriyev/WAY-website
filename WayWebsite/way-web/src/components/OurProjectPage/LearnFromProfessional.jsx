"use client";
import { useTranslations } from 'next-intl';
import React, { useEffect, useState, useRef } from 'react';

// Animation Hook
const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);
  const observer = useRef();

  const { threshold = 0.1, rootMargin = "0px" } = options;

  const updateEntry = (entries) => {
    setEntries(entries);
  };

  const observe = (element) => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(updateEntry, {
      threshold,
      rootMargin,
    });
    
    if (element) observer.current.observe(element);
  };

  const unobserve = () => {
    if (observer.current) observer.current.disconnect();
  };

  return [entries, observe, unobserve];
};

// Animated Section Component
const AnimatedSection = ({ children, className = "", animationType = "fadeInUp", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();
  const [entries, observe] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px"
  });

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current);
    }
  }, [observe]);

  useEffect(() => {
    if (entries.length > 0) {
      setIsVisible(entries[0].isIntersecting);
    }
  }, [entries]);

  const getAnimationClass = () => {
    const baseClasses = "transition-all duration-1000 ease-out";
    
    if (animationType === "fadeInUp") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`;
    } else if (animationType === "fadeInLeft") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 -translate-x-10"
      }`;
    } else if (animationType === "fadeInRight") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 translate-x-10"
      }`;
    } else if (animationType === "scaleIn") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-95"
      }`;
    } else if (animationType === "slideInUp") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
      }`;
    }
    
    return baseClasses;
  };

  return (
    <div
      ref={sectionRef}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LearnFromComponent() {
  const t = useTranslations("LearnFrom");
  
  return (
    <div className="w-full bg-white">
      {/* Main Title */}
      <AnimatedSection animationType="scaleIn" className="flex justify-center px-4">
        <div className="">
          <h1 className='text-lg w-[250px] sm:w-[800px] md:w-full sm:text-2xl md:text-[30px] font-bold text-[#15529F] mt-4 mb-5 text-center leading-relaxed max-w-[300px] md:max-w-[500px] lg:max-w-[700px]'>
            {t('title')}
          </h1>
        </div>
      </AnimatedSection>
             
      {/* Breadcrumb Navigation - Animated */}
      <AnimatedSection animationType="fadeInLeft" className="max-w-screen-xl mx-auto pt-3 pb-3 sm:pt-4 sm:pb-4 px-4">
        <div className="flex items-center text-base font-semibold sm:text-lg">
          <div className="group cursor-pointer">
            <a herf="/" className="text-gray-600 hover:text-[#15529F] hover:translate-x-1 transition-all duration-500 ease-out">
              {t('breadcrumb_projects')}
            </a>
          </div>
          <span className="mx-2 text-gray-400 hover:text-gray-600 hover:rotate-12 transition-all duration-300">/</span>
          <div className="group cursor-pointer">
            <span className="text-[#15529F] hover:text-blue-600 hover:translate-x-1 hover:brightness-110 hover:scale-105 transform transition-all duration-500 ease-out">
              {t('breadcrumb_page')}
            </span>
          </div>
        </div>
      </AnimatedSection>
             
      {/* Main Content - Animated paragraphs */}
      <div className="max-w-screen-xl mx-auto py-5 sm:py-6 md:py-8 px-4 mb-10 sm:mb-16 md:mb-20">
        <div className="space-y-6 sm:space-y-8 md:space-y-10 text-gray-700">
          <AnimatedSection animationType="slideInUp" delay={100}>
            <p className="text-base sm:text-lg md:text-[20px] leading-relaxed hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
              {t('paragraph_1')}
            </p>
          </AnimatedSection>
                     
          <AnimatedSection animationType="slideInUp" delay={200}>
            <p className="text-base sm:text-lg md:text-[20px] leading-relaxed hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
              {t('paragraph_2')}
            </p>
          </AnimatedSection>
                     
          <AnimatedSection animationType="slideInUp" delay={300}>
            <p className="text-base sm:text-lg md:text-[20px] leading-relaxed hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
              {t('paragraph_3')}
            </p>
          </AnimatedSection>
        </div>
      </div>
       
      {/* Bottom Border - Animated */}
      <AnimatedSection animationType="fadeInUp" delay={400}>
        <div className="w-full border-t border-gray-200 hover:border-gray-300 transition-all duration-300"></div>
      </AnimatedSection>
    </div>
  );
}