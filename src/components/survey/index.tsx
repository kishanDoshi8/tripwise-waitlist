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

    return (
        <div>
            <Stepper onStepChange={handleStepChange} disableStepIndicators={true} hideStepIndicators={hideStepper}>
                <Step>
                    <Typewriter component={StepHeader} text="Join our waitlist." />
                    <StepDescription>Get notified when its ready and enjoy the perks.</StepDescription>
                    <TripWaitlist
                        value={formData.email}
                        onChange={value => updateFormData('email', value)}
                    />
                </Step>
                <Step>
                    <Typewriter component={StepHeader} text="Lets start simple." />
                    <StepDescription>What kind of group trips do you usually plan?</StepDescription>
                    <StepContent>
                        <TripTypes 
                            value={formData.tripTypes}
                            onChange={value => updateFormData('tripTypes', value)}
                            otherValue={formData.tripTypesOther}
                            onOtherChange={handleTripTypesOtherChange}
                        />
                    </StepContent>
                </Step>
                <Step>
                    <Typewriter component={StepHeader} text="Group Travel = Group Chaos." />
                    <StepDescription>
                        What's the most annoying part of planning a group trip?
                    </StepDescription>
                    <StepContent>
                        <p className="opacity-65">(Vent it out - we're listening)</p>
                        <TripProblem
                            value={formData.tripProblems}
                            onChange={value => updateFormData('tripProblems', value)}
                        />
                    </StepContent>
                </Step>
                <Step>
                    <Typewriter component={StepHeader} text="Be honest." />
                    <StepDescription>
                        How are you currently organizing your group trips?
                    </StepDescription>
                    <StepContent>
                        <p className={`opacity-65`}>(No shame — we’ve all done the "shared Google Sheet or that 99-message group chat" thing.)</p>
                        <TripOrganize
                            value={formData.tripOrganize}
                            onChange={value => updateFormData('tripOrganize', value)}
                            otherValue={formData.tripOrganizeOther}
                            onOtherChange={handleTripOrganizeOtherChange}
                        />
                    </StepContent>
                </Step>
                <Step>
                    <Typewriter component={StepHeader} text="Real Talk." />
                    <StepDescription>If Tripwise could solve just one thing for you, what would it be?</StepDescription>
                    <StepContent>
                        <TripFeatures
                            value={formData.tripFeatures}
                            onChange={value => updateFormData('tripFeatures', value)}
                        />
                    </StepContent>
                </Step>
                <Step>
                    <Typewriter component={StepHeader} text="Okay last one – this helps us plan ahead." />
                    <StepDescription>Would you be open to paying for a tool that saves time, avoids group chaos, and makes planning actually fun?</StepDescription>
                    <StepContent>
                        <p className={`opacity-65`}>(Be real — no pressure.)</p>
                        <TripPlans
                            value={formData.tripPlans}
                            onChange={value => updateFormData('tripPlans', value)}
                        />
                    </StepContent>
                </Step>
            </Stepper>
        </div>
    )
}