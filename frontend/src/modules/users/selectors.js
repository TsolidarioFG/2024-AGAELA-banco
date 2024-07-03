const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getUserName = state => 
    isLoggedIn(state) ? getUser(state).userName : null;

export const isAdmin = state =>
    isLoggedIn(state) && getUser(state).role === "ADMIN";

export const findUsers = state =>
    getModuleState(state).userSearch;

