import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const ContactSection = () => {
  const tMaps = useTranslations("maps");
  return (
    <div id="contact">
      <div className="bg-white py-4 px-6 flex items-center justify-start text-gray-700 font-medium border-b">
        <Clock className="mr-2" size={20} />
        <span>{tMaps("workingHours")}</span>
      </div>
      <div className="relative w-full h-[700px]">
        {/* Google Maps iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12156.35849193801!2d49.82376757372011!3d40.38470623568382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9beac62069%3A0x1f8d693f61e3667b!2sGlobus%20Center!5e0!3m2!1saz!2saz!4v1746094543942!5m2!1saz!2saz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>

        {/* Desktop Contact Card */}
        <div className="hidden md:block border-[2px] absolute top-1/2 left-10 transform -translate-y-1/2 bg-white p-6 shadow-lg w-[400px] lg:w-[500px]">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            {tMaps("whereToFindUs")}
          </h2>
          <div className="border-b-2 border-gray-800 w-24 mb-6"></div>
          <p className="text-gray-600 mb-8">
            {tMaps("description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg md:text-xl lg:text-xl mb-3">
                {tMaps("addressLabel")}
              </h3>
              <p className="text-gray-600">
                {tMaps("address")}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg md:text-xl lg:text-xl mb-3">
                {tMaps("emailLabel")}
              </h3>
              <p className="text-gray-600 mb-6">{tMaps("email")}</p>

              <h3 className="font-bold text-lg md:text-xl lg:text-xl mb-3">
                {tMaps("phoneLabel")}
              </h3>
              <p className="text-gray-600">{tMaps("phone")}</p>
            </div>
          </div>
        </div>

        {/* Mobile Contact Cards - Separate Divs */}
        <div className="md:hidden absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[340px]">
          <div className="bg-white border-[3px] p-6 shadow-lg mb-3">
            <h2 className="text-xl font-bold mb-3">
              {tMaps("whereToFindUs")}
            </h2>
            <div className="border-b-2 border-gray-800 w-24 mb-3"></div>
            <p className="text-gray-600">
              {tMaps("description")}
            </p>
          </div>
        </div>

        <div className="md:hidden absolute top-[450px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[340px]">
          <div className="bg-white border-[3px] p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-lg mb-2">{tMaps("addressLabel")}</h3>
                <p className="text-gray-600 text-sm">
                  {tMaps("address")}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">{tMaps("emailLabel")}</h3>
                <p className="text-gray-600 text-sm mb-4">{tMaps("email")}</p>

                <h3 className="font-bold text-lg mb-2">{tMaps("phoneLabel")}</h3>
                <p className="text-gray-600 text-sm">{tMaps("phone")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;