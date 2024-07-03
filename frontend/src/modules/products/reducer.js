import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    products: [],
    productSearch: [],
    product: null,
    loanProductSearch: []
};

const products = (state = initialState.products, action) => {

    switch (action.type) {

        case actionTypes.GET_PRODUCTS_COMPLETED:
            return action.products;

        default:
            return state;

    }

}

const productSearch = (state = initialState.productSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_PRODUCTS_COMPLETED:
            return action.productSearch;

        default:
            return state;

    }

}

const product = (state = initialState.product, action) => {

    switch (action.type) {

        case actionTypes.FIND_PRODUCT_BY_ID_COMPLETED:
            return action.product;

        default:
            return state;

    }

}

const loanProductSearch = (state = initialState.loanProductSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_LOANS_BY_PRODUCT_COMPLETED:
            return action.loanProductSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    products,
    productSearch,
    product,
    loanProductSearch
});

export default reducer;


