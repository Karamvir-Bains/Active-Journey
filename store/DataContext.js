import React, { useContext } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {

  return (
    <DataContext.Provider>
      {children}
    </DataContext.Provider>
  );
}