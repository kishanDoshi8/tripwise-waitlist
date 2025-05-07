import { Snippet } from "@heroui/react";
import FadeContent from "../animations/fade-content";
import Typewriter from "../animations/typewriter";
import { Step, StepContent, StepHeader } from "../ui/stepper";

export default function FinalComponent() {
    return (
        <Step>
            <Typewriter component={StepHeader} text={'💥 You’re in!'} />
            <FadeContent delay={1000}>
                <p className={`md:text-2xl text-lg mb-4 opacity-80`}>
                    Thanks for sharing your thoughts — you’re officially helping shape the future of stress-free group trips. 🛶🌲
                </p>
            </FadeContent>
            <StepContent>
                We’ll let you know when TripWise is live (plus you’ll be first in line for early access & perks).
                <br />
                Until then, dream big, plan easy. ✈️💬
                <br />
                Have more to share? Reach out to us at <Snippet color='success' variant='bordered' className={`py-0`}>support@tripwise.group</Snippet>
            </StepContent>
        </Step>
    )
}