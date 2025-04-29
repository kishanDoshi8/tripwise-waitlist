import { HeroUIProvider, ToastProvider } from "@heroui/react";
import type { NavigateOptions } from "react-router-dom";
import { useHref, useNavigate } from "react-router-dom";
import { SurveyProvider } from "./context/SurveyContext";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <SurveyProvider>
        <ToastProvider/>
            {children}
      </SurveyProvider>
    </HeroUIProvider>
  );
}
