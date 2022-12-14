import * as ActionTypes from './ActionTypes';

const initialState = {
    cart: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [],
    totalQuantity: localStorage.getItem('Total Quantity') ? JSON.parse(localStorage.getItem('Total Quantity')) : 0,
    subTotal: localStorage.getItem('Total Price') ? JSON.parse(localStorage.getItem('Total Price')) : 0,
    currency: localStorage.getItem('currency') ? JSON.parse(localStorage.getItem('currency')) : '$',
    selectedAttribute: localStorage.getItem('selectedAttribute') ? JSON.parse(localStorage.getItem('selectedAttribute')) : [],
}

export const Reducer = (state=initialState, action) => {
    switch(action.type) {

        // ADD TO CART
        case ActionTypes.ADD_TO_CART:
            var cart = [...action.payload];
            var totalQuantity;
            var subTotal;

                //  TOTAL QUANTITY
        
            totalQuantity = cart.reduce((total, cartItem) => {
                return total + cartItem.qty;
            }, 0);
            state.totalQuantity = totalQuantity;
            localStorage.setItem('Total Quantity', JSON.stringify(totalQuantity))

                // TOTAL PRICE

            subTotal = cart.reduce((total, cartItem) => {
                cartItem.prices.forEach(({currency, amount}) => {
                    if (currency.symbol === state.currency) {
                        total = total + amount * cartItem.qty
                    }
                });
                    return total;
                }, 0);
            state.subTotal = subTotal;
            localStorage.setItem('Total Price', JSON.stringify(subTotal));

            return {
                ...state, cart, totalQuantity, subTotal
            }

        // REMOVE FROM CART
        case ActionTypes.REMOVE_FROM_CART:

                //  TOTAL QUANTITY
        
            totalQuantity = state.totalQuantity - 1
            localStorage.setItem('Total Quantity', JSON.stringify(state.totalQuantity))

                // TOTAL PRICE
            cart = [...action.payload]

            subTotal = cart.reduce((total, cartItem) => {
                cartItem.prices.forEach(({currency, amount}) => {
                    if (currency.symbol === state.currency) {
                        total = total + amount * cartItem.qty
                    }
                });
                return total;
            }, 0);
            state.subTotal = subTotal;
            localStorage.setItem('Total Price', JSON.stringify(subTotal));

            return {...state, cart, totalQuantity, subTotal}

        case ActionTypes.NEXT_IMAGE:
            cart = [...action.payload]
            return {...state, cart}

        case ActionTypes.PREV_IMAGE:
            cart = [...action.payload]
            return {...state, cart}

        case ActionTypes.SELECT_CURRENCY:
            const currency = action.payload.currencySymbol;
            return {
                ...state,
                currency
            }

        case ActionTypes.SELECT_SIZE:
            return selectedAttribute(state, action)

        case ActionTypes.DEFAULT_ATTRIBUTE:
            let inStock = action.payload.inStock;
            let attributes = [...action.payload.attributes];

            let selectedAttributes = inStock
                ? attributes.reduce((selectedAttributes, { name, items }) => {
                    selectedAttributes.push({ [name]: items[0].value});
                    localStorage.setItem('selectedAttribute', JSON.stringify(selectedAttributes));
                    return selectedAttributes;
                }, [])
                : [];            
            state.selectedAttribute = selectedAttributes;
            return {
                ...state,
                selectedAttributes
            }

        default:
            return state
    }
}

//SELECT ATTRIBUTES

const selectedAttribute = (state, action) => {
    const name = action.payload.name;
    const value = action.payload.value;
    var selectedAttribute = [...state.selectedAttribute];
    selectedAttribute?.some(att => Object.keys(att)[0] === name)
        ? selectedAttribute.forEach((att, index) => {
            Object.keys(selectedAttribute[index])[0] === name &&
                selectedAttribute.splice(index, 1, {...selectedAttribute[index], [name]: value})
            })
        : selectedAttribute.push({ [name]: value});
        
        state.selectedAttribute = [...selectedAttribute]

    return {
        ...state,
        selectedAttribute
    }
}