import React, {useEffect, useState} from "react";
import * as actions from '../actions';
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import CreateEditForm from "../../components/CreateEditForm";
import * as productsActions from "../../../products/actions";
import * as loansActions from "../../../loans/actions";
import {useDispatch, useSelector} from "react-redux";
import * as productsSelectors from "../../../products/selectors";
import * as loansSelectors from "../../../loans/selectors";
import * as selectors from "../../../users/selectors";

const CreateLoan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(productsSelectors.findProducts);
    const entities = useSelector(loansSelectors.getEntities);
    const members = useSelector(loansSelectors.findMembers);
    const getCurrentDateString = () => new Date().toISOString().slice(0, 16);
    const [activeTab, setActiveTab] = useState('socio');
    const [productId, setProductId] = useState("");
    const [memberId, setMemberId] = useState("");
    const [entityId, setEntityId] = useState("");
    const [dateLoan, setDateLoan] = useState(getCurrentDateString());
    const [homeTransport, setHomeTransport] = useState(false);
    const [assumeSpent, setAssumeSpent] = useState("");
    const [amountTransport, setAmountTransport] = useState("");
    const [observations, setObservations] = useState("");
    const [entityFirstName, setEntityFirstName] = useState("");
    const [entityLastName, setEntityLastName] = useState("");
    const [entityTfno, setEntityTfno] = useState("");
    const [entityEmail, setEntityEmail] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    const title = "project.entities.CreateEntity.title";
    const intl = useIntl();
    const loanUser = useSelector(selectors.getUser);
    const createEntityLoanAction = loansActions.registerEntityLoan(entityId, productId, loanUser.id, dateLoan, homeTransport, assumeSpent, amountTransport, observations, entityFirstName, entityLastName, entityTfno, entityEmail, () => navigate(`/admin-loans` ), errors => setBackendErrors(errors));
    const createMemberLoanAction = loansActions.registerMemberLoan(memberId, productId, loanUser.id, dateLoan, homeTransport, assumeSpent, amountTransport, observations, () => navigate(`/admin-loans` ), errors => setBackendErrors(errors));

    useEffect(() => {
        dispatch(loansActions.findMembers(""));
        dispatch(loansActions.findEntities(""));
        dispatch(productsActions.findProducts("", ""));
    }, []);

    const renderLoanForm = () => {
        return(
          <div>
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
          </div>
        );
    };

    const renderMemberForm = () => {
        return (
            <div className="form-group">
                <label><FormattedMessage id="project.entities.EditLoan.product" /></label>
                <select className="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} required>
                    <option value="">{intl.formatMessage({ id: 'project.entities.EditLoan.productSelect' })}</option>
                    {products && products.result && products.result.map(product => (
                        <option key={product.id} value={product.id}>{product.productName}</option>
                    ))}
                </select>
                <label><FormattedMessage id="project.entities.EditLoan.member" /></label>
                <select className="form-control" value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
                    <option value="">{intl.formatMessage({ id: 'project.entities.EditLoan.memberSelect' })}</option>
                    {members && members.result && members.result.map(member => (
                        <option key={member.id} value={member.id}>{member.firstName+' '+member.lastName}</option>
                    ))}
                </select>
                {renderLoanForm()}
            </div>
        );
    };

    const renderEntityForm = () => {
        return (
            <div className="form-group">
                <label><FormattedMessage id="project.entities.EditLoan.product" /></label>
                <select className="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} required >
                    <option value="">{intl.formatMessage({ id: 'project.entities.EditLoan.productSelect' })}</option>
                    {products && products.result && products.result.map(product => (
                        <option key={product.id} value={product.id}>{product.productName}</option>
                    ))}
                </select>
                <label><FormattedMessage id="project.entities.EditLoan.entity" /></label>
                <select className="form-control" value={entityId} onChange={(e) => setEntityId(e.target.value)} required>
                    <option value="">{intl.formatMessage({ id: 'project.entities.EditLoan.entitySelect' })}</option>
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
                {renderLoanForm()}
            </div>
        );
    };

    return (
        <div>
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
                        <CreateEditForm title={title} submitAction={createMemberLoanAction} componentForm={renderMemberForm()}/>
                    </div>
                </>
            )}
            {activeTab === 'entidad' && (
                <>
                    <div>
                        <CreateEditForm title={title} submitAction={createEntityLoanAction} componentForm={renderEntityForm()}/>
                    </div>
                </>
            )}

        </div>
    );

};

export default CreateLoan;