import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    member: null
};

const member = (state = initialState.member, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MEMBER_COMPLETED:
            return action.member;
        case actionTypes.UPDATE_MEMBER_COMPLETED:
            return action.member;
        case actionTypes.DELETE_MEMBER_COMPLETED:
            return state;
        default:
            return state;
    }
};

const reducer = combineReducers({
    member
});

export default reducer;


