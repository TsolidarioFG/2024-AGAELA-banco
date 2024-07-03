import {appFetch, config} from "./appFetch";

export const registerMemberLoan = (memberId, productId, loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, entityFirstName, entityLastName, entityTfno, entityEmail, onSuccess, onErrors) => {
    appFetch(`/loans/register/member/${memberId}/${productId}`, config('POST', {loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, entityFirstName, entityLastName, entityTfno, entityEmail}), onSuccess, onErrors);
};

export const registerEntityLoan = (entityId, productId, loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, entityFirstName, entityLastName, entityTfno, entityEmail, onSuccess, onErrors) => {
    appFetch(`/loans/register/entity/${entityId}/${productId}`, config('POST', {loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, entityFirstName, entityLastName, entityTfno, entityEmail}), onSuccess, onErrors);
};

export const registerDevolution = (productId, devolutionUserId, observations, onSuccess, onErrors) =>
    appFetch(`/loans/devolution/${productId}`, config('POST', {devolutionUserId, observations}), onSuccess,
        onErrors);

export const findLoans = (keywords, startDate, endDate, onSuccess) => {
    let url = `/loans?keywords=${keywords}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    appFetch(url, config('GET'), onSuccess);
};

export const findLoansByMember = (memberId, keywords, startDate, endDate, onSuccess) => {
    let url = memberId ? `/loans/member/${memberId}?keywords=${keywords}` : `/loans/member?keywords=${keywords}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    appFetch(url, config('GET'), onSuccess);
};

export const findLoansByEntity = (entityId, keywords, startDate, endDate, onSuccess) => {
    let url = entityId ? `/loans/entity/${entityId}?keywords=${keywords}` : `/loans/entity?keywords=${keywords}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    appFetch(url, config('GET'), onSuccess);
};

export const findLoansByProduct = (productId, keywords, startDate, endDate, onSuccess) => {
    let url = `/loans/product/${productId}?keywords=${keywords}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    appFetch(url, config('GET'), onSuccess);
};

export const updateLoan = (id, productId, memberId, entityId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, devolution, entityFirstName, entityLastName, entityTfno, entityEmail, onSuccess, onErrors) =>
    appFetch(`/loans/${id}`, config('PUT', {productId, memberId, entityId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, devolution, entityFirstName, entityLastName, entityTfno, entityEmail}), onSuccess, onErrors);

export const deleteLoan = (id, onSuccess, onErrors) =>
    appFetch(`/loans/${id}`, config('DELETE'), onSuccess, onErrors);