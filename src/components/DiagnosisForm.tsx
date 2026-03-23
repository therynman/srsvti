"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from 'lenis/react';

interface DiagnosisFormProps {
  onClose: () => void;
}

const STEPS = [
  {
    title: "Introduction",
    subtitle: "(Getting Started)",
    questions: [
      "What is your name?",
      "What is your company name?",
      "What is your company email?",
    ],
  },
  {
    title: "Surface Reality",
    subtitle: "(Low Threat)",
    questions: [
      "What is your core product category and hero SKU?",
      "What is your current website URL?",
    ],
  },
  {
    title: "The Delusion Check",
    subtitle: "(Operational Friction)",
    questions: [
      "What is your current Average Order Value and subscription adoption percentage?",
      "If you mentally removed your logo right now, what makes your brand meaningfully different from the hundreds of competitors in the market?",
    ],
  },
  {
    title: "The Financial Reality",
    subtitle: "(High Threat)",
    questions: [
      "What is your current annual revenue?",
      "What do you believe are your primary growth bottlenecks?",
      "What are the exact budget allocations set aside for growth initiatives?",
    ],
  },
  {
    title: "The Commitment",
    subtitle: "(The Commitment)",
    questions: [
      "What is the financial cost to your business of remaining stagnant for another quarter?",
    ],
  },
];

const NAV_LABELS = [
  "Introduction",
  "Surface Reality",
  "The Delusion Check",
  "The Financial Reality",
  "The Commitment",
];

export default function DiagnosisForm({ onClose }: DiagnosisFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Auto-scroll the step nav to center the active item on smaller screens
    const activeTab = document.getElementById(`step-nav-${currentStep}`);
    if (activeTab && navRef.current) {
      activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [currentStep]);

  const getQuestionKey = (stepIdx: number, qIdx: number) => `${stepIdx}-${qIdx}`;

  const handleAnswerChange = (value: string) => {
    const key = getQuestionKey(currentStep, currentQuestion);
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = useCallback(async () => {
    const step = STEPS[currentStep];
    const key = getQuestionKey(currentStep, currentQuestion);
    const currentAnswer = answers[key]?.trim();

    // Do not proceed on empty input
    if (!currentAnswer) return;

    setCompletedQuestions((prev) => new Set(prev).add(key));

    if (currentQuestion < step.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentStep < STEPS.length - 1) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setCurrentStep((prev) => prev + 1);
      setCurrentQuestion(0);
    } else {
      // Last step: Attempt submission
      setIsSubmitting(true);
      
      const payload = {
        name: answers["0-0"] || "Unknown",
        company_name: answers["0-1"] || "Unknown",
        company_email: answers["0-2"] || "Unknown",
        responses: { ...answers },
      };

      try {
        const res = await fetch('/api/diagnoses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error('Failed to submit form');
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
      } catch (err) {
        console.error("Submission error:", err);
        setIsSubmitting(false);
        alert("There was an issue submitting your diagnosis. Please try again.");
      }
    }
  }, [currentStep, currentQuestion, answers]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    } else if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentQuestion(STEPS[prevStep].questions.length - 1);
    } else {
      onClose();
    }
  }, [currentStep, currentQuestion, onClose]);

  const step = STEPS[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#121212] overflow-hidden text-white w-full"
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-[clamp(16px,4.16vw,60px)] border-x border-[#848484] flex-grow flex flex-col min-h-screen relative"
          >
            <div className="flex flex-col flex-grow h-full absolute inset-0">
              <div 
                ref={navRef}
                className="w-full flex items-center md:justify-center gap-[24px] sm:gap-[clamp(16px,1.11vw,24px)] border-b border-[#848484] overflow-x-auto flex-nowrap md:flex-wrap hide-scrollbar"
                style={{ padding: "clamp(16px,1.5vw,24px) clamp(24px,4.16vw,60px)" }}
              >
                {NAV_LABELS.map((label, idx) => {
                  const isDone = completedSteps.has(idx);
                  const isCurrent = idx === currentStep;
                  const opacity = isDone || isCurrent ? 1 : 0.8;

                  return (
                    <button
                      key={label}
                      id={`step-nav-${idx}`}
                      className="flex items-center gap-[12px] px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#252525] text-white font-medium border transition-all shrink-0"
                      style={{
                        height: "clamp(48px, 3.88vw, 72px)",
                        fontSize: "clamp(14px, 1.11vw, 16px)",
                        opacity,
                        borderColor: isCurrent
                          ? "#FFFFFF"
                          : "rgba(255,255,255,0.05)",
                      }}
                      onClick={() => {
                        if (isDone || isCurrent) {
                          setCurrentStep(idx);
                          setCurrentQuestion(0);
                        }
                      }}
                    >
                      <img
                        src={isDone ? "/Tick-round.svg" : "/empty-tick.svg"}
                        alt=""
                        className="w-[clamp(14px,1.25vw,18px)] h-[clamp(14px,1.25vw,18px)]"
                      />
                      <span className="whitespace-nowrap">{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TITLE SECTION — 60px padding inside the container */}
              <div 
                className="w-full flex flex-col justify-center shrink-0"
                style={{ padding: "clamp(40px,4.16vw,60px)" }}
              >
                <h1
                  className="font-medium text-white"
                  style={{
                    fontSize: "clamp(24px, 2.77vw, 40px)",
                    letterSpacing: "-0.04em",
                    lineHeight: "100%",
                  }}
                >
                  Revenue Architecture Diagnostic Application
                </h1>
                <p
                  className="font-medium text-white/60 mt-[16px]"
                  style={{
                    fontSize: "clamp(14px, 1.11vw, 16px)",
                    lineHeight: "140%",
                  }}
                >
                  This diagnostic will evaluate your retention architecture, your trust
                  stack, and your pricing psychology
                </p>
              </div>

              {/* MAIN BODY AREA — Wrapper to contain scrolling questions & sticky buttons */}
              <div className="flex-grow border-t border-[#848484] flex flex-col relative overflow-hidden min-h-0">
                
                {/* Scrollable Questions List with scoped Lenis smooth scrolling */}
                <ReactLenis
                  options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
                  className="flex-grow overflow-y-auto hide-scrollbar"
                  style={{ 
                    padding: "clamp(40px,4.16vw,60px)",
                    paddingBottom: "calc(clamp(40px,4.16vw,60px) + clamp(48px, 3.88vw, 72px) + clamp(16px,2vw,32px))" 
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentStep}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-[clamp(12px,1.11vw,16px)]"
                    >
                      {step.questions.map((question, qIdx) => {
                        const qKey = getQuestionKey(currentStep, qIdx);
                        const isDone = completedQuestions.has(qKey);
                        const isActive = qIdx === currentQuestion;

                        return (
                          <div
                            key={qKey}
                            className="rounded-[12px] border transition-all duration-300"
                            style={{
                              backgroundColor: "#252525",
                              borderColor: isActive
                                ? "rgba(255,255,255,0.15)"
                                : "rgba(255,255,255,0.08)",
                              opacity: isActive ? 1 : isDone ? 0.85 : 0.6,
                            }}
                          >
                            {/* Question header */}
                            <div
                              className="flex items-center gap-[clamp(12px,1vw,16px)]"
                              style={{
                                padding: "clamp(16px, 1.5vw, 24px) clamp(20px, 2vw, 32px)",
                              }}
                            >
                              <img
                                src={isDone ? "/Tick-round.svg" : "/empty-tick.svg"}
                                alt=""
                                className="w-[clamp(16px,1.52vw,22px)] h-[clamp(16px,1.52vw,22px)] flex-shrink-0"
                              />
                              <span
                                className="font-medium text-white"
                                style={{
                                  fontSize: "clamp(16px, 1.38vw, 20px)",
                                  lineHeight: "140%",
                                }}
                              >
                                {question}
                              </span>
                            </div>

                            {/* Answer input */}
                            <AnimatePresence>
                              {isActive && !isDone && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div
                                    style={{
                                      padding: "0 clamp(20px, 2vw, 32px) clamp(16px, 1.5vw, 24px)",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      placeholder="Your answer here"
                                      value={answers[qKey] || ""}
                                      onChange={(e) => handleAnswerChange(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && answers[qKey]?.trim()) {
                                          handleNext();
                                        }
                                      }}
                                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-[8px] text-white placeholder-white/30 font-medium focus:outline-none focus:border-white/25 transition-colors"
                                      style={{
                                        padding: "clamp(12px, 1vw, 16px) clamp(16px, 1.2vw, 20px)",
                                        fontSize: "clamp(14px, 1.11vw, 16px)",
                                      }}
                                      autoFocus
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </ReactLenis>

                {/* BACK & NEXT BUTTONS — Absolute on top layer, 60px bottom padding */}
                <div 
                  className="absolute bottom-0 left-0 w-full flex items-center justify-between z-10 pointer-events-none"
                  style={{ 
                    padding: "0 clamp(40px,4.16vw,60px) clamp(40px,4.16vw,60px)"
                  }}
                >
                  <button
                    onClick={handleBack}
                    className="inline-flex justify-center items-center gap-[clamp(8px,1vw,16px)] w-[clamp(48px,3.88vw,72px)] sm:w-auto px-0 sm:px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#252525] text-white font-medium hover:bg-[#333333] transition-colors border border-white/5 pointer-events-auto shrink-0"
                    style={{
                      height: "clamp(48px, 3.88vw, 72px)",
                      fontSize: "clamp(14px, 1.11vw, 20px)",
                    }}
                  >
                    <img
                      src="/next-icon.svg"
                      alt=""
                      className="w-[clamp(8px,0.6vw,12px)] h-[clamp(12px,1.11vw,16px)] rotate-180 opacity-60"
                    />
                    <span className="hidden sm:inline">Back</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!answers[getQuestionKey(currentStep, currentQuestion)]?.trim() || isSubmitting}
                    className="inline-flex justify-center items-center gap-[clamp(8px,1vw,16px)] px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                    style={{
                      height: "clamp(48px, 3.88vw, 72px)",
                      fontSize: "clamp(14px, 1.11vw, 20px)",
                    }}
                  >
                    {currentStep === STEPS.length - 1 ? (
                      isSubmitting ? (
                        <span>Validating...</span>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Confirm your submission</span>
                          <span className="sm:hidden">Submit</span>
                        </>
                      )
                    ) : (
                      <>
                        Next
                        <img
                          src="/next-icon.svg"
                          alt=""
                          className="w-[clamp(8px,0.6vw,12px)] h-[clamp(12px,1.11vw,16px)]"
                        />
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-popup"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center p-[clamp(16px,4.16vw,60px)]"
          >
            <div 
              className="bg-[#252525] rounded-[24px] flex flex-col items-center justify-center text-center shadow-2xl relative z-10 w-fit"
              style={{ 
                maxWidth: "clamp(500px, 60vw, 850px)",
                padding: "clamp(24px, 2.22vw, 32px)",
                gap: "clamp(12px, 1.11vw, 16px)"
              }}
            >
                {/* Blue Check Icon */}
                <div className="w-[clamp(40px,4.16vw,60px)] h-[clamp(40px,4.16vw,60px)] rounded-full bg-[#0077FF] flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[50%] h-[50%]">
                    <path d="M20 6L9 17L4 12" stroke="#121212" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h2 
                  className="font-medium text-white tracking-tight leading-tight"
                  style={{ fontSize: "clamp(24px, 2.22vw, 32px)" }}
                >
                  Diagnostic Data Received
                </h2>

                <p 
                  className="font-semibold text-white"
                  style={{ fontSize: "clamp(16px, 1.38vw, 20px)" }}
                >
                  Status: Under Review
                </p>

                <p 
                  className="font-semibold text-white/60 text-center leading-[160%]"
                  style={{ 
                    fontSize: "clamp(12px, 1.11vw, 16px)",
                    width: "100%"
                  }}
                >
                  Your operational and financial metrics have been recorded. Our
                  bandwidth is strictly reserved for wellness operators possessing the
                  structural foundation to scale. Within 48 hours, we will analyze your
                  submission. If your metrics indicate a high probability of
                  compounding financial outcomes, you will receive a private invitation
                  for a high-level business consultation.
                </p>

                <button
                  onClick={onClose}
                  className="px-[clamp(24px,2.22vw,32px)] py-[clamp(12px,1.11vw,16px)] rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors flex items-center justify-center w-max mt-[clamp(4px, 0.25vw, 8px)]"
                  style={{ 
                    fontSize: "clamp(14px, 1.11vw, 16px)",
                    minHeight: "clamp(40px, 3.33vw, 48px)"
                  }}
                >
                  Go back to Home
                </button>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
