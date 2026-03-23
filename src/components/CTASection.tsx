"use client";

import dynamic from "next/dynamic";

const AnimatedHeading = dynamic(() => import("./AnimatedHeading"), { ssr: false });

interface CTASectionProps {
  onOpenDiagnosis?: () => void;
}

export default function CTASection({ onOpenDiagnosis }: CTASectionProps) {
 return (
 <div
  className="w-full flex flex-col bg-[#121212] border-t border-[#848484]"
  style={{ zIndex: 5, position: "relative" }}
 >
  {/* Top content: H on left 6 grids, paragraph + CTA on right 6 grids */}
  <div className="px-[clamp(24px,4.16vw,60px)] pt-[clamp(80px,11.11vw,160px)] pb-[clamp(80px,8vw,120px)]">
  <div className="flex flex-col xl:grid xl:grid-cols-12 gap-[clamp(24px,3vw,12px)] items-start">
  {/* Heading: 7 grids */}
  <div className="w-full xl:col-span-6 xl:pr-6">
  <AnimatedHeading
  className="font-medium"
  style={{
  fontSize: "clamp(32px, 2.77vw, 160px)",
  letterSpacing: "-0.04em",
  lineHeight: "100%",
  }}
  >
  <span className="text-[#0077FF]">
  Prescription Without Diagnosis
  </span>{" "}
  Is Malpractice
  </AnimatedHeading>
  </div>

  {/* Paragraph + CTA: 5 grids */}
  <div className="w-full xl:col-start-7 xl:col-span-6 mt-6 xl:mt-0">
  <p
  className="font-medium text-white/80"
  style={{
  fontSize: "clamp(14px, 1.11vw, 64px)",
  letterSpacing: "0",
  lineHeight: "140%",
  }}
  >
  Do not request a discovery call. Accessing our strategic bandwidth
  requires completing the Revenue Architecture Diagnostic. This
  interactive terminal will force an audit of highly specific queries
  regarding Average Order Value, retention architecture, and total
  reliance on paid traffic. It will automatically calculate
  operational friction and pinpoint exactly where the business is
  bleeding capital.
  </p>

  {/* CTA button — 40px below paragraph */}
  <button
  onClick={onOpenDiagnosis}
  className="mt-[40px] inline-flex justify-center items-center gap-[clamp(8px,1vw,16px)] px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors w-fit"
  style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px,1.11vw,20px)" }}
  >
  Initiate Revenue Diagnosis
  <img src="/CTA Arrow.svg" alt="" className="w-[clamp(12px,0.9vw,20px)] h-[clamp(12px,0.9vw,20px)]" />
  </button>
  </div>
  </div>
  </div>

 

 

 
 </div>
 );
}
