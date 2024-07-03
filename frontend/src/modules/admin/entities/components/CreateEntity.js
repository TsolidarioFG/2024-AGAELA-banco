import React, {useState} from "react";
import * as actions from '../actions';
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import CreateEditForm from "../../components/CreateEditForm";

const CreateEntity = () => {
    const navigate = useNavigate();
    const [entityName, setEntityName] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    const title = "project.entities.CreateEntity.title";
    const createAction = actions.createEntity(entityName, () => navigate(`/admin-entities`, { state: { entityName: entityName} }), errors => setBackendErrors(errors));

    const renderEntityForm = () => {
        return (
            <div className="form-group">
                <label> <FormattedMessage id="project.entities.CreateEntity.entityName"/></label>
                <input type="text" className="form-control" value={entityName} onChange={(e) => setEntityName(e.target.value)} required/>
            </div>
        );
    };

    return (
        <div>
            <CreateEditForm title={title} submitAction={createAction} componentForm={renderEntityForm()}/>
        </div>
    );

};

export default CreateEntity;