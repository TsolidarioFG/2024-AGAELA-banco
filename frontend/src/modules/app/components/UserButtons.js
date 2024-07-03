import React from "react";
import * as selectors from '../../users/selectors';
import {useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import SeeProducts from "../../products/components/SeeProducts";
import users from "../../users";

const UserButtons = () => {
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const isAdmin = useSelector(selectors.isAdmin);

    return (
        <div>
            {loggedIn && !isAdmin &&
                <>
                <div><Link to="/loans/select-member" className="button-principal"><FormattedMessage id="project.loans.RegisterLoan.register"/></Link></div>
                <div style={{marginTop:'35px'}}><Link to="/loans/scan-devolution" className="button-principal"><FormattedMessage id="project.loans.RegisterDevolution.register"/></Link></div>
                <div style={{marginTop:'35px'}}><Link to="/loans/member-selected" className="button-principal"><FormattedMessage id="project.loans.SearchByMember.register"/></Link></div>

                <div style={{marginTop:'100px'}}><SeeProducts /></div>
                </>
            }
        </div>
    );

};

export default UserButtons;