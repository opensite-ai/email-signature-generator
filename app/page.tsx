"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignatureForm } from "@/components/signature-form";
import { TemplateSelector } from "@/components/template-selector";
import {
  SignaturePreview,
  useSignatureCode,
} from "@/components/signature-preview";
import type { SignatureData, TemplateId } from "@/lib/email-templates";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Code,
  Copy,
  Mail,
} from "lucide-react";

const defaultData: SignatureData = {
  fullName: "Howard Roark",
  jobTitle: "Chief Architect",
  company: "Encapsa AI",
  tagline: "Democratizing Enterprise-grade AI",
  email: "howard@roark.ai",
  phone: "(555) 555-5555",
  websiteUrl: "https://roark.ai",
  websiteName: "roark.ai",
  logoUrl:
    "https://cdn.ing/assets/i/r/310039/yrgur9wrjxnxi94v6vugw9jdm9o8/logo-primary.png",
  avatarUrl:
    "https://cdn.ing/assets/i/r/310037/s24yovwiz6h0ycyllztb7nvwlsv3/thumb.jpg",
  primaryColor: "#0a0a0a",
  secondaryColor: "#f59e0b",
  linkedinUrl: "https://linkedin.com/in/username",
  facebookUrl: "https://facebook.com/username",
  instagramUrl: "https://instagram.com/username",
  twitterUrl: "https://x.com/username",
};

// Gmail has a ~10,000 character limit for signatures
const GMAIL_CHAR_LIMIT = 10000;

function getPlainTextSignature(data: SignatureData) {
  return [
    data.fullName,
    [data.jobTitle, data.company].filter(Boolean).join(" · "),
    data.tagline,
    data.email,
    data.phone,
    data.websiteName || data.websiteUrl,
  ]
    .filter(Boolean)
    .join("\n");
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function Page() {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("classic");
  const [copiedSignature, setCopiedSignature] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);

  const { html, minified, charCount } = useSignatureCode({
    templateId: selectedTemplate,
    data,
  });

  const byteCount = useMemo(() => new Blob([minified]).size, [minified]);

  const handleCopySignature = useCallback(async () => {
    try {
      const plainText = getPlainTextSignature(data);

      if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plainText], { type: "text/plain" }),
          }),
        ]);
      } else {
        await copyText(minified);
      }

      setCopiedSignature(true);
      setTimeout(() => setCopiedSignature(false), 2000);
    } catch {
      await copyText(minified);
      setCopiedSignature(true);
      setTimeout(() => setCopiedSignature(false), 2000);
    }
  }, [data, html, minified]);

  const handleCopySource = useCallback(async () => {
    await copyText(minified);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  }, [minified]);

  const isWithinLimit = charCount <= GMAIL_CHAR_LIMIT;
  const charPercentage = Math.min((charCount / GMAIL_CHAR_LIMIT) * 100, 100);
  const limitLabel = isWithinLimit
    ? "Well within email client limits."
    : "Reduce signature size before installing.";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen max-w-[1400px] px-4 py-6 sm:px-8">
        <header className="mb-6 border-b border-border pb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Mail className="size-4" />
            </div>
            <h1 className="text-xl font-semibold">Signature Studio</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick a template, brand it, and copy a clean, email-client-safe HTML
            signature to your clipboard.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(300px,390px)_minmax(0,1fr)] lg:items-start">
          <aside className="order-2 space-y-4 lg:order-1">
            <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  {isWithinLimit ? (
                    <CheckCircle2 className="size-4 shrink-0 text-[var(--success)]" />
                  ) : (
                    <AlertCircle className="size-4 shrink-0 text-destructive" />
                  )}
                  <span className="text-sm font-semibold">
                    {charCount.toLocaleString()} chars
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(charPercentage)}% of max
                </span>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                / {GMAIL_CHAR_LIMIT.toLocaleString()} limit ·{" "}
                {byteCount.toLocaleString()} bytes
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full transition-all duration-300 ${
                    isWithinLimit ? "bg-[var(--success)]" : "bg-destructive"
                  }`}
                  style={{ width: `${charPercentage}%` }}
                />
              </div>
              <p
                className={`mt-3 text-xs ${
                  isWithinLimit ? "text-[var(--success)]" : "text-destructive"
                }`}
              >
                {limitLabel}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  onClick={handleCopySource}
                  className="h-10 w-full gap-2"
                >
                  {copiedSource ? (
                    <>
                      <Check className="size-4" />
                      Copied HTML code
                    </>
                  ) : (
                    <>
                      <Code className="size-4" />
                      Copy HTML code
                    </>
                  )}
                </Button>
              </div>
            </section>

            <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h2 className="text-sm font-semibold">How to install</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Gmail / Workspace: Settings -&gt; General -&gt; Signature -&gt;
                paste. Apple Mail and Outlook: paste into the signature editor.
                Images must be hosted at public URLs.
              </p>
            </section>
          </aside>

          <div className="order-1 space-y-6 lg:order-2">
            <section
              aria-label="Signature preview"
              className="rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--window-red)]" />
                <span className="size-2 rounded-full bg-[var(--window-yellow)]" />
                <span className="size-2 rounded-full bg-[var(--window-green)]" />
                <span className="ml-2 text-xs font-medium text-muted-foreground">
                  Live preview
                </span>
              </div>
              <SignaturePreview templateId={selectedTemplate} data={data} />
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase text-muted-foreground">
                Template
              </h2>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelect={setSelectedTemplate}
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Select the layout first, then tune the signature content below.
              </p>
            </section>

            <SignatureForm data={data} onChange={setData} />
          </div>
        </div>
      </div>
    </main>
  );
}
