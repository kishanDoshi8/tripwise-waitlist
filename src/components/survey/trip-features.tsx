import { Checkbox, CheckboxGroup } from '@heroui/react';

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
}

export default function TripFeatures({ value, onChange }: Readonly<Props>) {
    return (
        <CheckboxGroup color = "success" value={value} onChange={onChange}>
            <Checkbox value={'Shared Itinerary'}>Shared Itinerary & plans</Checkbox>
            <Checkbox value={'Expense splitting'}>Easy Expense splitting & balances</Checkbox>
            <Checkbox value={'Packing List'}>Packing list & reminders</Checkbox>
            <Checkbox value={'Real-time updates'}>Real-time updates & notifications</Checkbox>
        </CheckboxGroup >
    )
}