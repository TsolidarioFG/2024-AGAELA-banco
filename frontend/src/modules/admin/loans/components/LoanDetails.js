import React from 'react';
import { FormattedMessage } from "react-intl";
import {useLocation,} from 'react-router-dom';
import {BackLink} from "../../../common";

const LoanDetails = () => {
    const location = useLocation();
    const loan = location.state.loan;

    const dateLoan = new Date(loan.dateLoan);
    const formattedDate = dateLoan.toLocaleDateString();
    const formattedTime = dateLoan.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    const dateTime = `${formattedDate} ${formattedTime}`;
    const devolutionDate = loan.devolution ? new Date(loan.devolution).toLocaleString() : null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BackLink/>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-body">
                {loan.memberId && <p className="card-text mb-4"><b><FormattedMessage id="project.loans.LoanInfo.member"/></b>{loan.memberName}</p>}

                {!loan.memberId &&
                    <>
                        <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.entityName"/></b>{loan.entityUserName}</p>
                        <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.beneficiaryName"/></b>{loan.entityFirstName}</p>
                        <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.beneficiaryLastName"/></b>{loan.entityLastName}</p>
                        <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.beneficiaryTfno"/></b>{loan.entityTfno}</p>
                        <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.beneficiaryEmail"/></b>{loan.entityEmail}</p>
                    </>
                }

                <div key={loan.id} style={{marginTop:'30px'}}>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.admin.loans.LoanDetails.product"/></b>{loan.productName}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.admin.loans.LoanDetails.productCode"/></b>{loan.productCode}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.date"/></b>{dateTime}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.homeTransport"/></b>{loan.homeTransport ? "Sí" : "No"}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.assumeSpent"/></b>{loan.assumeSpent}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.amountTransport"/></b>{loan.amountTransport}</p>
                    <p className="card-text mb-4"><b><FormattedMessage id="project.loans.LoanInfo.observations"/></b>{loan.observations}</p>
                    <p className="card-text mb-4"><b><FormattedMessage id="project.admin.loans.LoanDetails.state"/> </b>{loan.devolution ? <FormattedMessage id="project.admin.loans.LoanDetails.returned" values={{ date: devolutionDate }} /> : <FormattedMessage id="project.admin.loans.LoanDetails.onLoan" />}</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LoanDetails;
