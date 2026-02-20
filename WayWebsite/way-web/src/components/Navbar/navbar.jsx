"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";
import { X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [locale, setLocale] = useState("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const projectsRef = useRef(null);
  const langRef = useRef(null);
  
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
      document.cookie = `WAYLANG_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target)) {
        setIsProjectsDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isMobileMenuOpen && Math.abs(currentScrollY - lastScrollY) > 10) {
        setIsMobileMenuOpen(false);
      }
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  useEffect(() => {
    if (!isVisible && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isVisible, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    document.cookie = `WAYLANG_LOCALE=${newLocale};`;
    setIsLangDropdownOpen(false);
    router.refresh();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProjectsDropdown = () => {
    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "bg-white shadow-lg" 
          : "bg-transparent"
      } ${
        isVisible 
          ? "transform translate-y-0 opacity-100" 
          : "transform -translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-[80px]">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logos/waylogo.png"
            alt="WAY Logo"
            width={isScrolled ? 100 : 100}
            height={isScrolled ? 90 : 90}
            className="transition-all duration-300 transform hover:scale-110 drop-shadow-lg hover:drop-shadow-xl"
          />
        </div>
       
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:space-x-4">
          <a 
            href="#" 
            className={`relative group transition-all duration-300 font-medium transform hover:scale-105 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="relative z-10">{t("home")}</span>
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#1A5BA8] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
            <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
          </a>

          <a 
            href="#about" 
            className={`relative group transition-all duration-300 font-medium transform hover:scale-105 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="relative z-10">{t("about")}</span>
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#1A5BA8] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
            <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
          </a>

          <a 
            href="#objectives" 
            className={`relative group transition-all duration-300 font-medium transform hover:scale-105 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="relative z-10">{t("activities")}</span>
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#1A5BA8] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
            <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
          </a>

          {/* Projects dropdown - hover və click ilə */}
          <div 
            ref={projectsRef}
            className="relative"
            onMouseEnter={() => setIsProjectsDropdownOpen(true)}
            onMouseLeave={() => setIsProjectsDropdownOpen(false)}
          >
            <button
              onClick={toggleProjectsDropdown}
              className={`flex items-center space-x-1 relative transition-all duration-300 font-medium transform hover:scale-105 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              <span className="relative z-10">{t("projects")}</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${
                  isProjectsDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#1A5BA8] transition-all duration-300 rounded-full ${
                isProjectsDropdownOpen ? 'w-full' : 'w-0'
              }`}></span>
              <span className={`absolute inset-0 bg-white/10 rounded-lg transition-transform duration-300 -z-10 ${
                isProjectsDropdownOpen ? 'scale-100' : 'scale-0'
              }`}></span>
            </button>

            {/* Dropdown menu */}
            <div className={`absolute left-0 mt-3 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 transform overflow-hidden ${
              isProjectsDropdownOpen 
                ? 'opacity-100 visible translate-y-0' 
                : 'opacity-0 invisible translate-y-2'
            }`}>
              <div className="py-2">
                {projectsList.map((project, index) => (
                  <a
                    key={index}
                    href={project.href}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#1A5BA8] hover:text-white transition-all duration-300 transform hover:translate-x-1"
                  >
                    <span className="font-medium">{project.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a 
            href="#team" 
            className={`relative group transition-all duration-300 font-medium transform hover:scale-105 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="relative z-10">{t("team")}</span>
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#1A5BA8] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
            <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
          </a>

          <a 
            href="#contact" 
            className={`relative group transition-all duration-300 font-medium transform hover:scale-105 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="relative z-10">{t("contact")}</span>
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#1A5BA8] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
            <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
          </a>

          <a
            href="/blog"
            className={`relative group transition-all duration-300 font-medium transform hover:scale-105 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="relative z-10">{t("blog")}</span>
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#15529F] transition-all duration-300 w-0 group-hover:w-full rounded-full"></span>
            <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
          </a>
        </nav>

        {/* Language Selector - hover və click ilə */}
        <div className="hidden lg:flex items-center">
          <div 
            ref={langRef}
            className="relative"
            onMouseEnter={() => setIsLangDropdownOpen(true)}
            onMouseLeave={() => setIsLangDropdownOpen(false)}
          >
            <button 
              onClick={toggleLangDropdown}
              className="flex items-center px-3 py-2 cursor-pointer rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              {locale === "az" ? (
                <>
                  <div className="w-6 h-5 bg-[url('/svg/emojione_flag-for-azerbaijan.svg')] bg-contain bg-no-repeat mr-2"></div>
                  <span 
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isScrolled ? "text-gray-800" : "text-white"
                    }`}
                  >
                    Azərbaycan
                  </span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-[url('/svg/united-kingdom1.svg')] bg-contain bg-no-repeat mr-2"></div>
                  <span 
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isScrolled ? "text-gray-800" : "text-white"
                    }`}
                  >
                    English
                  </span>
                </>
              )}

              <ChevronDown 
                className={`ml-2 h-4 w-4 transition-all duration-300 ${
                  isLangDropdownOpen ? 'rotate-180' : ''
                } ${isScrolled ? "text-gray-800" : "text-white"}`} 
              />
            </button>

            <div
              className={`absolute top-full right-0 w-[140px] rounded-xl cursor-pointer bg-white shadow-xl border overflow-hidden transition-all duration-300 transform ${
                isLangDropdownOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible translate-y-2'
              } ${isScrolled ? "bg-opacity-95" : "bg-opacity-30"}`}
            >
              <div 
                onClick={() => changeLocale(locale === "az" ? "en" : "az")}
                className="flex items-center py-3 px-4 hover:bg-[#1A5BA8] hover:text-white transition-all duration-300"
              >
                {locale === "az" ? (
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

        {/* Mobile menu button */}
        <button
          className={`lg:hidden focus:outline-none transition-all duration-300 mt-2 flex justify-center transform hover:scale-110 p-2 rounded-lg ${
            isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
          }`}
          onClick={toggleMobileMenu}
        >
          <div className="relative w-6 h-6 pt-2.5 mx-2 flex item-center justify-center">
            <span className={`absolute block h-0.5 w-6 transform transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            } ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}></span>
            <span className={`absolute block h-0.5 w-6 transform transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            } ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}></span>
            <span className={`absolute block h-0.5 w-6 transform transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            } ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`fixed inset-0 h-screen w-screen z-[60] bg-opacity-50 transition-all duration-300 ease-in-out ${
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
            <a
              href="/"
              className="block py-4 text-gray-800 hover:text-[#1A5BA8] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              onClick={handleLinkClick}
            >
              {t("home")}
            </a>
            <a
              href="/#about"
              className="block py-4 text-gray-800 hover:text-[#1A5BA8] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              onClick={handleLinkClick}
            >
              {t("about")}
            </a>
            <a
              href="/#objectives"
              className="block py-4 text-gray-800 hover:text-[#1A5BA8] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              onClick={handleLinkClick}
            >
              {t("activities")}
            </a>

            {/* Projects dropdown for mobile */}
            <div className="border-b">
              <button
                onClick={toggleProjectsDropdown}
                className="w-full flex justify-between items-center py-4 text-gray-800 hover:text-[#1A5BA8] transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              >
                <span>{t("projects")}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${
                    isProjectsDropdownOpen ? 'rotate-180' : 'rotate-90'
                  }`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                isProjectsDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-4 pb-2 space-y-1">
                  {projectsList.map((project, index) => (
                    <a
                      key={index}
                      href={project.href}
                      className="block py-2 text-gray-700 hover:text-[#1A5BA8] transition-all duration-300 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
                      onClick={handleLinkClick}
                    >
                      {project.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="/#team"
              className="block py-4 text-gray-800 hover:text-[#1A5BA8] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              onClick={handleLinkClick}
            >
              {t("team")}
            </a>
            <a
              href="/#contact"
              className="block py-4 text-gray-800 hover:text-[#1A5BA8] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              onClick={handleLinkClick}
            >
              {t("contact")}
            </a>
            <a
              href="/blog"
              className="block py-4 text-gray-800 hover:text-[#1A5BA8] border-b transition-all duration-300 font-medium hover:translate-x-2 hover:bg-gray-50 rounded-lg px-2"
              onClick={handleLinkClick}
            >
              {t("blog")}
            </a>
          </nav>

          {/* Mobile Language Selector */}
          <div className="px-4 py-6 flex space-x-3">
            <button
              className={`px-4 py-3 text-sm rounded-xl transition-all duration-300 flex items-center space-x-2 flex-1 justify-center font-medium transform hover:scale-105 ${
                locale === "az"
                  ? "bg-[#1A5BA8] text-white shadow-lg"
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
                  ? "bg-[#1A5BA8] text-white shadow-lg"
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
  );
}