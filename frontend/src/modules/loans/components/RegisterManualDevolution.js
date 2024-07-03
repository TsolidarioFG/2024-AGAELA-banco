import {FormattedMessage, useIntl} from "react-intl";
import "./../../../styles.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../../products/selectors';
import * as selectorsloan from '../selectors';
import * as actions from '../actions';
import * as actionsProduct from '../../products/actions';
import {useNavigate} from "react-router-dom";
import {Errors, Success} from "../../common";

const RegisterManualDevolution = () => {
    const navigate = useNavigate();
    const allProducts = useSelector(selectors.findProducts);
    const loanproducts = allProducts && allProducts.result && allProducts.result.filter(product => product.state === "LOAN"); //Productos en préstamo
    const loans = useSelector(selectorsloan.getLoans);
    const [product, setProduct] = useState("");
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const intl = useIntl();
    let form;

    useEffect( () => {
        dispatch(actions.getLoans("", null, null));
    },[product]);

    useEffect( () => {
        dispatch(actionsProduct.findProducts("",""))
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {
            const selectedLoans = loans && loans.result && loans.result.find(loan => loan.productId.toString() === product.toString());
            navigate('/loans/confirmation-devolution', { state: { selectedLoans: [selectedLoans] } });
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <Errors errors={backendErrors}
                    onClose={() => setBackendErrors(null)}/>
            <Success message={success}
                     onClose={() => setSuccess(null) }/>
            <div className="card-body" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <p className="card-title text-center mb-4"><b><FormattedMessage id="project.loans.RegisterManualDevolution.title"/></b></p>
                <form ref={node => form = node}
                      className="needs-validation" noValidate
                      onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <label><FormattedMessage id="project.loans.LoanInfo.product"/>*</label>
                    <select className="form-control" value={product || ''} onChange={(e) => setProduct(e.target.value)} required>
                        <option value="" disabled hidden>{intl.formatMessage({ id: 'project.loans.RegisterManualLoan.selectProduct' })}</option>
                        {loanproducts && loanproducts.map(product => (
                            <option key={product.id} value={product.id}>{product.productName} ({product.code})</option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-end mt-5">
                    <button className="button-cancel mr-3" onClick={handleCancel}><FormattedMessage id="project.loans.RegisterManualDevolution.Cancel"/></button>
                    <button className="button-search" onClick={handleSubmit}><FormattedMessage id="project.loans.RegisterManualDevolution.Accept"/></button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterManualDevolution;