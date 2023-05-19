import { useContext, createContext, useReducer } from "react";
import { AppProviderProps, Dispatch, State } from "./appContext.types";
import reducer, { initialState } from "./reducers";

const AppContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

export default useAppContext;
