import React from "react";
import {useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import users from "../../users";

const NoUserButtons = () => {
    const loggedIn = useSelector(users.selectors.isLoggedIn);

    return (
        <div>
            {!loggedIn &&
                <>
                    <div><Link className="button-principal" to="/users/login"><FormattedMessage id="project.users.Login.title"/></Link></div>
                </>
            }
        </div>
    );

};

export default NoUserButtons;