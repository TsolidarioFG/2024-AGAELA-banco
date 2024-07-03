import React, {useEffect} from "react";
import * as usersSelectors from '../../../users/selectors';
import * as usersActions from '../../../users/actions';
import {useDispatch, useSelector} from "react-redux";
import SearchList from "../../components/SearchList";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const UserAdmin = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelectors.findUsers);

    useEffect(() => {
        dispatch(usersActions.findUsers());
    }, [dispatch]);

    const renderUserInfo = (user) => (
        <div>
            {user.userName}
            <br />
            {user.firstName} {user.lastName}
        </div>
    );

    const renderDeleteUserInfo = (user) => {
        return user && user.userName;
    };

    const handleDelete = (userId) => {
        dispatch(usersActions.deleteUser(userId));
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", textAlign: 'center' }}><Link to="/admin-users/register-user" className="button-principal"><FormattedMessage id="project.admin.UserAdmin.registerUser"/></Link></div>
            <SearchList
                component={users}
                infoToShow={renderUserInfo}
                infoDeleteToShow={renderDeleteUserInfo}
                deleteAction={handleDelete}
                searchAction={usersActions.findUsers}
            />
        </div>
    );

};

export default UserAdmin;