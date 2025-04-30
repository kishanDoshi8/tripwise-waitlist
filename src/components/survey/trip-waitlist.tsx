import { Input } from "@heroui/react";
import { useEffect } from "react";

interface Props {
    email: string;
    onEmailChange: (value: string) => void;
    name: string;
    onNameChange: (value: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripWaitlist({ email, onEmailChange, name, onNameChange, setIsCurrentStepValid}: Readonly<Props>) {
    useEffect(() => {
        setIsCurrentStepValid(Boolean(email));
    }, [email]);

    return (
        <>
            <Input
                name="name"
                value={name}
                onValueChange={onNameChange}
                placeholder="Name (optional)"
                type="text"
                color="success"
                variant="bordered"
                className={`max-w-md pl-2`}
                isClearable
                autoFocus
                aria-label="Enter your name (optional)"
            />
            <Input
                name="email"
                value={email}
                onValueChange={onEmailChange}
                placeholder="Enter email"
                type="email"
                color="success"
                variant="bordered"
                className={`max-w-md pl-2`}
                isClearable
                aria-label="Enter email to join our waitlist"
            />
        </>
    )
}