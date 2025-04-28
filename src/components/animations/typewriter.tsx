import { cn } from '@/libs/utils';
import { easeInOut, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
    text: string;
    component?: React.ElementType;
    delay?: number;
    className?: string;
    onAnimationComplete?: () => void;
}

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

export default function Typewriter({
    text,
    component = 'span',
    delay = LETTER_DELAY,
    className = '',
    onAnimationComplete
}: Readonly<Props>) {
    const Component = component;
    const [started, setStarted] = useState(false);
    const [elements, setElements] = useState([] as string[]);

    useEffect(() => {
        setStarted(false);
        setElements([...text.split('')]);
        const timeout = setTimeout(() => {
            setStarted(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, [text]);

    useEffect(() => {
        if (!started) return;

        const totalDuration = elements.length * (delay * 1000) + 500;

        const timeout = setTimeout(() => {
            onAnimationComplete?.();
        }, totalDuration);

        return () => clearTimeout(timeout);
    }, [started, elements, delay, onAnimationComplete]);

    return (
        <span className="relative inline">
            {/* Reserve Space */}
            <Component className={cn("opacity-0", className)}>{text}</Component>

            {/* Typing Animation */}
            <Component className={cn("absolute inset-0", className)}>
                {elements.map((l, i) => (
                    <motion.span
                        key={`${l}-${i}`}
                        className="relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: started ? 1 : 0 }}
                        transition={{
                            delay: started ? i * delay : 0,
                            duration: 0.2,
                        }}
                    >
                        {l}

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: started ? [0, 1, 0] : 0 }}
                            transition={{
                                delay: started ? i * delay : 0,
                                times: [0, 0.1, 1],
                                duration: BOX_FADE_DURATION,
                                ease: easeInOut,
                            }}
                            className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
                        />
                    </motion.span>
                ))}
            </Component>
        </span>
    );
}
