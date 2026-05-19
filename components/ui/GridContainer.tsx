import { ReactNode } from "react";

export function GridContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-4 items-start gap-4">
      {children}
    </div>
  );
}
