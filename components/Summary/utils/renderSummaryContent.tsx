import React from 'react'

interface SummaryData {
  title: string;
  summary: string;
}

export const renderSummaryContent = (summary: SummaryData | null) => {
  if (!summary) return null;
  
  return summary.summary.split('\n\n').map((paragraph, index) => {
    const isNumberedPoint = /^\d+\.\s/.test(paragraph)
    const isHeader = paragraph.includes('**') || paragraph.toLowerCase().includes('key points')
    
    if (isHeader) {
      return (
        <h4 key={index} className="text-xl text-gray-200 font-semibold pt-4">
          {paragraph.replace(/\*\*/g, '')}
        </h4>
      )
    }
    
    if (isNumberedPoint) {
      return (
        <div key={index} className="pl-6 text-gray-300">
          <p className="relative">
            <span className="absolute -left-6 text-blue-400 text-lg">•</span>
            {paragraph.replace(/^\d+\.\s/, '')}
          </p>
        </div>
      )
    }
    
    return (
      <p key={index} className="text-gray-300 leading-relaxed text-lg">
        {paragraph}
      </p>
    )
  });
} 