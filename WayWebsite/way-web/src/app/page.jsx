"use client";
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar/navbar";
import { useTranslations } from "next-intl";
import ideaIcon from "/public/svg/icons8_idea.svg";
import goal from "/public/svg/octicon_goal-16.svg";
import Objectives from "@/components/HomePage/ObjectivesSection/Objectives";
import Slider from "@/components/HomePage/Swiper/Slider";
import TeamSectionEnhanced from "@/components/HomePage/Team/TeamSection";
import ContactSection from "@/components/HomePage/ContactUs&MapSection/Contact&MapSection";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import certificates from "@/../certificate/id.json";
import certificateImg from "@/../public/images/others/certificate_qr.jpg";

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
const AnimatedSection = ({
  children,
  className = "",
  animationType = "fadeInUp",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();
  const [entries, observe] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`;
    } else if (animationType === "fadeInLeft") {
      return `${baseClasses} ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`;
    } else if (animationType === "fadeInRight") {
      return `${baseClasses} ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`;
    } else if (animationType === "scaleIn") {
      return `${baseClasses} ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
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

// Counter Animation Component
const AnimatedCounter = ({ end, duration = 3000, className = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef();
  const [entries, observe] = useIntersectionObserver();

  useEffect(() => {
    if (counterRef.current) {
      observe(counterRef.current);
    }
  }, [observe]);

  useEffect(() => {
    if (entries.length > 0 && entries[0].isIntersecting && !isVisible) {
      setIsVisible(true);

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [entries, end, duration, isVisible]);

  return (
    <div ref={counterRef} className={className}>
      {count}+
    </div>
  );
};

export default function Home() {
  const tHero = useTranslations("hero");
  const tStats = useTranslations("stats");
  const tAbout = useTranslations("about");
  const tMission = useTranslations("mission");
  const tVision = useTranslations("vision");
  const tProjects = useTranslations("projects");
  const tCertificate = useTranslations("certificate");
  const [currentSlide, setCurrentSlide] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const sliderRef = useRef(null);

  const handleSwipeRight = () => {
    sliderRef.current?.slideToEnd();
  };

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (!scrollTo) return;

    const performScroll = () => {
      let attempts = 0;
      const maxAttempts = 30;
      const tryScroll = () => {
        attempts++;
        const element = document.getElementById(scrollTo);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.delete("scrollTo");
          window.history.replaceState(
            {},
            document.title,
            currentUrl.pathname + currentUrl.search,
          );
        } else if (attempts < maxAttempts) {
          setTimeout(tryScroll, 2000);
        }
      };

      tryScroll();
    };

    if (document.readyState === "complete") {
      setTimeout(performScroll, 1000);
    } else {
      window.addEventListener("load", () => {
        setTimeout(performScroll, 1000);
      });
    }

    return () => {
      window.removeEventListener("load", performScroll);
    };
  }, [searchParams, router]);

  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const handleCheck = () => {
    const found = certificates.find(
      (c) => c.id.trim().toUpperCase() === certId.trim().toUpperCase(),
    );
    if (found) {
      setResult(found);
      setError(false);
    } else {
      setResult(null);
      setError(true);
    }
  };

  const handleDownloadPDF = (pdfPath) => {
    if (!pdfPath) {
      alert("Bu sertifikat üçün PDF faylı tapılmadı!");
      return;
    }
    window.open(pdfPath, "_blank");
  };

  useEffect(() => {
    const urlId = searchParams.get("id");
    if (urlId) {
      setCertId(urlId);

      const found = certificates.find(
        (c) => c.id.trim().toUpperCase() === urlId.trim().toUpperCase(),
      );

      if (found) {
        setResult(found);
        setError(false);
        setTimeout(() => {
          document
            .getElementById("certificate")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        setError(true);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen justify-center">
      <Head>
        <title>World Azerbaijanis Youth Organization</title>
        <meta
          name="description"
          content="World Azerbaijanis Youth Organization"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hover:shadow-lg transition-shadow duration-300">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] group overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105">
          <Image
            src="/images/collective/MEETING.jpeg"
            alt="Youth meeting"
            layout="fill"
            objectFit="cover"
            priority
            className="transition-all duration-700 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity duration-700"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end justify-center p-5">
          <AnimatedSection
            animationType="fadeInUp"
            className="text-3xl md:text-4xl lg:text-5xl sm:text-center text-center font-bold text-white pb-16 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-default"
          >
            <span className="text-white hover:text-gray-200 transition-colors duration-300">
              {tHero("title1")}
            </span>{" "}
            <span className="text-blue-500 hover:text-[#15529F] transition-colors duration-300 hover:drop-shadow-lg">
              {tHero("title2")}
            </span>{" "}
            <span className="text-white hover:text-gray-200 transition-colors duration-300">
              {tHero("title3")}
            </span>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection animationType="fadeInUp" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <AnimatedSection
              animationType="scaleIn"
              delay={100}
              className="p-6 group"
            >
              <div className="transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-3">
                <div className="relative overflow-hidden rounded-xl p-6 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
                  <AnimatedCounter
                    end={12}
                    className="text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 relative z-10"
                  />
                  <p className="text-xl text-gray-600 mt-2 hover:text-gray-800 transition-colors duration-300 relative z-10">
                    {tStats("projects")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection
              animationType="scaleIn"
              delay={200}
              className="p-6 group"
            >
              <div className="transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:-rotate-3">
                <div className="relative overflow-hidden rounded-xl p-6 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500/10 before:to-blue-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
                  <AnimatedCounter
                    end={5000}
                    className="text-4xl font-bold text-gray-800 hover:text-green-600 transition-colors duration-300 relative z-10"
                  />
                  <p className="text-xl text-gray-600 mt-2 hover:text-gray-800 transition-colors duration-300 relative z-10">
                    {tStats("beneficiaries")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection
              animationType="scaleIn"
              delay={300}
              className="p-6 group"
            >
              <div className="transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-3">
                <div className="relative overflow-hidden rounded-xl p-6 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:to-pink-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
                  <AnimatedCounter
                    end={25}
                    className="text-4xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300 relative z-10"
                  />
                  <p className="text-xl text-gray-600 mt-2 hover:text-gray-800 transition-colors duration-300 relative z-10">
                    {tStats("team_members")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* About Us Section */}
      <section
        className="py-16 container max-w-7xl mx-auto hover:bg-gray-50/50 transition-colors duration-700"
        id="about"
      >
        <div className="container mx-auto px-4">
          <AnimatedSection animationType="fadeInUp">
            <h2 className="text-3xl font-bold text-[#15529F] mb-8 hover:text-[#1a5ba8] transition-colors duration-300 cursor-default hover:drop-shadow-sm">
              {tAbout("title")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <AnimatedSection animationType="fadeInLeft" className="space-y-4">
              <p className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:tracking-wide cursor-default hover:pl-2">
                {tAbout("p1")}
              </p>
              <p className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:tracking-wide cursor-default hover:pl-2 lg:w-[600px]">
                {tAbout("p2")}
              </p>
              <p className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:tracking-wide cursor-default hover:pl-2">
                {tAbout("p3")}
              </p>
              <p className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:tracking-wide cursor-default hover:pl-2">
                {tAbout("p4")}
              </p>
            </AnimatedSection>
            <AnimatedSection
              animationType="fadeInRight"
              className="flex justify-center"
            >
              <div className="relative w-full h-64 md:h-80 group overflow-hidden rounded-lg">
                <div className="transform transition-all duration-700 hover:scale-110 hover:rotate-2 w-full h-full">
                  <Image
                    src="/images/collective/Meeting2.jpeg"
                    alt="Team meeting"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg transition-all duration-700 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white" id="vision">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto container">
            <AnimatedSection
              animationType="fadeInLeft"
              className="flex justify-center"
            >
              <div className="border-[3px] border-[#15529F] rounded-2xl p-8 w-[400px] group relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl hover:shadow-blue-200/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/50 to-blue-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center mb-4 relative z-10">
                  <div className="p-3 rounded-full mr-3 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <Image
                      className="h-10 w-10 transition-all duration-500 group-hover:brightness-110"
                      priority
                      src={goal}
                      alt="Goal"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 ml-8 group-hover:text-[#15529F] transition-colors duration-300">
                    {tMission("title")}
                  </h3>
                </div>
                <p className="text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300 relative z-10">
                  {tMission("description")}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection
              animationType="fadeInRight"
              className="flex justify-center"
            >
              <div className="border-[3px] border-[#15529F] rounded-2xl p-8 w-[400px] group relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:-rotate-1 hover:shadow-2xl hover:shadow-purple-200/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center mb-4 relative z-10">
                  <div className="p-3 rounded-full border-black mr-4 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                    <Image
                      className="h-10 w-10 transition-all duration-500 group-hover:brightness-110"
                      priority
                      src={ideaIcon}
                      alt="Vision"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center ml-5 group-hover:text-[#15529F] transition-colors duration-300">
                    {tVision("title")}
                  </h3>
                </div>
                <p className="text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300 relative z-10">
                  {tVision("description")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatedSection
        animationType="fadeInUp"
        className="container mx-auto transition-shadow duration-500"
        id="objectives"
      >
        <Objectives />
      </AnimatedSection>

      {/* Slider Section */}
      <section className="container mx-auto max-w-7xl" id="projects">
        <AnimatedSection animationType="fadeInUp">
          <h2 className="text-4xl font-bold text-[#15529F] mb-10 ml-5 hover:text-[#1a5ba8] transition-all duration-300 cursor-default">
            {tProjects("projects_title")}
          </h2>
        </AnimatedSection>

        <AnimatedSection
          animationType="scaleIn"
          className="container mx-auto bg-[#C1CDDC] rounded-4xl px-4 mb-5 group"
        >
          <Slider ref={sliderRef} onSlideChange={setCurrentSlide} />
        </AnimatedSection>

        <AnimatedSection animationType="fadeInUp">
          <div className="flex justify-center gap-2 lg:visible invisible">
            {Array.from({ length: 5 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => sliderRef.current?.handleDotClick(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeInRight"
          className="w-full flex justify-end"
        >
          <div className="w-full items-center flex justify-end gap-3 mr-6 cursor-pointer">
            <div className="group flex gap-2">
              <h1
                onClick={handleSwipeRight}
                className="font-bold group-hover:text-[#15529F] transition-colors duration-300 group-hover:tracking-wide"
              >
                {tProjects("swipe_right")}
              </h1>
              <img
                src="/svg/Arrow 1.svg"
                alt="Arrow"
                className="animate-pulse transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Certificate Verification Section */}
      <section
        className="container mx-auto max-w-7xl py-16 px-4"
        id="certificate"
      >
        <AnimatedSection animationType="fadeInUp">
          <h2 className="text-4xl font-bold text-[#15529F] mb-12 ml-2 hover:text-[#1a5ba8] transition-all duration-500 transform hover:translate-x-3 cursor-default">
            {tCertificate("title")}
          </h2>

          <div className="max-w-7xl mx-auto bg-slate-50/50 backdrop-blur-3xl p-8 md:p-14 rounded-[3rem] border border-white shadow-2xl relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-10%] w-[70%] h-[120%] opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-1000 pointer-events-none z-0">
              <Image
                src={certificateImg}
                alt="background-certificate"
                layout="fill"
                objectFit="contain"
                className="rotate-[-10deg]"
                priority
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full lg:w-2/3 relative z-10">
              <div className="text-left mb-10">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 tracking-widest uppercase animate-pulse">
                  Rəsmi Doğrulama
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight leading-tight transition-all duration-700 group-hover:text-blue-900">
                  WAY Sertifikat <br />
                  <span className="text-blue-600 inline-block hover:translate-x-2 transition-transform duration-500 cursor-default">
                    Skaner Sistemi
                  </span>
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md opacity-90 tracking-tight transition-all duration-700 hover:translate-x-2">
                  Sertifikatın rəsmiliyini yoxlamaq və rəqəmsal versiyanı əldə
                  etmək üçün identifikatoru daxil edin.
                </p>
              </div>

              <div className="relative mb-8 max-w-xl transform transition-all duration-500 hover:scale-[1.02]">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="WAY-XXXX-XXX"
                  className="w-full px-8 py-6 bg-white border-2 border-slate-200 focus:border-blue-500 rounded-3xl outline-none transition-all duration-300 text-lg font-mono shadow-sm focus:shadow-xl focus:shadow-blue-100"
                />
                <button
                  onClick={handleCheck}
                  className="absolute right-3 top-3 bottom-3 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg hover:shadow-blue-400/40"
                >
                  Yoxla
                </button>
              </div>

              <div className="min-h-[120px] max-w-xl">
                {result && (
                  <div className="bg-white border-l-8 border-emerald-500 p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-left-8 duration-700 ease-out">
                    <div className="flex justify-between items-start mb-6 gap-4">
                      <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-1000 delay-200">
                        <h4 className="font-black text-slate-900 text-2xl tracking-tight">
                          Sertifikat Rəsmidi
                        </h4>
                        <p className="text-emerald-600 font-bold flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                          Orijinal Sertifikat
                        </p>
                      </div>

                      <button
                        onClick={() => handleDownloadPDF(result.pdf)}
                        className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-[10px] font-black py-4 px-6 rounded-2xl transition-all active:scale-90 shadow-xl hover:-translate-y-1 whitespace-nowrap"
                      >
                        PDF YÜKLƏ
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-slate-100">
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                          Ad Soyad
                        </p>
                        <p className="font-bold text-slate-800 text-lg">
                          {result.fullName}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                          Verilmə Tarixi
                        </p>
                        <p className="font-bold text-slate-800 text-lg">
                          {result.issueDate}
                        </p>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                          Proqram Adı
                        </p>
                        <p className="font-bold text-slate-800 text-lg leading-relaxed">
                          {result.project}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-rose-50 border-l-8 border-rose-500 p-8 rounded-3xl animate-in fade-in zoom-in-95 duration-500">
                    <h4 className="text-rose-900 font-black text-xl italic animate-pulse">
                      Sertifikat Tapılmadı!
                    </h4>
                    <p className="text-rose-600 font-medium">
                      Bu kod üzrə aktiv bir sertifikat qeydiyyatı mövcud deyil.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Team Sections */}
      <AnimatedSection
        animationType="fadeInUp"
        className="container mx-auto mb-10"
        id="team"
      >
        <TeamSectionEnhanced />
      </AnimatedSection>

      {/* Map section */}
      <AnimatedSection animationType="fadeInUp" id="contact">
        <ContactSection />
      </AnimatedSection>

      <AnimatedSection animationType="fadeInUp">
        <Footer />
      </AnimatedSection>
    </div>
  );
}
