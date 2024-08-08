import { ReactNode } from "react";
import { Action } from "./action";
import { Sidebar } from "./sidebar";

export const StepperLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row items-center h-screen p-8">
      <Sidebar />
      <main className="flex flex-1 flex-col items-center justify-center h-full px-24 py-12">
        <div className="flex-1 w-full">{children}</div>
        <Action />
      </main>
    </div>
  );
};
