import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { FormattedMessage } from "react-intl";
import * as selectors from '../selectors';
import * as actions from '../actions';
import {useNavigate} from "react-router-dom";

const LoanItem = ({ loan, showOwner }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const member = useSelector(selectors.getMember);
    const entity = useSelector(selectors.getEntity);

    const dateLoan = new Date(loan.dateLoan);
    const formattedDate = dateLoan.toLocaleDateString();
    const formattedTime = dateLoan.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    const dateTime = `${formattedDate} ${formattedTime}`;

    const dateLoanDevolution = new Date(loan.devolution);
    const formattedDate2 = dateLoanDevolution.toLocaleDateString();
    const formattedTime2 = dateLoanDevolution.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    const dateDevolution = `${formattedDate2} ${formattedTime2}`;

    useEffect(() => {
        if(showOwner){
            if(loan.memberId)
                dispatch(actions.findMemberById(loan.memberId));
            if(loan.entityUserId)
                dispatch(actions.findEntityById(loan.entityUserId));
        }
    }, [loan]);

    const handleDevolve = () => {
        navigate('/loans/confirmation-devolution', { state: { selectedLoans: [loan]} });
    };
    
    return (
        <div key={loan.id} className="card border-dark" style={{ backgroundColor: '#DED8FE', marginBottom: '15px', display: 'flex', flexDirection: 'column'}}>
            {showOwner ? (
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <div><h5><b>{dateTime}</b></h5></div>
                </div>
            ): (
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <div><h5><b>{loan.productName}</b></h5></div>
                    <div style={{textAlign: 'right' }}>
                        <h6><b>{dateTime}</b></h6>
                    </div>
                </div>
            )}
            <div style={{margin: '10px'}}>
                {showOwner && (
                    <>
                    {loan.memberId && (
                        <p style={{ margin: '2px 0' }}>
                            <b><FormattedMessage id="project.loans.MemberInfo.loan.member"/></b> {member && member.firstName + ' ' + member.lastName}
                        </p>
                    )}
                    {loan.entityUserId && (
                        <p style={{ margin: '2px 0' }}>
                            <b><FormattedMessage id="project.loans.MemberInfo.loan.entity"/></b> {entity && entity.entityName}
                        </p>
                    )}
                    </>
                )}
                {loan.entityFirstName && <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.entities.EditLoan.entityFirstName"/></b> {loan.entityFirstName} </p>}
                {loan.entityLastName && <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.entities.EditLoan.entityLastName"/></b> {loan.entityLastName} </p>}
                {loan.entityTfno && <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.entities.EditLoan.entityTfno"/></b> {loan.entityTfno} </p>}
                {loan.entityEmail && <p style={{ margin: '2px 0 15px 0' }}><b><FormattedMessage id="project.entities.EditLoan.entityEmail"/></b> {loan.entityEmail} </p>}
                {loan.homeTransport ?
                    <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.MemberInfo.loan.homeTransport"/></b> <FormattedMessage id="project.loans.MemberInfo.loan.homeTransport.yes"/> </p> :
                    <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.MemberInfo.loan.homeTransport"/></b> <FormattedMessage id="project.loans.MemberInfo.loan.homeTransport.no"/> </p>
                }
                <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.MemberInfo.loan.amountTransport"/></b> {loan.amountTransport} </p>
                <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.MemberInfo.loan.assumeSpent"/></b> {loan.assumeSpent} </p>
                <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.MemberInfo.loan.observations"/></b> {loan.observations} </p>
                {loan.loanUserId && <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.LoanItem.loan.loanUser"/></b> {loan.loanUserName} </p>}
                {loan.devolution ? (
                    <div>
                    <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.MemberInfo.loan.devolution"/></b> <FormattedMessage id="project.loans.MemberInfo.loan.devolution.true"/> ({dateDevolution}) </p>
                    {loan.devolutionUserId && <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.LoanItem.loan.devolutionUser"/></b> {loan.devolutionUserName} </p>}
                    </div>
                        ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '5px' }}>
                        <p style={{ margin: '2px 0' }}><b><FormattedMessage id="project.loans.MemberInfo.loan.devolution"/></b> <FormattedMessage id="project.loans.MemberInfo.loan.devolution.false"/> </p>
                        <div style={{ textAlign: 'right' }}>
                            <button className="button-search" onClick={handleDevolve}><FormattedMessage id="project.loans.MemberInfo.loan.devolution.button"/></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoanItem;
