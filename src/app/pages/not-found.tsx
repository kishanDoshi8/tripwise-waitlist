import { useEffect, useRef } from "react";
import im from '@/assests/not-found.jpeg';
import Navbar from "@/components/navbar";

export default function NotFound() {
    const maskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            if (maskRef.current) {
                maskRef.current.style.maskImage = `
                    radial-gradient(
                        circle 300px at ${x}px ${y}px,
                        rgba(255,255,255,1) 0%,
                        rgba(255,255,255,0.95) 10%,
                        rgba(255,255,255,0.85) 20%,
                        rgba(255,255,255,0.7) 30%,
                        rgba(255,255,255,0.55) 40%,
                        rgba(255,255,255,0.4) 50%,
                        rgba(255,255,255,0.25) 60%,
                        rgba(255,255,255,0.10) 70%,
                        rgba(255,255,255,0.06) 80%,
                        rgba(255,255,255,0.04) 90%,
                        rgba(255,255,255,0.03) 100%
                    )`;
                maskRef.current.style.webkitMaskImage = `
                    radial-gradient(
                        circle 320px at ${x}px ${y}px,
                        rgba(255,255,255,1) 0%,
                        rgba(255,255,255,0.95) 10%,
                        rgba(255,255,255,0.85) 20%,
                        rgba(255,255,255,0.7) 30%,
                        rgba(255,255,255,0.55) 40%,
                        rgba(255,255,255,0.4) 50%,
                        rgba(255,255,255,0.25) 60%,
                        rgba(255,255,255,0.10) 70%,
                        rgba(255,255,255,0.06) 80%,
                        rgba(255,255,255,0.04) 90%,
                        rgba(255,255,255,0.03) 100%
                    )`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <header className={`fixed top-0 w-full bg-slate-950 z-50`}>
                <Navbar />
            </header>
            {/* Hidden image layer with mask */}
            <div
                ref={maskRef}
                className="absolute inset-0 bg-cover"
                style={{
                    backgroundImage: `url(${im})`,
                    backgroundPosition: 'center 60%',
                    maskImage: "radial-gradient(circle 0px at center, white 0%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(circle 0px at center, white 0%, transparent 100%)",
                    transition: "mask-image 0.1s ease, -webkit-mask-image 0.1s ease",
                }}
            />

            {/* Black background underneath */}
            <div className="absolute inset-0 bg-black z-[-1]" />
        </div>
    );
}
