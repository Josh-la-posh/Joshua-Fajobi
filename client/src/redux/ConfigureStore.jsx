import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Reducer } from "./reducer";
import { Product } from "./product";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      reducer: Reducer,
      product: Product,
    }),
    applyMiddleware(thunk)
  );
  return store;
};
