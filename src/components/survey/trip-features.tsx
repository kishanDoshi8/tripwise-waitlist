import { Chip, Textarea } from '@heroui/react';
import { useEffect, useState } from 'react';
import Suggestions from '../ui/suggestions';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    value: string;
    onChange: (value: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripFeatures({ value, onChange, setIsCurrentStepValid }: Readonly<Props>) {
    useEffect(() => {
        setIsCurrentStepValid(Boolean(value.trim()));
        setSuggestions(prev => prev.filter(s => !value.includes(s)));
        setSolutions(prev => prev.filter(p => !value.includes(p)));

        if (!value && !suggestions.length) {
            setSolutions(initialSolutions);
            setSuggestions(solutions.slice(0, INITIAL_COUNT));
        }
    }, [value]);

    const initialSolutions = [
        '📋 One place to share all plans & itineraries',
        '💸 Easy expense splitting (no more IOUs!)',
        '🎒 Packing lists & item reminders (no more “who forgot the tent?”)',
        '🔔 Real-time trip updates & last-minute changes',
        '🎭 Assign custom roles & responsibilities (Chef, DJ, Snack Captain, etc.)',
    ];

    const [solutions, setSolutions] = useState(initialSolutions);

    const INITIAL_COUNT = 3;
    
    const [suggestions, setSuggestions] = useState(solutions.slice(0, INITIAL_COUNT));
    const hasMore = suggestions.length < solutions.length;

    const handleMore = (size: number) => {
        setSuggestions(prev => {
            const nextItems = solutions.slice(prev.length, prev.length + size);
            return [...prev, ...nextItems];
        });
    };
    
    const handleSuggestion = (suggestion: string) => {
        onChange(`${value ? value + ', ' + suggestion : suggestion}`);
        handleMore(1);
    }

    return (
        <>
            <Textarea
                placeholder='Tell us your big idea'
                color="success"
                variant="bordered"
                value={value}
                onValueChange={onChange}
                autoFocus
                isClearable
                aria-label='Enter desired solution'
            />
            <div className={`flex flex-wrap gap-4`}>
                <AnimatePresence>
                    {suggestions.map(suggestion => (
                        <motion.button
                            key={suggestion}
                            type="button"
                            onClick={() => handleSuggestion(suggestion)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            layout
                        >
                            <Suggestions>{suggestion}</Suggestions>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
            {hasMore && (
                <button onClick={() => handleMore(2)} type='button'>
                    <Chip variant="flat">...</Chip>
                </button>
            )}
        </>
    )
}