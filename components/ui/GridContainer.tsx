import { ReactNode } from "react";

export function GridContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
      {children}
    </div>
  );
}