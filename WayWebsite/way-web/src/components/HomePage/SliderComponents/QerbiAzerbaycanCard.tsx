import { useTranslations } from "next-intl";
import Image from "next/image";

const QerbiAzerbaycanCard = () => {
  const tProject = useTranslations("projects")
  return (
    <a href="/western-aze">
      <div className="rounded-2xl  p-4 w-full max-w-sm ml-10 ">
      <div className="rounded-4xl overflow-hidden">
        <Image
          src="/images/collective/Meet6.png"
          alt="Qərbi Azərbaycanlıların gənc səfirləri"
          width={512}
          height={312}
          className="w-full h-[264px] object-cover"
        />
      </div>
      <div className="mt-4 p-[31px] rounded-4xl bg-[#F1F1F1]">
        <h3 className="font-semibold text-lg mb-1">
          {tProject("young_envoys_project")}
        </h3>
        <p className="text-sm text-[#807E7E]">
         {tProject("young_envoys_description")}
        </p>
      </div>
    </div>
    </a>
  );
};

export default QerbiAzerbaycanCard;
