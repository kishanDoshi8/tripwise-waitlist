import { Chip, Textarea } from "@heroui/react";
import Suggestions from "../ui/suggestions";
import { useEffect, useState } from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripProblem({ value, onChange, setIsCurrentStepValid }: Readonly<Props>) {
    const problems = [
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

    const INITIAL_COUNT = 3;
    const BATCH_SIZE = 2;
    
    const [suggestions, setSuggestions] = useState(problems.slice(0, INITIAL_COUNT));
    const hasMore = suggestions.length < problems.length;

    useEffect(() => {
        setIsCurrentStepValid(Boolean(value.trim()));
    }, [value]);

    const handleMore = () => {
        setSuggestions(prev => {
            const nextItems = problems.slice(prev.length, prev.length + BATCH_SIZE);
            return [...prev, ...nextItems];
        });
    };
    
    const handleSuggestion = (suggestion: string) => {
        onChange(`${value ? value + ', ' + suggestion : suggestion}`);
    }

    return (
        <>
            <Textarea color="success" variant="bordered" value={value} onValueChange={onChange} placeholder="Vent it out – we're listening" autoFocus/>
            <div className={`flex flex-wrap gap-4`}>
                {suggestions.map(suggestion => (
                    <button key={suggestion} onClick={() => handleSuggestion(suggestion)} type="button">
                        <Suggestions>{suggestion}</Suggestions>
                    </button>
                ))}
            </div>
            {hasMore && (
                <button onClick={handleMore} type="button">
                    <Chip variant="flat">...</Chip>
                </button>
            )}
        </>
    )
}