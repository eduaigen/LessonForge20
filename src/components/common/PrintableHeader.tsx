
'use client';

import React from 'react';
import type { GeneratedContent } from '../generators/NVBiologyGenerator';

interface PrintableHeaderProps {
  contentItem: GeneratedContent;
}

const PrintableHeader = ({ contentItem }: PrintableHeaderProps) => {
  const isTestOrWorksheet = contentItem.type === 'Test' || contentItem.type.toLowerCase().includes('worksheet') || contentItem.type.toLowerCase().includes('sheet');

  if (!isTestOrWorksheet) {
    return (
       <div style={{ paddingBottom: '20px', borderBottom: '1px solid #ccc', marginBottom: '20px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'sans-serif', color: '#333' }}>{contentItem.title} - Created by EduAiGen</h2>
        </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif', border: '1px solid #ddd' }}>
        <tbody>
          <tr>
            <td style={{ width: '60%', padding: '8px', border: '1px solid #ddd' }}><strong>Name:</strong> ____________________________</td>
            <td style={{ width: '40%', padding: '8px', border: '1px solid #ddd' }}><strong>Date:</strong> _________________</td>
          </tr>
          <tr>
            <td style={{ width: '60%', padding: '8px', border: '1px solid #ddd' }}><strong>Class:</strong> _____________________________</td>
            <td style={{ width: '40%', padding: '8px', border: '1px solid #ddd' }}><strong>Period:</strong> _________</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintableHeader;
