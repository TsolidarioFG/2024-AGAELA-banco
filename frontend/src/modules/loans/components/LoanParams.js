import {FormattedMessage} from "react-intl";
import "./../../../styles.css";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const LoanParams = ({products, onSubmit }) => {
    const navigate = useNavigate();
    const [homeTransport, setHomeTransport] = useState(false);
    const [assumeSpent, setAssumeSpent] = useState("");
    const [amountTransport, setAmountTransport] = useState(0);
    const [observations, setObservations] = useState("");

    const handleSubmit = () => {
        onSubmit({ homeTransport, assumeSpent, amountTransport, observations });
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <p className="text-center mb-5 mt-2"><b><FormattedMessage id="project.loans.RegisterManualLoan.title"/></b></p>
                <div className="form-group">
                    <b><FormattedMessage id="project.loans.LoanInfo.product"/></b> {products && products.map(product => product.productName).join(', ')}
                </div>

                <div className="form-group">
                    <label> <b><FormattedMessage id="project.loans.LoanInfo.homeTransport"/></b></label>
                    <select className="form-control" value={homeTransport} onChange={(e) => setHomeTransport(e.target.value === 'true')}>
                    <option value='true'>Sí</option>
                        <option value='false'>No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label> <b><FormattedMessage id="project.loans.LoanInfo.assumeSpent"/></b></label>
                    <input type="text" className="form-control" value={assumeSpent} onChange={(e) => setAssumeSpent(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <b><FormattedMessage id="project.loans.LoanInfo.amountTransport"/></b></label>
                    <input type="text" className="form-control" value={amountTransport} onChange={(e) => setAmountTransport(e.target.value)} />
                </div>
                <div className="form-group mb-5">
                    <label> <b><FormattedMessage id="project.loans.LoanInfo.observations"/></b></label>
                    <textarea className="form-control" value={observations} onChange={(e) => setObservations(e.target.value)} />
                </div>
                <div className="d-flex justify-content-end">
                    <button className="button-cancel mr-3" onClick={handleCancel}><FormattedMessage id="project.loans.RegisterManualLoan.Cancel"/></button>
                    <button className="button-search" onClick={handleSubmit}><FormattedMessage id="project.loans.DevolutionInfo.Accept"/></button>
                </div>
            </div>
        </div>
    );
};

export default LoanParams;