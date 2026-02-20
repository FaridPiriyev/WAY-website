"use client"
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';

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


const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef();
  const [entries, observe] = useIntersectionObserver();

  useEffect(() => {
    if (textRef.current) {
      observe(textRef.current);
    }
  }, [observe]);

  useEffect(() => {
    if (entries.length > 0 && entries[0].isIntersecting && !isVisible) {
      setIsVisible(true);
      setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 30);
        
        return () => clearInterval(interval);
      }, delay);
    }
  }, [entries, text, delay, isVisible]);

  return (
    <div ref={textRef} className={className}>
      {displayText}
      {isVisible && displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  );
};

export default function AI4culture() {
  const t = useTranslations('AI4culturePage');

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl py-4 sm:py-6 container mx-auto px-4 flex flex-col items-center'>
        {/* Main Title */}
        <AnimatedSection animationType="scaleIn" className='text-xl w-[220px] sm:w-[500px] sm:text-[30px] lg:text-3xl lg:w-[800px] font-bold text-[#15529F] mt-2 sm:mt-2 mb-10 sm:mb-8 md:mb-15 text-center'>
          <div className="hover:text-[#1a5ba8] transition-all duration-500 cursor-default hover:drop-shadow-lg hover:scale-105 hover:-translate-y-1 transform">
            {t('title')}
          </div>
        </AnimatedSection>

        <div className="w-full">
          {/* Breadcrumb navigation */}
          <AnimatedSection animationType="fadeInLeft" className="flex sm:flex-row sm:items-center mb-10 sm:mb-16 md:mb-20">
            <div className="group cursor-pointer">
              <a href="/" className="text-base sm:text-xl font-medium mb-2 sm:mb-0 hover:text-[#15529F] transition-all duration-300 hover:tracking-wide">
                {t('projects')}
              </a>
            </div>
            <span className="sm:inline mx-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">/</span>
            <div className="group cursor-pointer">
              <h2 className="text-base sm:text-xl font-medium text-[#15529F] hover:text-[#1a5ba8] transition-all duration-300 hover:tracking-wide hover:scale-105 transform">
                {t('ai4culture')}
              </h2>
            </div>
          </AnimatedSection>

          {/* Main content */}
          <div className="space-y-10 sm:space-y-12 lg:space-y-16 xl:space-y-20 w-full">
            
            {/* First section */}
            <AnimatedSection animationType="fadeInUp" delay={200} className='w-full'>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-gray-800 hover:text-[#15529F] transition-colors duration-300 cursor-default">
                {t('intro1')}
              </p>
            </AnimatedSection>

            {/* Second section */}
            <AnimatedSection animationType="fadeInUp" delay={400} className='w-full'>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-gray-800 hover:text-[#15529F] transition-colors duration-300 cursor-default">
                {t('intro2')}
              </p>
            </AnimatedSection>

            {/* Section with text and image */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start lg:items-center">
              <AnimatedSection 
                animationType="fadeInLeft" 
                delay={200}
                className="w-full lg:w-1/2 order-2 lg:order-1"
              >
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 hover:text-gray-900 transition-colors duration-300 cursor-default">
                  {t('section1')}
                </p>
              </AnimatedSection>

              <AnimatedSection 
                animationType="fadeInRight" 
                delay={400}
                className="w-full lg:w-1/2 order-1 lg:order-2"
              >
                <div className="group cursor-pointer">
                  <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 relative">
                    <div className="relative overflow-hidden">
                      <Image
                        src="/images/collective/AI4Culturepage1.jpg"
                        alt="Python training class"
                        width={588}
                        height={408}
                        className="object-cover w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="absolute -inset-1  rounded-3xl opacity-0 group-hover:opacity-20  transition-all duration-500 -z-10"></div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Section with image and text */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start lg:items-center">
              <AnimatedSection 
                animationType="fadeInRight" 
                delay={200}
                className="w-full lg:w-1/2 order-2 lg:order-2"
              >
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 hover:text-gray-900 transition-colors duration-300 cursor-default">
                  {t('section2')}
                </p>
              </AnimatedSection>

              <AnimatedSection 
                animationType="fadeInLeft" 
                delay={400}
                className="w-full lg:w-1/2 order-1 lg:order-1"
              >
                <div className="group cursor-pointer">
                  <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 hover:-rotate-1 relative">
                    <div className="relative overflow-hidden">
                      <Image
                        src="/images/collective/AI4Culturepage2.jpg"
                        alt="Python training graduates with certificates"
                        width={588}
                        height={408}
                        className="object-cover w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="absolute -inset-1  rounded-3xl opacity-0 group-hover:opacity-20  transition-all duration-500 -z-10"></div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Final section */}
            <AnimatedSection 
              animationType="slideInUp" 
              delay={200}
              className="pb-10 sm:pb-12 md:pb-16 lg:pb-20"
            >
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                <p className="hover:text-gray-900 transition-colors duration-300 cursor-default">
                  {t('final1')}
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 cursor-default">
                  {t('final2')}
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
    </div>
  );
}