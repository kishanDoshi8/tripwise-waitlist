import { cn } from '@/libs/utils';
import { easeInOut, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
    text: string;
    component?: React.ElementType;
    delay?: number;
    className?: string;
}

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

export default function Typewriter({
    text,
    component = 'span',
    delay = LETTER_DELAY,
    className = '',
}: Readonly<Props>) {
    const Component = component;
    const [started, setStarted] = useState(false);
    const [elements, setElements] = useState<string[][]>([]);

    useEffect(() => {
        setStarted(false);
        const wordsWithSpaces = text.split(/(\s+)/); // keeps spaces as separate elements
        const charArrays = wordsWithSpaces.map(word => [...word]);
        setElements(charArrays);
        const timeout = setTimeout(() => setStarted(true), 500);
        return () => clearTimeout(timeout);
    }, [text]);

    // Track running index for delay
    let globalCharIndex = 0;

    return (
        <span className="relative inline">
            <Component className={cn("opacity-0 pointer-events-none absolute inset-0", className)}>
                {elements.map((word, wordIndex) => (
                    <span key={`ghost-word-${wordIndex}`} className={`inline-block ${wordIndex < elements.length - 1 && 'mr-2'}`}>
                        {word.map((char, charIndex) => (
                            <span key={`ghost-char-${wordIndex}-${charIndex}`} className="inline-block relative">
                                {char}
                            </span>
                        ))}
                    </span>
                ))}
            </Component>
            <Component className={cn("relative z-10", className)}>
                {elements.map((word, wordIndex) => (
                    <span key={`word-${wordIndex}`} className={`inline-block ${wordIndex < elements.length - 1 && 'mr-2'}`}>
                        {word.map((char) => {
                            const delayIndex = globalCharIndex;
                            globalCharIndex++;

                            return (
                                <motion.span
                                    key={`char-${delayIndex}`}
                                    className="inline-block relative"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: started ? 1 : 0 }}
                                    transition={{
                                        delay: started ? delayIndex * delay : 0,
                                        duration: 0.2,
                                    }}
                                >
                                    {char}
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: started ? [0, 1, 0] : 0 }}
                                        transition={{
                                            delay: started ? delayIndex * delay : 0,
                                            times: [0, 0.1, 1],
                                            duration: BOX_FADE_DURATION,
                                            ease: easeInOut,
                                        }}
                                        className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
                                    />
                                </motion.span>
                            );
                        })}
                    </span>
                ))}
            </Component>
        </span>
    );
}
