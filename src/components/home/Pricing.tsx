"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

interface PricingPlan {
    title: string;
    price: string;
    bestFor: string;
    features: string[];
    isDark?: boolean;
    isPopular?: boolean;
}

interface PricingCardProps {
    plan: PricingPlan;
    index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    // Animation variants for staggered appearance
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`rounded-xl cursor-pointer relative ${
                plan.isDark
                    ? "bg-[#1a1a1a] text-white border border-[#333333]"
                    : "bg-white text-black border border-gray-200"
            }`}
        >
            {plan.isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <div className="bg-black text-white font-bold px-6 py-2 rounded-full text-base border-2 border-sage">
                        Most Popular
                    </div>
                </div>
            )}

            <Link href="/contact" className="block p-8 h-full">
                <div className="mb-4">
                    <h3 className="text-2xl font-light mb-2">{plan.title}</h3>
                    <p
                        className={`text-sm ${
                            plan.isDark ? "text-white/70" : "text-black/70"
                        }`}
                    >
                        <strong>Best for:</strong> {plan.bestFor}
                    </p>
                </div>

                <div className="mb-6">
                    <span
                        className={`text-4xl font-light ${
                            plan.isDark ? "text-white" : "text-black"
                        }`}
                    >
                        {plan.price}
                    </span>
                </div>

                <div
                    className={`mb-6 text-sm ${
                        plan.isDark ? "text-white/70" : "text-black/70"
                    }`}
                >
                    <strong>Includes:</strong>
                </div>

                <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                            <div
                                className={`mt-1 flex-shrink-0 ${
                                    plan.isDark
                                        ? "text-white/60"
                                        : "text-black/60"
                                }`}
                            >
                                <Check className="w-4 h-4" />
                            </div>
                            <span
                                className={
                                    plan.isDark
                                        ? "text-white/80"
                                        : "text-black/80"
                                }
                            >
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </Link>
        </motion.div>
    );
};

const CustomPlanCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-xl mt-12 cursor-pointer border border-gray-200"
        >
            <Link href="/contact" className="block p-8 h-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-2xl font-light mb-2">
                            Enterprise / Custom Plan – Let&apos;s Chat
                        </h3>
                        <p className="text-black/70 max-w-xl">
                            For businesses with specific needs, offer a tailored
                            pricing plan.
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Pricing = () => {
    const pricingPlans: PricingPlan[] = [
        {
            title: "Starter Plan",
            price: "$1,000/month",
            bestFor:
                "Small businesses & startups needing occasional design work.",
            features: [
                "4-5 design requests per month (e.g., social media posts, landing pages, small website updates)",
                "1 revision per design",
                "5 business day turnaround per request",
                "Email support",
            ],
            isDark: false,
        },
        {
            title: "Growth Plan",
            price: "$2,500/month",
            bestFor:
                "Growing businesses & content creators who need regular design support.",
            features: [
                "Unlimited design requests (1 active task at a time)",
                "1 website or landing page per quarter",
                "Full brand asset creation (logo, business cards, social media)",
                "2 revisions per design",
                "3 business day turnaround per request",
                "Priority support",
            ],
            isDark: true,
            isPopular: true,
        },
        {
            title: "Premium Plan",
            price: "$5,000/month",
            bestFor:
                "Established brands needing high-volume, high-quality designs.",
            features: [
                "Unlimited design requests (2 active tasks at a time)",
                "Custom website (or redesign) once per year",
                "Advanced branding (logo, typography, brand guidelines, social media assets)",
                "UI/UX support for apps/web platforms",
                "1-2 day turnaround per request",
                "Dedicated design team & Slack access for real-time collaboration",
            ],
            isDark: false,
        },
    ];

    return (
        <section className="py-24 pb-32 bg-white relative overflow-hidden">
            <div className="container mx-auto">
                <div className="mb-20 pl-[64px] md:pl-16 lg:pl-[64px]">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-black"
                    >
                        Plans & Pricing
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-black/70 max-w-2xl mt-6 text-lg"
                    >
                        We offer both fixed packages and custom solutions to fit
                        your needs.
                    </motion.p>
                </div>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-[64px] md:px-16 lg:px-[64px]">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={plan.title}
                            plan={plan}
                            index={index}
                        />
                    ))}
                </div>

                {/* Custom Plan Card */}
                <div className="px-[64px] md:px-16 lg:px-[64px]">
                    <CustomPlanCard />
                </div>

                {/* Bottom message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-black/60">
                        Invest in design that delivers.{" "}
                        <Link
                            href="/contact"
                            style={{ color: "#0066FF" }}
                            className="underline-hover"
                        >
                            Get started today.
                        </Link>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
