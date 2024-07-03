import React, {useEffect} from 'react';
import { FormattedMessage } from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../selectors';
import * as actions from '../actions';
import {useLocation, useNavigate} from 'react-router-dom';

const LoanInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const loan = useSelector(selectors.getLoan);
    const productIds = location.state.productIds || []; //productId escaneados en este último escáner
    const allLoans = useSelector(selectors.getLoans);
    const loans = allLoans && allLoans.result && allLoans.result.filter(loan => { //Préstamos realizados en este último escáner
        return productIds.includes(String(loan.productId)) && !loan.devolution;
    });

    useEffect( () =>{
        dispatch(actions.getLoans("", null, null));
    }, []);

    const handleAccept = () => {
        navigate('/');
    };

    const handleRegisterLoan = () => {
        navigate('/loans/select-member');
    };

    const dateLoan = new Date(loan.dateLoan);
    const formattedDate = dateLoan.toLocaleDateString();
    const formattedTime = dateLoan.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    const dateTime = `${formattedDate} ${formattedTime}`;

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-body">
                <p className="card-title text-center mb-4"><b><FormattedMessage id="project.loans.LoanInfo.title"/></b></p>
                <p className="card-subtitle mb-3"><b><u><FormattedMessage id="project.loans.LoanInfo.info"/></u></b></p>
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
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.product"/></b>
                        <ul>
                            {loans && loans.map((loan, index) => (
                                <li key={index}>{loan.productName}</li>
                            ))}
                        </ul>
                    </p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.date"/></b>{dateTime}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.homeTransport"/></b>{loan.homeTransport ? "Sí" : "No"}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.assumeSpent"/></b>{loan.assumeSpent}</p>
                    <p className="card-text mb-2"><b><FormattedMessage id="project.loans.LoanInfo.amountTransport"/></b>{loan.amountTransport}</p>
                    <p className="card-text mb-4"><b><FormattedMessage id="project.loans.LoanInfo.observations"/></b>{loan.observations}</p>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="button-search mr-3" onClick={handleRegisterLoan}><FormattedMessage id="project.loans.LoanInfo.RegisterLoan"/></button>
                    <button className="button-search" onClick={handleAccept}><FormattedMessage id="project.loans.DevolutionInfo.Accept"/></button>
                </div>
            </div>
        </div>
    );
};

export default LoanInfo;
