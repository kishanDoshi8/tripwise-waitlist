import { animated, useSprings } from '@react-spring/web';
import { useRef, useState, useEffect } from 'react';

const AnimatedSpan = animated('span');

type BlurTextProps = {
    text: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
};

export default function BlurText({
    text,
    delay = 100,
    className = '',
    animateBy = 'words',
}: Readonly<BlurTextProps>) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [inView, setInView] = useState(false);

    const elements = animateBy === 'words' ? text.split(' ') : text.split('');

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    const springs = useSprings(
        elements.length,
        elements.map((_, i) => ({
            from: { opacity: 0, transform: 'translate3d(0,-40px,0)', filter: 'blur(10px)' },
            to: inView
                ? { opacity: 1, transform: 'translate3d(0,0,0)', filter: 'blur(0px)' }
                : { opacity: 0, transform: 'translate3d(0,-40px,0)', filter: 'blur(10px)' },
            delay: i * delay,
        }))
    );

    return (
        <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {springs.map((style, i) => (
                <AnimatedSpan key={i} style={style}>
                    {elements[i]}
                    {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
                </AnimatedSpan>
            ))}
        </p>
    );
}