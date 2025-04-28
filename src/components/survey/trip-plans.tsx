import { Radio, RadioGroup } from '@heroui/react';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TripPlans({ value, onChange }: Readonly<Props>) {
    return (
        <RadioGroup color="success" value={value} onValueChange={onChange}>
            <Radio value={'$1-3/m'}>$1–$3/month (I’d give it a try)</Radio>
            <Radio value={'$4-7/m'}>$4–$7/month (I’d split this with my crew)</Radio>
            <Radio value={'$8-12/m'}> $8–$12/month (worth it for a smooth trip)</Radio>
            <Radio value={'depends'}>Depends on the features (I’m flexible)</Radio>
            <Radio value={'One-time'}>One-time payment would be better for me</Radio>
            <Radio value={'0'}>Nope — I only pay with good vibes</Radio>
        </RadioGroup>
    )
}