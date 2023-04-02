export const initialState = {
  modal: null,
  jsonInput: undefined,
  invalidInput: false,
  jsonOutput: undefined,
  treeView: false,
  indent: 2,
};

function isInvalidJSON(value) {
  if (value) {
    try {
      JSON.parse(value);
      return false;
    } catch (e) {
      return true;
    }
  }
  return true;
}

const AppReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SHOW_URL_FORM":
      return {
        ...state,
        modal: "remote",
      };
    case "HIDE_URL_FORM":
      return {
        ...state,
        modal: null,
      };
    case "SET_JSON_INPUT":
      return {
        ...state,
        jsonInput: payload,
        invalidInput: payload ? isInvalidJSON(payload) : false,
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

export default AppReducer;
