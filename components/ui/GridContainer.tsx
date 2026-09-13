import { ReactNode } from "react";

export function GridContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 grid-cols-2 items-start">
      {children}
    </div>
  );
}
