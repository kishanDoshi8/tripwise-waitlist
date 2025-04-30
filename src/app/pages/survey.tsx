import Survey from '@/components/survey';
import { SurveyResetContext } from '@/context/SurveyResetContext';
import { useEffect, useMemo, useState } from 'react';

export default function SurveyPage() {
    useEffect(() => {
        document.title = 'Survey';
    }, []);

    const [resetKey, setResetKey] = useState(0);

    const value = useMemo(() => ({
        restartSurvey: () => setResetKey(prev => prev + 1),
    }), []);

    return (
        <SurveyResetContext.Provider value={value}>
            <Survey key={resetKey} />
        </SurveyResetContext.Provider>
    )
}