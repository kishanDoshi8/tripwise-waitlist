import { Link } from "react-router-dom";
import AnimatedContent from "./animations/animateContent";
import BlurText from "./animations/blur-text";
import BorderGradient from "./animations/border-gradient";
import { Button } from "./ui/button";

export default function LandingPage() {
    return (
        <div className="h-full flex flex-col items-center max-w-5xl mx-auto space-y-12 md:space-y-8 text-center">
            <AnimatedContent
                reverse={true}
                delay={150}
                distance={25}
            >
                <BorderGradient>
                    <a href="https://beta.tripwise.group/" target="_blank">
                        <Button
                            color="success"
                            variant="flat"
                            size="sm"
                            radius="full"
                        >
                            Invite only beta login
                        </Button>
                    </a>
                </BorderGradient>
            </AnimatedContent>

            <BlurText
                text="Planning group trips is painful — we're here to make it easier."
                delay={150}
                animateBy="words"
                className="text-3xl text-center lg:text-left lg:text-6xl font-semibold"
            />

            <AnimatedContent
                distance={50}
                direction="vertical"
            >
                <p className={`text-lg md:text-xl`}>Hey! 👋 We're building Tripwise, the easiest way to plan epic group trips without the spreadsheet chaos, group chats gone wild, or “who’s bringing what again?” nightmares.</p>
            </AnimatedContent>

            <AnimatedContent
                distance={50}
                direction="vertical"
                delay={200}
            >
                <p className={`text-lg md:text-xl`}>Before we open the gates, we’d love your thoughts. It'll take just a minute (promise). No boring stuff – just a few quick vibes from you.</p>
            </AnimatedContent>

            <AnimatedContent
                distance={50}
                direction="vertical"
                delay={500}
            >
                <Link to='/survey'>
                    <Button
                        color="success"
                        size="lg"
                        variant="shadow"
                        className={`group`}
                        endContent={<span className={`text-2xl -translate-y-0.5 group-hover:translate-x-2 transition-all duration-200`}>&rarr;</span>}
                    >
                        Take Survey & Join waitlist
                    </Button>
                </Link>
            </AnimatedContent>
        </div>
    )
}