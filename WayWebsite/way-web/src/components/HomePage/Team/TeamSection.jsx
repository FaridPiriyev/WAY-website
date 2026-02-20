import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const TeamMember = ({ name, title, imageSrc, isVisible, index, isScrollingUp }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef(null);
  const isEven = index % 2 === 0;
  
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  return (
    <div 
      className={`flex flex-col items-center group transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : isScrollingUp 
            ? isEven 
              ? 'opacity-0 translate-x-8' 
              : 'opacity-0 -translate-x-8'
            : isEven 
              ? 'opacity-0 translate-x-8' 
              : 'opacity-0 -translate-x-8'
      }`}
      style={{
        transitionDelay: isVisible 
          ? `${index * 50}ms` 
          : isScrollingUp 
            ? `${(7 - index) * 30}ms` 
            : `${index * 50}ms`
      }}
    >
      <div 
        ref={imageRef}
        className="w-full aspect-square bg-gray-100 overflow-hidden relative mb-3 h-[400px] rounded-4xl transition-all duration-800 group-hover:scale-105 group-hover:shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {imageSrc ? (
          <>
           
            <img
              src={imageSrc}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover grayscale-0 transition-all duration-300 group-hover:grayscale-0"
            />
            
           
            <img
              src={imageSrc}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0s',
                maskImage: isHovering 
                  ? `radial-gradient(circle 350px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`
                  : 'none',
                WebkitMaskImage: isHovering 
                  ? `radial-gradient(circle 350px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`
                  : 'none',
              }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 transition-all duration-300 group-hover:bg-gray-300" />
        )}
       
      </div>
      <h3 className="text-xl font-bold text-center text-gray-900 transition-colors duration-300 group-hover:text-[#15529F]">
        {name}
      </h3>
      <p className="text-base text-gray-500 text-center transition-all duration-300 group-hover:text-gray-700 group-hover:transform group-hover:-translate-y-1">
        {title}
      </p>
    </div>
  );
};

const TeamSectionEnhanced = () => {
  const tTeam = useTranslations("Team");
  const sectionRef = useRef(null);
  const [visibleMembers, setVisibleMembers] = useState({});
  const [titleVisible, setTitleVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const teamMembers = [
    {
      id: 1,
      name: 'Ramin Həbibzadə',
      title: tTeam("raminHebibzade_title"),
      imageSrc: '/images/avatar/RaminHebibzade.jpg'
    },
    {
      id: 2,
      name: 'Ayxan Hüseynov',
      title: tTeam("ayxanHuseynov_title"),
      imageSrc: '/images/avatar/AyxanHüseynov.png'
    },
    {
      id: 3,
      name: 'Mirhüseyn Tağıyev',
      title: tTeam("mirhuseynTagiyev_title"),
      imageSrc: '/images/avatar/MirhuseynTagiyev.jpeg'
    },
    {
      id: 4,
      name: 'Sevinc Əhmədova',
      title: tTeam("sevincEhmedova_title"),
      imageSrc: '/images/avatar/SevincEhmedova.jpg'
    },
    {
      id: 5,
      name: 'Nuray Rəsulzadə',
      title: tTeam("nurayResulzade_title"),
      imageSrc: '/images/avatar/NurayResulzade.JPG'
    },
    {
      id: 6,
      name: 'Rəmələ Həsənova',
      title: tTeam("remaleHesenova_title"),
      imageSrc: '/images/avatar/RemaleHesenova.jpeg'
    },
    {
      id: 7,
      name: 'Ceyhun Mahmudov',
      title: tTeam("ceyhunMahmudov_title"),
      imageSrc: '/images/avatar/CeyhunMahmudov.jpeg'
    },
    {
      id: 8,
      name: 'Ayxan İsmayılov',
      title: tTeam("ayxanIsmayilov_title"),
      imageSrc: '/images/avatar/AyxanIsmayilov.jpg'
    },
    {
      id: 9,
      name: 'Rauf Hüseynzadə',
      title: tTeam("raufHuseynzade_title"),
      imageSrc: '/images/avatar/RaufHuseynzade.jpg'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '50px 0px 50px 0px'
    };
    
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setTitleVisible(entry.isIntersecting);
      });
    }, observerOptions);
  
    const memberObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisibleMembers(prev => ({
          ...prev,
          [entry.target.dataset.id]: entry.isIntersecting
        }));
      });
    }, observerOptions);

    const titleElement = document.getElementById('team-title');
    if (titleElement) titleObserver.observe(titleElement);
  
    teamMembers.forEach(member => {
      const element = document.getElementById(`team-member-${member.id}`);
      if (element) memberObserver.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (titleElement) titleObserver.unobserve(titleElement);
      teamMembers.forEach(member => {
        const element = document.getElementById(`team-member-${member.id}`);
        if (element) memberObserver.unobserve(element);
      });
    };
  }, [lastScrollY]);

  return (
    <section className="py-16 bg-white" id="team" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <h2 
          id="team-title"
          className={`text-4xl font-bold text-[#15529F] mb-10 ml-5 transition-all duration-700 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-x-0' 
              : isScrollingUp 
                ? 'opacity-0 translate-x-8' 
                : 'opacity-0 -translate-x-8'
          }`}
        >
          {tTeam("teamTitle")}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.slice(0, 8).map((member, index) => (
            <div id={`team-member-${member.id}`} key={member.id} data-id={member.id}>
              <TeamMember
                name={member.name}
                title={member.title}
                imageSrc={member.imageSrc}
                isVisible={visibleMembers[member.id]}
                index={index}
                isScrollingUp={isScrollingUp}
              />
            </div>
          ))}
        </div>
        
        {teamMembers.length > 8 && (
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-xs" id={`team-member-${teamMembers[8].id}`} data-id={teamMembers[8].id}>
              <TeamMember
                name={teamMembers[8].name}
                title={teamMembers[8].title}
                imageSrc={teamMembers[8].imageSrc}
                isVisible={visibleMembers[teamMembers[8].id]}
                index={0}
                isScrollingUp={isScrollingUp}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSectionEnhanced; 