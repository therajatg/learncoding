import { useContext, createContext, useReducer } from "react";
import { dataReducer } from "../reducers/dataReducer";

const DataContext = createContext();

const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, {
    historyData: [],
    watchLaterData: [],
    likedData: [],
  });

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
