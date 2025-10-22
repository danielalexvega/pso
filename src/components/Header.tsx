import { useLocation, useSearchParams } from "react-router-dom";
import IconSpain from "../icons/IconSpain";
import IconUnitedStates from "../icons/IconUnitedStates";
// import Container from "./Container";
import Logo from "./Logo";
import Navigation from "./Navigation";
// import TopNavigation from "./TopNavigation";
import { IconButton } from "../icons/IconButton";

const Header: React.FC = () => {
  const location = useLocation();
  const isResearchPage = location.pathname.match(/^\/research\/[\w-]+$/);
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <Logo />
          
          {/* Right side with TopNavigation and Navigation */}
          <div className="flex flex-col items-end gap-4">
            {/* <TopNavigation /> */}
            <Navigation />
          </div>
        </div>
      </div>
      
      {/* Language selector for research pages */}
      {isResearchPage && (
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="flex gap-2 justify-end items-center">
            <IconButton
              icon={
                <IconUnitedStates
                  className={`hover:cursor-pointer hover:scale-110`}
                />
              }
              isSelected={lang === "en-US" || lang === null}
              onClick={() =>
                setSearchParams(prev => {
                  prev.delete("lang");
                  return prev;
                })}
            />
            <IconButton
              icon={
                <IconSpain
                  className={`hover:cursor-pointer hover:scale-110`}
                />
              }
              isSelected={lang === "es-ES"}
              onClick={() => {
                setSearchParams(prev => {
                  prev.set("lang", "es-ES");
                  return prev;
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
