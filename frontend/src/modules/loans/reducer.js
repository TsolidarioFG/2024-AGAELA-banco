import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    memberSearch: [],
    loan: null,
    allLoans: [],
    member: null,
    loanSearch: [],
    memberId: null,
    entitySearch: [],
    entityId: null,
    entityUser: null,
    entityLoanSearch: []
};

const memberSearch = (state = initialState.memberSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_MEMBERS_COMPLETED:
            return action.memberSearch;

        case actionTypes.CLEAR_MEMBER_SEARCH:
            return initialState.memberSearch;

        default:
            return state;

    }

}

const loanSearch = (state = initialState.loanSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_LOANS_BY_MEMBER_COMPLETED:
            return action.loanSearch;

        default:
            return state;

    }

}

const member = (state = initialState.member, action) => {

    switch (action.type) {

        case actionTypes.FIND_MEMBER_BY_ID_COMPLETED:
            return action.member;

        default:
            return state;

    }

}

const memberId = (state = initialState.memberId, action) => {

    switch (action.type) {

        case actionTypes.FIND_MEMBER_BY_PRODUCT_COMPLETED:
            return action.memberId;

        case actionTypes.CLEAR_MEMBER_ID:
            return initialState.memberId;

        default:
            return state;

    }

}

const loan = (state = initialState.loan, action) => {

    switch (action.type) {

        case actionTypes.REGISTER_LOAN_COMPLETED:
            return action.loan;

        default:
            return state;

    }

}

const allLoans = (state = initialState.allLoans, action) => {

    switch (action.type) {

        case actionTypes.GET_LOANS_COMPLETED:
            return action.allLoans;

        default:
            return state;

    }

}

const entitySearch = (state = initialState.entitySearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_ENTITIES_COMPLETED:
            return action.entitySearch;

        case actionTypes.CLEAR_ENTITY_SEARCH:
            return initialState.entitySearch;

        default:
            return state;

    }

}

const entityId = (state = initialState.entityId, action) => {

    switch (action.type) {

        case actionTypes.FIND_ENTITY_BY_PRODUCT_COMPLETED:
            return action.entityId;

        case actionTypes.CLEAR_ENTITY_ID:
            return initialState.entityId;

        default:
            return state;

    }

}

const entityUser = (state = initialState.entityUser, action) => {

    switch (action.type) {

        case actionTypes.FIND_ENTITY_BY_ID_COMPLETED:
            return action.entityUser;

        default:
            return state;

    }

}

const entityLoanSearch = (state = initialState.entityLoanSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_LOANS_BY_ENTITY_COMPLETED:
            return action.entityLoanSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    memberSearch,
    loan,
    allLoans,
    member,
    loanSearch,
    memberId,
    entitySearch,
    entityId,
    entityUser,
    entityLoanSearch
});

export default reducer;