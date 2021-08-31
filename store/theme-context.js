import { createContext, useState } from 'react';

const ThemeContext = createContext({
  theme: '',
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('');

  const toggleThemeHandler = () => {
    setTheme((theme) => (theme === '' ? '.dark' : ''));
  };

  const contextValue = {
    theme,
    toggleTheme: toggleThemeHandler,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
