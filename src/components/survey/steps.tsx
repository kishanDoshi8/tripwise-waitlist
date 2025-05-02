import TripFeatures from "./trip-features";
import TripOrganize from "./trip-organize";
import TripPlans from "./trip-plans";
import TripProblem from "./trip-problem";
import TripTypes from "./trip-types";
import TripWaitlist from "./trip-waitlist";

const initialFormData = {
    tripTypes: [] as string[],
    tripTypesOther: "",
    tripProblems: "",
    tripOrganize: [] as string[],
    tripOrganizeOther: "",
    tripFeatures: "",
    tripPlans: "",
    email: "",
    name: "",
};

export function getSteps(
    formData: typeof initialFormData,
    updateFormData: (key: keyof typeof formData, value: any) => void,
    setIsCurrentStepValid: (valid: boolean) => void,
    handleTripTypesOtherChange: (text: string) => void,
    handleTripOrganizeOtherChange: (text: string) => void,
) {
    return [
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
            question: `If TripWise could solve just one thing for you, what would it be?`,
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
            question: `Would you be open to paying for a tool that saves time, avoids group chaos, and makes planning actually fun?`,
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
}
