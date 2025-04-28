import { Chip, Textarea } from '@heroui/react';
import { useState } from 'react';
import Suggestions from '../ui/suggestions';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TripFeatures({ value, onChange }: Readonly<Props>) {
    const solutions = [
        '📋 One place to share all plans & itineraries',
        '💸 Easy expense splitting (no more IOUs!)',
        '🎒 Packing lists & item reminders (no more “who forgot the tent?”)',
        '🔔 Real-time trip updates & last-minute changes',
        '🎭 Assign custom roles & responsibilities (Chef, DJ, Snack Captain, etc.)',
    ];

    const INITIAL_COUNT = 3;
    const BATCH_SIZE = 2;
    
    const [suggestions, setSuggestions] = useState(solutions.slice(0, INITIAL_COUNT));
    const hasMore = suggestions.length < solutions.length;

    const handleMore = () => {
        setSuggestions(prev => {
            const nextItems = solutions.slice(prev.length, prev.length + BATCH_SIZE);
            return [...prev, ...nextItems];
        });
    };
    
    const handleSuggestion = (suggestion: string) => {
        onChange(`${value ? value + ', ' + suggestion : suggestion}`);
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
            />
            <div className={`flex flex-wrap gap-4`}>
                {suggestions.map(suggestion => (
                    <button key={suggestion} onClick={() => handleSuggestion(suggestion)}>
                        <Suggestions>{suggestion}</Suggestions>
                    </button>
                ))}
            </div>
            {hasMore && (
                <button onClick={handleMore}>
                    <Chip variant="flat">...</Chip>
                </button>
            )}
        </>
    )
}