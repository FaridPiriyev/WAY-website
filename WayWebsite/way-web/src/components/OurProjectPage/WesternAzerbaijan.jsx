"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useTranslations } from "next-intl";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

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
    } else if (animationType === "bounceIn") {
      return `${baseClasses} ${
        isVisible 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-90"
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

// Enhanced Image Component with Hover Effects
const AnimatedImagePair = ({ src1, src2, alt1, alt2, imageClasses1, imageClasses2, delay = 0 }) => {
  return (
    <AnimatedSection 
      animationType="slideInUp" 
      delay={delay}
      className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-[50px]"
    >
      <div className="group cursor-pointer">
        <div className="hover:shadow-xl hover:shadow-blue-200/30 hover:-translate-y-2 hover:rotate-1 transform transition-all duration-700 ease-out relative">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={src1}
              alt={alt1}
              width={0}
              height={0}
              sizes="100vw"
              className={`rounded-xl object-cover ${imageClasses1} group-hover:brightness-110 group-hover:contrast-105 group-hover:scale-105 transition-all duration-700 ease-out`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-500 -z-10 blur-lg"></div>
        </div>
      </div>
      
      <div className="group cursor-pointer mt-4 sm:mt-0">
        <div className="hover:shadow-xl hover:shadow-blue-200/30 hover:-translate-y-2 hover:-rotate-1 transform transition-all duration-700 ease-out relative">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={src2}
              alt={alt2}
              width={0}
              height={0}
              sizes="100vw"
              className={`rounded-xl object-cover ${imageClasses2} mt-4 sm:mt-0 group-hover:brightness-110 group-hover:contrast-105 group-hover:scale-105 transition-all duration-700 ease-out`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-500 -z-10 blur-lg"></div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default function WestAze() {
  const tWest = useTranslations("WestAzerbaijan");

  return (
    <div className="max-w-7xl py-6 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Main Title with Enhanced Animation */}
      <AnimatedSection 
        animationType="scaleIn" 
        className="text-[18px] sm:text-3xl md:text-4xl font-bold text-[#15529F] mb-3 sm:mb-5 text-center max-w-[250px] lg:mt-2 sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] hover:text-blue-600 hover:scale-105 transition-all duration-500 ease-out"
      >
        {tWest("projectTitle")}
      </AnimatedSection>
      
      <div className="w-full">
        <div className={poppins.className}>
          <div className="flex flex-col">
            {/* Breadcrumb with Enhanced Animation */}
            <AnimatedSection 
              animationType="fadeInLeft" 
              className="flex items-center mb-8 sm:mb-16 md:mb-20 mt-5 sm:mt-[40px]"
            >
              <div className="group cursor-pointer">
                <a href="/" className="text-base sm:text-lg md:text-xl font-medium hover:text-[#15529F] hover:translate-x-1 transition-all duration-500 ease-out">
                  {tWest("projectsTitle")}
                </a>
              </div>
              <span className="mx-1 sm:mx-2 text-gray-400 hover:text-gray-600 hover:rotate-12 transition-all duration-300">/</span>
              <div className="group cursor-pointer">
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-[#15529F] hover:text-blue-600 hover:translate-x-1 hover:brightness-110 hover:scale-105 transform transition-all duration-500 ease-out">
                  {tWest("projectTitle")}
                </h2>
              </div>
            </AnimatedSection>

            {/* Background Section with Enhanced Effects */}
            <AnimatedSection 
              animationType="scaleIn" 
              delay={200} 
              className="relative rounded-xl sm:rounded-3xl mb-6 sm:mb-8 overflow-hidden mt-3 sm:mt-[10px]"
            >
              <div className="group cursor-pointer">
                <div className="hover:shadow-2xl hover:shadow-blue-200/30 hover:-translate-y-1 transform transition-all duration-700 ease-out">
                  <div
                    className="relative rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-11 py-6 sm:py-8 md:py-10 backdrop-blur-md shadow-md transition-all duration-700 ease-out group-hover:backdrop-blur-lg"
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
                      />
                    </div>
                    <p className="leading-relaxed backdrop-blur-xl text-base sm:text-lg bg-white/50 text-black px-4 sm:px-6 md:px-10 py-4 sm:py-6 rounded-xl sm:rounded-2xl text-wrap hover:bg-white/70 hover:backdrop-blur-2xl transition-all duration-500 ease-out cursor-default">
                      {tWest("intro1")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Content Paragraphs with Staggered Animation */}
            <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-5 text-base sm:text-lg leading-relaxed text-justify mt-8 sm:mt-[60px]">
              <AnimatedSection animationType="slideInUp" delay={100}>
                <p className="hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                  {tWest("intro2")}
                </p>
              </AnimatedSection>
              <AnimatedSection animationType="slideInUp" delay={200}>
                <p className="hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                  {tWest("goal")}
                </p>
              </AnimatedSection>
              <AnimatedSection animationType="slideInUp" delay={300}>
                <p className="hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                  {tWest("selection")}
                </p>
              </AnimatedSection>
            </div>

            {/* Meetings Title */}
            <AnimatedSection 
              animationType="fadeInLeft" 
              delay={400}
              className="mt-6 sm:mt-[40px] mb-4 sm:mb-6 text-base sm:text-lg font-semibold hover:text-[#15529F] hover:translate-x-2 transition-all duration-500 ease-out cursor-default"
            >
              {tWest("meetingsTitle")}
            </AnimatedSection>

            <div className="space-y-8 sm:space-y-12 w-full mt-4 sm:mt-[34px]">
              {/* Meeting 1 */}
              <div>
                <AnimatedSection animationType="fadeInUp" delay={100}>
                  <p className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 hover:text-[#15529F] transition-all duration-300 cursor-default">
                    {tWest("meeting1_prefix")}{" "}
                    <span className="font-normal hover:text-gray-600 transition-all duration-300">
                      {tWest("meeting1_content")}
                    </span>
                  </p>
                </AnimatedSection>
                <AnimatedImagePair 
                  src1="/images/collective/Meet1.png"
                  src2="/images/collective/Meet2.png"
                  alt1="1-ci Görüş Şəkil 1"
                  alt2="1-ci Görüş Şəkil 2"
                  imageClasses1="w-[482px] h-[319px]"
                  imageClasses2="w-[482px] h-[319px]"
                  delay={200}
                />
              </div>

              {/* Meeting 2 */}
              <div>
                <AnimatedSection animationType="fadeInUp" delay={100}>
                  <p className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 mt-8 sm:mt-10 hover:text-[#15529F] transition-all duration-300 cursor-default">
                    {tWest("meeting2_prefix")}{" "}
                    <span className="font-normal hover:text-gray-600 transition-all duration-300">
                      {tWest("meeting2_content")}
                    </span>
                  </p>
                </AnimatedSection>
                <AnimatedImagePair 
                  src1="/images/collective/Meet3.png"
                  src2="/images/collective/Meet4.png"
                  alt1="2-ci Görüş Şəkil 1"
                  alt2="2-ci Görüş Şəkil 2"
                  imageClasses1="w-[478px] h-[318px]"
                  imageClasses2="w-[452px] h-[323px]"
                  delay={300}
                />
              </div>

              {/* Meeting 3 */}
              <div>
                <AnimatedSection animationType="fadeInUp" delay={100}>
                  <p className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 mt-8 sm:mt-10 hover:text-[#15529F] transition-all duration-300 cursor-default">
                    {tWest("meeting3_prefix")}{" "}
                    <span className="font-normal hover:text-gray-600 transition-all duration-300">
                      {tWest("meeting3_content")}
                    </span>
                  </p>
                </AnimatedSection>
                <AnimatedImagePair 
                  src1="/images/collective/Meet5.png"
                  src2="/images/collective/Meet6.png"
                  alt1="3-cü Görüş Şəkil 1"
                  alt2="3-cü Görüş Şəkil 2"
                  imageClasses1="w-[467px] h-[312px]"
                  imageClasses2="w-[500px] h-[300px]"
                  delay={400}
                />
              </div>

              {/* Meeting 4 */}
              <div>
                <AnimatedSection animationType="fadeInUp" delay={100}>
                  <p className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 mt-8 sm:mt-10 hover:text-[#15529F] transition-all duration-300 cursor-default">
                    {tWest("meeting4_prefix")}{" "}
                    <span className="font-normal hover:text-gray-600 transition-all duration-300">
                      {tWest("meeting4_content")}
                    </span>
                  </p>
                </AnimatedSection>
                <AnimatedImagePair 
                  src1="/images/collective/Meet7.png"
                  src2="/images/collective/Meet8.png"
                  alt1="4-cü Görüş Şəkil 1"
                  alt2="4-cü Görüş Şəkil 2"
                  imageClasses1="w-[481px] h-[312px]"
                  imageClasses2="w-[475px] h-[317px]"
                  delay={500}
                />
              </div>

              {/* Meeting 5 */}
              <div>
                <AnimatedSection animationType="fadeInUp" delay={100}>
                  <p className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 mt-8 sm:mt-10 hover:text-[#15529F] transition-all duration-300 cursor-default">
                    {tWest("meeting5_prefix")}{" "}
                    <span className="font-normal hover:text-gray-600 transition-all duration-300">
                      {tWest("meeting5_content")}
                    </span>
                  </p>
                </AnimatedSection>
                <AnimatedImagePair 
                  src1="/images/collective/Meet9.png"
                  src2="/images/collective/Meet10.png"
                  alt1="5-ci Görüş Şəkil 1"
                  alt2="5-ci Görüş Şəkil 2"
                  imageClasses1="w-[463px] h-[308px]"
                  imageClasses2="w-[469px] h-[312px]"
                  delay={600}
                />
              </div>

              {/* Meeting 6 */}
              <div>
                <AnimatedSection animationType="fadeInUp" delay={100}>
                  <p className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 mt-8 sm:mt-10 hover:text-[#15529F] transition-all duration-300 cursor-default">
                    {tWest("meeting6_prefix")}{" "}
                    <span className="font-normal hover:text-gray-600 transition-all duration-300">
                      {tWest("meeting6_content")}
                    </span>
                  </p>
                </AnimatedSection>
                <AnimatedImagePair 
                  src1="/images/collective/Meet11.png"
                  src2="/images/collective/Meet12.png"
                  alt1="6-cı Görüş Şəkil 1"
                  alt2="6-cı Görüş Şəkil 2"
                  imageClasses1="w-[471px] h-[314px]"
                  imageClasses2="w-[452px] h-[312px]"
                  delay={700}
                />
              </div>
            </div>

            {/* Closing Ceremony with Enhanced Animation */}
            <div className="mt-10 sm:mt-[70px] space-y-4 sm:space-y-6">
              <AnimatedSection animationType="slideInUp" delay={100}>
                <p className="text-sm sm:text-base font-semibold hover:text-[#15529F] transition-all duration-300 cursor-default">
                  {tWest("closingTitle")}{" "}
                  <span className="font-normal hover:text-gray-600 transition-all duration-300">
                    {tWest("closingContent")}
                  </span>
                </p>
              </AnimatedSection>
              
              <AnimatedSection animationType="slideInUp" delay={200}>
                <p className="text-sm sm:text-base hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                  {tWest("awards")}
                </p>
              </AnimatedSection>
              
              <AnimatedSection animationType="slideInUp" delay={300}>
                <p className="text-sm sm:text-base hover:text-[#15529F] hover:brightness-110 transition-all duration-500 ease-out cursor-default">
                  {tWest("presentedBy")}
                </p>
              </AnimatedSection>

              <AnimatedImagePair 
                src1="/images/collective/Meet13.png"
                src2="/images/collective/Meet14.png"
                alt1="Bağlanış mərasimi şəkil 1"
                alt2="Bağlanış mərasimi şəkil 2"
                imageClasses1="w-[479px] h-[320px]"
                imageClasses2="w-[390px] h-[319px]"
                delay={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}