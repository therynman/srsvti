"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (
        <div className="border-b border-gray-200 faq-item">
            <button
                onClick={onToggle}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
            >
                <h3 className="text-xl font-light text-black">{question}</h3>

                <div
                    className={`ml-4 flex-shrink-0 ${
                        isOpen ? "text-black" : "text-gray-500"
                    }`}
                >
                    {isOpen ? (
                        <Minus className="w-4 h-4" />
                    ) : (
                        <Plus className="w-4 h-4" />
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="pb-6">
                    <div className="pr-12 text-gray-600 max-w-3xl">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="py-20 lg:py-32 bg-white" data-section="faq">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-[64px] md:px-16 lg:px-[64px]">
                    <div className="lg:col-span-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6">
                            Frequently Asked Questions
                        </h2>

                        <p className="text-gray-600">
                            Find answers to common questions about our services,
                            process, and how we can help your brand grow.
                        </p>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="divide-y divide-gray-200">
                            {FAQ_ITEMS.map((item, index) => (
                                <FAQItem
                                    key={index}
                                    question={item.question}
                                    answer={item.answer}
                                    isOpen={openIndex === index}
                                    onToggle={() => toggleItem(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
