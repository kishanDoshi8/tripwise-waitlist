import { Textarea } from "@heroui/react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TripProblem({ value, onChange }: Readonly<Props>) {
    return (
        <Textarea color="success" variant="bordered" value={value} onValueChange={onChange} />
    )
}