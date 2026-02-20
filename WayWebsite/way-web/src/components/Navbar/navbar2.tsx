"use client";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";
import Link from "next/link";
import { ChevronDown, X, ChevronRight } from "lucide-react";

export default function Navbar2() {
  const [locale, setLocale] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState<boolean>(false);
  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState<boolean>(false);
  const [isScrolledLangOpen, setIsScrolledLangOpen] = useState<boolean>(false);
  
  
  const lastScrollY = useRef<number>(0);
  const router = useRouter();
  const t = useTranslations("nav");
  const tDropDown = useTranslations("navdropdown");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("WAYLANG_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `WAYLANG_LOCALE=${browserLocale}; path=/;`;
      router.refresh();
    }
  }, [router]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    setIsScrolled(currentScrollY > 50);
    
    if (isMobileMenuOpen) {
      return;
    }
    
    if (currentScrollY < 10) {
      setIsVisible(true);
    } else {
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
    }
    
    lastScrollY.current = currentScrollY;
  }, [isMobileMenuOpen]); 

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]); 

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `WAYLANG_LOCALE=${newLocale};`;
    router.refresh();
  };

  const toggleProjectsDropdown = () => {
    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScrollNavigation = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setIsVisible(true);
    
    if (window.location.pathname === '/' || window.location.pathname === '/home') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        
        setTimeout(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 100) {
            setIsVisible(false);
          }
        }, 1000);
      }, 300);
    } else {
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const projectsList = [
    { name: tDropDown('projects.ai4culture'), href: '/ai4culture' },
    { name: tDropDown('projects.digitalDiplomats'), href: '/digital-diplomats' },
    { name: tDropDown('projects.pythonTraining'), href: '/python-training' },
    { name: tDropDown('projects.westernAzerbaijan'), href: '/western-aze' },
    { name: tDropDown('projects.greenGoal'), href: '/cop29' },
    { name: tDropDown('projects.LearnFrom'), href: '/learn-from-a-professional' }
  ];

  return (
    <>
      {/* Original Header */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-transparent w-full py-2 md:py-4  max-w-7xl mx-auto   ">
        <div className="mx-auto flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="transform transition-all duration-300 hover:scale-105">
              <Image
                src="/images/logos/waylogo.png"
                alt="WAY Logo"
                width={100}
                height={50}
                className="h-auto w-24 sm:w-24 md:w-32 lg:w-[130px] transition-all duration-300 drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Mobile Language Selector */}
          <div className="flex lg:hidden">
            <div 
              className="flex items-center px-3 py-2 cursor-pointer rounded-lg backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {locale === 'az' ? (
                <>
                  <div className="w-5 h-4 bg-[url('/svg/emojione_flag-for-azerbaijan.svg')] bg-contain bg-no-repeat mr-2 "></div>
                  <span className="text-gray-800 text-sm font-medium">AZ</span>
                  <ChevronRight className={`ml-1 h-3 w-3 text-gray-800 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
                </>
              ) : (
                <>
                  <div className="w-5 h-4 bg-[url('/svg/united-kingdom1.svg')] bg-contain bg-no-repeat mr-2"></div>
                  <span className="text-gray-800 text-sm font-medium">EN</span>
                  <ChevronRight className={`ml-1 h-3 w-3 text-gray-800 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
                </>
              )}
            </div>
            
            {mobileMenuOpen && (
              <div className="absolute top-16 right-[1px] w-[85px] bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-md rounded-xl mt-1 shadow-lg border border-blue-200/50 animate-fadeIn">
                <div 
                  className="flex items-center px-3 py-2 text-gray-800 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-95"
                  onClick={() => {
                    changeLocale(locale === 'az' ? 'en' : 'az');
                    setMobileMenuOpen(false);
                  }}
                >
                  {locale === 'az' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-4 bg-[url('/svg/united-kingdom1.svg')] bg-contain bg-no-repeat"></div>
                      <span className="text-sm font-medium">En</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-4 bg-[url('/svg/emojione_flag-for-azerbaijan.svg')] bg-contain bg-no-repeat"></div>
                      <span className="text-sm font-medium">Az</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Language Selector - With onClick */}
          <div className="hidden lg:flex items-center">
            <div className="relative group">
              <div 
                className="flex items-center px-4 py-2 cursor-pointer rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-sm"
                onClick={() => setIsDesktopLangOpen(!isDesktopLangOpen)}
              >
                {locale === 'az' ? (
                  <>
                    <div className="w-6 h-5 bg-[url('/svg/emojione_flag-for-azerbaijan.svg')] bg-contain bg-no-repeat mr-3"></div>
                    <span className="text-gray-800 text-sm font-medium">Azərbaycan</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 bg-[url('/svg/united-kingdom1.svg')] bg-contain bg-no-repeat mr-3"></div>
                    <span className="text-gray-800 text-sm font-medium">English</span>
                  </>
                )}
                
                <ChevronDown className={`ml-2 h-4 w-4 text-gray-800 transition-transform duration-300 ${isDesktopLangOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} />
              </div>
              
              <div
                className={`absolute top-full right-0 w-[140px] bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-md rounded-xl shadow-xl border border-blue-200/50 cursor-pointer overflow-hidden transition-all duration-300 transform ${
                  isDesktopLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                }`}
                onClick={() => {
                  changeLocale(locale === 'az' ? 'en' : 'az');
                  setIsDesktopLangOpen(false);
                }}
              >
                <div className="flex items-center py-3 px-4 text-gray-800 hover:bg-gradient-to-r  hover:text-black transition-all duration-300">
                  {locale === 'az' ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[url('/svg/united-kingdom1.svg')] bg-contain bg-no-repeat"></div>
                      <span className="text-sm font-medium">English</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[url('/svg/emojione_flag-for-azerbaijan.svg')] bg-contain bg-no-repeat"></div>
                      <span className="text-sm font-medium">Azərbaycan</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scrolled Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out bg-white backdrop-blur-lg shadow-xl border-b  border-blue-300/30 ${
          (isVisible && isScrolled) || isMobileMenuOpen 
            ? "transform translate-y-0 opacity-100" 
            : "transform -translate-y-full opacity-0"
        }`}
      >
        <div className="absolute inset-0  backdrop-blur-sm "></div>
        <div className="relative container mx-auto px-4 flex justify-between items-center h-[80px] max-w-7xl">
          <div className="flex items-center">
            <Link href="/" className="transform transition-all duration-300 hover:scale-110">
              <Image
                src="/images/logos/waylogo.png"
                alt="WAY Logo"
                width={100}
                height={90}
                className="transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-3 ">
            <Link
              href="/" 
              className="text-black hover:text-[#15529F] relative group transition-all duration-300 font-medium transform hover:scale-105"
            >
              <span className="relative z-10">{t("home")}</span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </Link>

            <button
              onClick={() => handleScrollNavigation('about')}
              className="text-black hover:text-[#15529F] relative group transition-all duration-300 font-medium transform hover:scale-105"
            >
              <span className="relative z-10">{t("about")}</span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </button>

            <button
              onClick={() => handleScrollNavigation('objectives')}
              className="text-black hover:text-[#15529F] relative group transition-all duration-300 font-medium transform hover:scale-105"
            >
              <span className="relative z-10">{t("activities")}</span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </button>

            {/* Projects dropdown - With onClick */}
            <div className="relative group ">
              <button
                onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                className="text-black hover:text-[#15529F] flex items-center space-x-1 relative transition-all duration-300 font-medium transform hover:scale-105"
              >
                <span className="relative z-10">{t("projects")}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} />
                <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </button>

              <div className={`absolute left-0 mt-3 w-64 rounded-xl shadow-2xl bg-gradient-to-br from-white to-blue-50 border border-blue-200/50 backdrop-blur-lg overflow-hidden transition-all duration-300 transform ${
                isProjectsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
              }`}>
                <div className="py-2">
                  {projectsList.map((project, index) => (
                    <Link
                      key={index}
                      href={project.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 transform hover:translate-x-1"
                      onClick={() => setIsProjectsDropdownOpen(false)}
                    >
                      <span className="font-medium">{project.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleScrollNavigation('team')}
              className="text-black hover:text-[#15529F] relative group transition-all duration-300 font-medium transform hover:scale-105"
            >
              <span className="relative z-10">{t("team")}</span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </button>

            <button
              onClick={() => handleScrollNavigation('contact')}
              className="text-black hover:text-[#15529F] relative group transition-all duration-300 font-medium transform hover:scale-105"
            >
              <span className="relative z-10">{t("contact")}</span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </button>
             
             <Link
              href="/blog"
              className="text-black hover:text-[#15529F] relative group transition-all duration-300 font-medium transform hover:scale-105"
            >
              <span className="relative z-10">{t("blog")}</span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </Link>
          </nav>

          {/* Language Selector for Scrolled Nav - With onClick */}
          <div className="hidden lg:flex items-center">
            <div className="relative group">
              <div 
                className="flex items-center px-4 py-2 cursor-pointer rounded-xl bg-blue-100 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsScrolledLangOpen(!isScrolledLangOpen)}
              >
                {locale === "az" ? (
                  <>
                    <div className="w-6 h-5 bg-[url('/svg/emojione_flag-for-azerbaijan.svg')] bg-contain bg-no-repeat mr-3"></div>
                    <span className="text-black text-sm font-medium">Azərbaycan</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 bg-[url('/svg/united-kingdom1.svg')] bg-contain bg-no-repeat mr-3"></div>
                    <span className="text-black text-sm font-medium">English</span>
                  </>
                )}

                <ChevronRight className={`ml-2 h-4 w-4 text-black transition-transform duration-300 ${isScrolledLangOpen ? 'rotate-90' : 'group-hover:rotate-90'}`} />
              </div>

              <div
                className={`absolute top-full right-0 w-[140px] rounded-xl cursor-pointer bg-gradient-to-br from-white to-blue-50 backdrop-blur-lg shadow-xl border border-blue-200/50 overflow-hidden transition-all duration-300 transform ${
                  isScrolledLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                }`}
                onClick={() => {
                  changeLocale(locale === "az" ? "en" : "az");
                  setIsScrolledLangOpen(false);
                }}
              >
                <div className="flex items-center py-3 px-4 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300">
                  {locale === "az" ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[url('/svg/united-kingdom1.svg')] bg-contain bg-no-repeat"></div>
                      <span className="text-sm font-medium text-gray-800">English</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[url('/svg/emojione_flag-for-azerbaijan.svg')] bg-contain bg-no-repeat"></div>
                      <span className="text-sm font-medium text-gray-800">Azərbaycan</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden focus:outline-none  mt-6 transition-all duration-300 text-[#15529F] transform hover:scale-110 p-2 rounded-lg hover:bg-white/20"
            onClick={toggleMobileMenu}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block h-0.5 w-6 bg-[#15529F]  transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-[#15529F]  transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-[#15529F]  transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
            </div>
          </button>
        </div>
 
        {/* Mobile Sidebar Navigation */}
        <div
          className={`fixed inset-0 h-screen w-screen z-[60]  bg-opacity-50 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed inset-y-0 right-0 h-screen max-w-xs w-full bg-white shadow-2xl z-[70] overflow-y-auto transform transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <Image
                  src="/images/logos/waylogo.png"
                  alt="WAY Logo"
                  width={80}
                  height={72}
                  className="drop-shadow-lg"
                />
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="px-4 py-2">
              <Link
                href="/"
                className="block py-4 text-gray-800 hover:text-[#15529F] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
                onClick={handleLinkClick}
              >
                {t("home")}
              </Link>
              <button
                onClick={() => handleScrollNavigation('about')}
                className="block py-4 text-gray-800 hover:text-[#15529F] border-b w-full text-left transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              >
                {t("about")}
              </button>
              <button
                onClick={() => handleScrollNavigation('objectives')}
                className="block py-4 text-gray-800 hover:text-[#15529F] border-b w-full text-left transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              >
                {t("activities")}
              </button>

              {/* Projects dropdown for mobile */}
              <div className="border-b">
                <button
                  onClick={toggleProjectsDropdown}
                  className="w-full flex justify-between items-center py-4 text-gray-800 hover:text-[#15529F] transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
                >
                  <span>{t("projects")}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : 'rotate-90'}`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isProjectsDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4 pb-2 space-y-1">
                    {projectsList.map((project, index) => (
                      <Link
                        key={index}
                        href={project.href}
                        className="block py-2 text-gray-700 hover:text-[#15529F] transition-all duration-300 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
                        onClick={handleLinkClick}
                      >
                        {project.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleScrollNavigation('team')}
                className="block py-4 text-gray-800 hover:text-[#15529F] border-b w-full text-left transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              >
                {t("team")}
              </button>
              <button
                onClick={() => handleScrollNavigation('contact')}
                className="block py-4 text-gray-800 hover:text-[#15529F] border-b w-full text-left transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              >
                {t("contact")}
              </button>
               <Link
                href="/blog"
                className="block py-4 text-gray-800 hover:text-[#15529F] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
                onClick={handleLinkClick}
              >
                {t("blog")}
              </Link>
            </nav>

            {/* Mobile Language Selector in Sidebar */}
            <div className="px-4 py-6 flex space-x-3">
              <button
                className={`px-4 py-3 text-sm rounded-xl transition-all duration-300 flex items-center space-x-2 flex-1 justify-center font-medium transform hover:scale-105 ${
                  locale === "az"
                    ? "bg-[#15529F] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => changeLocale("az")}
              >
                <div className="w-4 h-4 bg-no-repeat bg-center bg-contain bg-[url('/svg/emojione_flag-for-azerbaijan.svg')]"></div>
                <span>AZ</span>
              </button>
              <button
                className={`px-4 py-3 text-sm rounded-xl transition-all duration-300 flex items-center space-x-2 flex-1 justify-center font-medium transform hover:scale-105 ${
                  locale === "en"
                    ? "bg-[#15529F] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => changeLocale("en")}
              >
                <div className="w-4 h-4 bg-no-repeat bg-center bg-contain bg-[url('/svg/united-kingdom1.svg')]"></div>
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}