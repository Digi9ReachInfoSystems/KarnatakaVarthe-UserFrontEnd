import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Get language preferences from localStorage
  const getStoredLanguagePreferences = () => {
    const stored = localStorage.getItem("languagePreferences");
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      global: "Kannada",
      magazine: "Kannada",      // Vartha Janapada
      magazine2: "English"       // March of Karnataka
    };
  };

  const [languagePreferences, setLanguagePreferences] = useState(getStoredLanguagePreferences);
  const [currentMagazineType, setCurrentMagazineType] = useState(null);

  // Set default preferences on page refresh
  useEffect(() => {
    setLanguagePreferences({
      global: "Kannada",
      magazine: "Kannada",      // Vartha Janapada
      magazine2: "English"       // March of Karnataka
    });
  }, []);

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem("languagePreferences", JSON.stringify(languagePreferences));
  }, [languagePreferences]);

  // Get language for specific magazine type
  const getLanguageByMagazineType = (magazineType) => {
    if (magazineType === "magazine") {
      return languagePreferences.magazine || "Kannada";
    } else if (magazineType === "magazine2") {
      return languagePreferences.magazine2 || "English";
    }
    return languagePreferences.global || "Kannada";
  };

  // Get current active language
  const language = currentMagazineType 
    ? getLanguageByMagazineType(currentMagazineType)
    : languagePreferences.global;

  // Set language for specific magazine type or global
  const setLanguage = (newLanguage, magazineType = null) => {
    setLanguagePreferences(prev => {
      if (magazineType === "magazine") {
        return { ...prev, magazine: newLanguage };
      } else if (magazineType === "magazine2") {
        return { ...prev, magazine2: newLanguage };
      } else {
        return { ...prev, global: newLanguage };
      }
    });
  };

  // Set current page magazine type (call this when entering a page)
  const setPageLanguage = (magazineType) => {
    setCurrentMagazineType(magazineType);
  };

  // Reset to global language (call when leaving magazine pages)
  const resetToGlobalLanguage = () => {
    setCurrentMagazineType(null);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        setPageLanguage,
        resetToGlobalLanguage,
        getLanguageByMagazineType,
        currentMagazineType
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};