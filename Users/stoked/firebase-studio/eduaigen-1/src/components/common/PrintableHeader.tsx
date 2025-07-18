
'use client';

import React from 'react';

const PrintableHeader = () => {
    return (
        <div className="hidden print:block mb-8">
            <header className="mb-8 grid grid-cols-2 gap-x-8 gap-y-2 border-b-2 border-primary pb-4">
                <div className="pt-4">Name: ____________________________</div>
                <div>Date: _________________</div>
                <div>Class: _____________________________</div>
                <div>Period: _________</div>
            </header>
        </div>
    );
};

export default PrintableHeader;
