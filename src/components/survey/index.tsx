import Stepper, { Step, StepContent, StepDescription, StepHeader } from "../ui/stepper";
import { useState } from "react";
import Typewriter from "../animations/typewriter";
import { createSurvey, ResponseNames, Responses, updateSurvey } from "@/libs/survey/api";
import { useSurvey } from "@/context/SurveyContext";
import { getSteps } from "./steps";
import { useToast } from "@/hooks/useToast";
import FinalComponent from "./final";

export default function Survey() {
    const { setSurveyData, data: userData } = useSurvey();
    const { errorToast } = useToast();
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

    const steps = getSteps(formData, updateFormData, setIsCurrentStepValid, handleTripTypesOtherChange, handleTripOrganizeOtherChange);

    const extractResponses = (data: typeof formData): Responses => {
        return steps.map(step => ({
            question: step.question,
            name: step.key as ResponseNames,
            answer: step.getAnswers(data),
            otherText: step.getOther?.(data),
        }));
    }

    const validateForm = () => {
        const form = document.getElementById('step-form') as HTMLFormElement;
        if (form) {
            return form.checkValidity();
        }
    }

    const handleStart = async () => {
        if (!validateForm()) return false;
        let success = false;
        setIsLoading(true);

        await createSurvey(formData.email, formData.name)
            .then(({ data }) => {
                setSurveyData({ id: data._id, email: data.email, name: data.name });
                success = true;
            })
            .catch((error: Error) => {
                errorToast('Unable to add you to the waitlist.', error.message);
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
        if (!validateForm()) return false;
        let success = false;
        setIsLoading(true);
        const responses = extractResponses(formData).filter(r => r.name !== 'email');
        const id = userData?.id;
        if (!id) return false;
        await updateSurvey(responses, id)
            .then(() => {
                success = true;
                setHideStepper(true);
            })
            .catch((error) => {
                errorToast('Unable to submit your survey.', error.message);
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
                finalComponent={<FinalComponent />}
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