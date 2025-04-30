import { Radio, RadioGroup } from '@heroui/react';
import { useEffect } from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripPlans({ value, onChange, setIsCurrentStepValid }: Readonly<Props>) {
    useEffect(() => {
        setIsCurrentStepValid(Boolean(value));
    }, [value]);
    
    return (
        <div className={`space-y-2`}>
            <p className={`opacity-65`}>(Be real — no pressure.)</p>
            <RadioGroup color="success" value={value} onValueChange={onChange} aria-label='Choose willigness to pay'>
                <Radio value={'$1-3/month'}>$1–$3/month (I’d give it a try)</Radio>
                <Radio value={'$4-7/month'}>$4–$7/month (I’d split this with my crew)</Radio>
                <Radio value={'$8-12/month'}> $8–$12/month (worth it for a smooth trip)</Radio>
                <Radio value={'Depends on the features'}>Depends on the features (I’m flexible)</Radio>
                <Radio value={'One-time payment'}>One-time payment would be better for me</Radio>
                <Radio value={'I only pay with good vibes'}>Nope — I only pay with good vibes</Radio>
            </RadioGroup>
        </div>
    )
}