import { appFetch, config } from "./appFetch";

export const findEntities = (keywords, onSuccess) => {
    appFetch(`/entities?keywords=${keywords}`, config('GET'), onSuccess);
};

export const findEntityById = (id, onSuccess, onErrors) =>
    appFetch(`/entities/${id}`, config('GET'), onSuccess, onErrors);

export const findEntityIdByProductId = (id, onSuccess, onErrors) =>
    appFetch(`/entities/product/${id}`, config('GET'), onSuccess, onErrors);

export const createEntity = (entityName, onSuccess, onErrors) =>
    appFetch('/entities', config('POST', {entityName}), onSuccess, onErrors);

export const updateEntity = (id, entityName, onSuccess, onErrors) =>
    appFetch(`/entities/${id}`, config('PUT', {entityName}), onSuccess, onErrors);

export const deleteEntity = (id, onSuccess, onErrors) =>
    appFetch(`/entities/${id}`, config('DELETE'), onSuccess, onErrors);
