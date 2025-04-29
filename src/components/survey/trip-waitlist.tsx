import { Input } from "@heroui/react";
import { useEffect } from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripWaitlist({ value, onChange, setIsCurrentStepValid}: Readonly<Props>) {
    useEffect(() => {
        setIsCurrentStepValid(Boolean(value));
    }, [value]);

    return (
        <Input
            name="email"
            value={value}
            onValueChange={onChange}
            placeholder="Enter email"
            type="email"
            color="success"
            variant="bordered"
            className={`max-w-md pl-2`}
            autoFocus
        />
    )
}