'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { SignatureData } from '@/lib/email-templates'
import { Plus, X } from 'lucide-react'

interface SignatureFormProps {
  data: SignatureData
  onChange: (data: SignatureData) => void
}

type SocialField = 'linkedinUrl' | 'twitterUrl' | 'facebookUrl' | 'instagramUrl'

const socialPlatforms: Array<{
  field: SocialField
  label: string
  placeholder: string
}> = [
  {
    field: 'linkedinUrl',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/username',
  },
  {
    field: 'twitterUrl',
    label: 'X',
    placeholder: 'https://x.com/username',
  },
  {
    field: 'facebookUrl',
    label: 'Facebook',
    placeholder: 'https://facebook.com/page',
  },
  {
    field: 'instagramUrl',
    label: 'Instagram',
    placeholder: 'https://instagram.com/username',
  },
]

const fieldClass =
  'h-9 min-w-0 rounded-md bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground'

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const [visibleSocialFields, setVisibleSocialFields] = useState<SocialField[]>(
    () => {
      const populatedFields = socialPlatforms
        .filter((platform) => data[platform.field])
        .map((platform) => platform.field)

      return populatedFields.length ? populatedFields : ['linkedinUrl']
    }
  )

  const handleChange = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const addSocialLink = () => {
    const nextPlatform = socialPlatforms.find(
      (platform) => !visibleSocialFields.includes(platform.field)
    )

    if (nextPlatform) {
      setVisibleSocialFields([...visibleSocialFields, nextPlatform.field])
    }
  }

  const removeSocialLink = (field: SocialField) => {
    handleChange(field, '')
    setVisibleSocialFields((fields) =>
      fields.length === 1
        ? fields
        : fields.filter((visibleField) => visibleField !== field)
    )
  }

  const changeSocialPlatform = (oldField: SocialField, newField: SocialField) => {
    if (oldField === newField) return

    onChange({
      ...data,
      [oldField]: '',
      [newField]: data[oldField],
    })
    setVisibleSocialFields((fields) =>
      fields.map((field) => (field === oldField ? newField : field))
    )
  }

  return (
    <form className="grid gap-7 md:grid-cols-2">
      <FormSection title="Identity">
        <Field label="Full name" htmlFor="fullName">
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Jordan Hudgens"
            className={fieldClass}
          />
        </Field>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Job title" htmlFor="jobTitle">
            <Input
              id="jobTitle"
              value={data.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="CTO"
              className={fieldClass}
            />
          </Field>
          <Field label="Company" htmlFor="company">
            <Input
              id="company"
              value={data.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Encapsa AI"
              className={fieldClass}
            />
          </Field>
        </div>

        <Field label="Tagline" htmlFor="tagline" helper="Optional. Shown on selected templates.">
          <Input
            id="tagline"
            value={data.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="Democratizing Enterprise-grade AI"
            className={fieldClass}
          />
        </Field>
      </FormSection>

      <FormSection title="Imagery">
        <Field label="Logo URL" htmlFor="logoUrl" helper="Hosted image URL. Recommended width is 210px.">
          <Input
            id="logoUrl"
            value={data.logoUrl}
            onChange={(e) => handleChange('logoUrl', e.target.value)}
            placeholder="https://cdn.example.com/logo.png"
            className={fieldClass}
          />
        </Field>

        <Field label="Avatar URL" htmlFor="avatarUrl" helper="Square image works best for rounded crops.">
          <Input
            id="avatarUrl"
            value={data.avatarUrl}
            onChange={(e) => handleChange('avatarUrl', e.target.value)}
            placeholder="https://cdn.example.com/avatar.jpg"
            className={fieldClass}
          />
        </Field>
      </FormSection>

      <FormSection title="Contact">
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="jordan@encapsa.ai"
            className={fieldClass}
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(432) 238-6131"
            className={fieldClass}
          />
        </Field>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Website label" htmlFor="websiteName">
            <Input
              id="websiteName"
              value={data.websiteName}
              onChange={(e) => handleChange('websiteName', e.target.value)}
              placeholder="encapsa.ai"
              className={fieldClass}
            />
          </Field>
          <Field label="Website URL" htmlFor="websiteUrl">
            <Input
              id="websiteUrl"
              value={data.websiteUrl}
              onChange={(e) => handleChange('websiteUrl', e.target.value)}
              placeholder="https://encapsa.ai"
              className={fieldClass}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Brand colors">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ColorField
            label="Primary"
            value={data.primaryColor}
            onChange={(value) => handleChange('primaryColor', value)}
          />
          <ColorField
            label="Accent"
            value={data.secondaryColor}
            onChange={(value) => handleChange('secondaryColor', value)}
          />
        </div>
      </FormSection>

      <FormSection title="Social links" className="md:col-span-2">
        <div className="space-y-2">
          {visibleSocialFields.map((field) => {
            const platform = socialPlatforms.find((item) => item.field === field)

            if (!platform) return null

            return (
              <div
                key={field}
                className="grid min-w-0 grid-cols-[minmax(0,1fr)_32px] gap-2 sm:grid-cols-[128px_minmax(0,1fr)_32px]"
              >
                <select
                  value={field}
                  onChange={(event) =>
                    changeSocialPlatform(field, event.target.value as SocialField)
                  }
                  className="h-9 min-w-0 rounded-md border border-input bg-card px-2 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {socialPlatforms.map((item) => (
                    <option
                      key={item.field}
                      value={item.field}
                      disabled={
                        item.field !== field &&
                        visibleSocialFields.includes(item.field)
                      }
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
                <Input
                  value={data[field]}
                  onChange={(event) => handleChange(field, event.target.value)}
                  placeholder={platform.placeholder}
                  className={`${fieldClass} col-span-2 sm:col-span-1`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSocialLink(field)}
                  aria-label={`Remove ${platform.label}`}
                  className="col-start-2 row-start-1 h-9 w-8 sm:col-start-3"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            )
          })}

          {visibleSocialFields.length < socialPlatforms.length && (
            <Button
              type="button"
              variant="outline"
              onClick={addSocialLink}
              className="h-9 w-full border-dashed"
            >
              <Plus className="size-4" />
              Add social link
            </Button>
          )}
        </div>
      </FormSection>
    </form>
  )
}

function FormSection({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`space-y-3 ${className ?? ''}`}>
      <h2 className="text-xs font-semibold uppercase text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  helper,
  children,
}: {
  label: string
  htmlFor: string
  helper?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs text-foreground">
        {label}
      </Label>
      {children}
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const id = `${label.toLowerCase()}Color`

  return (
    <Field label={label} htmlFor={id}>
      <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-card px-2">
        <Input
          id={`${id}Picker`}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="size-5 cursor-pointer rounded border-0 p-0"
          aria-label={`${label} color picker`}
        />
        <Input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#0a0a0a"
          className="h-7 border-0 bg-transparent p-0 font-mono text-xs focus-visible:ring-0"
        />
      </div>
    </Field>
  )
}
