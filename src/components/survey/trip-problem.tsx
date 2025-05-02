import { Chip, Textarea } from "@heroui/react";
import Suggestions from "../ui/suggestions";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    value: string;
    onChange: (value: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripProblem({ value, onChange, setIsCurrentStepValid }: Readonly<Props>) {
    const initialProblems = [
        '🤳🏼 People not responding',
        '📅 Finding a date everyone agrees on',
        '🍽️ Coordinating who’s bringing what food',
        '🛒 Managing all the gear / items everyone needs',
        '💸 Splitting costs and keeping track of money',
        '🚗 Sorting out rides and who’s driving',
        '🏕️ People forgetting what they signed up for',
        '🐢 People being super slow to confirm plans',
        '🧹 No one wants to do the boring admin stuff',
    ];

    const [problems, setProblems] = useState(initialProblems);

    const INITIAL_COUNT = 3;
    
    const [suggestions, setSuggestions] = useState(problems.slice(0, INITIAL_COUNT));
    const hasMore = suggestions.length < problems.length;

    useEffect(() => {
        setIsCurrentStepValid(Boolean(value.trim()));
        setSuggestions(prev => prev.filter(s => !value.includes(s)));
        setProblems(prev => prev.filter(p => !value.includes(p)));

        if (!value && !suggestions.length) {
            setProblems(initialProblems);
            setSuggestions(problems.slice(0, INITIAL_COUNT));
        }
    }, [value]);

    const handleMore = (size: number) => {
        setSuggestions(prev => {
            const nextItems = problems.slice(prev.length, prev.length + size);
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
                color="success"
                variant="bordered"
                value={value}
                onValueChange={onChange}
                placeholder="Vent it out – we're listening"
                aria-label="Enter desired solution"
                isClearable
                autoFocus
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
                <button
                    onClick={() => handleMore(2)} type="button"
                >
                    <Chip variant="flat">...</Chip>
                </button>
            )}
        </>
    )
}