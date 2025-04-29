import { Checkbox, CheckboxGroup, Textarea } from '@heroui/react';
import { useEffect } from 'react';

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
    otherValue: string;
    onOtherChange: (text: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripTypes({ value, onChange, otherValue, onOtherChange, setIsCurrentStepValid }: Readonly<Props>) {
    useEffect(() => {
        const isOtherValid = value.includes('Other') ? Boolean(otherValue.trim()) : true
        setIsCurrentStepValid(Boolean(value.length) && isOtherValid);
    }, [value, otherValue]);

    const handleChange = (newValues: string[]) => {
        onChange(newValues);

        if (!newValues.includes('Other')) {
            onOtherChange('');
        }
    }

    return (
        <div className={`space-y-4`}>
            <CheckboxGroup color="success" value={value} onChange={handleChange} isRequired errorMessage={'test'} aria-label='Choose trip types'>
                <Checkbox value={'Camping'}>Camping 🏕️</Checkbox>
                <Checkbox value={'Road Trips'}>Road Trips 🚗</Checkbox>
                <Checkbox value={'Beach Gateways'}>Beach Getaways 🏖️</Checkbox>
                <Checkbox value={'Cottage Weekends'}>Cottage Weekends 🛶</Checkbox>
                <Checkbox value={'Bachelor/Bachelorette Parties'}>Bachelor/Bachelorette Parties 🎉</Checkbox>
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
                    isRequired
                    isClearable
                    aria-label='Enter other text'
                />
            )}
        </div>
    )
}