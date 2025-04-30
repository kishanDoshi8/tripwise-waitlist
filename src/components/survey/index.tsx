import Stepper, { Step, StepContent, StepDescription, StepHeader } from "../ui/stepper";
import TripTypes from "./trip-types";
import TripOrganize from "./trip-organize";
import TripFeatures from "./trip-features";
import TripPlans from "./trip-plans";
import TripProblem from "./trip-problem";
import { useState } from "react";
import TripWaitlist from "./trip-waitlist";
import Typewriter from "../animations/typewriter";
import { createSurvey, ResponseNames, Responses, updateSurvey } from "@/libs/api";
import { useSurvey } from "@/context/SurveyContext";
import { addToast } from "@heroui/react";

export default function Survey() {
    const { setSurveyData, data: userData } = useSurvey();
    const [formData, setFormData] = useState({
        tripTypes: [] as string[],
        tripTypesOther: '',
        tripProblems: '',
        tripOrganize: [] as string[],
        tripOrganizeOther: '',
        tripFeatures: '',
        tripPlans: '',
        email: '',
        name: '',
    });
    const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const steps: {
        question: string;
        title: string;
        key: ResponseNames;
        getAnswers: (data: typeof formData) => string | string[];
        getOther?: (data: typeof formData) => string | undefined;
        content: JSX.Element;
    }[] = [
        {
            key: 'email',
            title: 'Join our waitlist.',
            question: 'Get notified when its ready and enjoy the perks.',
            getAnswers: (data: typeof formData) => data.email,
            content: (
                <TripWaitlist
                    email={formData.email}
                    onEmailChange={value => updateFormData('email', value)}
                    name={formData.name}
                    onNameChange={value => updateFormData('name', value)}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
        {
            key: 'trip_types',
            title: 'Lets start simple.',
            question: 'What kind of group trips do you usually plan?',
            getAnswers: (data: typeof formData) => data.tripTypes,
            getOther: (data: typeof formData) => data.tripTypesOther,
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
            getAnswers: (data: typeof formData) => data.tripProblems,
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
            getAnswers: (data: typeof formData) => data.tripOrganize,
            getOther: (data: typeof formData) => data.tripOrganizeOther,
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
            getAnswers: (data: typeof formData) => data.tripFeatures,
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
            getAnswers: (data: typeof formData) => data.tripPlans,
            content: (
                <TripPlans
                    value={formData.tripPlans}
                    onChange={value => updateFormData('tripPlans', value)}
                    setIsCurrentStepValid={setIsCurrentStepValid}
                />
            ),
        },
    ];

    const extractResponses = (data: typeof formData): Responses => {
        return steps.map(step => ({
            question: step.question,
            name: step.key,
            answer: step.getAnswers(data),
            otherText: step.getOther?.(data),
        }));
    }

    const handleStart = async () => {
        let success = false;
        setIsLoading(true);
        await createSurvey(formData.email, formData.name)
            .then(({ data }) => {
                setSurveyData({ id: data._id, email: data.email, name: data.name });
                success = true;
            })
            .catch(error => {
                addToast({
                    title: 'Unable to add you to the waitlist.',
                    description: error.message,
                    color: 'danger',
                    variant: 'bordered',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });

        return success;
    }

    const handleNext = () => {
        const form = document.getElementById('step-form') as HTMLFormElement;
        if (form) {
            return form.checkValidity();
        }

        return false;
    }

    const handleSubmit = async () => {
        let success = false;
        setIsLoading(true);
        const responses = extractResponses(formData).filter(r => r.name !== 'email');
        const id = userData?.id;
        if (!id) return false;
        await updateSurvey(responses, id)
            .then(() => {
                success = true;
            })
            .catch((error) => {
                addToast({
                    title: 'Unable to submit your survey.',
                    description: error.message,
                    color: 'danger',
                    variant: 'bordered',
                });
            })
            .finally(() => {
                setIsLoading(false);
            })

        return success;
    }

    return (
        <div>
            <Stepper
                onStepChange={handleStepChange}
                disableStepIndicators={true}
                hideStepIndicators={hideStepper}
                nextButtonProps={{
                    isDisabled: !isCurrentStepValid,
                    isLoading,
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