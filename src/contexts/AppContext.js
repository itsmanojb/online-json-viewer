import { useReducer, createContext } from "react";
import Reducer, { initialState } from "../reducers/AppReducer";

export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const showModal = (type) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: type,
    });
  };

  const hideModal = () => {
    dispatch({
      type: "HIDE_MODAL",
    });
  };

  const data = {
    ...state,
    showModal,
    hideModal,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
