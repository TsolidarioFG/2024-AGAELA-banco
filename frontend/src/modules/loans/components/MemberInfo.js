import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../selectors';
import * as actions from '../actions';
import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import LoansHistory from "./LoansHistory";
import {findActualLoansByMember, getLoansByMember} from "../selectors";

const MemberInfo = () => {
    const member = useSelector(selectors.getMember);
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    const { id } = useParams();

    useEffect(() => {

        const memberId = Number(id);

        if (!Number.isNaN(memberId)) {
            dispatch(actions.findMemberById(memberId, errors => setBackendErrors(errors)));
        }

    }, [id, dispatch]);

    const dateMember = new Date(member && member.birthdate);
    const memberBirthdate = dateMember.toLocaleDateString();

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
            <h3>{member && member.firstName} {member && member.lastName}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', width: '90%', marginTop: '20px' }}>
                    <div>
                        <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.loans.MemberInfo.birthdate"/></b> {member && memberBirthdate}</p>
                    </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.loans.MemberInfo.tfno"/></b> {member && member.tfno} </p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '5px' }}>
                            <b><FormattedMessage id="project.loans.MemberInfo.gender"/></b>
                            {member && member.gender === 'FEMALE' ? <FormattedMessage id="project.loans.MemberInfo.female"/> : <FormattedMessage id="project.loans.MemberInfo.male"/>}
                        </p>
                    </div>
                </div>

                <div>
                    <p style={{ marginBottom: '10px' }}><b><FormattedMessage id="project.loans.MemberInfo.email"/></b> {member && member.email} </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.loans.MemberInfo.province"/></b> {member && member.province} </p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '5px', marginRight:'15px' }}><b><FormattedMessage id="project.loans.MemberInfo.country"/></b> {member && member.country} </p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.loans.MemberInfo.city"/></b> {member && member.city} </p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '5px', marginRight:'31px' }}><b><FormattedMessage id="project.loans.MemberInfo.cp"/></b> {member && member.cp} </p>
                    </div>
                </div>
                    <div>
                        <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.loans.MemberInfo.address"/></b> {member && member.address} </p>
                    </div>
            </div>

            <LoansHistory
                id={id}
                getLoansAction={actions.findLoansByMember}
                getLoansSelector={state => getLoansByMember(state, id)}
                getActualLoansSelector={state => findActualLoansByMember(state, id)}
            />
        </div>
    );

};

export default MemberInfo;