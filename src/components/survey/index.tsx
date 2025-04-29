import Stepper, { Step, StepContent, StepDescription, StepHeader } from "../ui/stepper";
import TripTypes from "./trip-types";
import TripOrganize from "./trip-organize";
import TripFeatures from "./trip-features";
import TripPlans from "./trip-plans";
import TripProblem from "./trip-problem";
import { useState } from "react";
import TripWaitlist from "./trip-waitlist";
import Typewriter from "../animations/typewriter";

export default function Survey() {
    const [formData, setFormData] = useState({
        tripTypes: [] as string[],
        tripTypesOther: '',
        tripProblems: '',
        tripOrganize: [] as string[],
        tripOrganizeOther: '',
        tripFeatures: '',
        tripPlans: '',
        email: '',
    });
    const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

    const [hideStepper, setHideStepper] = useState(true);

    const handleStepChange = (step: number) => {
        setHideStepper(() => step === 1);
    }

    const updateFormData = (key: keyof typeof formData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value,
        }));
    }

    const handleTripTypesOtherChange = (text: string) => {
        setFormData(prev => ({
            ...prev,
            tripTypesOther: text,
        }));
    }

    const handleTripOrganizeOtherChange = (text: string) => {
        setFormData(prev => ({
            ...prev,
            tripOrganizeOther: text,
        }))
    }

    const steps = [
        {
            key: 'email',
            title: 'Join our waitlist.',
            question: 'Get notified when its ready and enjoy the perks.',
            content: (
                <TripWaitlist
                    value={formData.email}
                    onChange={value => updateFormData('email', value)}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
        {
            key: 'trip_types',
            title: 'Lets start simple.',
            question: 'What kind of group trips do you usually plan?',
            content: (
                <TripTypes
                    value={formData.tripTypes}
                    onChange={value => updateFormData('tripTypes', value)}
                    otherValue={formData.tripTypesOther}
                    onOtherChange={handleTripTypesOtherChange}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
        {
            key: 'planning_pain_points',
            title: 'Group Travel = Group Chaos.',
            question: `What's the most annoying part of planning a group trip?`,
            content: (
                <TripProblem
                    value={formData.tripProblems}
                    onChange={value => updateFormData('tripProblems', value)}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
        {
            key: 'current_organization_method',
            title: 'Be honest.',
            question: `How are you currently organizing your group trips?`,
            content: (
                <TripOrganize
                    value={formData.tripOrganize}
                    onChange={value => updateFormData('tripOrganize', value)}
                    otherValue={formData.tripOrganizeOther}
                    onOtherChange={handleTripOrganizeOtherChange}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
        {
            key: 'desired_solution',
            title: 'Real Talk.',
            question: `If Tripwise could solve just one thing for you, what would it be?`,
            content: (
                <TripFeatures
                    value={formData.tripFeatures}
                    onChange={value => updateFormData('tripFeatures', value)}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
        {
            key: 'willingness_to_pay',
            title: 'Okay last one – this helps us plan ahead.',
            question: `If Tripwise could solve just one thing for you, what would it be?`,
            content: (
                <TripPlans
                    value={formData.tripPlans}
                    onChange={value => updateFormData('tripPlans', value)}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
    ];

    const handleNext = () => {
        const form = document.getElementById('step-form') as HTMLFormElement;
        if (form) {
            const isValid = form.checkValidity();
            setIsCurrentStepValid(false);
            return isValid;
        }

        return false;
    }

    const handleSubmit = () => {
        return false;
    }

    const handleStart = () => {
        return true;
    }

    return (
        <div>
            <Stepper
                onStepChange={handleStepChange}
                disableStepIndicators={true}
                hideStepIndicators={hideStepper}
                nextButtonProps={{
                    isDisabled: !isCurrentStepValid,
                }}
                onNext={handleNext}
                onSubmit={handleSubmit}
                onStart={handleStart}
            >
                {steps.map(step => (
                    <form key={step.key} id="step-form">
                        <Step>
                            <Typewriter component={StepHeader} text={step.title} />
                            <StepDescription>{step.question}</StepDescription>
                            <StepContent>{step.content}</StepContent>
                        </Step>
                    </form>
                ))}
            </Stepper>
        </div>
    )
}