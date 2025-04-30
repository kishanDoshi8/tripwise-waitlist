// SurveyResetContext.tsx
import { createContext, useContext } from "react";

type SurveyResetContextType = {
    restartSurvey: () => void;
};

export const SurveyResetContext = createContext<SurveyResetContextType | null>(null);

export const useSurveyReset = () => {
    const context = useContext(SurveyResetContext);
    if (!context) {
        throw new Error("useSurveyReset must be used within a SurveyResetProvider");
    }
    return context;
};