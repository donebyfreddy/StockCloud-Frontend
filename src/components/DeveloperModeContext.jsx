// DeveloperModeContext.jsx
import React, { createContext, useContext, useState } from "react";

const DeveloperModeContext = createContext();

export const useDeveloperMode = () => useContext(DeveloperModeContext);

export const DeveloperModeProvider = ({ children }) => {
  const [developerMode, setDeveloperMode] = useState(false);

  return (
    <DeveloperModeContext.Provider value={{ developerMode, setDeveloperMode }}>
      {children}
    </DeveloperModeContext.Provider>
  );
};
