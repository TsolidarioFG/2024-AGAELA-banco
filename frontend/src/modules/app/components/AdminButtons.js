import React from "react";
import * as selectors from '../../users/selectors';
import {useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import users from "../../users";

const AdminButtons = () => {
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const isAdmin = useSelector(selectors.isAdmin);

    return (
        <div>
            {loggedIn && isAdmin &&
                <>
                    <div style={{marginBottom:'40px'}}><Link to="/admin-products" className="button-principal"><FormattedMessage id="project.admin.AdminButtons.products"/></Link></div>
                    <div style={{marginBottom:'40px'}}><Link to="/admin-loans" className="button-principal"><FormattedMessage id="project.admin.AdminButtons.loans"/></Link></div>
                    <div style={{marginBottom:'40px'}}><Link to="/admin-members" className="button-principal"><FormattedMessage id="project.admin.AdminButtons.members"/></Link></div>
                    <div style={{marginBottom:'40px'}}><Link to="/admin-entities" className="button-principal"><FormattedMessage id="project.admin.AdminButtons.entities"/></Link></div>
                    <div><Link to="/admin-users" className="button-principal"><FormattedMessage id="project.admin.AdminButtons.users"/></Link></div>
                </>
            }
        </div>
    );

};

export default AdminButtons;