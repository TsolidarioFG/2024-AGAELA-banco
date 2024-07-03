import {getLoansByEntity} from "../loans/selectors";

const getModuleState = state => state.products;

export const findProducts = state =>
    getModuleState(state).productSearch;

export const getProduct = state =>
    getModuleState(state).product;

export const getLoansByProduct = state =>
    getModuleState(state).loanProductSearch;

export const findActualLoansByProduct = (state, productId) => {
    const loans = getLoansByProduct(state, productId);
    if (!loans || !loans.result) {
        return null;
    }
    return {
        ...loans,
        result: loans.result.filter(loan => !loan.devolution)
    };
};