import { isInvalidObject } from "../utils/helper";

export const initialState = {
  objectInput: undefined,
  invalidInput: false,
  jsonOutput: undefined,
  treeView: false,
  indent: 2,
};

const ObjectConverterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_OBJECT_INPUT":
      return {
        ...state,
        objectInput: payload,
        invalidInput: payload ? isInvalidObject(payload) : false,
      };
    case "SET_JSON_OUTPUT":
      return {
        ...state,
        jsonOutput: payload,
      };
    case "TOGGLE_TREE_VIEW":
      return {
        ...state,
        treeView: !state.treeView,
      };
    case "SET_INDENT":
      return {
        ...state,
        indent: payload,
      };
    default:
      return { ...state };
  }
};

export default ObjectConverterReducer;
