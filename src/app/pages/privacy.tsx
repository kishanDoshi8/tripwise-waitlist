import Privacy from "@/components/policies/privacy";
import Terms from "@/components/policies/terms";
import { Divider } from "@heroui/react";

export default function PoliciesPage() {
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