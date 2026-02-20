import { useTranslations } from "next-intl";

export default function AI4CultureCard() {
  const tProjects = useTranslations("projects")
    return (
      <a href="ai4culture">
        <div className="flex justify-center items-center p-4 ml-10">
        <div className="w-[500px] rounded-[20px] overflow-hidden  ">
          {/* text box*/}
          <div className="bg-[#F1F1F1] py-9 px-4 rounded-[20px]">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {tProjects("ai4culture_project")}
            </h2>
            <p className="text-sm text-[#807E7E] leading-snug">
            {tProjects("ai4culture_description")}
            </p>
          </div>
  
          {/* image box */}

          <div className="w-full h-auto pt-4">
            <img
              src="images/collective/AI4Culture.jpeg" 
              alt="AI4Culture Tədbiri"
              className="w-full h-[233px] object-cover rounded-[20px]"
            />
          </div>
        </div>
      </div>
      </a>
    );
  }
  