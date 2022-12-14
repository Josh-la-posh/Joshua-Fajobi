import * as ActionTypes from './ActionTypes';

export const addToCart = (id, gallery, brand, prices, name, attributes, selectedAttribute, index) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];

    let counter = 0;

    if (attributes.length === selectedAttribute.length) {
        cart.some(cartItem => cartItem.id === id)
            ? cart.forEach((cartItem, index) => {
                if (cartItem.id === id) {
                    if (JSON.stringify(
                            [...cartItem.selectedAttribute].sort((a,b) =>
                            Object.keys(a)[0].localeCompare(Object.keys(b)[0]),
                            ),
                            ).slice(0, -3) ===
                        JSON.stringify(
                            [...selectedAttribute].sort((a,b) =>
                            Object.keys(a)[0].localeCompare(Object.keys(b)[0]),
                            ),
                            ).slice(0, -3)
                            ) {
                                cart.splice(index, 1, {
                                    ...cart[index],
                                    qty: cart[index].qty + 1,
                                })
                                localStorage.setItem('data', JSON.stringify(cart));
                    } else {
                        counter++;
                    }
                }
            })
        : cart.push({
            id: id,
            brand: brand,
            name: name,
            attributes: attributes,
            selectedAttribute: selectedAttribute,
            prices: prices,
            gallery: gallery,
            qty: 1,
            imageIndex: 0,
        });
            localStorage.setItem('data', JSON.stringify(cart));

    const uniqueId = [];
    cart.forEach(cartItem => cartItem.id === id && uniqueId.push(cartItem.id));

    counter === uniqueId.length &&
        cart.push({
            id: id,
            brand: brand,
            name: name,
            attributes: attributes,
            selectedAttribute: selectedAttribute,
            prices: prices,
            gallery: gallery,
            qty: 1,
            imageIndex: 0
        })
        localStorage.setItem('data', JSON.stringify(cart));        
    }
    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: cart
    })
}

export const removeFromCart = (id, selectedAttribute) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];
        
    cart.forEach((cartItem, index) => {
        if (cartItem.id === id) {
            if (JSON.stringify(
                    [...cartItem.selectedAttribute].sort((a,b) =>
                    Object.keys(a)[0].localeCompare(Object.keys(b)[0]),
                    ),
                    ).slice(0, -3) ===
                JSON.stringify(
                    [...selectedAttribute].sort((a,b) =>
                    Object.keys(a)[0].localeCompare(Object.keys(b)[0]),
                    ),
                    ).slice(0, -3)
                    ) {
                        if (cartItem.qty>1) {
                            cartItem.qty = cartItem.qty - 1
                            localStorage.setItem('data', JSON.stringify(cart));
                        } else {
                            cart.splice(index, 1);
                            localStorage.setItem('data', JSON.stringify(cart));
                        }
            }
        }
    })
    
    dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: cart
    })
}

export const nextImg = (index, imageIndex) => async (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('data'));
    
    let imdex = index;
        cart.forEach((cartItem, index) => {
            if (index === imdex) {
                 cartItem.imageIndex = cartItem.gallery.length - 1 > cartItem.imageIndex
                ? cartItem.imageIndex + 1
                : 0;
                imageIndex = cartItem.imageIndex;
            }
        })
        localStorage.setItem('data', JSON.stringify(cart));

    dispatch({
        type: ActionTypes.NEXT_IMAGE,
        payload: cart
    })
}

export const prevImg = (index, imageIndex) => async (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('data'));
    
    let imdex = index;
        cart.forEach((cartItem, index) => {
            if (index === imdex) {
                 cartItem.imageIndex = cartItem.imageIndex === 0
                ? cartItem.gallery.length - 1
                : cartItem.imageIndex - 1;
                imageIndex = cartItem.imageIndex;
            }
        })
        localStorage.setItem('data', JSON.stringify(cart));

    dispatch({
        type: ActionTypes.PREV_IMAGE,
        payload: cart
    })
}

export const selectCurrency = (currency) => async (dispatch) => {
    const currencySymbol = currency
    localStorage.setItem('currency', JSON.stringify(currencySymbol))


    dispatch({
        type: ActionTypes.SELECT_CURRENCY,
        payload: {
            currencySymbol,
            currency
        }
    })
}

export const selectAttribute = (value, name) => ({
    type: ActionTypes.SELECT_SIZE,
    payload: {
        name,
        value
    }
})

export const defaultAttribute = (inStock, attributes) => ({
    type: ActionTypes.DEFAULT_ATTRIBUTE,
    payload: {
        inStock: inStock,
        attributes: attributes
    }
})