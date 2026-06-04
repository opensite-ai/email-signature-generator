'use client'

import { useMemo } from 'react'
import { generateTemplate, minifyHtml, type SignatureData, type TemplateId } from '@/lib/email-templates'

interface SignaturePreviewProps {
  templateId: TemplateId
  data: SignatureData
}

export function SignaturePreview({ templateId, data }: SignaturePreviewProps) {
  const html = useMemo(() => {
    return generateTemplate(templateId, data)
  }, [templateId, data])

  return (
    <div className="w-full overflow-auto">
      <div 
        className="bg-white p-6 rounded-lg min-w-fit"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

interface SignatureCodeProps {
  templateId: TemplateId
  data: SignatureData
}

export function useSignatureCode({ templateId, data }: SignatureCodeProps) {
  const html = useMemo(() => {
    return generateTemplate(templateId, data)
  }, [templateId, data])

  const minified = useMemo(() => {
    return minifyHtml(html)
  }, [html])

  const charCount = minified.length

  return { html, minified, charCount }
}
