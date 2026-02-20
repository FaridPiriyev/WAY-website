"use client";
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { useEffect, useState, useRef } from "react";

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
    rootMargin: "20px"
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
    const baseClasses = "transition-all duration-700 ease-out";
    
    if (animationType === "fadeInUp") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4"
      }`;
    } else if (animationType === "fadeInLeft") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 -translate-x-4"
      }`;
    } else if (animationType === "fadeInRight") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 translate-x-4"
      }`;
    } else if (animationType === "scaleIn") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-98"
      }`;
    } else if (animationType === "slideInUp") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-6"
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

export default function Home() {
  const t = useTranslations("pythonTraining");
  
  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl py-4 sm:py-6 container mx-auto px-4 flex flex-col items-center'>
        {/* Main Title */}
        <AnimatedSection animationType="scaleIn" className='text-2xl w-[300px] sm:w-full sm:text-[30px] lg:text-4xl font-bold text-[#15529F] mt-2 sm:mt-2 mb-10 sm:mb-8 md:mb-15 text-center'>
          <div className="">
            {t('python_title')}
          </div>
        </AnimatedSection>
         
        <div className="w-full">
          {/* Breadcrumb navigation */}
          <AnimatedSection animationType="fadeInLeft" className="flex sm:flex-row sm:items-center mb-10 sm:mb-16 md:mb-20">
            <div className="group cursor-pointer">
              <a  href="/" className="text-base sm:text-xl font-medium mb-2 sm:mb-0 hover:text-[#15529F] transition-all duration-300 ease-out">
                {t('breadcrumb_projects')}
              </a>
            </div>
            <span className="sm:inline mx-2 text-gray-400 hover:text-gray-600 transition-all duration-300">/</span>
            <div className="group cursor-pointer">
              <h2 className="text-base sm:text-xl font-medium text-[#15529F] hover:text-blue-600 hover:brightness-110 transition-all duration-300 ease-out">
                {t('breadcrumb_page_python')}
              </h2>
            </div>
          </AnimatedSection>
           
          {/* Main content */}
          <div className="space-y-10 sm:space-y-12 lg:space-y-16 xl:space-y-20 w-full">
                         
            {/* First section */}
            <AnimatedSection animationType="fadeInUp" delay={100} className='w-full'>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-gray-800 hover:text-[#15529F] transition-all duration-300 ease-out cursor-default">
                {t('paragraph_1')}
              </p>
            </AnimatedSection>
             
            {/* Section with text and image */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start lg:items-center">
              <AnimatedSection 
                animationType="fadeInLeft" 
                delay={200}
                className="w-full lg:w-1/2 order-2 lg:order-1"
              >
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 hover:text-[#15529F] transition-all duration-300 ease-out cursor-default">
                  {t('paragraph_2')}
                </p>
              </AnimatedSection>
               
              <AnimatedSection 
                animationType="fadeInRight" 
                delay={300}
                className="w-full lg:w-1/2 order-1 lg:order-2"
              >
                <div className="group cursor-pointer">
                  <div className=" hover:-translate-y-1 transform transition-all duration-500 ease-out">
                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden  hover:shadow-xl  duration-300">
                      <Image
                        src="/images/collective/Training.jpeg"
                        alt="Python training class"
                        width={588}
                        height={408}
                        className="object-cover w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                    </div>
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
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 hover:text-[#15529F] transition-all duration-300 ease-out cursor-default">
                  {t('paragraph_3')}
                </p>
              </AnimatedSection>
               
              <AnimatedSection 
                animationType="fadeInLeft" 
                delay={300}
                className="w-full lg:w-1/2 order-1 lg:order-1"
              >
                <div className="group cursor-pointer">
                  <div className=" hover:-translate-y-1 transform transition-all duration-500 ease-out">
                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/collective/pyhton.jpg"
                        alt="Python training graduates with certificates"
                        width={588}
                        height={408}
                        className="object-cover w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}