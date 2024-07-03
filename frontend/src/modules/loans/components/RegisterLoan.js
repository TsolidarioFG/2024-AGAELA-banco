import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../actions';
import * as actionsProduct from '../../products/actions';
import { useNavigate } from "react-router-dom";
import ScanQR from "../../app/components/ScanQR";
import ConfirmationLoan from "./ConfirmationLoan";
import MembersSearchBar from "./MembersSearchBar";
import * as selectors from "../../products/selectors";
import LoanParams from "./LoanParams";
import {FormattedMessage} from "react-intl";
import EntityForm from "./EntityForm";
import {Errors, Success} from "../../common";
import * as usersSelectors from '../../users/selectors';

const RegisterLoan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showScanner, setShowScanner] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [memberId, setMemberId] = useState('');
    const [entityId, setEntityId] = useState('');
    const [entityFirstName, setEntityFirstName] = useState("");
    const [entityLastName, setEntityLastName] = useState("");
    const [entityTfno, setEntityTfno] = useState("");
    const [entityEmail, setEntityEmail] = useState("");
    const [productIds, setProductIds] = useState([]);
    const [showManualInput, setShowManualInput] = useState(false);
    const [activeTab, setActiveTab] = useState('socio');
    const [backendErrors, setBackendErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const allProducts = useSelector(selectors.findProducts);
    const products =  allProducts && allProducts.result && allProducts.result.filter(product => productIds.includes(product.id.toString()));
    const loanUser = useSelector(usersSelectors.getUser);

    useEffect( () => {
        dispatch(actionsProduct.findProducts("",""))
    }, []);

    const handleScanSuccess = (result) => {
        setShowScanner(false);
        setProductIds([...productIds, result]);
        setShowConfirmation(true);
    };

    const handleManualInputConfirm = (params) => {
        setShowManualInput(false);
        if(memberId){
            productIds && productIds.forEach(productId => {
                dispatch(actions.registerMemberLoan(memberId, productId, loanUser.id, null, params.homeTransport, params.assumeSpent, params.amountTransport, params.observations, () => navigate('/loans/info', { state: { productIds } }), errors => setBackendErrors(errors)));
            });
        } else {
            productIds && productIds.forEach(productId => {
                dispatch(actions.registerEntityLoan(entityId, productId, loanUser.id, null, params.homeTransport, params.assumeSpent, params.amountTransport, params.observations, entityFirstName, entityLastName, entityTfno, entityEmail, () => navigate('/loans/info', { state: { productIds } }), errors => setBackendErrors(errors)));
            });
        }

        setProductIds([]);
    };


    const handleConfirm = () => {
        setShowConfirmation(false);
        setShowManualInput(true);
    };

    const handleCancel = () => {
        setShowManualInput(false);
        setShowConfirmation(false);
        setProductIds([]);
    };

    const handleRegisterManual = () => {
        if(memberId)
            navigate('register-manual', { state: {memberId: memberId} });
        if(entityId)
            navigate('register-manual', { state: {entityId: entityId, entityFirstName: entityFirstName, entityLastName: entityLastName, entityTfno: entityTfno, entityEmail: entityEmail} });
    };

    const handleContinue = () => {
        setShowScanner(true);
    };

    const handleNextButtonClick = () => {
        setShowScanner(true);
    };

    return (
        <div>
        <Errors errors={backendErrors}
                onClose={() => setBackendErrors(null)}/>
        <Success message={success}
                 onClose={() => setSuccess(null) }/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            {showScanner ? (
                <ScanQR onScanSuccess={handleScanSuccess} registerManual={handleRegisterManual}/>
            ) : showConfirmation ? (
                <ConfirmationLoan onConfirm={handleConfirm} onCancel={handleCancel} onContinue={handleContinue} memberId={memberId} products={products}/>
            ) : showManualInput ? (
                <LoanParams products={products} onSubmit={handleManualInputConfirm}/>
            ) : (
                <>
                    <div className="tabs">
                        <div className={`tab ${activeTab === 'socio' ? 'active' : ''}`} onClick={() => setActiveTab('socio')}>
                            <FormattedMessage id="project.loans.SelectMember.memberTab" />
                        </div>
                        <div className={`tab ${activeTab === 'entidad' ? 'active' : ''}`} onClick={() => setActiveTab('entidad')}>
                            <FormattedMessage id="project.loans.SelectMember.entityTab" />
                        </div>
                    </div>
                {activeTab === 'socio' && (
                    <>
                        <div>
                            <MembersSearchBar operation={() => setShowScanner(true)} setMemberId={setMemberId} title={"project.loans.SelectMember.searchTitle"}/>
                        </div>
                    </>
                )}
                {activeTab === 'entidad' && (
                    <>
                    <div>
                        <EntityForm onNextButtonClick={handleNextButtonClick} setEntityId={setEntityId} setEntityFirstName={setEntityFirstName} setEntityLastName={setEntityLastName} setEntityTfno={setEntityTfno} setEntityEmail={setEntityEmail} />
                    </div>
                    </>
                )}
                </>
            )}
        </div>
        </div>
    );
};

export default RegisterLoan;
