import { useTranslations } from "next-intl";


export default function Card1() {
  const tProjects =useTranslations("projects")
    return (
    <a href="/digital-diplomats"> 
      <div className="relative  overflow-hidden  w-full max-w-2xl h-auto pt-4 pr-4 pb-4 pl-0  ">
        <img
          src="/images/collective/Meeting3.jpeg" 
          alt="Digital Diplomatlar"
          className=" h-[462px] object-cover rounded-4xl"
        />
  
        <div className="absolute top-11 left-9.5 w-[490px] p-4 bg-white/50 backdrop-blur-md text-gray-900 rounded-[20px]">
          <h3 className="text-xl font-semibold mb-2">{tProjects("digital_diplomats_project")} </h3>
          <p className="text-sm leading-relaxed text-[#3C3C3C] ">
          {tProjects("digital_diplomats_description")}
          </p>
        </div>
      </div></a>
    );
  }
  