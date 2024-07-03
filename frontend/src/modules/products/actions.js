import backend from "../../backend";
import * as actionTypes from './actionTypes';

export const clearProductSearch = () => ({
    type: actionTypes.CLEAR_PRODUCT_SEARCH
});

export const findProducts = (keywords, productState) => dispatch => {
    dispatch(clearProductSearch());
    backend.productService.findProducts(keywords, productState, result => {
        dispatch(findProductsCompleted({ keywords, productState, result }));
    });
};

const findProductsCompleted = productSearch => ({
    type: actionTypes.FIND_PRODUCTS_COMPLETED,
    productSearch
});

const findProductByIdCompleted = product => ({
    type: actionTypes.FIND_PRODUCT_BY_ID_COMPLETED,
    product
});

export const findProductById = (id, onErrors) => dispatch => {
    backend.productService.findProductById(id, product => dispatch(findProductByIdCompleted(product), onErrors));
}

const findLoansByProductCompleted = loanProductSearch => ({
    type: actionTypes.FIND_LOANS_BY_PRODUCT_COMPLETED,
    loanProductSearch
});

export const findLoansByProduct = (productId, keywords, startDate, endDate) => dispatch => {
    backend.loanService.findLoansByProduct(productId, keywords, startDate, endDate, result => {
        dispatch(findLoansByProductCompleted({productId, keywords, startDate, endDate, result}));
    });
};