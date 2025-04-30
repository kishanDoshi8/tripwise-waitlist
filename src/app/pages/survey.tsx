import Survey from '@/components/survey';
import { useEffect } from 'react';

export default function SurveyPage() {
    useEffect(() => {
        document.title = 'Survey';
    }, []);

    return (
        <Survey />
    )
}