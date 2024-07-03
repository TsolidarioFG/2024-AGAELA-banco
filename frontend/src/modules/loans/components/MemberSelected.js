import MembersSearchBar from "./MembersSearchBar";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import React, {useState} from "react";
import EntitySearchBar from "./EntitySearchBar";

const MemberSelected = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('socio');

    const handleMemberOperation = (memberId) => {
        navigate(`/loans/member/${memberId}`);
    };

    const handleEntityOperation = (entityId) => {
        navigate(`/loans/entity/${entityId}`);
    };

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="tabs">
                <div className={`tab ${activeTab === 'socio' ? 'active' : ''}`} onClick={() => setActiveTab('socio')}>
                    <FormattedMessage id="project.loans.SelectMember.memberTab" />
                </div>
                <div className={`tab ${activeTab === 'entidad' ? 'active' : ''}`} onClick={() => setActiveTab('entidad')}>
                    <FormattedMessage id="project.loans.SelectMember.entityTab" />
                </div>
            </div>

            {activeTab === 'socio' && (
                <div>
                    <MembersSearchBar operation={handleMemberOperation} />
                </div>
            )}
            {activeTab === 'entidad' && (
                <div>
                    <EntitySearchBar operation={handleEntityOperation}/>
                </div>
            )}
        </div>
    );
};

export default MemberSelected;