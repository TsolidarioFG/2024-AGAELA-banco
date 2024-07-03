import {FormattedMessage, useIntl} from "react-intl";
import "./../../../styles.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../selectors';
import * as actions from '../actions';

const EntityForm = ({onNextButtonClick, setEntityId, setEntityFirstName, setEntityLastName, setEntityTfno, setEntityEmail}) => {
    const dispatch = useDispatch();
    const entities = useSelector(selectors.getEntities);
    const [entity, setEntity] = useState("");
    const [entityFirstName, updateEntityFirstName] = useState("");
    const [entityLastName, updateEntityLastName] = useState("");
    const [entityTfno, updateEntityTfno] = useState("");
    const [entityEmail, updateEntityEmail] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    const intl = useIntl();
    let form;

    useEffect(() => {
        dispatch(actions.findEntities(""));
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {
            onNextButtonClick();
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }

    };

    return (
        <div>
            <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '13%' }}>
                <h5>
                    <FormattedMessage id="project.loans.EntityForm.title" />
                </h5>
                <form ref={node => form = node}
                      className="needs-validation" noValidate
                      onSubmit={e => handleSubmit(e)}>
                <div className="form-group" style={{marginTop: '14%' }}>
                    <label><FormattedMessage id="project.loans.LoanInfo.entityName"/>*</label>
                    <select className="form-control" value={entity.id || ''} onChange={(e) => {
                        const selectedEntityId = parseInt(e.target.value);
                        setEntityId = setEntityId(selectedEntityId);
                        const selectedEntity = entities && entities.result.find(entity => entity.id === selectedEntityId);
                        setEntity(selectedEntity);
                    }} required>
                        <option value="" disabled hidden>{intl.formatMessage({ id: 'project.loans.EntityForm.selectEntity' })}</option>
                        {entities && entities.result && entities.result.map(entity => (
                            <option key={entity.id} value={entity.id}>{entity.entityName}</option>
                        ))}
                    </select>
                </div>
                    <div className="form-group">
                        <label><FormattedMessage id="project.loans.LoanInfo.beneficiaryName"/></label>
                        <input type="text" className="form-control" value={entityFirstName} onChange={(e) => {
                            updateEntityFirstName(e.target.value);
                            setEntityFirstName(e.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                        <label><FormattedMessage id="project.loans.LoanInfo.beneficiaryLastName"/></label>
                        <input type="text" className="form-control" value={entityLastName} onChange={(e) => {
                            updateEntityLastName(e.target.value);
                            setEntityLastName(e.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                        <label><FormattedMessage id="project.loans.LoanInfo.beneficiaryTfno"/></label>
                        <input type="text" className="form-control" value={entityTfno} onChange={(e) => {
                            updateEntityTfno(e.target.value);
                            setEntityTfno(e.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                        <label><FormattedMessage id="project.loans.LoanInfo.beneficiaryEmail"/></label>
                        <input type="text" className="form-control" value={entityEmail} onChange={(e) => {
                            updateEntityEmail(e.target.value);
                            setEntityEmail(e.target.value);
                        }} />
                    </div>
                <div style={{textAlign: 'center', marginTop: '10%'}}>
                    <button className="button-search" onClick={e => handleSubmit(e)}><FormattedMessage id="project.loans.EntityForm.buttonNext"/></button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default EntityForm;