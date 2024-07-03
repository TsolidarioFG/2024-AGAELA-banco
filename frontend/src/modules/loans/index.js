import * as actions from './actions';
import * as actionTypes from './actionTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as Confirmation} from './components/ConfirmationLoan';
export {default as LoanInfo} from './components/LoanInfo';
export {default as SelectMember} from './components/RegisterLoan';
export {default as MembersSearchBar} from './components/MembersSearchBar';
export {default as MemberInfo} from './components/MemberSelected';


// eslint-disable-next-line
export default {actions, actionTypes, reducer, selectors};