import backend from "../../../backend";
import * as actionTypes from './actionTypes';

const createProductCompleted = (product) => ({
    type: actionTypes.CREATE_PRODUCT_COMPLETED,
    product
});
export const createProduct = (code, image, origin, price, type, subtype, productName, description, location, observations, onSuccess, onErrors) => dispatch => {
    backend.productService.createProduct(code, image, origin, price, type, subtype, productName, description, location, observations, id => {
        dispatch(createProductCompleted(id)); onSuccess();}, onErrors);
}

const updateProductCompleted = (product) => ({
    type: actionTypes.UPDATE_PRODUCT_COMPLETED,
    product
});

export const updateProduct = (productId, code, image, origin, price, type, subtype, productName, description, location, onSuccess, onErrors) => dispatch => {
    backend.productService.updateProduct(productId, code, image, origin, price, type, subtype, productName, description, location, () => {
        dispatch(updateProductCompleted());
        onSuccess();
    }, onErrors);
};

const deleteProductCompleted = (productId) => ({
    type: actionTypes.DELETE_PRODUCT_COMPLETED,
    productId
});

export const deleteProduct = (productId, onSuccess, onErrors) => dispatch => {
    backend.productService.deleteProduct(productId, () => {
        dispatch(deleteProductCompleted(productId));
        onSuccess();
        //dispatch(findMembers(""));
    }, onErrors);
};