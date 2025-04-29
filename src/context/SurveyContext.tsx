import { createContext, useContext, useMemo, useState } from 'react';

interface SurveyData {
    id: string;
    email: string;
}

interface SurveyContextType {
    data: SurveyData | null;
    setSurveyData: (data: SurveyData) => void;
    updateSurveyData: (partial: Partial<SurveyData>) => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<SurveyData | null>(null);

    const setSurveyData = (data: SurveyData) => setData(data);
    const updateSurveyData = (partial: Partial<SurveyData>) => {
        setData(prev => prev ? { ...prev, ...partial } : null);
    };

    const contextData = useMemo(() => ({
        data,
        setSurveyData,
        updateSurveyData,
    }), [data]);

    return (
        <SurveyContext.Provider value={contextData}>
            {children}
        </SurveyContext.Provider>
    );
};

export const useSurvey = () => {
    const context = useContext(SurveyContext);
    if (!context) throw new Error('useSurvey must be used within SurveyProvider');
    return context;
};
