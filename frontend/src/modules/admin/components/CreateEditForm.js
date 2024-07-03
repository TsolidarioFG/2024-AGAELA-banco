import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Errors} from "../../common";

const CreateEditForm = ({title, submitAction, componentForm}) => {
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleCreateButtonClick = event => {
        event.preventDefault();
        if (form.checkValidity()) {
            dispatch(submitAction);
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    };

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card-body" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h5  style={{textAlign: 'center', marginBottom:'20px'}}><b>
                    <FormattedMessage id={title} />
                </b></h5>
                <form ref={node => form = node}
                      className="needs-validation" noValidate
                      onSubmit={e => handleCreateButtonClick(e)}>
                {componentForm}
                <div style={{textAlign: 'center', marginTop: '10%'}}>
                    <button className="button-search" onClick={handleCreateButtonClick}><FormattedMessage id="project.entities.CreateEntity.button"/></button>
                </div>
                </form>
            </div>
        </div>
    );

};

export default CreateEditForm;