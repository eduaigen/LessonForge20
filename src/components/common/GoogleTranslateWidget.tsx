'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslateWidget = () => {
  useEffect(() => {
    // Check if the script has already been added
    if (document.getElementById('google-translate-script')) {
      // If it has, and the widget is not there, re-initialize it.
      // This can happen on subsequent navigations in a SPA.
      if (window.google && window.google.translate) {
         new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
      }
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
      }
    };

    addScript();

  }, []);

  return (
    <div id="google_translate_element_container" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslateWidget;