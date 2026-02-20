"use client";
import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";

import { useParams } from "next/navigation";
import Image from "next/image";

import Navbar2 from "@/components/Navbar/navbar2";
import Footer from "@/components/Footer/Footer";
import { useTranslations, useLocale } from "next-intl";
import TableOfContents from "@/components/blog/BlogDetailComponents/TableOfContents";
import { Breadcrumb } from "@/components/blog/BlogDetailComponents/Breadcrumb";
import { LoadingComponent } from "@/components/blog/BlogDetailComponents/LoadingComponent";
import { NotFoundComponent } from "@/components/blog/BlogDetailComponents/NotFoundComonent";
import { ProgressBar } from "@/components/blog/BlogDetailComponents/ProgressBar";

const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);
  const observer = useRef();
  const { threshold = 0.1, rootMargin = "0px" } = options;

  const updateEntry = useCallback((entries) => {
    setEntries(entries);
  }, []);

  const observe = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(updateEntry, {
        threshold,
        rootMargin,
      });

      if (element) observer.current.observe(element);
    },
    [updateEntry, threshold, rootMargin]
  );

  const unobserve = useCallback(() => {
    if (observer.current) observer.current.disconnect();
  }, []);

  return [entries, observe, unobserve];
};

const AnimatedSection = memo(
  ({ children, className = "", animationType = "fadeInUp", delay = 0 }) => {
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

    const animationClass = useMemo(() => {
      const baseClasses = "transition-all duration-1000 ease-out";

      switch (animationType) {
        case "fadeInUp":
          return `${baseClasses} ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`;
        case "fadeInLeft":
          return `${baseClasses} ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`;
        case "fadeInRight":
          return `${baseClasses} ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`;
        case "scaleIn":
          return `${baseClasses} ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`;
        case "slideInTop":
          return `${baseClasses} ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`;
        case "zoomIn":
          return `${baseClasses} ${
            isVisible
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-75 rotate-3"
          }`;
        default:
          return baseClasses;
      }
    }, [animationType, isVisible]);

    return (
      <div
        ref={sectionRef}
        className={`${animationClass} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
);

// Back to Top Button Component
const BackToTopButton = memo(({ progress }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center z-40 ${
        progress > 10 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:scale-110`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
});

// Main Blog Detail Component
export default function BlogDetailPage() {
  const tBlogDetail = useTranslations("BlogDetail");
  const tBlog = useTranslations("Blogs");
  const locale = useLocale();
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const posts = [
      {
        id: 1,
        slug: "historical-facts-of-the-atropatene-state",
        title: tBlog("blog1_title"),
        author: "Müşərrəf Kərimli",
        date: "2025-01-27",
        category: tBlog("blog1_category"),
        image: "/images/collective/westernaze3.jpg",
        readTime: `8${tBlog("minutes")}`,
        datePublished: "2025-01-27T14:30:00Z",
        excerpt: tBlog("blog1_excerpt"),
        content: {
          introduction: tBlog("blog1_introduction"),
          maincontent: {
            historical: tBlog("blog1_historical"),
            modern: tBlog("blog1_modern"),
          },
          conclusion: tBlog("blog1_conclusion"),
        },
      },
      {
        id: 2,
        slug: "historical-research-and-future-perspectives",
        title: tBlog("blog2_title"),
        author: "Nicat Səfərli",
        date: "2025-01-27",
        category: tBlog("blog2_category"),
        image: "/images/collective/westernaze2.jpg",
        datePublished: "2025-01-27T14:30:00Z",
        readTime: `6${tBlog("minutes")}`,
        excerpt: tBlog("blog2_excerpt"),
        content: {
          introduction: tBlog("blog2_introduction"),
          maincontent: {
            historical: tBlog("blog2_historical"),
            modern: tBlog("blog2_modern"),
          },
          conclusion: tBlog("blog2_conclusion"),
        },
      },
      {
        id: 3,
        slug: "the-historical-mission-of-the-young-ambassadors",
        title: tBlog("blog3_title"),
        author: "Sahibə Putiyeva",
        date: "2025-01-27",
        category: tBlog("blog3_category"),
        image: "/images/collective/westernaze1.jpg",
        datePublished: "2025-01-27T14:30:00Z",
        readTime: `7${tBlog("minutes")}`,
        excerpt: tBlog("blog3_excerpt"),
        content: {
          introduction: tBlog("blog3_introduction"),
          maincontent: {
            historical: tBlog("blog3_historical"),
            modern: tBlog("blog3_modern"),
          },
          conclusion: tBlog("blog3_conclusion"),
        },
      },
      {
        id: 4,
        slug: "history-in-the-context-of-international-relations",
        title: tBlog("blog4_title"),
        author: "Şəhriyar Rüstəmov",
        date: "2025-01-27",
        category: tBlog("blog4_category"),
        image: "/images/collective/westernaze5.jpg",
        datePublished: "2025-01-27T14:30:00Z",
        readTime: `5${tBlog("minutes")}`,
        excerpt: tBlog("blog4_excerpt"),
        content: {
          introduction: tBlog("blog4_introduction"),
          maincontent: {
            historical: tBlog("blog4_historical"),
            modern: tBlog("blog4_modern"),
          },
          conclusion: tBlog("blog4_conclusion"),
        },
      },
      {
        id: 5,
        slug: "the-fundamental-structure-of-azerbaijani-statehood",
        title: tBlog("blog5_title"),
        author: "Fərid Şükürlü",
        date: "2025-01-27",
        category: tBlog("blog5_category"),
        image: "/images/collective/westernaze4.jpg",
        datePublished: "2025-01-27T14:30:00Z",
        readTime: `9${tBlog("minutes")}`,
        excerpt: tBlog("blog5_excerpt"),
        content: {
          introduction: tBlog("blog5_introduction"),
          maincontent: {
            historical: tBlog("blog5_historical"),
            modern: tBlog("blog5_modern"),
          },
          conclusion: tBlog("blog5_conclusion"),
        },
      },
    ];
    setBlogPosts(posts);
  }, [tBlog]);

  useEffect(() => {
    if (post?.datePublished) {
      setTimeAgo(getTimeAgo(post.datePublished));
      const interval = setInterval(() => {
        setTimeAgo(getTimeAgo(post.datePublished));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [post?.datePublished]);

  const getTimeAgo = (publishedAt) => {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffMs = now - publishedDate;

    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMinutes > 0)
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    return "just now";
  };

  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (params?.slug && blogPosts.length > 0) {
      const foundPost = blogPosts.find((p) => p.slug === params.slug);
      setPost(foundPost || null);
      setLoading(false);
    } else if (blogPosts.length > 0) {
      setLoading(false);
    }
  }, [params?.slug, blogPosts]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min((scrollTop / docHeight) * 100, 100);
          setReadingProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCategoryColor = useCallback((category) => {
    const colors = {
      Tarix: "from-blue-500 to-blue-600",
      History: "from-blue-500 to-blue-600",
      Tədqiqat: "from-green-500 to-green-600",
      Research: "from-green-500 to-green-600",
      "Gənc Səfirlər": "from-purple-500 to-purple-600",
      "Young Ambassadors": "from-purple-500 to-purple-600",
      Siyasət: "from-red-500 to-red-600",
      Politics: "from-red-500 to-red-600",
      Dövlətçilik: "from-yellow-500 to-yellow-600",
      Statehood: "from-yellow-500 to-yellow-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!post) {
    return <NotFoundComponent />;
  }

  return (
    <>
      <div className="relative z-40">
        <Navbar2 />
      </div>
      <div className="mt-30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            className="mt-30 "
            title={post.title}
            blogLink={`/${locale}/blog`}
          />
        </div>
        <ProgressBar progress={readingProgress} />

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/90 via-blue-600/90 to-blue-950"></div>
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection
              animationType="fadeInUp"
              className="max-w-4xl mx-auto text-center"
            >
              <div className="mb-8">
                <span
                  className={`inline-block px-6 py-3 text-sm font-semibold rounded-full bg-gradient-to-r ${getCategoryColor(
                    post.category
                  )} text-white shadow-xl backdrop-blur-sm border border-white/20`}
                >
                  {post.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-blue-100">
                <div className="flex items-center space-x-3 backdrop-blur-md bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-lg font-bold">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="font-semibold text-lg">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2 backdrop-blur-md bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-lg">{post.date}</span>
                </div>
                <div className="flex items-center space-x-2 backdrop-blur-md bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-lg">{timeAgo}</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Table of Contents - Left Sidebar */}
                <div className="lg:col-span-1 order-1 lg:order-1">
                  <AnimatedSection animationType="fadeInLeft" delay={200}>
                    <TableOfContents content={post.content} />
                  </AnimatedSection>
                </div>

                {/* Main Article Content */}
                <div className="lg:col-span-3 order-2 lg:order-2">
                  <AnimatedSection animationType="fadeInUp" delay={100}>
                    <article className="backdrop-blur-md bg-white/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
                      {/* Featured Image */}
                      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                        <div className="absolute inset-0 z-10"></div>
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-700 hover:scale-105"
                          onError={(e) => {
                            e.target.src = "/images/collective/westernaze6.jpg";
                          }}
                        />
                      </div>

                      {/* Article Content */}
                      <div className="prose prose-lg max-w-none">
                        <div id="giris" className="scroll-mt-8">
                          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {tBlogDetail("introduction")}
                          </h2>
                          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                            {post.content.introduction}
                          </p>
                        </div>

                        <div id="ana-mezmun" className="scroll-mt-8">
                          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {tBlogDetail("mainContent")}
                          </h2>

                          <div
                            id="tarixsel-kontekst"
                            className="scroll-mt-8 mb-10"
                          >
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                              {tBlogDetail("historicalContext")}
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                              {post.content.maincontent.historical}
                            </p>
                          </div>

                          <div id="muasir-baxis" className="scroll-mt-8 mb-10">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                              {tBlogDetail("modernPerspective")}
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                              {post.content.maincontent.modern}
                            </p>

                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
                              <blockquote className="text-gray-800 italic text-lg font-medium">
                                {tBlogDetail("quote")}
                              </blockquote>
                            </div>
                          </div>
                        </div>

                        <div id="netice" className="scroll-mt-8">
                          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {tBlogDetail("conclusion")}
                          </h2>
                          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                            {post.content.conclusion}
                          </p>
                        </div>
                      </div>
                    </article>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BackToTopButton progress={readingProgress} />
        <Footer />
      </div>
    </>
  );
}
