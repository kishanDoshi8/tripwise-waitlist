import React, {
    useState,
    Children,
    useRef,
    useLayoutEffect,
    HTMLAttributes,
    ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/libs/utils";
import FadeContent from "../animations/fade-content";
import { Button, ButtonProps } from "@heroui/react";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    stepCircleContainerClassName?: string;
    stepContainerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    nextButtonProps?: ButtonProps;
    backButtonText?: string;
    nextButtonText?: string;
    disableStepIndicators?: boolean;
    hideStepIndicators?: boolean;
    onStart?: () => Promise<boolean>;
    onNext?: () => boolean;
    onSubmit?: () => Promise<boolean>;
    finalComponent?: ReactNode;
    renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
}

interface RenderStepIndicatorProps {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
}

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    stepCircleContainerClassName = "",
    stepContainerClassName = "",
    contentClassName = "",
    footerClassName = "",
    backButtonProps = {},
    nextButtonProps = {},
    backButtonText = "Back",
    nextButtonText = "Next",
    disableStepIndicators = false,
    hideStepIndicators = false,
    onStart = () => Promise.resolve(true),
    onNext = () => true,
    onSubmit = () => Promise.resolve(true),
    finalComponent,
    renderStepIndicator,
    ...rest
}: Readonly<StepperProps>) {
    const [currentStep, setCurrentStep] = useState<number>(initialStep);
    const [direction, setDirection] = useState<number>(0);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isFirstStep = currentStep === initialStep;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;

    const updateStep = (newStep: number) => {
        setCurrentStep(newStep);
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 2) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = async () => {
        if (isLastStep) return;

        setDirection(1);

        const shouldAdvance = isFirstStep ? await onStart() : onNext();
        if (shouldAdvance) {
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = async () => {
        setDirection(1);
        if (await onSubmit()) {
            updateStep(totalSteps + 1);
        }
    };

    return (
        <div {...rest}>
            <div
                className={`step-circle-container ${stepCircleContainerClassName}`}
                style={{ border: "1px solid #222" }}
            >
                {!hideStepIndicators && <div className={`step-indicator-row md:px-8 md:pt-8 px-4 pt-4 ${currentStep === totalSteps + 1 && !finalComponent && 'pb-8'} ${stepContainerClassName}`}>
                    {stepsArray.map((_, index) => {
                        const stepNumber = index + 1;
                        const isNotLastStep = index < totalSteps - 1;
                        return (
                            <React.Fragment key={stepNumber}>
                                {renderStepIndicator ? (
                                    renderStepIndicator({
                                        step: stepNumber,
                                        currentStep,
                                        onStepClick: (clicked) => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        },
                                    })
                                ) : (
                                    <StepIndicator
                                        step={stepNumber}
                                        disableStepIndicators={disableStepIndicators}
                                        currentStep={currentStep}
                                        onClickStep={(clicked) => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }}
                                    />
                                )}
                                {isNotLastStep && (
                                    <StepConnector isComplete={currentStep > stepNumber} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>}

                <StepContentWrapper
                    isCompleted={isCompleted}
                    currentStep={currentStep}
                    direction={direction}
                    className={`step-content-default ${contentClassName}`}
                    finalComponent={finalComponent}
                >
                    {stepsArray[currentStep - 1]}
                </StepContentWrapper>

                {!isCompleted && (
                    <div className={`footer-container ${footerClassName}`}>
                        <div className={`footer-nav ${currentStep > 2 ? "spread" : "end"}`}>
                            {currentStep > 2 && (
                                <button
                                    onClick={handleBack}
                                    className={`back-button ${currentStep === 1 ? "inactive" : ""}`}
                                    {...backButtonProps}
                                >
                                    {backButtonText}
                                </button>
                            )}
                            <Button
                                color="success"
                                radius="full"
                                className={`next-button`}
                                {...nextButtonProps}
                                onPress={isLastStep ? handleComplete : handleNext}
                            >
                                {isLastStep ? "Submit" : nextButtonText}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface StepContentWrapperProps {
    isCompleted: boolean;
    currentStep: number;
    direction: number;
    children: ReactNode;
    finalComponent?: ReactNode;
    className?: string;
}

function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children,
    finalComponent,
    className,
}: Readonly<StepContentWrapperProps>) {
    const [parentHeight, setParentHeight] = useState<number>(0);

    return (
        <motion.div
            className={className}
            style={{ position: "relative", overflow: "hidden" }}
            animate={{ height: isCompleted && !finalComponent ? 0 : parentHeight }}
            transition={{ type: "spring", duration: 0.4 }}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
                        {children}
                    </SlideTransition>
                )}
                {isCompleted && finalComponent && (
                    <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
                        {finalComponent}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface SlideTransitionProps {
    children: ReactNode;
    direction: number;
    onHeightReady: (h: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: Readonly<SlideTransitionProps>) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === containerRef.current) {
                    const newHeight = entry.contentRect.height;

                    // Debounce the height update
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);

                    timeoutRef.current = setTimeout(() => {
                        onHeightReady(newHeight);
                    }, 200);
                }
            }
        });

        observer.observe(containerRef.current);

        // Initial measure
        onHeightReady(containerRef.current.offsetHeight);

        return () => {
            observer.disconnect();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [onHeightReady]);

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", left: 0, right: 0, top: 0 }}
        >
            {children}
        </motion.div>
    );
}

const stepVariants: Variants = {
    enter: (dir: number) => ({
        x: dir >= 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: "0%",
        opacity: 1,
    },
    exit: (dir: number) => ({
        x: dir >= 0 ? "-50%" : "50%",
        opacity: 0,
    }),
};

interface StepProps {
    children: ReactNode;
}

export function Step({ children }: Readonly<StepProps>): JSX.Element {
    return <div className="md:px-8 md:pt-8 px-4 pt-4">{children}</div>;
}

interface StepIndicatorProps {
    step: number;
    currentStep: number;
    onClickStep: (step: number) => void;
    disableStepIndicators?: boolean;
}

function StepIndicator({
    step,
    currentStep,
    onClickStep,
    disableStepIndicators,
}: Readonly<StepIndicatorProps>) {
    const status =
        currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

    const handleClick = () => {
        if (step !== currentStep && !disableStepIndicators) {
            onClickStep(step);
        }
    };

    return (
        <motion.div
            onClick={handleClick}
            className="step-indicator"
            animate={status}
            initial={false}
        >
            <motion.div
                variants={{
                    inactive: { scale: 1, backgroundColor: "#222", color: "#a3a3a3" },
                    active: { scale: 1, backgroundColor: "#17C964", color: "#17C964" },
                    complete: { scale: 1, backgroundColor: "#17C964", color: "#3b82f6" },
                }}
                transition={{ duration: 0.3 }}
                className="step-indicator-inner"
            >
                {status === "complete" ? (
                    <CheckIcon className="check-icon" />
                ) : (
                    <span className="active-dot" />
                )}
            </motion.div>
        </motion.div>
    );
}

interface StepConnectorProps {
    isComplete: boolean;
}

function StepConnector({ isComplete }: Readonly<StepConnectorProps>) {
    const lineVariants: Variants = {
        incomplete: { width: 0, backgroundColor: "transparent" },
        complete: { width: "100%", backgroundColor: "#17C964" },
    };

    return (
        <div className="step-connector">
            <motion.div
                className="step-connector-inner"
                variants={lineVariants}
                initial={false}
                animate={isComplete ? "complete" : "incomplete"}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> { }

function CheckIcon(props: CheckIconProps) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
}

interface HeaderProps {
    className?: string;
    children?: React.ReactNode;
}

export function StepHeader({ className, children }: Readonly<HeaderProps>) {
    return <h2 className={cn(`md:text-2xl text-lg mb-2 text-success-400`, className)}>{children}</h2>
}

interface DescriptionProps {
    className?: string;
    children?: React.ReactNode;
}

export function StepDescription({ className, children }: Readonly<DescriptionProps>) {
    return (
        <FadeContent delay={1000}>
            <p className={cn(`md:text-3xl text-xl mb-4 opacity-80`, className)}>{children}</p>
        </FadeContent>
    )
}

interface ContentProps {
    children: React.ReactNode;
    className?: string;
}

export function StepContent({ className, children }: Readonly<ContentProps>) {
    return (
        <FadeContent delay={1500} className={cn(`mb-4 space-y-2 md:text-base text-sm`, className)}>
                {children}
        </FadeContent>
    )
    
}