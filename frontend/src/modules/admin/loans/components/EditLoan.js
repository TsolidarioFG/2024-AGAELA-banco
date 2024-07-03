import React, {useEffect, useState} from "react";
import * as actions from '../actions';
import * as loansSelectors from '../../../loans/selectors';
import * as loansActions from '../../../loans/actions';
import * as productsSelectors from '../../../products/selectors';
import * as productsActions from '../../../products/actions';
import {useLocation, useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import CreateEditForm from "../../components/CreateEditForm";

const EditLoan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const loan = location.state.loan;
    const products = useSelector(productsSelectors.findProducts);
    const entities = useSelector(loansSelectors.getEntities);
    const members = useSelector(loansSelectors.findMembers);
    const [productId, setProductId] = useState(loan ? loan.productId : "");
    const [memberId, setMemberId] = useState(loan ? loan.memberId : "");
    const [entityId, setEntityId] = useState(loan ? loan.entityUserId : "");
    const formatDateString = date => {
        if (!date) return '';
        const localDate = new Date(date);
        const tzOffset = localDate.getTimezoneOffset() * 60000;
        const localISOTime = new Date(localDate - tzOffset).toISOString().slice(0, 16);
        return localISOTime;
    };
    const getCurrentDateString = () => new Date().toISOString().slice(0, 16);
    const [dateLoan, setDateLoan] = useState(loan ? formatDateString(loan.dateLoan) : "");
    const [homeTransport, setHomeTransport] = useState(loan ? loan.homeTransport : "");
    const [assumeSpent, setAssumeSpent] = useState(loan ? loan.assumeSpent : "");
    const [amountTransport, setAmountTransport] = useState(loan ? loan.amountTransport : "");
    const [observations, setObservations] = useState(loan ? loan.observations : "");
    const [devolution, setDevolution] = useState(loan ? formatDateString(loan.devolution) : "");
    const [entityFirstName, setEntityFirstName] = useState(loan ? loan.entityFirstName : "");
    const [entityLastName, setEntityLastName] = useState(loan ? loan.entityLastName : "");
    const [entityTfno, setEntityTfno] = useState(loan ? loan.entityTfno : "");
    const [entityEmail, setEntityEmail] = useState(loan ? loan.entityEmail : "");
    const [state, setState] = useState(loan ? loan.status : "prestamo");
    const [backendErrors, setBackendErrors] = useState(null);
    const title = "project.entities.EditLoan.title";
    const editAction = actions.updateLoan(loan.id, productId, memberId, entityId, dateLoan, homeTransport, assumeSpent, amountTransport, observations, devolution, entityFirstName, entityLastName, entityTfno, entityEmail, () => navigate(`/admin-loans`), errors => setBackendErrors(errors));

    useEffect(() => {
        dispatch(loansActions.findMembers(""));
        dispatch(loansActions.findEntities(""));
        dispatch(productsActions.findProducts("", ""));
    }, []);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setState(newStatus);
        if (newStatus === "devuelto") {
            setDevolution(getCurrentDateString());
        }
    };

    const renderEditLoanForm = () => {
        return (
            <div className="form-group">
                <label><FormattedMessage id="project.entities.EditLoan.product" /></label>
                <select className="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} required>
                    {products && products.result && products.result.map(product => (
                        <option key={product.id} value={product.id}>{product.productName}</option>
                    ))}
                </select>
                { memberId &&(
                    <>
                    <label><FormattedMessage id="project.entities.EditLoan.member" /></label>
                        <select className="form-control" value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
                            {members && members.result && members.result.map(member => (
                                <option key={member.id} value={member.id}>{member.firstName+' '+member.lastName}</option>
                            ))}
                        </select>
                    </>
                )}
                { entityId && (
                    <>
                        <label><FormattedMessage id="project.entities.EditLoan.entity" /></label>
                        <select className="form-control" value={entityId} onChange={(e) => setEntityId(e.target.value)} required>
                            {entities && entities.result && entities.result.map(entity => (
                                <option key={entity.id} value={entity.id}>{entity.entityName}</option>
                            ))}
                        </select>
                        <label><FormattedMessage id="project.entities.EditLoan.entityFirstName" /></label>
                        <input type="text" className="form-control" value={entityFirstName} onChange={(e) => setEntityFirstName(e.target.value)}/>
                        <label><FormattedMessage id="project.entities.EditLoan.entityLastName" /></label>
                        <input type="text" className="form-control" value={entityLastName} onChange={(e) => setEntityLastName(e.target.value)}/>
                        <label><FormattedMessage id="project.entities.EditLoan.entityTfno" /></label>
                        <input type="text" className="form-control" value={entityTfno} onChange={(e) => setEntityTfno(e.target.value)}/>
                        <label><FormattedMessage id="project.entities.EditLoan.entityEmail" /></label>
                        <input type="text" className="form-control" value={entityEmail} onChange={(e) => setEntityEmail(e.target.value)}/>
                    </>
                )}
                <label><FormattedMessage id="project.entities.EditLoan.dateLoan" /></label>
                <input type="datetime-local" className="form-control" value={dateLoan} onChange={(e) => setDateLoan(e.target.value)}/>
                <label><FormattedMessage id="project.entities.EditLoan.homeTransport" /></label>
                <select className="form-control" value={homeTransport} onChange={(e) => setHomeTransport(e.target.value === 'true')}>
                    <option value='true'>Sí</option>
                    <option value='false'>No</option>
                </select>
                <label><FormattedMessage id="project.entities.EditLoan.assumeSpent" /></label>
                <input type="text" className="form-control" value={assumeSpent} onChange={(e) => setAssumeSpent(e.target.value)}/>
                <label><FormattedMessage id="project.entities.EditLoan.amountTransport" /></label>
                <input type="number" step="0.01" className="form-control" value={amountTransport} onChange={(e) => setAmountTransport(e.target.value)}/>
                <label><FormattedMessage id="project.entities.EditLoan.observations" /></label>
                <textarea className="form-control" rows="3" value={observations} onChange={(e) => setObservations(e.target.value)} />
                <label><FormattedMessage id="project.entities.EditLoan.state" /></label>
                <select className="form-control" value={state} onChange={handleStatusChange}>
                    <option value="prestamo">En Préstamo</option>
                    <option value="devuelto">Devuelto</option>
                </select>
                { state === "devuelto" && (
                    <>
                        <label><FormattedMessage id="project.entities.EditLoan.devolution" /></label>
                        <input type="datetime-local" className="form-control" value={devolution} onChange={(e) => setDevolution(e.target.value)}/>
                    </>
                )}
            </div>
        );
    };

    return (
        <div>
            <CreateEditForm title={title} submitAction={editAction} componentForm={renderEditLoanForm()}/>
        </div>
    );

};

export default EditLoan;