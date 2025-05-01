import { Chip } from "@heroui/react";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function Suggestions({ children }: Readonly<Props>) {
    return (
        <Chip
            color="success"
            variant="dot"
            className={`text-opacity-75 hover:text-opacity-100 transition-all duration-300 md:text-base text-sm h-auto`}
            startContent={<span className={`material-icons text-sm text-success-500`}>add</span>}
        >
            <span className={`text-wrap`}>
                {children}
            </span>
        </Chip>
    )
}