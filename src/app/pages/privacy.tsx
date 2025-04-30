import Privacy from "@/components/policies/privacy";
import Terms from "@/components/policies/terms";
import { Divider } from "@heroui/react";
import { useEffect } from "react";

export default function PoliciesPage() {
    useEffect(() => {
        document.title = 'Policies';
    }, []);

    return (
        <>
            <Privacy />
            <div className={`max-w-xl mx-auto`}>
                <Divider />
            </div>
            <Terms />
        </>
    );
}