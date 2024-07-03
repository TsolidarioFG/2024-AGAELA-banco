import {appFetch, config} from "./appFetch";

export const findMembers = (keywords, onSuccess) => {
    appFetch(`/members?keywords=${keywords}`, config('GET'), onSuccess);
};

export const findMemberById = (id, onSuccess, onErrors) =>
    appFetch(`/members/${id}`, config('GET'), onSuccess, onErrors);

export const findMemberIdByProductId = (id, onSuccess, onErrors) =>
    appFetch(`/members/product/${id}`, config('GET'), onSuccess, onErrors);

export const createMember = (firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban, onSuccess, onErrors) =>
    appFetch('/members', config('POST', {firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban}), onSuccess, onErrors);

export const updateMember = (id, firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban, onSuccess, onErrors) =>
    appFetch(`/members/${id}`, config('PUT', {firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban}), onSuccess, onErrors);

export const deleteMember = (id, onSuccess, onErrors) =>
    appFetch(`/members/${id}`, config('DELETE'), onSuccess, onErrors);