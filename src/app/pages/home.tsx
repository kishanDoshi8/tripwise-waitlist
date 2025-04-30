import LandingPage from '@/components/landing-page';
import { useEffect } from 'react';

export default function HomePage() {
    useEffect(() => {
        document.title = 'TripWise';
    }, []);

    return (
        <LandingPage />
    )
}
