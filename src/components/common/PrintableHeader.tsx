
'use client';

import React from 'react';
import type { GeneratedContent } from '../generators/NVBiologyGenerator';

interface PrintableHeaderProps {
  contentItem: GeneratedContent;
}

const PrintableHeader = ({ contentItem }: PrintableHeaderProps) => {
    // This component is now a placeholder. The header is part of the worksheet content itself.
    // We keep the component in case we want to add universal print headers back in the future.
    return null;
};

export default PrintableHeader;
