import { Checkbox, CheckboxGroup, Textarea } from '@heroui/react';

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
    otherValue: string;
    onOtherChange: (text: string) => void;
}

export default function TripTypes({ value, onChange, otherValue, onOtherChange }: Readonly<Props>) {
    const handleChange = (newValues: string[]) => {
        onChange(newValues);

        if (!newValues.includes('Other')) {
            onOtherChange('');
        }
    }

    return (
        <div className={`space-y-4`}>
            <CheckboxGroup color="success" value={value} onChange={handleChange}>
                <Checkbox value={'Camping'}>Camping 🏕️</Checkbox>
                <Checkbox value={'Road Trips'}>Road Trips 🚗</Checkbox>
                <Checkbox value={'Beach Gateways'}>Beach Getaways 🏖️</Checkbox>
                <Checkbox value={'Cottage Weekends'}>Cottage Weekends 🛶</Checkbox>
                <Checkbox value={'Bachelor'}>Bachelor/Bachelorette Parties 🎉</Checkbox>
                <Checkbox value={'Other'}>Other</Checkbox>
            </CheckboxGroup>

            {value.includes('Other') && (
                <Textarea
                    color='success'
                    variant='bordered'
                    value={otherValue}
                    onValueChange={onOtherChange}
                    placeholder='Tell us more!'
                    autoFocus
                />
            )}
        </div>
    )
}