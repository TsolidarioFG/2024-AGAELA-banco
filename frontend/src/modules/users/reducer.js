import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    user: null,
    userSearch: []
};

const user = (state = initialState.user, action) => {

    switch (action.type) {

        case actionTypes.SIGN_UP_COMPLETED:
            return action.authenticatedUser.user;

        case actionTypes.LOGIN_COMPLETED:
            return action.authenticatedUser.user;

        case actionTypes.LOGOUT:
            return initialState.user;

        case actionTypes.UPDATE_PROFILE_COMPLETED:
            return action.user;

        case actionTypes.DELETE_USER_COMPLETED:
            return state;

        default:
            return state;

    }

}

const userSearch = (state = initialState.userSearch, action) => {
    switch (action.type) {
        case actionTypes.FIND_USERS_COMPLETED:
            return action.userSearch.result;

        default:
            return state;
    }
};

const reducer = combineReducers({
    user,
    userSearch
});

export default reducer;


