import React from "react";
import ButtonLink from "./ButtonLink";
import { createItemSmartLink, createElementSmartLink } from "../utils/smartlink";

type CallToActionProps = Readonly<{
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
  imageAlt: string;
  imagePosition?: "left" | "right" | "center";
  style?: "burgundy" | "default";
  componentId: string;
  componentName: string;
}>;

const CallToActionComponent: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  style = "default",
  componentId,
  componentName,
}) => {
  const calculateLayout = (imagePosition: "left" | "right" | "center") => {
    if (imagePosition === "left") {
      return "lg:flex-row";
    } else if (imagePosition === "right") {
      return "lg:flex-row-reverse";
    }
    return "";
  };

  return (
    <div
      className={`${style === "burgundy" ? "burgundy-theme" : ""} bg-pct_pink w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 lg:px-8 xl:px-0`}
      {...createItemSmartLink(componentId, componentName)}
    >
      <div className="mx-auto">
        <div
          className={`flex flex-col ${calculateLayout(imagePosition)
            } items-center gap-16`}
        >
          <div className="w-2/3 rounded-lg">
            <img
              src={imageSrc}
              width={560}
              height={420}
              alt={imageAlt}
              className="rounded object-cover w-full h-full"
            />
          </div>

          <div className={`w-1/3 ml-[15%] mr-[10%] flex flex-col gap-5 ${imagePosition === "center" ? "items-center" : ""}`}>
            <h2 className={`flex w-fit text-[40px] text-heading-2-color tracking-tight font-light leading-[44px]`}
              {...createElementSmartLink("headline")}
            >
              {title}
            </h2>

            <p className={`flex text-l text-white line-clamp-5`}
              {...createElementSmartLink("subheadline")}
            >
              {description}
            </p>

            <div className="flex pt-5">
              <ButtonLink
                href={buttonHref}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded-[30px] transition-colors"
              >
                {buttonText}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionComponent;
