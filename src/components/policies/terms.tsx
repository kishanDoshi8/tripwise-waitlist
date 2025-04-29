import React from 'react';

export default function Terms() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h3 className="text-4xl font-semibold mb-2">📜 TripWise Terms of Service</h3>
            <p className="text-small italic mb-6 text-neutral-400">Last update April 28, 2025</p>

            <div className={`space-y-4 mt-4`}>
                <Section title="Welcome to TripWise!">
                    <p>
                        These Terms of Service ("Terms") govern your use of our website and participation in our waitlist and survey.
                    </p>
                </Section>

                <Section title="1. Acceptance of Terms">
                    <p>By submitting your email or survey responses, you agree to these Terms.</p>
                    <p>If you do not agree, please do not use our services.</p>
                </Section>

                <Section title="2. Purpose of TripWise">
                    <p>TripWise is currently in the development stage.</p>
                    <p>Our website collects early user interest and feedback through a waitlist signup and a short survey.</p>
                </Section>

                <Section title="3. No Guarantees">
                    <p>
                        Submitting your email or survey responses does not guarantee early access, invitations, rewards, or any future features.
                    </p>
                </Section>

                <Section title="4. Intellectual Property">
                    <p className="mt-2">
                        All content on this website — including branding, design, and survey materials — is owned by TripWise.
                    </p>
                    <p>
                        You may not copy, distribute, or reuse it without permission.
                    </p>
                </Section>

                <Section title="5. Limitation of Liability">
                    <p>
                        We provide our website "as-is" without warranties of any kind.
                    </p>
                    <p>
                        TripWise is not liable for any damages resulting from the use of our website.
                    </p>
                </Section>

                <Section title="6. Changes to These Terms">
                    <p>
                        We may update these Terms from time to time.
                    </p>
                    <p>
                        It is your responsibility to review them periodically.
                    </p>
                </Section>
            </div>
        </div>
    );
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
    <section className="mt-8">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <div>{children}</div>
    </section>
);