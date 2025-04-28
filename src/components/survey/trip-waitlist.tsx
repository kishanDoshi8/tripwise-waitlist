import { Input } from "@heroui/react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TripWaitlist({ value, onChange}: Readonly<Props>) {
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
        />
    )
}