import { FC } from "react";
import { LandingPage } from "../../model";
import PageSection from "../PageSection";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";
import Divider from "../Divider";
import CallToAction from "../CallToAction";
import { createElementSmartLink, createFixedAddSmartLink, createItemSmartLink } from "../../utils/smartlink";

type FeaturedContentProps = {
  featuredContent: LandingPage["elements"]["featured_content"];
  parentId: string;
};

const FeaturedContent: FC<FeaturedContentProps> = ({ featuredContent, parentId }) => {
  const linkedItems = featuredContent.linkedItems.map(
    (item) => {
      // Check if it's an Article by looking for article-specific properties
      if (item.system.type === "article" && 'title' in item.elements && 'publish_date' in item.elements) {
        return (
          <PageSection color="bg-creme" key={item.system.codename}>
            <FeaturedArticle
              article={{
                image: {
                  url: item.elements.image.value[0]?.url ?? "",
                  alt: item.elements.image.value[0]?.description ?? "",
                },
                title: item.elements.title.value,
                publishDate: item.elements.publish_date.value ?? "",
                introduction: item.elements.introduction.value,
                itemId: item.system.id,
              }}
              displayFeatured={true}
              urlSlug={`articles/${item.elements.url_slug.value}`}
            />
          </PageSection>
        );
      }

      // Check if it's an Event by looking for event-specific properties
      if (item.system.type === "event" && 'name' in item.elements && 'start_date' in item.elements) {
        return (
          <PageSection color="bg-creme" key={item.system.codename}>
            <FeaturedEvent event={item as any} />
          </PageSection>
        );
      }

      // Default to CallToAction for other content types
      return (
        <PageSection color="bg-burgundy" key={item.system.codename}>
          <div className="pt-24 pb-40">
            <CallToAction
              title={(item.elements as any).headline?.value || ""}
              description={(item.elements as any).subheadline?.value || ""}
              buttonText={(item.elements as any).button_label?.value || ""}
              buttonHref={(item.elements as any).button_link?.value?.[0] ?? ""}
              imageSrc={item.elements.image.value[0]?.url}
              imageAlt={item.elements.image.value[0]?.description ?? "alt"}
              imagePosition={(item.elements as any).image_position?.value?.[0]?.codename ?? "left"}
              style="burgundy"
              componentId={item.system.id}
              componentName={item.system.name}
            />
          </div>
        </PageSection>
      );
    },
  ).flatMap((item, index) =>
    index === featuredContent.linkedItems.length - 1 ? [item] : [item, <Divider key={`divider-${index}`} />]
  );

  return (
    <div
    {...createItemSmartLink(parentId)}
    {...createElementSmartLink("featured_content")}
    {...createFixedAddSmartLink("end", "bottom")}
    >
      {linkedItems.map(item => item)}
    </div>
  );
};

export default FeaturedContent;
