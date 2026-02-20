"use client";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Footer from "@/components/Footer/Footer";
import Navbar2 from "@/components/Navbar/navbar2";


const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);
  const observer = useRef();

  const { threshold = 0.1, rootMargin = "0px" } = options;

  const updateEntry = useCallback((entries) => {
    setEntries(entries);
  }, []);

  const observe = useCallback((element) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(updateEntry, {
      threshold,
      rootMargin,
    });

    if (element) observer.current.observe(element);
  }, [updateEntry, threshold, rootMargin]);

  const unobserve = useCallback(() => {
    if (observer.current) observer.current.disconnect();
  }, []);

  return [entries, observe, unobserve];
};

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

  const animationClass = useMemo(() => {
    const baseClasses = "transition-all duration-1000 ease-out";

    switch (animationType) {
      case "fadeInUp":
        return `${baseClasses} ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
          }`;
      case "fadeInLeft":
        return `${baseClasses} ${isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-10"
          }`;
      case "fadeInRight":
        return `${baseClasses} ${isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-10"
          }`;
      case "scaleIn":
        return `${baseClasses} ${isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
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
};

const BlogCard = ({ post, index, tBlog, locale }) => {
  const router = useRouter();
  const [timeAgo, setTimeAgo] = useState("");

  const handleCardClick = useCallback((e) => {
    if (e.target.closest('button')) return;
    router.push(`/blog/${post.slug}`);
  }, [router, post.slug]);

  const handleReadMore = useCallback((e) => {
    e.stopPropagation();
    router.push(`/blog/${post.slug}`);
  }, [router, post.slug]);


  useEffect(() => {
    const getTimeAgo = (publishedAt) => {
      const now = new Date();
      const publishedDate = new Date(publishedAt);
      const diffMs = now - publishedDate;

      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
      return "just now";
    };

    if (post?.datePublished) {
      setTimeAgo(getTimeAgo(post.datePublished));
      const interval = setInterval(() => {
        setTimeAgo(getTimeAgo(post.datePublished));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [post?.datePublished]);


  const categoryColor = useMemo(() => {
    const colors = {
      "Tarix": "bg-blue-100 text-blue-800 border-blue-200",
      "History": "bg-blue-100 text-blue-800 border-blue-200",
      "Tədqiqat": "bg-green-100 text-green-800 border-green-200",
      "Research": "bg-green-100 text-green-800 border-green-200",
      "Gənc Səfirlər": "bg-purple-100 text-purple-800 border-purple-200",
      "Young Ambassadors": "bg-purple-100 text-purple-800 border-purple-200",
      "Siyasət": "bg-red-100 text-red-800 border-red-200",
      "Politics": "bg-red-100 text-red-800 border-red-200",
      "Dövlətçilik": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Statehood": "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return colors[post.category] || "bg-gray-100 text-gray-800 border-gray-200";
  }, [post.category]);

  const authorInitials = useMemo(() => {
    return post.author.split(' ').map(n => n[0]).join('');
  }, [post.author]);

  return (
    <AnimatedSection
      animationType="scaleIn"
      delay={index * 100}
      className="group"
    >
      <div
        onClick={handleCardClick}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border border-gray-100 relative cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 3}
            onError={(e) => {
              e.target.src = '/images/default-blog.jpg';
            }}
          />
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${categoryColor}`}>
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6 relative z-10">
          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{timeAgo}</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{post.date}</span>
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#15529F] transition-colors duration-300 line-clamp-1">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-800 transition-colors duration-300">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#15529F] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {authorInitials}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#15529F] transition-colors duration-300">
                {post.author}
              </span>
            </div>

            <button
              onClick={handleReadMore}
              className="flex items-center space-x-2 text-[#15529F] hover:text-[#1a5ba8] font-semibold transition-all duration-300 group-hover:translate-x-1 z-20 relative"
            >
              <span>{tBlog("read_more")}</span>
              <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default function BlogPage() {
  const tBlog = useTranslations("Blogs");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const [selectedCategory, setSelectedCategory] = useState(tCommon("all"));
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelectedCategory(tCommon("all"));
  }, [locale, tCommon]);

  const blogPosts = useMemo(() => {
    const posts = [
      {
        id: 1,
        title: tBlog("blog1_title"),
        slug: "historical-facts-of-the-atropatene-state",
        author: "Müşərrəf Kərimli",
        date: "2025-01-27",
        category: tBlog("blog1_category"),
        image: "/images/collective/westernaze3.jpg",

        datePublished: "2025-01-27T14:30:00Z",
        excerpt: tBlog("blog1_excerpt"),
      },
      {
        id: 2,
        title: tBlog("blog2_title"),
        slug: "historical-research-and-future-perspectives",
        author: "Nicat Səfərli",
        date: "2025-01-27",
        category: tBlog("blog2_category"),
        image: "/images/collective/westernaze2.jpg",

        datePublished: "2025-01-27T14:30:00Z",
        excerpt: tBlog("blog2_excerpt"),
      },
      {
        id: 3,
        title: tBlog("blog3_title"),
        slug: "the-historical-mission-of-the-young-ambassadors",
        author: "Sahibə Putiyeva",
        date: "2025-01-27",
        category: tBlog("blog3_category"),
        image: "/images/collective/westernaze1.jpg",

        datePublished: "2025-01-27T14:30:00Z",
        excerpt: tBlog("blog3_excerpt"),
      },
      {
        id: 4,
        title: tBlog("blog4_title"),
        slug: "history-in-the-context-of-international-relations",
        author: "Şəhriyar Rüstəmov",
        date: "2025-01-27",
        category: tBlog("blog4_category"),
        image: "/images/collective/westernaze5.jpg",

        datePublished: "2025-01-27T14:30:00Z",
        excerpt: tBlog("blog4_excerpt"),
      },
      {
        id: 5,
        title: tBlog("blog5_title"),
        slug: "the-fundamental-structure-of-azerbaijani-statehood",
        author: "Fərid Şükürlü",
        date: "2025-01-27",
        datePublished: "2025-01-27T14:30:00Z",
        category: tBlog("blog5_category"),
        image: "/images/collective/westernaze4.jpg",

        excerpt: tBlog("blog5_excerpt"),
      }
    ];

    return posts.map(post => ({
      ...post,
      slug: createSlug(post.slug)
    }));
  }, [tBlog]);



  const categories = useMemo(() => [
    tCommon("all"),
    tBlog("categories.history"),
    tBlog("categories.research"),
    tBlog("categories.young_ambassadors"),
    tBlog("categories.politics"),
    tBlog("categories.statehood")
  ], [tCommon, tBlog]);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (selectedCategory !== tCommon("all")) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [blogPosts, selectedCategory, searchTerm, tCommon]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <>
      <div>
        <Navbar2 />
      </div>
      <div className="min-h-screen bg-gray-50 mx-auto">
        <section className="relative py-24 bg-gradient-to-br from-[#15529F] via-[#1a5ba8] to-[#1f65b1] overflow-hidden ">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection animationType="fadeInUp" className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
                {tBlog("title")}
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto hover:text-white transition-colors duration-300 cursor-default">
                {tBlog("subtitle")}
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-12 bg-white shadow-sm mx-auto">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatedSection animationType="fadeInUp">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder={tBlog("search_placeholder")}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15529F] focus:border-transparent transition-all duration-300 hover:shadow-md"
                  />
                  <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 font-medium hover:scale-105 ${selectedCategory === category
                        ? "bg-[#15529F] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            {filteredPosts.length === 0 ? (
              <AnimatedSection animationType="fadeInUp" className="text-center py-16">
                <div className="text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">{tBlog("no_posts_title")}</h3>
                  <p>{tBlog("no_posts_message")}</p>
                </div>
              </AnimatedSection>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} tBlog={tBlog} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}