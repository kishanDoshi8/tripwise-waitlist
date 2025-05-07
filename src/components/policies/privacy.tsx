import { Snippet } from '@heroui/react';
import React from 'react';

export default function Privacy() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h3 className="text-4xl font-semibold mb-2">📜 TripWise Privacy Policy</h3>
            <p className="text-small italic mb-6 text-neutral-400">Last update April 28, 2025</p>

            <div className={`space-y-4 mt-4`}>
                <Section title="Welcome to TripWise!">
                    <p>
                        We care about your privacy and are committed to protecting your personal information.
                    </p>
                </Section>

                <Section title="1. Information We Collect">
                    <p>We collect the following information when you sign up for our waitlist or participate in our survey:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Email address (to keep you updated about TripWise)</li>
                        <li>Optional name</li>
                        <li>Responses survey questions about your group travel habits (to help us design a better product)</li>
                    </ul>
                </Section>

                <Section title="2. How We Use Your Information">
                    <p>We use the information you provide to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Communicate with you about TripWise updates and launch announcements</li>
                        <li>Understand group travel habits to improve our product</li>
                        <li>Analyze survey results internally for research purposes</li>
                    </ul>
                    <p>We do not sell, rent, or share your personal data with third parties for marketing.</p>
                </Section>

                <Section title="3. How We Protect Your Information">
                    <p>
                        We store your data securely and take precautions to protect it.
                    </p>
                    <p>
                        However, no method of internet transmission is 100% secure, so we cannot guarantee absolute security.
                    </p>
                </Section>

                <Section title="4. Your Rights">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>View the information we have about you</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your data at any time</li>
                    </ul>
                    <p className="mt-2">
                        Please contact us at <Snippet color='success' variant='bordered' className={`py-0`}>support@tripwise.group</Snippet> if you would like to exercise any of these rights.
                    </p>
                </Section>

                <Section title="5. Changes to This Policy">
                    <p>
                        We may update this Privacy Policy from time to time.
                    </p>
                    <p>
                        We will notify you of significant changes by posting the new policy on our website.
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