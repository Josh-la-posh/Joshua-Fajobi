import * as ActionTypes from "./ActionTypes";

const initialState = {
  cart: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [],
  totalQuantity: localStorage.getItem("Total Quantity")
    ? JSON.parse(localStorage.getItem("Total Quantity"))
    : 0,
  subTotal: localStorage.getItem("Total Price")
    ? JSON.parse(localStorage.getItem("Total Price"))
    : 0,
  currency: localStorage.getItem("currency")
    ? JSON.parse(localStorage.getItem("currency"))
    : "$",
  selectedAttribute: [],
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // ADD TO CART
    case ActionTypes.ADD_TO_CART:
      var cart = [...action.payload];
      var totalQuantity;

      //  TOTAL QUANTITY

      totalQuantity = cart.reduce((total, cartItem) => {
        return total + cartItem.qty;
      }, 0);
      state.totalQuantity = totalQuantity;
      localStorage.setItem("Total Quantity", JSON.stringify(totalQuantity));

      return {
        ...state,
        cart,
        totalQuantity,
      };

    // REMOVE FROM CART
    case ActionTypes.REMOVE_FROM_CART:
      cart = [...action.payload];
      //  TOTAL QUANTITY

      totalQuantity = state.totalQuantity - 1;
      localStorage.setItem(
        "Total Quantity",
        JSON.stringify(state.totalQuantity)
      );

      return { ...state, cart, totalQuantity };

    case ActionTypes.NEXT_IMAGE:
      cart = [...action.payload];
      return { ...state, cart };

    case ActionTypes.PREV_IMAGE:
      cart = [...action.payload];
      return { ...state, cart };

    case ActionTypes.SELECT_CURRENCY:
      const currency = action.payload.currencySymbol;
      return {
        ...state,
        currency,
      };

    case ActionTypes.SELECT_ATTRIBUTE:
      const name = action.payload.name;
      const value = action.payload.value;
      var selectedAttribute = [...state.selectedAttribute];
      selectedAttribute?.some((att) => Object.keys(att)[0] === name)
        ? selectedAttribute.forEach((att, index) => {
            Object.keys(selectedAttribute[index])[0] === name &&
              selectedAttribute.splice(index, 1, {
                ...selectedAttribute[index],
                [name]: value,
              });
          })
        : selectedAttribute.push({ [name]: value });

      state.selectedAttribute = [...selectedAttribute];

      return {
        ...state,
        selectedAttribute,
      };

    default:
      return state;
  }
};
