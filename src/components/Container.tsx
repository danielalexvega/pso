import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`container px-3 ${className}`}>
    {children}
  </div>
);

export default Container; 