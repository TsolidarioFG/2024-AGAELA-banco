import React, {useEffect, useState} from 'react';
import { FormattedMessage } from "react-intl";
import * as selectors from "../../loans/selectors";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../actions";

const ConfirmationLoan = ({ onConfirm, onCancel, onContinue, memberId, products}) => {
    const member = useSelector(selectors.getMember);
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);

    useEffect(() => {
        dispatch(actions.findMemberById(memberId, errors => setBackendErrors(errors)));
    }, []);

    const handleConfirm = () => {
        onConfirm();
    };

    const handleContinue = () => {
        onContinue();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'0 auto' }}>
            {products ? (
                <>
                <div style={{ marginTop: '20px', marginBottom:'20px', textAlign:'center' }}>
                    <FormattedMessage id="project.loans.Confirmation.message" />
                </div>
                {memberId && (
                <div><b><FormattedMessage id="project.loans.Confirmation.member"/></b> {member && member.firstName + ' ' + member.lastName}</div>
                )}
                <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                    {products.map(product => (
                        <div key={product.id}>{product.productName}</div>
                    ))}
                </div>
                <div style={{marginBottom:'30px', marginTop:'20px'}}>
                    <button className="button-confirmation" onClick={handleConfirm} style={{marginRight:'40px'}}><FormattedMessage id="project.loans.Confirmation.confirm" /></button>
                    <button className="button-confirmation" onClick={onCancel}><FormattedMessage id="project.loans.Confirmation.cancel" /></button>
                </div>
                <div>
                    <button className="button-confirmation" onClick={handleContinue}><FormattedMessage id="project.loans.Confirmation.continue" /></button>
                </div>
                </>
            ) :
            (
                <>
                <div style={{ marginTop: '20px', marginBottom:'20px', textAlign:'center' }}><b><FormattedMessage id="project.loans.Confirmation.errorProduct.title"/></b></div>
                <div style={{ marginTop: '20px', marginBottom:'20px', textAlign:'center' }}><FormattedMessage id="project.loans.Confirmation.errorProduct"/></div>
                </>
            )}
        </div>
    );
};
export default ConfirmationLoan;
