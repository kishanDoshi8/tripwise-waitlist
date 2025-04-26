import { cn } from '@/libs/utils';
import { ButtonProps, Button as HeroButton } from '@heroui/react';
import React from 'react';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, radius = 'sm', ...props }, ref) => (
        <HeroButton
            ref={ref}
            {...props}
            radius={radius}
            className={cn(className)}
        >

        </HeroButton>
    )
);
Button.displayName = 'Button';

export { Button }