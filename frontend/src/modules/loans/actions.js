import backend from "../../backend";
import * as actionTypes from './actionTypes';

export const findMembers = keywords => dispatch => {
    dispatch(clearMemberSearch());
    backend.memberService.findMembers(keywords, result => {
        dispatch(findMembersCompleted({keywords, result}));
    });
}
const findMembersCompleted = memberSearch => ({
    type: actionTypes.FIND_MEMBERS_COMPLETED,
    memberSearch
});

export const clearMemberSearch = () => ({
   type: actionTypes.CLEAR_MEMBER_SEARCH
});

const registerLoanCompleted = (loan) => ({
   type: actionTypes.REGISTER_LOAN_COMPLETED,
    loan
});
export const registerMemberLoan = (memberId, productId, loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, onSuccess, onErrors) => dispatch => {
    backend.loanService.registerMemberLoan(memberId, productId, loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, "", "", "", "", id => {
        dispatch(registerLoanCompleted(id)); onSuccess();}, onErrors);
}
export const registerEntityLoan = (entityId, productId, loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, firstName, lastName, tfno, email, onSuccess, onErrors) => dispatch => {
    backend.loanService.registerEntityLoan(entityId, productId, loanUserId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, firstName, lastName, tfno, email, id => {
        dispatch(registerLoanCompleted(id)); onSuccess();}, onErrors);
}

const registerDevolutionCompleted = (productId) => ({
    type: actionTypes.REGISTER_DEVOLUTION_COMPLETED,
    productId
});
export const registerDevolution = (productId, devolutionUserId, observations, onSuccess, onErrors) => dispatch => {
    backend.loanService.registerDevolution(productId, devolutionUserId, observations, id => {
        dispatch(registerDevolutionCompleted(id)); onSuccess();}, onErrors);
}

const findMemberByIdCompleted = member => ({
    type: actionTypes.FIND_MEMBER_BY_ID_COMPLETED,
    member
});

export const findMemberById = (id, onErrors) => dispatch => {
    backend.memberService.findMemberById(id, member => dispatch(findMemberByIdCompleted(member), onErrors));
}

const getLoansCompleted = allLoans => ({
    type: actionTypes.GET_LOANS_COMPLETED,
    allLoans
});

export const getLoans = (keywords, startDate, endDate) => dispatch => {
    backend.loanService.findLoans(keywords, startDate, endDate, result => {
        dispatch(getLoansCompleted({ keywords, startDate, endDate, result }));
    });
};

const findLoansByMemberCompleted = loanSearch => ({
    type: actionTypes.FIND_LOANS_BY_MEMBER_COMPLETED,
    loanSearch
});

export const findLoansByMember = (memberId, keywords, startDate, endDate) => dispatch => {
    backend.loanService.findLoansByMember(memberId, keywords, startDate, endDate, result => {
        dispatch(findLoansByMemberCompleted({memberId, keywords, startDate, endDate, result}));
    });
};

const findMemberIdByProductIdCompleted = memberId => ({
    type: actionTypes.FIND_MEMBER_BY_PRODUCT_COMPLETED,
    memberId
});

export const findMemberIdByProductId = (id, onErrors) => dispatch => {
    backend.memberService.findMemberIdByProductId(id, memberId => dispatch(findMemberIdByProductIdCompleted(memberId), onErrors));
}

export const clearMemberId = () => ({
    type: actionTypes.CLEAR_MEMBER_ID
});

const findEntityIdByProductIdCompleted = entityId => ({
    type: actionTypes.FIND_ENTITY_BY_PRODUCT_COMPLETED,
    entityId
});

export const findEntityIdByProductId = (id, onErrors) => dispatch => {
    backend.entityService.findEntityIdByProductId(id, entityId => dispatch(findEntityIdByProductIdCompleted(entityId), onErrors));
}

export const clearEntityId = () => ({
    type: actionTypes.CLEAR_ENTITY_ID
});

const findEntityByIdCompleted = entityUser => ({
    type: actionTypes.FIND_ENTITY_BY_ID_COMPLETED,
    entityUser
});

export const findEntityById = (id, onErrors) => dispatch => {
    backend.entityService.findEntityById(id, member => dispatch(findEntityByIdCompleted(member), onErrors));
}

const findLoansByEntityCompleted = entityLoanSearch => ({
    type: actionTypes.FIND_LOANS_BY_ENTITY_COMPLETED,
    entityLoanSearch
});

export const findLoansByEntity = (entityId, keywords, startDate, endDate) => dispatch => {
    backend.loanService.findLoansByEntity(entityId, keywords, startDate, endDate, result => {
        dispatch(findLoansByEntityCompleted({entityId, keywords, startDate, endDate, result}));
    });
};

export const clearEntitySearch = () => ({
    type: actionTypes.CLEAR_ENTITY_SEARCH
});

export const findEntities = keywords => dispatch => {
    dispatch(clearEntitySearch());
    backend.entityService.findEntities(keywords, result => {
        dispatch(findEntitiesCompleted({keywords, result}));
    });
}
const findEntitiesCompleted = entitySearch => ({
    type: actionTypes.FIND_ENTITIES_COMPLETED,
    entitySearch
});
