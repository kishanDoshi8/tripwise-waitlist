import Typewriter from "../animations/typewriter";
import { Step, StepContent, StepDescription, StepHeader } from "../ui/stepper";
import { Button } from "../ui/button";
import { useSurveyReset } from "@/context/SurveyResetContext";

export default function FinalComponent() {
    const { restartSurvey } = useSurveyReset();

    return (
        <Step>
            <Typewriter component={StepHeader} text={'💥 You’re in!'} />
            <StepDescription>Thanks for sharing your thoughts — you’re officially helping shape the future of stress-free group trips. 🛶🌲</StepDescription>
            <StepContent>
                <p>We’ll let you know when Tripwise is live (plus you’ll be first in line for early access & perks).</p>
                <p>Until then, dream big, plan easy. ✈️💬</p>
            </StepContent>
            <Button
                onPress={restartSurvey}
                color="success"
                className={`my-4`}
            >
                Start new
            </Button>
        </Step>
    )
}