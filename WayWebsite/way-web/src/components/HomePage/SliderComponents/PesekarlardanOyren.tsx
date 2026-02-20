
import { useTranslations } from "use-intl";


export default function PesekarlardanOyren() {
  const tProject = useTranslations("projects")
    return (
      <a href="/learn-from-a-professional">
        <div className="relative  overflow-hidden  w-full max-w-2xl h-auto p-4 ml-5   ">
        <img
          src="/images/collective/genz.jpeg" 
          alt="Digital Diplomatlar"
          className=" h-[462px] object-cover rounded-4xl"
        />
  
        <div className="absolute top-11 left-11 w-[490px] p-4 bg-white/50 backdrop-blur-md text-gray-900 rounded-[20px]">
          <h3 className="text-xl font-semibold mb-2">{tProject("z_gen_in_business_project")} </h3>
          <p className="text-sm leading-relaxed text-[#3C3C3C]">
           {tProject("z_gen_in_business_description")}
          </p>
        </div>
      </div>
      </a>
    );
  }
  