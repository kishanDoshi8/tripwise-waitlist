import { Chip } from "@heroui/react";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function Suggestions({ children }: Readonly<Props>) {
    return (
        <Chip color="success" variant="dot" startContent={<span className={`material-icons text-sm text-success-500`}>add</span>}>
            {children}
        </Chip>
    )
}