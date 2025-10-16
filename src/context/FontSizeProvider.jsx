import React, { createContext, useState, useEffect } from "react";

export const FontSizeContext = createContext();

const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(100);

  const changeFontSize = (amount) => {
    setFontSize((prevSize) => Math.max(50, Math.min(200, prevSize + amount)));
  };

  // Apply font size globally to the entire website
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--global-font-size', `${fontSize}%`);
    root.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, changeFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeProvider;
