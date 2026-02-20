"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
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

export default function ClimateProject() {
  const t = useTranslations('climateProject');

  return (
    <div className="max-w-7xl py-4 sm:py-6 container mx-auto px-4 flex flex-col items-center">
      {/* Main Title */}
      <AnimatedSection animationType="scaleIn" className=" text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-[#15529F] sm:mt-0 md:mt-0 mb-15 sm:mb-5 text-center leading-relaxed max-w-[200px] xs:max-w-[550px] md:max-w-[600px] lg:max-w-3xl">
        <div className="cursor-default">
          {t('title')}
        </div>
      </AnimatedSection>

      <div className="w-full">
        <div className="flex flex-col">
          {/* Breadcrumb navigation */}
          <AnimatedSection animationType="fadeInLeft" className="flex sm:flex-row sm:items-center mb-10 sm:mb-16 md:mb-20">
            <div className="group cursor-pointer">
              <a href="/" className="text-lg sm:text-xl font-medium mb-2 sm:mb-0 hover:text-[#15529F] hover:translate-x-1  transition-all duration-500 ease-out">
                {t('projects')}
              </a>
            </div>
            <span className="sm:inline mx-2 text-gray-400 hover:text-gray-600 hover:rotate-12 transition-all duration-300">/</span>
            <div className="group cursor-pointer">
              <h2 className="text-lg sm:text-xl font-medium text-[#15529F] hover:text-blue-900 hover:translate-x-1 hover:brightness-110  hover:scale-105 transform transition-all duration-500 ease-out">
                {t('cop29')}
              </h2>
            </div>
          </AnimatedSection>

          {/* Main background content */}
          <AnimatedSection animationType="scaleIn" delay={200} className="relative rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 overflow-hidden">
            <div className="group cursor-pointer">
              <div className="hover:shadow-2xl hover:shadow-blue-200/30 hover:-translate-y-1 transform transition-all duration-700 ease-out">
                <div
                  className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-md shadow-md transition-all duration-700 ease-out group-hover:backdrop-blur-lg"
                  style={{
                    backgroundImage: `url("/images/others/background.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                  }}
                >
                  <div className="absolute inset-0 -z-10 transition-all duration-700 ease-out group-hover:scale-105">
                    <Image
                      src="/images/others/background2.jpg"
                      alt="Background pattern"
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    
                    />
                  </div>

                  <p className="leading-relaxed backdrop-blur-xl text-sm sm:text-base md:text-lg bg-white/50 text-black px-4 sm:px-5 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-wrap hover:bg-white/70 hover:backdrop-blur-2xl transition-all duration-500 ease-out cursor-default">
                    {t('projectDescription')}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Middle content with image */}
          <div className="mt-6 sm:mt-8 gap-4 sm:gap-6 items-start">
            {/* Text Block */}
            <AnimatedSection animationType="fadeInLeft" delay={400} className="space-y-3 sm:space-y-4 text-sm leading-relaxed mb-6 sm:mb-8 md:mb-10">
              <p className="text-base sm:text-base md:text-base lg:text-xl hover:text-[#15529F]  hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                {t('eventDetails')}
              </p>
            </AnimatedSection>
          </div>

          {/* Bottom text content with image */}
          <div className="mt-6 sm:mt-8 space-y-4 text-sm leading-relaxed flex flex-col md:grid md:grid-cols-2 items-start md:items-center gap-4 sm:gap-6">
            <AnimatedSection 
              animationType="fadeInLeft" 
              delay={200}
              className="order-2 md:order-1"
            >
              <p className="text-base sm:text-base md:text-base lg:text-xl hover:text-[#15529F]  hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                {t('conferenceDetails')}
              </p>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection 
              animationType="fadeInRight" 
              delay={400}
              className="flex w-full justify-center md:justify-end rounded-xl sm:rounded-2xl overflow-hidden order-1 md:order-2"
            >
              <div className="group cursor-pointer ">
                <div className="hover:shadow-xl hover:shadow-gray-400/30 hover:-translate-y-2 hover:rotate-1 transform transition-all duration-700 ease-out relative">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <Image
                      src="/images/collective/cop29.jpg"
                      alt="Conference Photo"
                      width={588}
                      height={300}
                      className="w-full max-w-[500px] max-h-[400px] sm:max-w-lg md:max-w-lg lg:w-[588px] md:h-[300px] md:w-[400px] lg:h-[407px] object-cover rounded-xl sm:rounded-2xl group-hover:brightness-110 group-hover:contrast-105 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Final paragraphs with staggered animation */}
          <div className="mt-12 sm:mt-16 md:mt-20 space-y-6 sm:space-y-8 md:space-y-10 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-base sm:text-base md:text-base lg:text-xl">
            <AnimatedSection animationType="slideInUp" delay={100}>
              <p className="hover:text-[#15529F]  hover:brightness-110  transition-all duration-500 ease-out cursor-default">
                {t('openingSpeech')}
              </p>
            </AnimatedSection>

            <AnimatedSection animationType="slideInUp" delay={200}>
              <p className="hover:text-[#15529F]  hover:brightness-110  transition-all duration-500 ease-out cursor-default">
                {t('speakers')}
              </p>
            </AnimatedSection>

            <AnimatedSection animationType="slideInUp" delay={300}>
              <p className="hover:text-[#15529F]  hover:brightness-110  transition-all duration-500 ease-out cursor-default">
                {t('panelDiscussion')}
              </p>
            </AnimatedSection>

            <AnimatedSection animationType="slideInUp" delay={400}>
              <p className="hover:text-[#15529F]  hover:brightness-110  transition-all duration-500 ease-out cursor-default">
                {t('photoCompetition')}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}