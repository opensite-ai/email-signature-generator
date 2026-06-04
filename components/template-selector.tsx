'use client'

import { cn } from '@/lib/utils'
import { templates, type TemplateId } from '@/lib/email-templates'
import { Check } from 'lucide-react'

interface TemplateSelectorProps {
  selectedTemplate: TemplateId
  onSelect: (templateId: TemplateId) => void
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={cn(
            'relative p-4 rounded-lg border-2 transition-all text-left',
            'hover:border-primary/50 hover:bg-secondary/50',
            selectedTemplate === template.id
              ? 'border-primary bg-primary/10'
              : 'border-border bg-card'
          )}
        >
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-primary-foreground" />
            </div>
          )}
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-foreground">{template.name}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{template.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
