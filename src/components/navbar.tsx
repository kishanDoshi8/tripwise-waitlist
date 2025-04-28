import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import BlurText from "./animations/blur-text";
import FadeContent from "./animations/fade-content";
import { Tooltip } from "@heroui/react";


export default function Navbar() {
    return (
        <nav className={`border-b-1 border-slate-400/40 font-mono`}>
            <div className={`container mx-auto flex justify-between items-center p-4 lg:px-16`}>
                <Link to='/'>
                    <BlurText
                        text="TripWise"
                        delay={150}
                        animateBy="words"
                        className="text-xl"
                    />
                </Link>

                <ul className={`flex gap-4`}>
                    <li>
                        <FadeContent>
                            <a href="https://beta.tripwise.group/" target="_blank">
                                <Tooltip content="Invite only" color="success" radius="sm" delay={700} placement="left">
                                    <Button
                                        color="success" 
                                        variant="light"
                                        startContent={<span className={`material-icons text-sm`}>lock</span>}
                                    >
                                        Beta Login
                                    </Button>
                                </Tooltip>
                            </a>
                        </FadeContent>
                    </li>
                </ul>
            </div>
        </nav>
    )
}