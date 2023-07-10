import { createContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider >{children}</AppContext.Provider>;
};

export default AppProvider;
