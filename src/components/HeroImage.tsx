import { Elements } from "@kontent-ai/delivery-sdk";
import { FC } from "react";
import ButtonLink from "./ButtonLink";
import { createElementSmartLink, createItemSmartLink } from "../utils/smartlink";
import { HeroButton } from "../model";

type HeroImageProps = Readonly<{
  data: {
    headline?: Elements.TextElement;
    subheadline?: Elements.TextElement;
    heroImage?: Elements.AssetsElement;
    heroButtons?: HeroButton[];
    itemId?: string;
  };
  buttonLink?: string;

}>;

const HeroImage: FC<HeroImageProps> = ({ data, buttonLink }) => {

  console.log(data);
  return (
    <div className="relative w-full h-[600px] lg:h-[700px]">
      {/* Full-width background image */}
      <div className="absolute inset-0"
        {...createItemSmartLink(data.itemId)}
        {...createElementSmartLink("hero_image")}
      >
        {data.heroImage?.value[0]
          ? (
            data.heroImage.value[0].type?.startsWith('image') ? (
              <img
                className="object-cover w-full h-full"
                src={`${data.heroImage.value[0].url}?auto=format&w=1920`}
                alt={data.heroImage.value[0].description ?? "image-alt"}
              />
            ) : (
              <video
                src={data.heroImage.value[0].url}
                autoPlay={true}
                loop={true}
                muted={true}
                className="object-cover w-full h-full"
              />
            )
          ) : <></>}
      </div>
      
      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-white font-sans text-[70px] leading-tight mb-6 font-light"
              {...createItemSmartLink(data.itemId)}
              {...createElementSmartLink("headline")}
            >
              {data.headline?.value}
            </h1>
            <p className="text-white font-sans text-[16px] mb-8 leading-relaxed"
              {...createItemSmartLink(data.itemId)}
              {...createElementSmartLink("subheadline")}
            >
              {data.subheadline?.value}
            </p>
            
            {/* Hero Buttons */}
            {data.heroButtons && data.heroButtons.length > 0 ? (
              <div className="flex flex-col sm:flex-row gap-4"
                {...createItemSmartLink(data.itemId)}
                {...createElementSmartLink("hero_links")}
              >
                {data.heroButtons.map((heroButton) => (
                  <ButtonLink 
                    key={heroButton.system.id} 
                    href="#"
                    className="bg-transparent border-2 border-white text-white hover:bg-pct_purple hover:text-white px-4 py-2 rounded-[30px] transition-colors"
                  >
                    {heroButton.elements.button_text.value || "Learn More"}
                  </ButtonLink>
                ))}
              </div>
            ) : (
              /* Fallback to legacy buttonLink prop */
              buttonLink != "nolink" && (
                <ButtonLink 
                  href={buttonLink ?? "services"}
                  className="bg-transparent border-2 border-azure text-white hover:bg-azure hover:text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Explore our test
                </ButtonLink>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;