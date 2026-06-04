'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SignatureData } from '@/lib/email-templates'

interface SignatureFormProps {
  data: SignatureData
  onChange: (data: SignatureData) => void
}

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const handleChange = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Personal Info</h3>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-muted-foreground text-xs">Full Name</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Jordan Hudgens"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="jobTitle" className="text-muted-foreground text-xs">Job Title</Label>
            <Input
              id="jobTitle"
              value={data.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="CTO"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-muted-foreground text-xs">Company</Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Encapsa AI"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tagline" className="text-muted-foreground text-xs">Tagline (optional)</Label>
            <Input
              id="tagline"
              value={data.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="Democratizing Enterprise-grade AI"
              className="bg-secondary border-border"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Contact Details</h3>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-muted-foreground text-xs">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="jordan@encapsa.ai"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-muted-foreground text-xs">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(432) 238-6131"
              className="bg-secondary border-border"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Website</h3>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="websiteUrl" className="text-muted-foreground text-xs">Website URL</Label>
            <Input
              id="websiteUrl"
              value={data.websiteUrl}
              onChange={(e) => handleChange('websiteUrl', e.target.value)}
              placeholder="https://encapsa.ai"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="websiteName" className="text-muted-foreground text-xs">Display Name</Label>
            <Input
              id="websiteName"
              value={data.websiteName}
              onChange={(e) => handleChange('websiteName', e.target.value)}
              placeholder="encapsa.ai"
              className="bg-secondary border-border"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Images</h3>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="logoUrl" className="text-muted-foreground text-xs">Logo URL</Label>
            <Input
              id="logoUrl"
              value={data.logoUrl}
              onChange={(e) => handleChange('logoUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="avatarUrl" className="text-muted-foreground text-xs">Avatar URL</Label>
            <Input
              id="avatarUrl"
              value={data.avatarUrl}
              onChange={(e) => handleChange('avatarUrl', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="bg-secondary border-border"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="primaryColor" className="text-muted-foreground text-xs">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={data.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-12 h-9 p-1 bg-secondary border-border cursor-pointer"
              />
              <Input
                value={data.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                placeholder="#f59e0b"
                className="flex-1 bg-secondary border-border font-mono text-xs"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="secondaryColor" className="text-muted-foreground text-xs">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={data.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-12 h-9 p-1 bg-secondary border-border cursor-pointer"
              />
              <Input
                value={data.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                placeholder="#888888"
                className="flex-1 bg-secondary border-border font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Social Links</h3>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="linkedinUrl" className="text-muted-foreground text-xs">LinkedIn</Label>
            <Input
              id="linkedinUrl"
              value={data.linkedinUrl}
              onChange={(e) => handleChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="twitterUrl" className="text-muted-foreground text-xs">X (Twitter)</Label>
            <Input
              id="twitterUrl"
              value={data.twitterUrl}
              onChange={(e) => handleChange('twitterUrl', e.target.value)}
              placeholder="https://x.com/username"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="facebookUrl" className="text-muted-foreground text-xs">Facebook</Label>
            <Input
              id="facebookUrl"
              value={data.facebookUrl}
              onChange={(e) => handleChange('facebookUrl', e.target.value)}
              placeholder="https://facebook.com/page"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="instagramUrl" className="text-muted-foreground text-xs">Instagram</Label>
            <Input
              id="instagramUrl"
              value={data.instagramUrl}
              onChange={(e) => handleChange('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/username"
              className="bg-secondary border-border"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
