import * as ActionTypes from "./ActionTypes";

export const Product = (
  state = {
    isLoading: true,
    errMess: null,
    product: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        product: action.payload,
      };
    case ActionTypes.DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        product: [],
      };
    case ActionTypes.DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        product: [],
      };
    default:
      return state;
  }
};
