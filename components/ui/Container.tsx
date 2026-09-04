import { ReactNode } from "react";

export default function Container({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  return (
    <div className={`xl:px-28 md:px-8 px-2 max-w-400 mx-auto ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FullContainer({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-400 mx-auto w-full xl:px-28 px-8  ${className}`}>
      {children}
    </div>
  );
}
