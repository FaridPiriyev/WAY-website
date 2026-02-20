import { useTranslations } from "next-intl";

export default function PythonTrainingCard() {
  const tProject = useTranslations("projects")
    return (
     <a href="python-training">
       <div className="flex justify-center items-center  p-4 ml-10">
        <div className="relative   rounded-[20px] overflow-hidden">
          {/* Background Image */}
          <img
            src="images/collective/Training.jpeg" 
            alt="Python təlimləri"
            className="w-[450px] h-[462px] object-cover"
          />
          {/* Blur Box */}
          <div className="absolute top-5 left-35 bg-white/50 backdrop-blur-md p-4 rounded-3xl max-w-[300px]">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{tProject("python_training")} </h2>
            <p className="text-sm text-gray-800 leading-snug">
            {tProject("python_training_description")}
            </p>
          </div>
        </div>
      </div>
     </a>
    );
  }
  