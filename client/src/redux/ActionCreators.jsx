import * as ActionTypes from './ActionTypes';
import { QUERY_ALL_CATEGORIES } from '../FetchData/DisplayData';

// FETCHING DATA

export const fetchData = () => (dispatch) => {
    dispatch(dataLoading(true));

    setTimeout(() => {
        dispatch(addData(QUERY_ALL_CATEGORIES))
    }, 2000);
};

export const dataLoading = () => ({
    type: ActionTypes.DATA_LOADING
});

export const dataFailed = (errMess) => ({
    type: ActionTypes.DATA_FAILED,
    payload: errMess
});

export const addData = (product) => ({
    type: ActionTypes.FETCH_DATA,
    payload: product
});

export const addToCart = (product) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];
            
    //TO INCREASE THE QUANTITY IN CART
    cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
            cartItem.quantity += 1;
            localStorage.setItem('data', JSON.stringify(cart));
        }
    })

    // FOR EXISTING PRODUCT IN CART
    const existingItem = cart.filter(cartItem => cartItem.id === product.id);

    //IF PRODUCT DOES NOT EXIST IN CART, CREATE ONE
    if (existingItem.length === 0) {
        const newItem = {...product, quantity: 1, index:0};
        cart.push(newItem);
        localStorage.setItem('data', JSON.stringify(cart));
    }
    
    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: {
            cart,
            product
        }
    })
}

export const removeFromCart = (product) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];
            
    //TO REDUCE THE QUANTITY IN CART
    cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
            cartItem.quantity -= 1;
            localStorage.setItem('data', JSON.stringify(cart));
        }
    })

    // FOR EXISTING PRODUCT IN CART
    const existingItem = cart.findIndex(cartItem =>{return cartItem.id === product.id});

    //TO REMOVE ITEM FROM CART
    if (cart[existingItem].quantity === 0) {
        cart.splice(existingItem, 1);
        localStorage.setItem('data', JSON.stringify(cart));
    }
    
    dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: {
            cart,
            product
        }
    })
}

export const removeItem = (product) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];
            
// TO GET THE INDEX OF EXISTING ITEM
    const index = cart.findIndex(cartItem => { return cartItem.id === product.id});

// TO REMOVE THE ITEM FROM THE CART
    cart.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(cart));
    
    dispatch({
        type: ActionTypes.REMOVE_ITEM,
        payload: {
            cart,
            product
        }
    })
}

export const nextImg = (product) => async (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('data'));
    
    cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
            let image = cartItem.gallery;

            const nextImg = () => {
                if (cartItem.index >= image.length - 1) {
                    cartItem.index = 0;
                    localStorage.setItem('data', JSON.stringify(cart));
                } else {
                    cartItem.index = cartItem.index + 1;
                    localStorage.setItem('data', JSON.stringify(cart));
                }
            }

            console.log(cartItem.index)
            console.log(image.length)
            return nextImg();

        }
    })

   

    dispatch({
        type: ActionTypes.NEXT_IMAGE,
        payload: {
            cart,
            product
        }
    })
}

export const prevImg = (product) => async (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('data'));
    
    cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
            let image = cartItem.gallery;

            const prevImg = () => {
                if (cartItem.index <= 0) {
                    cartItem.index = image.length - 1
                    localStorage.setItem('data', JSON.stringify(cart));
                } else {
                    cartItem.index = cartItem.index - 1;
                    localStorage.setItem('data', JSON.stringify(cart));
                }
            }

            return prevImg();

        }
    })

   

    dispatch({
        type: ActionTypes.PREV_IMAGE,
        payload: {
            cart,
            product
        }
    })
}

export const selectCurrency = (product) => async (dispatch) => {
    


    dispatch({
        type: ActionTypes.SELECT_CURRENCY,
        payload: {
            // cart,
            product
        }
    })
}