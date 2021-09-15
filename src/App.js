import React from "react";
import { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { Routing } from "./components/Routes";
import { ThemeContext } from "./utils/ThemeContext";
import { store } from "./store";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const changeTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <Routing />
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
