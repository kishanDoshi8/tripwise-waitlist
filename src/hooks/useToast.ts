import { addToast } from "@heroui/react";
import { useCallback, useRef } from "react";

type ToastOptions = {
    title: string;
    description: string | undefined;
    color: "danger" | "success" | "warning" | "default" | "foreground" | "primary" | "secondary";
    variant: "bordered" | "solid";
    timeout: number;
};

export function useToast() {
    const lastToastRef = useRef<{ timestamp: number; content: string } | null>(null);

    const showToast = useCallback(
        (toastOptions: ToastOptions) => {
            const now = Date.now();

            // Prevent showing the same toast within 5 seconds
            if (lastToastRef.current && lastToastRef.current.content === toastOptions.title && now - lastToastRef.current.timestamp < 5000) {
                return; // Skip showing duplicate toast
            }

            // Show the toast
            addToast({
                title: toastOptions.title,
                description: toastOptions.description,
                color: toastOptions.color,
                variant: toastOptions.variant,
                timeout: toastOptions.timeout,
            });

            // Update the last shown toast in the ref
            lastToastRef.current = {
                timestamp: now,
                content: toastOptions.title,
            };
        },
        []
    );

    const errorToast = (title: string, description?: string) => {
        showToast({
            title,
            description: description,
            color: "danger",
            variant: "bordered",
            timeout: 0,
        });
    };

    const successToast = (message: string) => {
        showToast({
            title: "Success",
            description: message,
            color: "success",
            variant: "bordered",
            timeout: 3000,
        });
    };

    const infoToast = (message: string) => {
        showToast({
            title: "Info",
            description: message,
            color: "primary",
            variant: "bordered",
            timeout: 3000,
        });
    };

    return {
        errorToast,
        successToast,
        infoToast,
    };
}