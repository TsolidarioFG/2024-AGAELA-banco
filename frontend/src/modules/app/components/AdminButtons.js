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
        <div className="admin-buttons-container">

            {loggedIn && isAdmin &&
                <>
                    <Link to="/admin-products" className="button-principal button-space"><FormattedMessage id="project.admin.AdminButtons.products"/></Link>
                    <Link to="/admin-loans" className="button-principal button-space"><FormattedMessage id="project.admin.AdminButtons.loans"/></Link>
                    <Link to="/admin-members" className="button-principal button-space"><FormattedMessage id="project.admin.AdminButtons.members"/></Link>
                    <Link to="/admin-entities" className="button-principal button-space"><FormattedMessage id="project.admin.AdminButtons.entities"/></Link>
                    <Link to="/admin-users" className="button-principal button-space"><FormattedMessage id="project.admin.AdminButtons.users"/></Link>
                </>
            }
        </div>
    );

};

export default AdminButtons;