import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {useNavigate, useLocation} from 'react-router-dom';
import * as selectors from '../selectors';
import * as actions from '../actions';

const RelatedDevolutions = () => {
    const location = useLocation();
    const productId = location.state.productId;
    const memberId = useSelector(selectors.getMemberId);
    const member = useSelector(selectors.getMember);
    const loans = useSelector(selectors.findActualLoansByMember);
    const entityId = useSelector(selectors.getEntityId);
    const entity = useSelector(selectors.getEntity);
    const entityLoans = useSelector(selectors.findActualLoansByEntity);
    const [selectedLoans, setSelectedLoans] = useState([]);
    const [backendErrors, setBackendErrors] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actions.findMemberIdByProductId(productId))
        dispatch(actions.findEntityIdByProductId(productId))

        return () => {
            dispatch(actions.clearMemberId());
            dispatch(actions.clearEntityId());
        };
    }, [productId]);

    useEffect(() => {
        if (memberId) {
            dispatch(actions.findLoansByMember(memberId, "", null, null));
            dispatch(actions.findMemberById(memberId, errors => setBackendErrors(errors)));
        }
    }, [memberId]);

    useEffect(() => {
        if (entityId) {
            dispatch(actions.findLoansByEntity(entityId, "", null, null));
            dispatch(actions.findEntityById(entityId, errors => setBackendErrors(errors)));
        }
    }, [entityId]);

    useEffect(() => {
        const loanToSelect = loans && loans.result && loans.result.find(loan => loan.productId.toString() === productId);
        if (loanToSelect) {
            setSelectedLoans([loanToSelect.id]);
        }
    }, [loans, productId]);

    const handleSelectLoan = (loanId) => {
        setSelectedLoans(prevSelectedLoans => {
            if (prevSelectedLoans.includes(loanId)) {
                return prevSelectedLoans.filter(id => id !== loanId);
            } else {
                return [...prevSelectedLoans, loanId];
            }
        });
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleDevolve = () => {
        const selectedLoanDetails = selectedLoans.map(loanId => loans && loans.result && loans.result.find(loan => loan.id === loanId));
        navigate('/loans/confirmation-devolution', { state: { selectedLoans: selectedLoanDetails } });
    };

    const handleDevolveAll = () => {
        const allSelectedLoans = loans && loans.result ? loans.result : [];
        setSelectedLoans(allSelectedLoans.map(loan => loan.productId));
        navigate('/loans/confirmation-devolution', { state: { selectedLoans: allSelectedLoans } });
    };

    const loanList = memberId ? (loans && loans.result) : (entityLoans && entityLoans.result);


    return  (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-body">
                <p className="card-title text-center mb-4">
                    <b>
                        <FormattedMessage
                            id="project.loans.ConfirmDevolution.title"
                            values={{ memberName: memberId ? (`${member && member.firstName} ${member && member.lastName}`) : entity && entity.entityName}}
                        />
                    </b>
                </p>
                <ul>
                    {loanList && loanList.map(loan => (
                        <li key={loan.id} style={{ listStyle: 'none' }}>
                            <label className="product-item">
                                <input
                                    type="checkbox"
                                    checked={selectedLoans.includes(loan.id)}
                                    onChange={() => handleSelectLoan(loan.id)}
                                />
                                <span style={{ marginLeft: '10px' }}>{loan.productName} </span>
                                <span> &nbsp;({new Date(loan.dateLoan).toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })} {new Date(loan.dateLoan).toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric' })})</span>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="d-flex justify-content-between mt-5">
                    <div>
                        <button className="button-cancel " onClick={handleCancel}>
                            <FormattedMessage id="project.loans.ConfirmDevolution.cancel"/>
                        </button>
                    </div>
                    <div>
                        <button className="button-search mr-3" onClick={handleDevolveAll}>
                            <FormattedMessage id="project.loans.ConfirmDevolution.devolveAll"/>
                        </button>
                        <button className="button-search" onClick={handleDevolve}>
                            <FormattedMessage id="project.loans.ConfirmDevolution.devolve"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedDevolutions;
