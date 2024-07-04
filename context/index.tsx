import { createContext, useContext, useState } from "react";

const DataContext = createContext({});

export function DataWrapper({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={[data, setData]}>
      {children}
    </DataContext.Provider>
  );
}

//custom hook
export function useDataContext() {
  useContext(DataContext);
}
