import { Checkbox, CheckboxGroup, Textarea } from '@heroui/react';
import { useEffect } from 'react';

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
    otherValue: string;
    onOtherChange: (text: string) => void;
    setIsCurrentStepValid: (value: boolean) => void;
}

export default function TripOrganize({ value, onChange, otherValue, onOtherChange, setIsCurrentStepValid }: Readonly<Props>) {
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
        <div className={`space-y-2`}>
            <p className={`opacity-65`}>(No shame — we’ve all done the "shared Google Sheet or that 99-message group chat" thing.)</p>
            <CheckboxGroup color="success" value={value} onChange={handleChange} isRequired>
                <Checkbox value={'Group chat'}>📱 Group chat chaos (WhatsApp, Messenger, etc.)</Checkbox>
                <Checkbox value={'Shared Docs'}>📝 Shared docs (Google Docs, Google Sheets)</Checkbox>
                <Checkbox value={'Splitwise'}>💸 Cost tracking apps (Splitwise, Venmo requests, etc.)</Checkbox>
                <Checkbox value={'Travel Apps'}>🏡 Booking apps (Airbnb, Hopper, Vrbo, etc.)</Checkbox>
                <Checkbox value={'We cant'}>🎲 We just wing it — pure chaos</Checkbox>
                <Checkbox value={'Other'}>🔍 Other</Checkbox>
            </CheckboxGroup>

            {value.includes('Other') && (
                <Textarea
                    color='success'
                    variant='bordered'
                    value={otherValue}
                    onValueChange={onOtherChange}
                    placeholder='Tell us your secret sauce.'
                    autoFocus
                    isRequired
                />
            )}
        </div>
    )
}