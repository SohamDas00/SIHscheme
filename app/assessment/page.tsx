"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppState, AssessmentData } from "@/lib/app-state";
import { AuthGuard } from "@/components/auth-guard";

export default function AssessmentPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [annualIncome, setAnnualIncome] = useState<string>("250000");
  const [loanAmount, setLoanAmount] = useState<string>("120000");
  const [purpose, setPurpose] = useState<"Business" | "Education">("Business");
  const [projectType, setProjectType] = useState<"Small" | "Medium" | "Large">("Small");
  const [educationLevel, setEducationLevel] = useState<"Undergraduate" | "Postgraduate" | "Professional">("Undergraduate");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const incomeNum = parseFloat(annualIncome) || 0;
    const loanNum = parseFloat(loanAmount) || 0;

    const data: AssessmentData = {
      income: incomeNum,
      loanAmount: loanNum,
      purpose,
      projectType: purpose === "Business" ? projectType : undefined,
      educationLevel: purpose === "Education" ? educationLevel : undefined,
    };

    AppState.saveAssessment(data);
    router.push("/matched-scheme");
  };

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-navy-950 text-foreground py-10 md:py-16 transition-colors duration-200">
        <div className="container px-4 mx-auto max-w-2xl space-y-8">

        {/* Stepper Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {t("Step 1 of 4: Applicant Profile")}
            </span>
            <span className="font-mono">
              {t("Next:")} {t("Matched Scheme")} &amp; {t("EMI Calculator")}
            </span>
          </div>

          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 w-1/4 rounded-full" />
          </div>
        </div>

        {/* Quick Jump Navigation Bar */}
        <div className="rounded-xl p-2.5 border border-border/80 bg-card/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 shadow-lg relative z-20">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold px-2">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>{t("Quick Jump:")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
            {/* 1. Assessment button -> stays on current page / scrolls to top (active) */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-300 font-bold border border-teal-500/40 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span>{t("Assessment")}</span>
            </button>

            {/* 2. Matched Scheme button -> navigates to /matched-scheme */}
            <Link
              href="/matched-scheme"
              className="px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-300 text-muted-foreground border border-border/60 flex items-center gap-1.5 transition-all cursor-pointer group"
            >
              <span>{t("Matched Scheme")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* 3. EMI Calculator button -> navigates to /emi-calculator */}
            <Link
              href="/emi-calculator"
              className="px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-purple-500/20 hover:text-purple-600 dark:hover:text-purple-300 text-muted-foreground border border-border/60 flex items-center gap-1.5 transition-all cursor-pointer group"
            >
              <span>{t("EMI Calculator")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* 4. Partner Network button -> navigates to /partner-network */}
            <Link
              href="/partner-network"
              className="px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-teal-500/20 hover:text-teal-600 dark:hover:text-teal-300 text-muted-foreground border border-border/60 flex items-center gap-1.5 transition-all cursor-pointer group"
            >
              <span>{t("Partner Network")}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-teal-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Heading Area (NO Hero Section) */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs text-indigo-600 dark:text-indigo-300">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>{t("Ministry of Social Justice & Empowerment Alignment")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("Eligibility Assessment")}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("Enter your annual family income and required loan amount to check your scheme qualification.")}
          </p>
        </div>

        {/* Assessment Card & Form (ONLY Requirement Collection) */}
        <Card className="border border-slate-200 dark:border-navy-700 bg-white/90 dark:bg-navy-800/50 backdrop-blur-md shadow-lg dark:shadow-2xl space-y-6 p-6 sm:p-8 relative overflow-hidden text-card-foreground">
          <div className="h-1.5 w-full bg-gradient-to-r from-aurora-500 via-purple-500 to-teal-400 absolute top-0 left-0" />

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 1. Annual Family Income */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="annualIncome" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <span>{t("Annual Family Income")} (₹)</span>
                  <span className="text-destructive">*</span>
                </label>
                <span className="text-[11px] text-teal-600 dark:text-teal-400 font-mono">Limit: ≤ ₹5,00,000</span>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-muted-foreground font-bold text-sm">₹</span>
                <Input
                  id="annualIncome"
                  type="number"
                  required
                  min="1000"
                  max="5000000"
                  placeholder="e.g. 250000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="pl-8 h-11 text-sm font-mono font-medium bg-white dark:bg-navy-950 border-slate-300 dark:border-navy-700"
                />
              </div>

              {/* Quick Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-muted-foreground">{t("Quick Select:")}</span>
                {[150000, 300000, 500000, 750000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAnnualIncome(val.toString())}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-navy-700 bg-slate-100 dark:bg-navy-900/60 text-slate-700 dark:text-slate-300 hover:bg-aurora-600 hover:text-white transition-colors cursor-pointer"
                  >
                    ₹{(val / 100000).toFixed(2)}L {val === 500000 ? "(Max)" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Loan Amount Needed */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="loanAmount" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <span>{t("Required Loan Amount")} (₹)</span>
                  <span className="text-destructive">*</span>
                </label>
                <span className="text-[11px] text-aurora-600 dark:text-aurora-400 font-mono">{t("Up to ₹50,00,000")}</span>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-muted-foreground font-bold text-sm">₹</span>
                <Input
                  id="loanAmount"
                  type="number"
                  required
                  min="5000"
                  max="5000000"
                  placeholder="e.g. 120000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="pl-8 h-11 text-sm font-mono font-medium bg-white dark:bg-navy-950 border-slate-300 dark:border-navy-700"
                />
              </div>

              {/* Quick Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-muted-foreground">{t("Quick Select:")}</span>
                {[
                  { val: 100000, label: "₹1.00L (Micro)" },
                  { val: 500000, label: "₹5.00L" },
                  { val: 1500000, label: "₹15.00L (Term)" },
                  { val: 3000000, label: "₹30.00L" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setLoanAmount(val.toString())}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-navy-700 bg-slate-100 dark:bg-navy-900/60 text-slate-700 dark:text-slate-300 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Purpose of Loan */}
            <div className="space-y-2">
              <label htmlFor="purpose" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                <span>{t("Primary Loan Purpose")}</span>
                <span className="text-destructive">*</span>
              </label>

              <select
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as "Business" | "Education")}
                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-foreground text-sm font-medium focus:border-aurora-500 focus:ring-1 focus:ring-aurora-500 focus:outline-none cursor-pointer transition-all"
              >
                <option value="Business">{t("Business / MSME")}</option>
                <option value="Education">{t("Higher Education")}</option>
              </select>
            </div>

            {/* 4A. Business Project Scale */}
            {purpose === "Business" && (
              <div className="space-y-2 animate-fade-in">
                <label htmlFor="projectType" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <span>{t("Business Scale / Target Activity")}</span>
                </label>

                <select
                  id="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as "Small" | "Medium" | "Large")}
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-foreground text-sm font-medium focus:border-aurora-500 focus:ring-1 focus:ring-aurora-500 focus:outline-none cursor-pointer transition-all"
                >
                  <option value="Small">{t("Micro / Small Unit (≤ ₹1.40L)")}</option>
                  <option value="Medium">{t("Medium Enterprise (₹1.40L - ₹10.0L)")}</option>
                  <option value="Large">{t("Large Commercial Project (₹10.0L - ₹50.0L)")}</option>
                </select>
              </div>
            )}

            {/* 4B. Education Level */}
            {purpose === "Education" && (
              <div className="space-y-2 animate-fade-in">
                <label htmlFor="educationLevel" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <span>{t("Course Level / Degree Type")}</span>
                </label>

                <select
                  id="educationLevel"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value as "Undergraduate" | "Postgraduate" | "Professional")}
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-foreground text-sm font-medium focus:border-aurora-500 focus:ring-1 focus:ring-aurora-500 focus:outline-none cursor-pointer transition-all"
                >
                  <option value="Undergraduate">{t("Undergraduate Degree (B.Tech, B.Sc, B.Com, MBBS)")}</option>
                  <option value="Postgraduate">{t("Postgraduate Degree (M.Tech, MBA, MD, MS)")}</option>
                  <option value="Professional">{t("Professional / Overseas Studies")}</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full font-bold text-sm sm:text-base py-6 shadow-xl shadow-aurora-500/25 gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>{t("Evaluate Eligibility & Find Schemes")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

          </form>
        </Card>

        {/* Disclaimer Card */}
        <div className="p-4 rounded-xl border border-border/70 bg-card/40 text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5 text-foreground font-semibold">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t("Statutory Rules")}</span>
          </div>
          <p>
            {t("Government concessional loan programs mandate an annual family income threshold of ₹5,00,000. Eligible applicants receive up to 90% project cost coverage with only 10% self-contribution margin.")}
          </p>
        </div>

      </div>
    </div>
    </AuthGuard>
  );
}
