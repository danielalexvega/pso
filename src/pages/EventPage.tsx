import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { Event } from "../model";
import { formatDate } from "../utils/date";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { PortableText } from "@portabletext/react";
import { createItemSmartLink, createElementSmartLink } from "../utils/smartlink";
import ButtonLink from "../components/ButtonLink";
import Performances from "../components/Performances";
import { createClient } from "../utils/client";
import { useAppContext } from "../context/AppContext";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import { useSearchParams } from "react-router-dom";
import { LanguageCodenames } from "../model";

const EventPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { environmentId, apiKey, collection } = useAppContext();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const lang = searchParams.get("lang");
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    console.log('Looking for event with slug:', slug);
    console.log('Using collection:', collection ?? "pittsburgh_symphony_orchestra");
    console.log('Environment ID:', environmentId);

    // Try without collection filter first
    createClient(environmentId, apiKey, isPreview)
      .items<Event>()
      .type("event")
      .depthParameter(3)
      .languageParameter((lang ?? "default") as LanguageCodenames)
      .toPromise()
      .then(res => {
        console.log('All events found:', res.data.items.length);
        console.log('Event slugs:', res.data.items.map(e => e.elements.url_slug?.value));
        console.log('Event codenames:', res.data.items.map(e => e.system.codename));
        console.log('Event collections:', res.data.items.map(e => e.system.collection));
        
        const foundEvent = res.data.items.find(e => e.elements.url_slug?.value === slug);
        console.log('Found event by slug:', foundEvent);
        
        // Fallback: try finding by system codename
        if (!foundEvent) {
          const foundByCodename = res.data.items.find(e => e.system.codename === slug);
          console.log('Found event by codename:', foundByCodename);
          setEvent(foundByCodename || null);
        } else {
          setEvent(foundEvent);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        if (err instanceof DeliveryError) {
          setEvent(null);
        } else {
          throw err;
        }
        setLoading(false);
      });
  }, [slug, environmentId, apiKey, collection, isPreview, lang]);

  if (loading) {
    return <div className="flex-grow flex items-center justify-center">Loading...</div>;
  }

  if (!event) {
    return <div className="flex-grow flex items-center justify-center">Event not found for slug: {slug}</div>;
  }
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] lg:h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0"
          {...createItemSmartLink(event.system.id)}
          {...createElementSmartLink("image")}
        >
          <img
            className="object-cover w-full h-full"
            src={`${event.elements.image.value[0]?.url}?auto=format&w=1920`}
            alt={event.elements.image.value[0]?.description ?? "Event image"}
          />
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <Container className="pb-8">
            <div className="flex justify-between items-end">
              <div className="max-w-2xl">
                <h1 className="text-white font-sans text-[70px] leading-tight mb-6 font-light"
                  {...createItemSmartLink(event.system.id)}
                  {...createElementSmartLink("name")}
                >
                  {event.elements.name.value}
                </h1>
              </div>
              <div className="text-white font-sans text-[16px]">
                {event.elements.start_date?.value && event.elements.end_date?.value && (
                  <span>
                    {formatDate(event.elements.start_date.value)} - {formatDate(event.elements.end_date.value)}
                  </span>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Main Content */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Performances Section */}
            {event.elements.performances?.linkedItems && event.elements.performances.linkedItems.length > 0 && (
              <div
                {...createItemSmartLink(event.system.id)}
                {...createElementSmartLink("performances")}
              >
                <h2 className="text-3xl font-bold text-gray-dark mb-6">Performances</h2>
                <Performances performances={event.elements.performances.linkedItems} />
              </div>
            )}

            {/* Program Section */}
            {event.elements.program?.value && (
              <div
                {...createItemSmartLink(event.system.id)}
                {...createElementSmartLink("program")}
              >
                <h2 className="text-3xl font-bold text-gray-dark mb-6">The Program</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-dark leading-relaxed whitespace-pre-line">
                    {event.elements.program.value}
                  </p>
                </div>
                <ButtonLink href="#" className="mt-4 text-burgundy hover:text-burgundy">
                  Read More
                </ButtonLink>
              </div>
            )}

            {/* Description Section */}
            {event.elements.description?.value && (
              <div
                {...createItemSmartLink(event.system.id)}
                {...createElementSmartLink("description")}
              >
                <div className="prose prose-lg max-w-none">
                  <PortableText
                    value={transformToPortableText(event.elements.description.value)}
                    components={defaultPortableRichTextResolvers}
                  />
                </div>
              </div>
            )}

            {/* Performer Section */}
            {event.elements.performer?.linkedItems && event.elements.performer.linkedItems.length > 0 && (
              <div
                {...createItemSmartLink(event.system.id)}
                {...createElementSmartLink("performer")}
              >
                <h2 className="text-3xl font-bold text-gray-dark mb-6">Featuring</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {event.elements.performer.linkedItems.map((performer) => (
                    <div key={performer.system.id} className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                          src={performer.elements.image?.value[0]?.url ?? ""}
                          alt={performer.elements.image?.value[0]?.description ?? `${performer.elements.first_name?.value} ${performer.elements.last_name?.value}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-dark mb-1">
                        {performer.elements.first_name?.value} {performer.elements.last_name?.value}
                      </h3>
                      <p className="text-gray-light">
                        {performer.elements.job_title?.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sponsors Section */}
            {event.elements.sponsors?.linkedItems && event.elements.sponsors.linkedItems.length > 0 && (
              <div
                {...createItemSmartLink(event.system.id)}
                {...createElementSmartLink("sponsors")}
              >
                <h2 className="text-3xl font-bold text-gray-dark mb-6">Sponsored by</h2>
                <div className="space-y-6">
                  {event.elements.sponsors.linkedItems.map((sponsor) => (
                    <div key={sponsor.system.id} className="text-center">
                      <div className="mb-2">
                        <img
                          src={sponsor.elements.sponsor_logo?.value[0]?.url ?? ""}
                          alt={sponsor.elements.sponsor_logo?.value[0]?.description ?? "Sponsor logo"}
                          className="h-12 mx-auto"
                        />
                      </div>
                      <p className="text-sm text-gray-light">
                        {sponsor.elements.body?.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg sticky top-8">
              {/* Event Dates */}
              {event.elements.start_date?.value && event.elements.end_date?.value && (
                <div className="mb-6">
                  <p className="text-lg font-semibold text-gray-dark">
                    {formatDate(event.elements.start_date.value)} - {formatDate(event.elements.end_date.value)}
                  </p>
                </div>
              )}

              {/* Get Tickets Button */}
              <div className="mb-6">
                <ButtonLink 
                  href="#" 
                  className="w-full bg-burgundy hover:bg-burgundy text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  Get Tickets
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </ButtonLink>
              </div>

              {/* Venue Information */}
              <div className="space-y-2">
                <p className="text-sm text-gray-light italic">Pittsburgh Symphony Orchestra</p>
                <p className="text-lg font-bold text-gray-dark">HEINZ HALL</p>
                <p className="text-sm text-gray-light">
                  {event.elements.event_type?.value?.map(t => t.name).join(" , ")}
                </p>
              </div>

              {/* Accessibility Information */}
              {event.elements.accessibility?.value && event.elements.accessibility.value.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <h3 className="text-lg font-bold text-gray-dark mb-2">Accessibility:</h3>
                  <p className="text-sm text-gray-dark">
                    For personal assistance selecting accessible seats or for more information about accessibility for a person with a disability, please contact Customer Service at{" "}
                    <a href="tel:412-392-4900" className="text-burgundy hover:underline">
                      412-392-4900.
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventPage;
