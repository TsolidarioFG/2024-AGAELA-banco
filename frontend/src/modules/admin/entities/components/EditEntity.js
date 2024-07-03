import React, {useState} from "react";
import * as actions from '../actions';
import {useLocation, useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import CreateEditForm from "../../components/CreateEditForm";

const EditEntity = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const entity = location.state.entity;
    const [entityName, setEntityName] = useState(entity ? entity.entityName : "");
    const [backendErrors, setBackendErrors] = useState(null);
    const title = "project.entities.EditEntity.title";
    const editAction = actions.updateEntity(entity.id, entityName, () => navigate(`/admin-entities`), errors => setBackendErrors(errors));

    const handleEntityNameChange = (e) => {
        setEntityName(e.target.value);
    };

    const renderEditEntityForm = () => {
        return (
            <div className="form-group">
                <label><FormattedMessage id="project.entities.CreateEntity.entityName" /></label>
                <input
                    type="text"
                    className="form-control"
                    value={entityName}
                    onChange={handleEntityNameChange}
                    required
                />
            </div>
        );
    };

    return (
        <div>
            <CreateEditForm title={title} submitAction={editAction} componentForm={renderEditEntityForm()}/>
        </div>
    );

};

export default EditEntity;