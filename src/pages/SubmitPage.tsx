import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const categories = ["DeFi", "GameFi", "Infra", "L1", "L2", "Other"];
const steps = ["Project Info", "Token Details", "Review"];

interface FormData {
  projectName: string;
  ticker: string;
  category: string;
  description: string;
  website: string;
  totalSupply: string;
  tokenPrice: string;
  tgeUnlock: string;
  lockPeriod: string;
  releaseDuration: string;
  releaseType: "equal" | "custom";
  customSchedule: { month: string; percent: string }[];
  raiseTarget: string;
  minInvestment: string;
  maxInvestment: string;
  acceptedCurrencies: string[];
}

const initial: FormData = {
  projectName: "",
  ticker: "",
  category: "",
  description: "",
  website: "",
  totalSupply: "",
  tokenPrice: "",
  tgeUnlock: "",
  lockPeriod: "",
  releaseDuration: "",
  releaseType: "equal",
  customSchedule: [{ month: "", percent: "" }],
  raiseTarget: "",
  minInvestment: "",
  maxInvestment: "",
  acceptedCurrencies: [],
};

export default function SubmitPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const fdv =
    form.totalSupply && form.tokenPrice
      ? (
          parseFloat(form.totalSupply) * parseFloat(form.tokenPrice)
        ).toLocaleString()
      : "—";

  const validateStep0 = () => {
    if (
      !form.projectName ||
      !form.ticker ||
      !form.category ||
      !form.description
    ) {
      toast.error("Please fill all required fields");
      return false;
    }
    return true;
  };

  const validateStep1 = () => {
    if (
      !form.totalSupply ||
      !form.tokenPrice ||
      !form.raiseTarget ||
      !form.minInvestment ||
      !form.maxInvestment
    ) {
      toast.error("Please fill all required fields");
      return false;
    }
    if (form.acceptedCurrencies.length === 0) {
      toast.error("Select at least one currency");
      return false;
    }
    return true;
  };

  const next = () => {
    if (step === 0 && !validateStep0()) return;
    if (step === 1 && !validateStep1()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleSubmit = () => {
    toast.success(
      "Your listing has been submitted. SAFTY's team will review within 2-3 business days.",
    );
    setForm(initial);
    setStep(0);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm";
  const labelClass = "text-sm font-medium text-foreground mb-1.5 block";

  const toggleCurrency = (c: string) => {
    set(
      "acceptedCurrencies",
      form.acceptedCurrencies.includes(c)
        ? form.acceptedCurrencies.filter((x) => x !== c)
        : [...form.acceptedCurrencies, c],
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-8">
        <h1 className="font-display text-3xl font-bold mb-8">
          Submit a Listing
        </h1>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold flex-shrink-0 ${
                  i < step
                    ? "bg-success text-primary-foreground"
                    : i === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px ${i < step ? "bg-success" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 0 — Project Info */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Project Name *</label>
              <input
                className={inputClass}
                value={form.projectName}
                onChange={(e) => set("projectName", e.target.value)}
                placeholder="e.g. Anime Chain"
              />
            </div>
            <div>
              <label className={labelClass}>Token Ticker *</label>
              <input
                className={inputClass}
                value={form.ticker}
                onChange={(e) => set("ticker", e.target.value)}
                placeholder="e.g. $ANIME"
              />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>
                Short Description *{" "}
                <span className="text-muted-foreground font-normal">
                  ({form.description.length}/280)
                </span>
              </label>
              <textarea
                className={inputClass + " resize-none h-24"}
                value={form.description}
                maxLength={280}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe your project in a few sentences..."
              />
            </div>
            <div>
              <label className={labelClass}>Website URL</label>
              <input
                className={inputClass}
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://"
              />
            </div>
            <div>
              <label className={labelClass}>Logo Upload</label>
              <div className="rounded-lg border border-dashed border-border bg-muted p-8 text-center text-sm text-muted-foreground">
                Drag & drop or click to upload (UI only)
              </div>
            </div>
          </div>
        )}

        {/* Step 1 — Token Details */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">
              Token Economics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Total Token Supply *</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.totalSupply}
                  onChange={(e) => set("totalSupply", e.target.value)}
                  placeholder="e.g. 1000000000"
                />
              </div>
              <div>
                <label className={labelClass}>Token Price (USD) *</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.tokenPrice}
                  onChange={(e) => set("tokenPrice", e.target.value)}
                  placeholder="e.g. 0.012"
                  step="any"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>FDV (auto-calculated)</label>
              <div className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground">
                ${fdv}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>% Released at Launch</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.tgeUnlock}
                  onChange={(e) => set("tgeUnlock", e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>
              <div>
                <label className={labelClass}>Lock Period (months)</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.lockPeriod}
                  onChange={(e) => set("lockPeriod", e.target.value)}
                  placeholder="e.g. 6"
                />
              </div>
              <div>
                <label className={labelClass}>Release Duration (months)</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.releaseDuration}
                  onChange={(e) => set("releaseDuration", e.target.value)}
                  placeholder="e.g. 24"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Release Type</label>
              <div className="flex gap-4">
                {(["equal", "custom"] as const).map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${form.releaseType === t ? "border-primary" : "border-border"}`}
                    >
                      {form.releaseType === t && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">
                      {t === "equal"
                        ? "Equal monthly releases"
                        : "Custom schedule"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {form.releaseType === "custom" && (
              <div className="space-y-2">
                {form.customSchedule.map((row, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      className={inputClass}
                      placeholder="Month"
                      value={row.month}
                      onChange={(e) => {
                        const s = [...form.customSchedule];
                        s[i].month = e.target.value;
                        set("customSchedule", s);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="% Released"
                      value={row.percent}
                      onChange={(e) => {
                        const s = [...form.customSchedule];
                        s[i].percent = e.target.value;
                        set("customSchedule", s);
                      }}
                    />
                    <button
                      onClick={() =>
                        set(
                          "customSchedule",
                          form.customSchedule.filter((_, j) => j !== i),
                        )
                      }
                      className="text-destructive p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    set("customSchedule", [
                      ...form.customSchedule,
                      { month: "", percent: "" },
                    ])
                  }
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus className="h-3 w-3" /> Add Row
                </button>
              </div>
            )}

            <h3 className="font-display font-semibold text-lg pt-4">
              Raise Details
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Target Raise (USD) *</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.raiseTarget}
                  onChange={(e) => set("raiseTarget", e.target.value)}
                  placeholder="e.g. 5000000"
                />
              </div>
              <div>
                <label className={labelClass}>Min Investment *</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.minInvestment}
                  onChange={(e) => set("minInvestment", e.target.value)}
                  placeholder="e.g. 500"
                />
              </div>
              <div>
                <label className={labelClass}>Max Investment *</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.maxInvestment}
                  onChange={(e) => set("maxInvestment", e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Accepted Currencies *</label>
              <div className="flex gap-3">
                {["USDC", "ETH"].map((c) => (
                  <label
                    key={c}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className={`h-5 w-5 rounded border-2 flex items-center justify-center ${form.acceptedCurrencies.includes(c) ? "bg-primary border-primary" : "border-border"}`}
                    >
                      {form.acceptedCurrencies.includes(c) && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">{c}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Review */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              {[
                ["Project Name", form.projectName],
                ["Ticker", form.ticker],
                ["Category", form.category],
                ["Description", form.description],
                ["Website", form.website || "—"],
                [
                  "Total Supply",
                  form.totalSupply
                    ? parseFloat(form.totalSupply).toLocaleString()
                    : "—",
                ],
                ["Token Price", form.tokenPrice ? `$${form.tokenPrice}` : "—"],
                ["FDV", `$${fdv}`],
                ["TGE Unlock", form.tgeUnlock ? `${form.tgeUnlock}%` : "—"],
                [
                  "Lock Period",
                  form.lockPeriod ? `${form.lockPeriod} months` : "—",
                ],
                [
                  "Release Duration",
                  form.releaseDuration ? `${form.releaseDuration} months` : "—",
                ],
                [
                  "Release Type",
                  form.releaseType === "equal" ? "Equal monthly" : "Custom",
                ],
                [
                  "Target Raise",
                  form.raiseTarget
                    ? `$${parseFloat(form.raiseTarget).toLocaleString()}`
                    : "—",
                ],
                [
                  "Min Investment",
                  form.minInvestment
                    ? `$${parseFloat(form.minInvestment).toLocaleString()}`
                    : "—",
                ],
                [
                  "Max Investment",
                  form.maxInvestment
                    ? `$${parseFloat(form.maxInvestment).toLocaleString()}`
                    : "—",
                ],
                [
                  "Accepted Currencies",
                  form.acceptedCurrencies.join(", ") || "—",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium text-foreground text-right max-w-xs">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <Button
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}
          {step < 2 ? (
            <Button
              onClick={next}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit for Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
