import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import peoples from "../../../../public/svg/fluent_people-team-16-filled.svg";
import goal from "../../../../public/svg/Group.svg";
import shield from "../../../../public/svg/carbon_manage-protection.svg";
import global from "../../../../public/svg/solar_global-linear.svg";
import cup from "../../../../public/svg/material-symbols_emoji-events.svg";
import verified from "../../../../public/svg/icon-park-solid_success.svg";
import { useTranslations } from 'next-intl';

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
});


const DELAY_CLASSES = {
  0: '',
  50: 'delay-[50ms]',
  100: 'delay-[100ms]',
  150: 'delay-[150ms]',
  200: 'delay-[200ms]',
  300: 'delay-[300ms]',
  400: 'delay-[400ms]',
};


let sharedObserver = null;
const observedElements = new Map();

const getSharedObserver = (isMobile) => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const callback = observedElements.get(entry.target);
          if (callback) {
          
            callback(entry.isIntersecting);
          }
        });
      },
      {
        threshold: isMobile ? 0.1 : 0.1,
        rootMargin: isMobile ? '20px 0px -20px 0px' : '10px 0px -10px 0px'
      }
    );
  }
  return sharedObserver;
};

const useIntersectionObserver = (isMobile) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getSharedObserver(isMobile);
    const callback = (isIntersecting) => setIsVisible(isIntersecting);
    
    observedElements.set(element, callback);
    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
        observedElements.delete(element);
      }
    };
  }, [isMobile]);

  return [ref, isVisible];
};

const AnimatedSection = ({ 
  children, 
  animationType, 
  className = "", 
  delay = 0,
  isMobile = false 
}) => {
  const [ref, isVisible] = useIntersectionObserver(isMobile);

  const animationClasses = useMemo(() => {
    const baseTransition = "transition-all duration-500 ease-out";
    
    if (isMobile) {
      if (animationType === 'slideInRight') {
        return `${baseTransition} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-80'}`;
      }
      return `${baseTransition} ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-80'}`;
    }

    switch (animationType) {
      case 'slideInLeft':
        return `${baseTransition} ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}`;
      case 'slideInRight':
        return `${baseTransition} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`;
      case 'slideInUp':
        return `${baseTransition} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`;
      case 'slideInDown':
        return `${baseTransition} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'}`;
      default:
        return `${baseTransition} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  }, [isVisible, animationType, isMobile]);

  const inlineStyle = useMemo(() => ({
    transitionDelay: `${delay}ms`
  }), [delay]);

  return (
    <div 
      ref={ref} 
      className={`${className} ${animationClasses}`}
      style={inlineStyle}
    >
      {children}
    </div>
  );
};

const FeatureCard = ({ icon, text, animationType, delay, isMobile }) => {
  return (
    <AnimatedSection 
      animationType={animationType} 
      delay={delay} 
      isMobile={isMobile}
    >
      <div className="border-[3px] border-[#437EAF] rounded-3xl py-3 px-3 flex flex-col items-center text-center min-h-[7rem] group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-lg sm:hover:shadow-xl hover:shadow-blue-200/30 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/50 to-blue-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="rounded-full mb-1 transform transition-transform duration-500 group-hover:scale-110 relative z-10">
          <Image 
            className="h-6 w-6 transition-all duration-500 group-hover:brightness-110" 
            priority 
            src={icon} 
            alt="Feature icon" 
          />
        </div>
        <p className="text-sm text-gray-700 group-hover:text-[#15529F] transition-colors duration-300 relative z-10">
          {text}
        </p>
      </div>
    </AnimatedSection>
  );
};

const AzerbaijanYouthSection = () => {
  const tAboutUS = useTranslations("AboutUS");
  const tGoals = useTranslations("Goals");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const topFeatures = useMemo(() => [
    { 
      icon: peoples, 
      text: tGoals("p2"), 
      anim: 'slideInRight', 
      delay: isMobile ? 100 : 300 
    },
    { 
      icon: goal, 
      text: tGoals("p3"), 
      anim: 'slideInRight', 
      delay: isMobile ? 150 : 400 
    },
  ], [tGoals, isMobile]);

  const bottomFeatures = useMemo(() => [
    { 
      icon: shield, 
      text: tGoals("p1"), 
      anim: 'slideInLeft', 
      delay: isMobile ? 50 : 100 
    },
    { 
      icon: cup, 
      text: tGoals("p4"), 
      anim: 'slideInUp', 
      delay: isMobile ? 100 : 200 
    },
    { 
      icon: global, 
      text: tGoals("p5"), 
      anim: 'slideInDown', 
      delay: isMobile ? 150 : 300 
    },
    { 
      icon: verified, 
      text: tGoals("p6"), 
      anim: 'slideInRight', 
      delay: isMobile ? 200 : 400 
    },
  ], [tGoals, isMobile]);

  return (
    <div className={`${PoppinsFont.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 font-sans">
       
        <AnimatedSection 
          animationType={isMobile ? 'slideInLeft' : 'slideInDown'} 
          isMobile={isMobile} 
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#15529F]">
            {tAboutUS("title")}
          </h2>
        </AnimatedSection>
        
        <div className="mb-5 flex flex-col lg:flex-row gap-6 sm:gap-8">
         
          <AnimatedSection 
            animationType="slideInLeft" 
            delay={isMobile ? 50 : 200} 
            isMobile={isMobile}
            className="lg:w-1/2"
          >
            <p className="text-[#787878] text-base sm:text-lg font-medium mb-6 lg:mb-12 leading-relaxed">
              {tAboutUS("description")}
            </p>
          </AnimatedSection>
          
          <div className='lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            {topFeatures.map((item, i) => (
              <FeatureCard
                key={`top-${i}`}
                icon={item.icon}
                text={item.text}
                animationType={item.anim}
                delay={item.delay}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-32">
          {bottomFeatures.map((item, i) => (
            <FeatureCard
              key={`bottom-${i}`}
              icon={item.icon}
              text={item.text}
              animationType={item.anim}
              delay={item.delay}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AzerbaijanYouthSection;