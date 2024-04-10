import { useReducer, createContext } from "react";
import Reducer, { initialState } from "../reducers/ObjectConverterReducer";

export const ObjectConverterContext = createContext(initialState);
export const ObjectConverterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setInputObject = (val) => {
    dispatch({
      type: "SET_OBJECT_INPUT",
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
    setInputObject,
    setOutputJson,
    toggleTreeView,
    setIndentation,
  };

  return (
    <ObjectConverterContext.Provider value={data}>
      {children}
    </ObjectConverterContext.Provider>
  );
};
