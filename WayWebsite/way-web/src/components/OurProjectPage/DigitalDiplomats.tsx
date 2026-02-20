"use client";
import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

// Types
interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInUp";
  delay?: number;
}

// Animation Hook
const useIntersectionObserver = (options: IntersectionObserverOptions = {}): [
  IntersectionObserverEntry[],
  (element: Element | null) => void,
  () => void
] => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const { threshold = 0.1, rootMargin = "0px" } = options;

  const updateEntry = (entries: IntersectionObserverEntry[]): void => {
    setEntries(entries);
  };

  const observe = (element: Element | null): void => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(updateEntry, {
      threshold,
      rootMargin,
    });
    
    if (element) observer.current.observe(element);
  };

  const unobserve = (): void => {
    if (observer.current) observer.current.disconnect();
  };

  return [entries, observe, unobserve];
};

// Animated Section Component
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  animationType = "fadeInUp", 
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const getAnimationClass = (): string => {
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
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
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

const DigitalDiplomatsComponent: React.FC = () => {
  const tDigital = useTranslations("DigitalDiplomatsPage");

  return (
    <div className="max-w-7xl py-4 sm:py-6 container mx-auto px-4 flex flex-col items-center">
      {/* Main Title */}
      <AnimatedSection animationType="scaleIn" className="text-[23px] w-[240px] sm:w-full sm:text-[30px] lg:text-4xl font-bold text-[#15529F] mt-2 sm:mt-2 mb-10 sm:mb-8 md:mb-15 text-center">
        <div className=" ">
          {tDigital("project")}
        </div>
      </AnimatedSection>

      <div className="w-full">
        <div className={poppins.className}>
          <div className="flex flex-col">
            {/* Breadcrumb navigation */}
            <AnimatedSection animationType="fadeInLeft" className="flex sm:flex-row sm:items-center mb-10 sm:mb-16 md:mb-20">
              <div className="group cursor-pointer">
                <a href="/" className="text-base sm:text-xl font-medium mb-2 sm:mb-0 hover:text-[#15529F] hover:translate-x-1 hover:tracking-wide transition-all duration-500 ease-out">
                  {tDigital("projects")}
                </a>
              </div>
              <span className="sm:inline mx-2 text-gray-400 hover:text-gray-600 hover:rotate-12 transition-all duration-300">/</span>
              <div className="group cursor-pointer">
                <h2 className="text-base sm:text-xl font-medium text-[#15529F] hover:text-blue-900 hover:translate-x-1 hover:brightness-110 hover:tracking-wide hover:scale-105 transform transition-all duration-500 ease-out">
                  {tDigital("digitalDiplomats")}
                </h2>
              </div>
            </AnimatedSection>

            {/* Main background content */}
            <AnimatedSection animationType="scaleIn" delay={200} className="relative rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 overflow-hidden">
              <div className="group cursor-pointer">
                <div className="hover:shadow-2xl hover:shadow-blue-200/30 hover:-translate-y-1 transform transition-all duration-700 ease-out">
                  <div
                    className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-11 py-6 sm:py-8 md:py-10 backdrop-blur-md shadow-md transition-all duration-700 ease-out group-hover:backdrop-blur-lg"
                    style={{
                      backgroundImage: `url("/images/others/background.jpg")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundBlendMode: "overlay",
                    }}
                  >
                    <div className="absolute inset-0 -z-10 transition-all duration-700 ease-out group-hover:scale-105">
                      <Image
                        src="/images/others/background.jpg"
                        alt="Background pattern"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>

                    <p className="leading-relaxed backdrop-blur-xl text-sm sm:text-base md:text-lg bg-white/50 text-black px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl text-wrap hover:bg-white/70 hover:backdrop-blur-2xl transition-all duration-500 ease-out cursor-default">
                      {tDigital("description")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Sessions Introduction */}
            <AnimatedSection animationType="fadeInLeft" delay={300} className="mb-4 sm:mb-6">
              <p className="font-medium text-base sm:text-lg mb-3 sm:mb-4 hover:text-[#15529F] hover:translate-x-2 hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                {tDigital("sessionsIntro")}
              </p>

              <h3 className="font-medium mb-3 sm:mb-5 text-base sm:text-lg hover:text-gray-700 hover:translate-x-1 hover:tracking-wide transition-all duration-500 ease-out cursor-default">
                {tDigital("meetings")}:
              </h3>
              
              <ol className="list-decimal pl-4 sm:pl-5 space-y-4 sm:space-y-6 md:space-y-8 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                {(tDigital.raw("meetingList") as string[])
                  .map((item: string, index: number) => (
                    <AnimatedSection 
                      key={index}
                      animationType="slideInUp" 
                      delay={100 * (index + 1)}
                      className=""
                    >
                      <li className="leading-relaxed hover:text-gray-700 hover:translate-x-2 hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                        {item}
                      </li>
                    </AnimatedSection>
                  ))}
              </ol>
            </AnimatedSection>

            {/* Conclusion */}
            <AnimatedSection animationType="fadeInRight" delay={200} className="">
              <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed hover:text-gray-700 hover:translate-x-2 hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                {tDigital("conclusion")}
              </p>
            </AnimatedSection>

            {/* Info Tours Section */}
            <AnimatedSection animationType="slideInUp" delay={300} className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
              <h3 className="font-medium mb-2 text-base sm:text-lg hover:text-[#15529F] hover:translate-x-1 hover:tracking-wide hover:scale-105 transform transition-all duration-500 ease-out cursor-default">
                {tDigital("infotours")}:
              </h3>
              <p className="leading-relaxed hover:text-gray-700 hover:translate-x-2 hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                {tDigital("infotourDesc")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalDiplomatsComponent;