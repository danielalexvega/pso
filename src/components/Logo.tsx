import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => (
  <Link to="/">
    <div className="flex gap-4 items-center">
      <img src="/logo_light.svg" alt="Logo" className="h-[60px]" />
      {/* <p className="text-5xl pt-1 text-azure font-libre font-bold text-nowrap">Pittsburgh Cultural Trust</p> */}
    </div>
  </Link>
);

export default Logo;