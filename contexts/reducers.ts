import { Action, State } from "./appContext.types";

export const initialState = {
  photos: [],
  favorites: [],
};

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "SET_PHOTOS":
      return {
        ...state,
        photos: action.payload,
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
