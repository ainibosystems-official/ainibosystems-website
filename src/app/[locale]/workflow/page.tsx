"use client";

import Link from "next/link";

import WorkflowHero from "@/components/workflow/WorkflowHero";
import WorkflowDetails from "@/components/workflow/WorkflowDetails"; // ✅ NEW IMPORT
import WorkflowSteps from "@/components/workflow/WorkflowSteps";
import WhyChooseAiNiBo from "@/components/workflow/WhyChooseAiNiBo";
import CTASection from "@/components/workflow/CTASection";

export default function WorkflowPage() {
  return (
    <main className="relative w-full bg-gradient-to-b from-[#060E18] to-[#0C1D2F] text-white overflow-hidden">
      {/* 🔹 HERO SECTION */}
      <WorkflowHero />

      {/* 🔹 DETAILED INFO (BOTS + SERVICES) */}
      <WorkflowDetails /> {/* ✅ Inserted right after hero */}

      {/* 🔹 TIMELINE / STEPS */}
      <WorkflowSteps />

      {/* 🔹 WHY CHOOSE AINIBO */}
      <WhyChooseAiNiBo />

      {/* 🔹 FINAL CALL TO ACTION */}
      <CTASection />
    </main>
  );
}
