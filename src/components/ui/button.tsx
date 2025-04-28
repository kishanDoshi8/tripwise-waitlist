import { cn } from '@/libs/utils';
import { ButtonProps, Button as HeroButton } from '@heroui/react';
import React from 'react';

// Extend ButtonProps, but allow extra props from the component (like Link)
interface ExtendedButtonProps<C extends React.ElementType = 'button'> extends ButtonProps {
    component?: C;
}

type PolymorphicButtonProps<C extends React.ElementType> = ExtendedButtonProps<C> &
    Omit<React.ComponentPropsWithoutRef<C>, keyof ExtendedButtonProps>;

const Button = React.forwardRef(
    <C extends React.ElementType = 'button'>(
        { className, radius = 'sm', component, ...props }: PolymorphicButtonProps<C>,
        ref: React.Ref<HTMLButtonElement>
    ) => {
        const Component = component ?? 'button';
        return (
            <HeroButton
                ref={ref}
                as={Component}
                radius={radius}
                className={cn(className)}
                {...(props as any)}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };