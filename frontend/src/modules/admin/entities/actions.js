import backend from "../../../backend";
import * as actionTypes from './actionTypes';
import {findEntities} from "../../loans/actions";

const createEntityCompleted = (entity) => ({
    type: actionTypes.CREATE_ENTITY_COMPLETED,
    entity
});
export const createEntity = (entityName, onSuccess, onErrors) => dispatch => {
    backend.entityService.createEntity(entityName, id => {
        dispatch(createEntityCompleted(id)); onSuccess();}, onErrors);
}

const updateEntityCompleted = (entity) => ({
    type: actionTypes.UPDATE_ENTITY_COMPLETED,
    entity
});

export const updateEntity = (entityId, entityName, onSuccess, onErrors) => dispatch => {
    backend.entityService.updateEntity(entityId, entityName, () => {
        dispatch(updateEntityCompleted());
        onSuccess();
    }, onErrors);
};

const deleteEntityCompleted = (entityId) => ({
    type: actionTypes.DELETE_ENTITY_COMPLETED,
    entityId
});

export const deleteEntity = (entityId, onSuccess, onErrors) => dispatch => {
    backend.entityService.deleteEntity(entityId, () => {
        dispatch(deleteEntityCompleted(entityId));
        onSuccess();
        dispatch(findEntities(""));
    }, onErrors);
};