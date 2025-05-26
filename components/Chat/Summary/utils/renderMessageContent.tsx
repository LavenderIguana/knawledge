import React from 'react';

export const renderMessageContent = (content: string) => {

  if (content.startsWith('**Title:') || content.startsWith('**TITLE:') || content.includes('\n**Title:')) {
    const parts = content.split('\n');
    const titlePart = parts.find(p => p.startsWith('**Title:') || p.startsWith('**TITLE:'));
    const otherParts = parts.filter(p => !(p.startsWith('**Title:') || p.startsWith('**TITLE:')));
    
    return (
      <div className="space-y-3 text-white">
        {titlePart && (
          <h2 className="text-lg font-bold text-white">
            {titlePart.replace(/^\*\*Title:|\*\*TITLE:|\*\*$/gi, '').trim()}
          </h2>
        )}
        
        {renderMessageContent(otherParts.join('\n'))}
      </div>
    );
  }
  
  if (content.includes('\n• ') || content.startsWith('• ')) {
    const paragraphs = content.split('\n');
    return (
      <div className="space-y-2 text-white">
        {paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith('• ')) {
            return (
              <div key={index} className="pl-6 relative text-white">
                <span className="absolute left-0 top-0 text-white">•</span>
                {paragraph.substring(2)}
              </div>
            );
          }
          if (paragraph.trim()) {
            return <p key={index} className="text-white">{paragraph}</p>;
          }
          return null;
        }).filter(Boolean)}
      </div>
    );
  }
  
  if (content.includes('\n#') || content.startsWith('#')) {
    const paragraphs = content.split('\n');
    return (
      <div className="space-y-3 text-white">
        {paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith('# ')) {
            return <h2 key={index} className="text-lg font-bold mt-2 text-white">{paragraph.replace('# ', '')}</h2>;
          }
          if (paragraph.startsWith('## ')) {
            return <h3 key={index} className="text-lg font-semibold mt-2 text-white">{paragraph.replace('## ', '')}</h3>;
          }
          
          if (paragraph.startsWith('- ')) {
            return (
              <div key={index} className="pl-6 relative text-white">
                <span className="absolute left-0 top-0 text-white">•</span>
                {paragraph.substring(2)}
              </div>
            );
          }
          
          if (paragraph.trim()) {
            return <p key={index} className="text-white">{paragraph}</p>;
          }
          
          return null;
        }).filter(Boolean)}
      </div>
    );
  }
  
  if (content.includes('- **')) {
    return (
      <div className="space-y-3 text-white">
        {content.split('- **').map((part, index) => {
          if (index === 0) {
            return part.trim() ? <p key="intro" className="text-white">{part}</p> : null;
          }
          
          const [title, ...restContent] = part.split('**:');
          const bodyContent = restContent.join('**:').trim();
          
          return (
            <div key={index} className="pl-6 relative text-white">
              <span className="absolute left-0 top-0 text-white">•</span>
              <span className="font-semibold text-white">{title}:</span> {bodyContent}
            </div>
          );
        }).filter(Boolean)}
      </div>
    );
  }
  
  if (content.includes('**') && !content.includes('```')) {
    const parts = [];
    let currentText = '';
    let inBold = false;
    
    for (let i = 0; i < content.length; i++) {
      if (content.substring(i, i + 2) === '**') {
        if (inBold) {
          parts.push(<span key={parts.length} className="font-bold text-white">{currentText}</span>);
        } else {
          if (currentText) parts.push(currentText);
        }
        currentText = '';
        inBold = !inBold;
        i++; 
      } else {
        currentText += content[i];
      }
    }
    
    if (currentText) {
      parts.push(currentText);
    }
    
    return <p className="text-white">{parts}</p>;
  }
  
  if (content.includes('\n- ') || content.includes('\n* ')) {
    const paragraphs = content.split('\n');
    return (
      <div className="space-y-2 text-white">
        {paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
            return (
              <div key={index} className="pl-6 relative text-white">
                <span className="absolute left-0 top-0 text-white">•</span>
                {paragraph.substring(2)}
              </div>
            );
          }
          if (paragraph.trim()) {
            return <p key={index} className="text-white">{paragraph}</p>;
          }
          return null;
        }).filter(Boolean)}
      </div>
    );
  }
  
  if (/\d+\.\s/.test(content)) {
    const paragraphs = content.split('\n');
    return (
      <div className="space-y-2 text-white">
        {paragraphs.map((paragraph, index) => {
          if (/^\d+\.\s/.test(paragraph)) {
            const number = paragraph.match(/^\d+/)?.[0] || '';
            return (
              <div key={index} className="pl-6 relative text-white">
                <span className="absolute left-0 top-0 text-white">{number}.</span>
                {paragraph.replace(/^\d+\.\s/, '')}
              </div>
            );
          }
          if (paragraph.trim()) {
            return <p key={index} className="text-white">{paragraph}</p>;
          }
          return null;
        }).filter(Boolean)}
      </div>
    );
  }
  
  if (content.includes('```')) {
    const parts = content.split('```');
    return (
      <div className="space-y-3 text-white">
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            if (!part.trim()) return null;
            return <p key={index} className="text-white">{part}</p>;
          } else {
            const lines = part.split('\n');
            const language = lines[0].trim();
            const code = lines.slice(language ? 1 : 0).join('\n');
            
            return (
              <div key={index} className="bg-gray-800 border border-white p-3 rounded overflow-x-auto">
                <pre className="text-sm text-white">{code}</pre>
              </div>
            );
          }
        }).filter(Boolean)}
      </div>
    );
  }
  
  if (content.includes('`') && !content.includes('```')) {
    const parts = content.split('`');
    return (
      <p className="text-white">
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            return part;
          } else {
            return (
              <code key={index} className="bg-gray-800 border border-white px-1 py-0.5 rounded text-sm text-white">
                {part}
              </code>
            );
          }
        })}
      </p>
    );
  }
  
  if (content.includes('|') && content.includes('\n|')) {
    const lines = content.split('\n').filter(line => line.includes('|'));
    const hasHeader = lines.length > 1 && lines[1].replace(/[^|\-]/g, '') === lines[1];
    
    return (
      <div className="overflow-x-auto text-white">
        <table className="min-w-full border-collapse">
          {hasHeader && (
            <thead>
              <tr>
                {lines[0].split('|').filter(Boolean).map((cell, i) => (
                  <th key={i} className="border border-white px-4 py-2 text-left text-white">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {lines.slice(hasHeader ? 2 : 0).map((line, rowIndex) => (
              <tr key={rowIndex}>
                {line.split('|').filter(Boolean).map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-white px-4 py-2 text-white">
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  if (content.includes('\n\n')) {
    return (
      <div className="space-y-3 text-white">
        {content.split('\n\n').map((paragraph, index) => (
          paragraph.trim() ? <p key={index} className="text-white">{paragraph}</p> : null
        )).filter(Boolean)}
      </div>
    );
  }
  
  return <p className="text-white">{content}</p>;
}; 