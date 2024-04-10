import { useReducer, createContext } from "react";
import Reducer, { initialState } from "../reducers/JsonViewerReducer";

export const JsonViewerContext = createContext(initialState);
export const JsonViewerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

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
    setInputJson,
    setOutputJson,
    toggleTreeView,
    setIndentation,
  };

  return (
    <JsonViewerContext.Provider value={data}>
      {children}
    </JsonViewerContext.Provider>
  );
};
