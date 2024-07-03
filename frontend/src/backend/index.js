import {init} from './appFetch';
import * as userService from './userService';
import * as productService from './productService';
import * as memberService from './memberService';
import * as loanService from './loanService';
import * as entityService from './entityService';

export {default as NetworkError} from "./NetworkError";

// eslint-disable-next-line
export default {init, userService, productService, memberService, loanService, entityService};
