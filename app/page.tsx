'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SignatureForm } from '@/components/signature-form'
import { TemplateSelector } from '@/components/template-selector'
import { SignaturePreview, useSignatureCode } from '@/components/signature-preview'
import type { SignatureData, TemplateId } from '@/lib/email-templates'
import { Copy, Check, Mail, Palette, Settings, Eye, Code, AlertCircle, CheckCircle2 } from 'lucide-react'

const defaultData: SignatureData = {
  fullName: 'Jordan Hudgens',
  jobTitle: 'CTO',
  company: 'Encapsa AI',
  tagline: 'Democratizing Enterprise-grade AI',
  email: 'jordan@encapsa.ai',
  phone: '(432) 238-6131',
  websiteUrl: 'https://encapsa.ai',
  websiteName: 'encapsa.ai',
  logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop&q=80',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80',
  primaryColor: '#f59e0b',
  secondaryColor: '#888888',
  linkedinUrl: 'https://linkedin.com/in/jordanhudgens',
  twitterUrl: 'https://x.com/jordanhudgens',
  facebookUrl: 'https://facebook.com/jordanhudgens',
  instagramUrl: 'https://instagram.com/jordanhudgens',
}

// Gmail has a ~10,000 character limit for signatures
const GMAIL_CHAR_LIMIT = 10000

export default function Page() {
  const [data, setData] = useState<SignatureData>(defaultData)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')

  const { minified, charCount } = useSignatureCode({ templateId: selectedTemplate, data })

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(minified)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = minified
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [minified])

  const isWithinLimit = charCount <= GMAIL_CHAR_LIMIT
  const charPercentage = Math.min((charCount / GMAIL_CHAR_LIMIT) * 100, 100)

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Email Signature Generator</h1>
          </div>
          <p className="text-muted-foreground">
            Create professional HTML email signatures that work with Gmail, Outlook, and other email clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-foreground">Choose Template</h2>
              </div>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelect={setSelectedTemplate}
              />
            </Card>

            <Card className="p-5 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-foreground">Customize</h2>
              </div>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                <SignatureForm data={data} onChange={setData} />
              </div>
            </Card>
          </div>

          {/* Right Column - Preview & Code */}
          <div className="space-y-6">
            <Card className="p-5 bg-card border-border">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-secondary">
                    <TabsTrigger value="preview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Code className="w-4 h-4 mr-2" />
                      HTML Code
                    </TabsTrigger>
                  </TabsList>

                  <Button
                    onClick={handleCopy}
                    className="gap-2"
                    variant={copied ? 'outline' : 'default'}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy HTML
                      </>
                    )}
                  </Button>
                </div>

                <TabsContent value="preview" className="mt-0">
                  <div className="rounded-lg border border-border bg-muted/30 p-4 overflow-auto">
                    <SignaturePreview templateId={selectedTemplate} data={data} />
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-0">
                  <div className="rounded-lg border border-border bg-secondary/50 overflow-hidden">
                    <pre className="p-4 text-xs text-muted-foreground overflow-auto max-h-[400px] whitespace-pre-wrap break-all font-mono">
                      {minified}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Character Count Card */}
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {isWithinLimit ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                  <span className="font-medium text-foreground">
                    {isWithinLimit ? 'Gmail Compatible' : 'Exceeds Gmail Limit'}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {charCount.toLocaleString()} / {GMAIL_CHAR_LIMIT.toLocaleString()} characters
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isWithinLimit ? 'bg-primary' : 'bg-destructive'
                  }`}
                  style={{ width: `${charPercentage}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {isWithinLimit
                  ? 'Your signature is within the recommended character limit for Gmail and most email clients.'
                  : 'Your signature exceeds the Gmail limit. Consider removing some elements or using a more compact template.'}
              </p>
            </Card>

            {/* Instructions Card */}
            <Card className="p-5 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-3">How to Use</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">1</span>
                  <span>Fill in your details and choose brand colors</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">2</span>
                  <span>Select a template that matches your style</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">3</span>
                  <span>Click &quot;Copy HTML&quot; to copy the signature</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">4</span>
                  <span>Paste into your email client&apos;s signature settings</span>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
