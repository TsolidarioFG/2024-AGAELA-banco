import React from 'react';
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from 'react-router-dom';

const DevolutionInfo = () => {
    const location = useLocation();
    const { selectedLoans } = location.state;
    const navigate = useNavigate();

    const handleAccept = () => {
        navigate('/');
    };

    const handleRegisterDevolution = () => {
        navigate('/loans/scan-devolution');
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-body">
                <p className="card-title text-center mb-4"><b><FormattedMessage id="project.loans.DevolutionInfo.title"/></b></p>
                <div style={{marginTop:'30px'}}>
                    <p><FormattedMessage id="project.loans.DevolutionInfo.info"/></p>
                    {selectedLoans && selectedLoans.length > 0 && (
                        <ul className="list-unstyled">
                            {selectedLoans.map((loan, index) => (
                                <li key={index}>
                                    {loan.productName} ({loan.productCode})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="d-flex justify-content-end mt-5">
                    <button className="button-search mr-3" onClick={handleRegisterDevolution}><FormattedMessage id="project.loans.DevolutionInfo.RegisterDevolution"/></button>
                    <button className="button-search" onClick={handleAccept}><FormattedMessage id="project.loans.DevolutionInfo.Accept"/></button>
                </div>
            </div>
        </div>
    );
};

export default DevolutionInfo;
