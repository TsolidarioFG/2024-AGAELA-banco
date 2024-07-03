import backend from "../../../backend";
import * as actionTypes from './actionTypes';

const updateLoanCompleted = (loan) => ({
    type: actionTypes.UPDATE_LOAN_COMPLETED,
    loan
});

export const updateLoan = (loanId, productId, memberId, entityId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, devolution, entityFirstName, entityLastName, entityTfno, entityEmail, onSuccess, onErrors) => dispatch => {
    backend.loanService.updateLoan(loanId, productId, memberId, entityId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, devolution, entityFirstName, entityLastName, entityTfno, entityEmail, () => {
        dispatch(updateLoanCompleted());
        onSuccess();
    }, onErrors);
};

const deleteLoanCompleted = (loanId) => ({
    type: actionTypes.DELETE_LOAN_COMPLETED,
    loanId
});

export const deleteLoan = (loanId, onSuccess, onErrors) => dispatch => {
    backend.loanService.deleteLoan(loanId, () => {
        dispatch(deleteLoanCompleted(loanId));
        onSuccess();
    }, onErrors);
};
