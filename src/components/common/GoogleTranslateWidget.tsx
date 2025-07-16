
'use client';

import { useEffect, useState } from 'react';

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

const GoogleTranslateWidget = () => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        const existingScript = document.getElementById('google-translate-script');

        if (existingScript) {
            setIsScriptLoaded(true);
            return;
        }

        const addScript = () => {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
            script.async = true;
            document.body.appendChild(script);
        };
        
        window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
                setIsScriptLoaded(true);
            }
        };

        addScript();

        return () => {
            // Clean up the script and the global function when the component unmounts
            const script = document.getElementById('google-translate-script');
            if (script) {
                document.body.removeChild(script);
            }
            delete window.googleTranslateElementInit;
        };

    }, []);

    return (
        <div id="google_translate_element" className="absolute top-4 right-4 z-[100]"></div>
    );
};

export default GoogleTranslateWidget;
