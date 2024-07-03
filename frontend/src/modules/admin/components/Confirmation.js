import React from "react";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const Confirmation = ({title, componentCreatedDetails, route}) => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'0 auto' }}>
            <div style={{ marginTop: '20px', marginBottom:'20px', textAlign:'center' }}>
                <p><b><FormattedMessage id={title}/></b></p>
            </div>
            {componentCreatedDetails}
            <div style={{textAlign: 'center', marginTop: '10%'}}>
                <button className="button-search" onClick={() => navigate(route)}><FormattedMessage id="project.admin.Confirmation.button"/></button>
            </div>
        </div>
    );

};

export default Confirmation;