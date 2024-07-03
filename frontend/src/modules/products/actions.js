import backend from "../../backend";
import * as actionTypes from './actionTypes';

export const clearProductSearch = () => ({
    type: actionTypes.CLEAR_PRODUCT_SEARCH
});

/*export const findProducts = (keywords, productState) => dispatch => {
    dispatch(clearProductSearch());
    backend.productService.findProducts(keywords, productState, result => {
        dispatch(findProductsCompleted({ keywords, productState, result }));
    });
};*/

export const findProducts = (pagina, limit, busqueda) => dispatch => {
    dispatch(clearProductSearch());

    /*backend.productService.findProducts(
        pagina,
        limit,
        busqueda,
        result => {
            dispatch(findProductsCompleted(result));
        }


    );*/

    const onSuccess = result => {
        dispatch(findProductsCompleted(result));
    };

    const onErrors = error => {
        dispatch(findProductsFailed(error));
    };

    backend.productService.findProducts(
        pagina,
        limit,
        busqueda,
        onSuccess,
        onErrors
    );
};

const findProductsCompleted = productSearch => ({
    type: actionTypes.FIND_PRODUCTS_COMPLETED,
    productSearch
});

const findProductsFailed = error => ({
    type: actionTypes.FIND_PRODUCTS_FAILED,
    error // Este error debe ser un objeto serializable
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