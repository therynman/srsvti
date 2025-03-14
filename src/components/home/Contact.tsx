"use client";

import React, { useState } from "react";
import { Send, Mail, Phone, MapPin, Linkedin } from "lucide-react";

// Better Behance icon that matches the official logo
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.553.804.947.195.395.291.879.291 1.461 0 .624-.142 1.143-.427 1.552-.286.408-.7.739-1.245.995.752.217 1.313.611 1.694 1.181.377.571.566 1.261.566 2.072 0 .657-.116 1.231-.348 1.719-.233.49-.559.887-.979 1.195-.419.307-.922.531-1.479.669-.563.135-1.155.205-1.777.205H2V5.731h5.803zm-.351 4.972c.48 0 .878-.114 1.192-.345.312-.228.463-.604.463-1.119 0-.286-.051-.522-.151-.707-.103-.184-.241-.331-.423-.441-.179-.11-.384-.188-.621-.233-.235-.043-.47-.064-.707-.064H4.71v2.909h2.742zm.151 5.239c.267 0 .521-.023.76-.077.241-.053.455-.137.637-.261.182-.12.332-.283.44-.491.109-.206.162-.475.162-.798 0-.634-.179-1.085-.533-1.358-.355-.27-.831-.404-1.414-.404H4.71v3.39h2.893zm8.565-8.521c.633 0 1.196.103 1.691.309.496.205.915.497 1.256.872.342.373.602.818.775 1.329.175.511.261 1.075.261 1.694 0 .149-.006.287-.013.416-.013.131-.02.246-.033.343h-6.961c.119.883.48 1.508 1.076 1.865.397.238.877.354 1.439.354.613 0 1.121-.138 1.517-.4.232-.158.441-.332.629-.571h2.342c-.119.368-.305.721-.562 1.056-.258.335-.581.641-.984.917-.398.276-.857.493-1.38.65-.52.158-1.083.234-1.69.234-.815 0-1.544-.13-2.167-.391-.629-.261-1.161-.635-1.591-1.12-.429-.483-.757-1.062-.985-1.736-.23-.672-.349-1.419-.349-2.232 0-.782.12-1.512.347-2.185.229-.67.564-1.258.993-1.758.431-.502.956-.885 1.569-1.16.615-.276 1.311-.412 2.088-.412zm.162 1.786c-.466 0-.874.093-1.236.283-.362.189-.663.429-.903.729-.24.306-.423.64-.542.998h5.161c-.118-.673-.395-1.194-.838-1.568-.44-.374-.963-.553-1.591-.553h-.051v.111zm1.001 8.13v-1.548h4.789v1.548h-4.789z" />
    </svg>
);

// Contact details
const CONTACT_INFO = {
    email: "rayan@srsvti.com",
    phone: "+91-8100418016",
    address:
        "For now, we don't have any physical office but we're soon gonna open offices in New York, Dubai & Kolkata",
    social: {
        behance: "https://www.behance.net/therynman",
        linkedin: "https://www.linkedin.com/company/srsvti",
    },
};

const Contact = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("Form submitted:", formState);
            setSubmitSuccess(true);
            setFormState({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            setSubmitError(
                "There was an error submitting your message. Please try again."
            );
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactItems = [
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email",
            value: CONTACT_INFO.email,
            href: `mailto:${CONTACT_INFO.email}`,
        },
        {
            icon: <Phone className="w-5 h-5" />,
            title: "Phone",
            value: CONTACT_INFO.phone,
            href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Address",
            value: CONTACT_INFO.address,
            href: `https://maps.google.com/?q=${encodeURIComponent(
                CONTACT_INFO.address
            )}`,
        },
    ];

    // Map social media icons
    const socialIcons: Record<string, React.ReactNode> = {
        behance: <BehanceIcon className="w-5 h-5" />,
        linkedin: <Linkedin className="w-5 h-5" />,
    };

    return (
        <section className="py-20 lg:py-32 bg-gray-50" data-section="contact">
            <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-gray-500 text-sm uppercase tracking-widest mb-4">
                            Get in Touch
                        </span>

                        <h2 className="text-4xl lg:text-5xl font-light mb-6 tracking-tight">
                            Let&apos;s start a project together
                        </h2>

                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Have a project in mind or want to explore how we can
                            help your brand grow? Reach out, and let&apos;s
                            create something amazing together.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Contact form */}
                        <div className="lg:col-span-3">
                            {submitSuccess ? (
                                <div className="bg-white p-10 text-center rounded-sm shadow-sm">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-black mb-6">
                                        <Send className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-light mb-4">
                                        Message Sent Successfully!
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for getting in touch.
                                        We&apos;ll review your message and get
                                        back to you shortly.
                                    </p>
                                    <button
                                        onClick={() => setSubmitSuccess(false)}
                                        className="inline-flex items-center text-white bg-black px-6 py-3 rounded-sm"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6 bg-white p-8 rounded-sm shadow-sm contact-form"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-gray-600 mb-2 text-sm"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-gray-600 mb-2 text-sm"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                                                placeholder="hello@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-gray-600 mb-2 text-sm"
                                        >
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formState.subject}
                                            onChange={handleChange}
                                            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                                            placeholder="Project Inquiry"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-gray-600 mb-2 text-sm"
                                        >
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formState.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                                            placeholder="Tell us about your project and goals..."
                                            required
                                        />
                                    </div>

                                    {submitError && (
                                        <div className="text-red-600 text-sm">
                                            {submitError}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`flex items-center justify-center gap-2 w-full py-4 px-6 rounded-sm ${
                                            isSubmitting
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-black"
                                        } text-white font-light`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact information */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-8 rounded-sm shadow-sm h-full">
                                <h3 className="text-xl mb-8 font-light tracking-tight">
                                    Contact Information
                                </h3>

                                <div className="space-y-8">
                                    {contactItems.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-4"
                                        >
                                            <div className="p-3 rounded-full bg-gray-100 text-black">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-gray-500 text-sm mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-black">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-100">
                                    <h4 className="text-gray-500 text-sm mb-4">
                                        Follow Us
                                    </h4>
                                    <div className="flex gap-4">
                                        {Object.entries(
                                            CONTACT_INFO.social
                                        ).map(([platform, url], index) => (
                                            <a
                                                key={index}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-gray-100"
                                                aria-label={platform}
                                            >
                                                {socialIcons[platform]}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
