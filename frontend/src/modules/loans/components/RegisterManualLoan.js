import {FormattedMessage, useIntl} from "react-intl";
import "./../../../styles.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../../products/selectors';
import * as actionsProducts from '../../products/actions';
import * as actions from '../actions';
import {useLocation, useNavigate} from "react-router-dom";
import {Errors} from "../../common";
import * as usersSelectors from "../../users/selectors";

const RegisterManualLoan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { memberId, entityId, entityFirstName, entityLastName, entityTfno, entityEmail } = location.state;
    const allProducts = useSelector(selectors.findProducts);
    const [product, setProduct] = useState("");
    const [date, setDate] = useState(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16));
    const [homeTransport, setHomeTransport] = useState(false);
    const [assumeSpent, setAssumeSpent] = useState("");
    const [amountTransport, setAmountTransport] = useState("");
    const [observations, setObservations] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    const intl = useIntl();
    let form;
    const products = allProducts && allProducts.result && allProducts.result.filter(product => product.state === "NOT_LOAN");
    const loanUser = useSelector(usersSelectors.getUser);

    useEffect( () => {
        dispatch(actionsProducts.findProducts())
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {
            const productId = product.id;
            if(memberId != null)
                dispatch(actions.registerMemberLoan(memberId, productId, loanUser.id, date, homeTransport, assumeSpent, amountTransport, observations, () => navigate('/loans/info', {state: {productIds: [String(productId)]}}), errors => setBackendErrors(errors)));
            if(entityId != null)
                dispatch(actions.registerEntityLoan(entityId, productId, loanUser.id, date, homeTransport, assumeSpent, amountTransport, observations, entityFirstName, entityLastName, entityTfno, entityEmail, () => navigate('/loans/info', {state: {productIds: [String(productId)]}}), errors => setBackendErrors(errors)));
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
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card-body" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <p className="card-title text-center mb-5 mt-2"><b><FormattedMessage id="project.loans.RegisterManualLoan.title"/></b></p>
                <form ref={node => form = node}
                      className="needs-validation" noValidate
                      onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <label><FormattedMessage id="project.loans.LoanInfo.product" />*</label>
                        <select className="form-control" value={product.id || ''} onChange={(e) => {
                            const selectedProductId = parseInt(e.target.value);
                            const selectedProduct = products && products.find(product => product.id === selectedProductId);
                            setProduct(selectedProduct);
                        }} required>
                            <option value="" disabled hidden>{intl.formatMessage({ id: 'project.loans.RegisterManualLoan.selectProduct' })}</option>
                            {products && products.length > 0 ? (
                                products.map(product => (
                                    <option key={product.id} value={product.id}>{product.productName}</option>
                                ))
                            ) : (
                                <option value="" disabled>{intl.formatMessage({ id: 'project.loans.RegisterManualLoan.noProductsAvailable' })}</option>
                            )}
                        </select>
                        <div className="invalid-feedback">
                            <FormattedMessage id='project.global.validator.required' />
                        </div>
                    </div>
                <div className="form-group">
                    <label><FormattedMessage id="project.loans.LoanInfo.date"/></label>
                    <input type="datetime-local" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label><FormattedMessage id="project.loans.LoanInfo.homeTransport"/></label>
                    <select className="form-control" value={homeTransport} onChange={(e) => setHomeTransport(e.target.value)}>
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label><FormattedMessage id="project.loans.LoanInfo.assumeSpent"/></label>
                    <input type="text" className="form-control" value={assumeSpent} onChange={(e) => setAssumeSpent(e.target.value)} />
                </div>
                <div className="form-group">
                    <label><FormattedMessage id="project.loans.LoanInfo.amountTransport"/></label>
                    <input type="text" className="form-control" value={amountTransport} onChange={(e) => setAmountTransport(e.target.value)} />
                </div>
                <div className="form-group mb-5">
                    <label><FormattedMessage id="project.loans.LoanInfo.observations"/></label>
                    <textarea className="form-control" value={observations} onChange={(e) => setObservations(e.target.value)} />
                </div>
                <div className="d-flex justify-content-end">
                    <button className="button-cancel mr-3" onClick={handleCancel}><FormattedMessage id="project.loans.RegisterManualLoan.Cancel"/></button>
                    <button className="button-search" onClick={handleSubmit}><FormattedMessage id="project.loans.RegisterManualLoan.Accept"/></button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterManualLoan;