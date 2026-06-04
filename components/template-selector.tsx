'use client'

import { cn } from '@/lib/utils'
import { templates, type TemplateId } from '@/lib/email-templates'

interface TemplateSelectorProps {
  selectedTemplate: TemplateId
  onSelect: (templateId: TemplateId) => void
}

const templateShortLabels: Record<TemplateId, string> = {
  classic: 'Logo header',
  modern: 'Side rail',
  minimal: 'Centered stack',
  bold: 'Hero band',
  elegant: 'Editorial',
  compact: 'Two column',
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {templates.map((template) => {
        const isSelected = selectedTemplate === template.id

        return (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            aria-pressed={isSelected}
            className={cn(
              'min-h-20 rounded-lg border p-3 text-left transition-colors',
              isSelected
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : 'border-border bg-card text-foreground hover:border-ring hover:bg-muted'
            )}
          >
            <span className="block text-sm font-semibold leading-tight">
              {template.name}
            </span>
            <span
              className={cn(
                'mt-1 block text-xs leading-snug',
                isSelected
                  ? 'text-primary-foreground/75'
                  : 'text-muted-foreground'
              )}
            >
              {templateShortLabels[template.id]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
