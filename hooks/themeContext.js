import React, { createContext, useState } from "react";

const ThemeContext = createContext(false);

const ThemeProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const toggleTheme = () => {
    setToggle(!toggle);
    console.log("theme hook", toggle);
  };

  return (
    <ThemeContext.Provider value={{ toggle, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
