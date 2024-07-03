import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    loan: null
};

const loan = (state = initialState.loan, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_LOAN_COMPLETED:
            return action.loan;
        case actionTypes.DELETE_LOAN_COMPLETED:
            return state;
        default:
            return state;
    }
};

const reducer = combineReducers({
    loan
});

export default reducer;


