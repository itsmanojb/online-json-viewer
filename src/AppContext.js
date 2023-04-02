import React, { useContext, useReducer } from "react";
import AppReducer, { initialState } from "./AppReducer";

const AppContext = React.createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const showRemoteURLModal = () => {
    dispatch({
      type: "SHOW_URL_FORM",
    });
  };

  const hideModal = () => {
    dispatch({
      type: "HIDE_URL_FORM",
    });
  };

  const setInputJson = (val) => {
    dispatch({
      type: "SET_JSON_INPUT",
      payload: val,
    });
  };

  const setOutputJson = (val) => {
    dispatch({
      type: "SET_JSON_OUTPUT",
      payload: val,
    });
  };

  const toggleTreeView = () => {
    dispatch({
      type: "TOGGLE_TREE_VIEW",
    });
  };

  const setIndentation = (val) => {
    dispatch({
      type: "SET_INDENT",
      payload: val,
    });
  };

  const data = {
    ...state,
    showRemoteURLModal,
    hideModal,
    setInputJson,
    setOutputJson,
    toggleTreeView,
    setIndentation,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within AppContext");
  }

  return context;
};

export default useAppContext;
