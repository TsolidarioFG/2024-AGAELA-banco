import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    entity: null
};

const entity = (state = initialState.entity, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ENTITY_COMPLETED:
            return action.entity;
        case actionTypes.UPDATE_ENTITY_COMPLETED:
            return action.entity;
        case actionTypes.DELETE_ENTITY_COMPLETED:
            return null;
        default:
            return state;
    }
};

const reducer = combineReducers({
    entity
});

export default reducer;


