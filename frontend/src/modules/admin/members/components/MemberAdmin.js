import React, {useEffect} from "react";
import * as loansSelectors from '../../../loans/selectors';
import * as loansActions from '../../../loans/actions';
import * as actions from '../actions';
import {useDispatch, useSelector} from "react-redux";
import SearchList from "../../components/SearchList";
import {useNavigate} from "react-router-dom";

const MemberAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const members = useSelector(loansSelectors.findMembers);

    const title = 'project.admin.SearchList.memberTitle';

    useEffect(() => {
        dispatch(loansActions.findMembers(""));
    }, [dispatch]);

    const renderEntityInfo = (member) => (
        <div>
            {member.firstName + ' ' + member.lastName}
        </div>
    );

    const renderDeleteEntityInfo = (member) => {
        return member && member.firstName + ' ' + member.lastName;
    };

    const handleDelete = (memberId) => {
        dispatch(actions.deleteMember(memberId));
    };

    const handleEdit = (member) => {
        navigate(`editMember/${member.id}`, {state: {member: member}})
    };

    const handleMemberInfo = (member) => {
        navigate(`/loans/member/${member.id}`)
    };

    return (
        <div>
            <SearchList
                title={title}
                component={members}
                searchAction={loansActions.findMembers}
                infoToShow={renderEntityInfo}
                infoDeleteToShow={renderDeleteEntityInfo}
                detailsAction={handleMemberInfo}
                createAction={() => navigate(`createMember`)}
                editAction={handleEdit}
                deleteAction={handleDelete}
            />
        </div>
    );

};

export default MemberAdmin;