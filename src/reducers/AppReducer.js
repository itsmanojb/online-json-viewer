export const initialState = {
  modal: null,
};

const AppReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modal: payload,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        modal: null,
      };
    default:
      return { ...state };
  }
};

export default AppReducer;
