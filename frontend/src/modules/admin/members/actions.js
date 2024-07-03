import backend from "../../../backend";
import * as actionTypes from './actionTypes';

const createMemberCompleted = (member) => ({
    type: actionTypes.CREATE_MEMBER_COMPLETED,
    member
});
export const createMember = (firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban, onSuccess, onErrors) => dispatch => {
    backend.memberService.createMember(firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban, id => {
        dispatch(createMemberCompleted(id)); onSuccess();}, onErrors);
}

const updateMemberCompleted = (member) => ({
    type: actionTypes.UPDATE_MEMBER_COMPLETED,
    member
});

export const updateMember = (memberId, firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban, onSuccess, onErrors) => dispatch => {
    backend.memberService.updateMember(memberId, firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban, () => {
        dispatch(updateMemberCompleted());
        onSuccess();
    }, onErrors);
};

const deleteMemberCompleted = (memberId) => ({
    type: actionTypes.DELETE_MEMBER_COMPLETED,
    memberId
});

export const deleteMember = (memberId, onSuccess, onErrors) => dispatch => {
    backend.memberService.deleteMember(memberId, () => {
        dispatch(deleteMemberCompleted(memberId));
        onSuccess();
        //dispatch(findMembers(""));
    }, onErrors);
};