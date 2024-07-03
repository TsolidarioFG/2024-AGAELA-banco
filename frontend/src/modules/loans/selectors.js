const getModuleState = state => state.loans;

export const getLoan = state =>
    getModuleState(state).loan;

export const getLoans = state =>
    getModuleState(state).allLoans;

export const findActualLoans = (state) => {
    const loans = getLoans(state);
    if (!loans || !loans.result) {
        return null;
    }
    return {
        ...loans,
        result: loans.result.filter(loan => !loan.devolution)
    };
};

export const findActualLoansMap = (state) => {
    const loans = getLoans(state);
    if (!loans || !loans.result) {
        return null;
    }
    return {
        ...loans,
        result: loans.result.filter(loan => !loan.devolution && loan.memberId)
    };
};

export const findMembers = state =>
    getModuleState(state).memberSearch;

export const getMember = state =>
    getModuleState(state).member;

export const getMemberId = state =>
    getModuleState(state).memberId;

export const getEntityId = state =>
    getModuleState(state).entityId;

export const getEntity = state =>
    getModuleState(state).entityUser;

export const getLoansByMember = state =>
    getModuleState(state).loanSearch;

export const findActualLoansByMember = (state, memberId) => {
    const loans = getLoansByMember(state, memberId);
    if (!loans || !loans.result) {
        return null;
    }
    return {
        ...loans,
        result: loans.result.filter(loan => !loan.devolution)
    };
};

export const getLoansByEntity = state =>
    getModuleState(state).entityLoanSearch;

export const findActualLoansByEntity = (state, entityId) => {
    const loans = getLoansByEntity(state, entityId);
    if (!loans || !loans.result) {
        return null;
    }
    return {
        ...loans,
        result: loans.result.filter(loan => !loan.devolution)
    };
};

export const getEntities = state =>
    getModuleState(state).entitySearch;