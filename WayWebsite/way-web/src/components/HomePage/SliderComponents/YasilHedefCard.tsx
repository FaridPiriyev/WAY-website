import { useTranslations } from "next-intl";
import Image from "next/image";

const YasilHedefCard = () => {
  const tProject = useTranslations ("projects")
  return (
    <a href="/cop29">
      <div className="rounded-2xl  p-4 w-full max-w-sm ml-10 ">
      <div className="rounded-4xl overflow-hidden">
        <Image
          src="/images/collective/YasilHedeff.jpeg"
          alt="Yaşıl Hədəf: Azərbaycan Gənclərinin COP29 Missiyası"
          width={512}
          height={300}
          className="w-full h-[264px] object-cover"
        />
      </div>
      <div className="mt-4 p-[17px] bg-[#F1F1F1] rounded-4xl text-xs h-[181px] flex items-center justify-center flex-col">
        <h3 className="font-semibold text-lg mb-1">
          {tProject("green_goal_project")}
        </h3>
        <p className="text-sm text-[#807E7E] ">
        {tProject("green_goal_description")}
        </p>
      </div>
    </div>
    </a>
  );
};

export default YasilHedefCard;
