import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actions';
import {FormattedMessage} from "react-intl";
import * as selectors from '../../users/selectors';

const ConfirmationDevolution = () => {
    const location = useLocation();
    const { selectedLoans } = location.state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [observations, setObservations] = useState({});
    const devolutionUser = useSelector(selectors.getUser);

    useEffect(() => {
        const initialObservations = {};
        selectedLoans.forEach(loan => {
            initialObservations[loan.id] = loan.observations || '';
        });
        setObservations(initialObservations);
    }, [selectedLoans]);

    const handleConfirm = () => {
        selectedLoans.forEach(loan => {
            dispatch(actions.registerDevolution(loan.productId, devolutionUser.id, observations[loan.id]));
        });
        navigate(`/loans/devolution-info`, { state: { selectedLoans: selectedLoans } });
    };

    const handleCancel = () => {
        //MEJOR QUE SE MUEVA A LA PANTALLA ANTERIOR DONDE SELECCIONAR LOS PRODUCTOS A DEVOLVER
        navigate('/');
    };

    const handleObservationChange = (event, loanId) => {
        const newObservations = { ...observations };
        newObservations[loanId] = event.target.value;
        setObservations(newObservations);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="mt-4 mb-4" style={{textAlign:'center'}}><FormattedMessage id="project.loans.ConfirmationDevolution.message"/></h5>
            <ul className="list-unstyled">
                {selectedLoans && selectedLoans.map(loan => (
                    <li key={loan && loan.id}>
                        <b>{loan && loan.productName} </b>
                        (
                        {new Date(loan && loan.dateLoan).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        {' '}
                        {new Date(loan && loan.dateLoan).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        )
                        <br/>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <FormattedMessage id="project.loans.ConfirmationDevolution.observations"/>
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <textarea
                                style={{width:'100%'}}
                                value={observations[loan.id] || ''}
                                onChange={(event) => handleObservationChange(event, loan.id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-end mt-4">
                <button className="button-cancel mr-3" onClick={handleCancel}><FormattedMessage id="project.loans.ConfirmationDevolution.cancel"/></button>
                <button className="button-search" onClick={handleConfirm}><FormattedMessage id="project.loans.ConfirmationDevolution.accept"/></button>
            </div>
        </div>
    );
};

export default ConfirmationDevolution;
