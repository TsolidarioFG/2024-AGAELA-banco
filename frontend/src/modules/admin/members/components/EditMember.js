import React, {useState} from "react";
import * as actions from '../actions';
import {useLocation, useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import CreateEditForm from "../../components/CreateEditForm";

const EditMember = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const member = location.state.member;
    const [firstName, setFirstName] = useState(member ? member.firstName : "");
    const [lastName, setLastName] = useState(member ? member.lastName : "");
    const [birthdate, setBirthdate] = useState(member ? member.birthdate : "");
    const [tfno, setTfno] = useState(member ? member.tfno : "");
    const [email, setEmail] = useState(member ? member.email : "");
    const [gender, setGender] = useState(member ? member.gender : "");
    const [country, setCountry] = useState(member ? member.country : "");
    const [province, setProvince] = useState(member ? member.province : "");
    const [city, setCity] = useState(member ? member.city : "");
    const [cp, setCp] = useState(member ? member.cp : "");
    const [address, setAddress] = useState(member ? member.address : "");
    const [amount, setAmount] = useState(member ? member.amount :"");
    const [iban, setIban] = useState( member ? member.iban : "");
    const [backendErrors, setBackendErrors] = useState(null);
    const intl = useIntl();
    const title = "project.entities.EditMember.title";
    const editAction = actions.updateMember(member.id, firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban, () => navigate(`/admin-members`), errors => setBackendErrors(errors));
    const renderEditEntityForm = () => {
        return (
            <div className="form-group">
                <label><FormattedMessage id="project.entities.CreateMember.firstName" /></label>
                <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.lastName" /></label>
                <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <label><FormattedMessage id="project.entities.CreateMember.birthdate" /></label>
                <input type="text" className="form-control" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
                <label><FormattedMessage id="project.entities.CreateMember.tfno" /></label>
                <input type="text" className="form-control" value={tfno} pattern="\d*" onChange={(e) => setTfno(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.email" /></label>
                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label><FormattedMessage id="project.entities.CreateMember.gender" /></label>
                <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                    {intl.formatMessage({ id: 'project.loans.EntityForm.selectEntity' })}
                    <option value="">{intl.formatMessage({ id: 'project.entities.CreateMember.genderSelect' })}</option>
                    <option value="MALE">{intl.formatMessage({ id: 'project.entities.CreateMember.genderFem' })}</option>
                    <option value="FEMALE">{intl.formatMessage({ id: 'project.entities.CreateMember.genderH' })}</option>
                    <option value="">{intl.formatMessage({ id: 'project.entities.CreateMember.genderOther' })}</option>
                </select>
                <label><FormattedMessage id="project.entities.CreateMember.country" /></label>
                <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.province" /></label>
                <input type="text" className="form-control" value={province} onChange={(e) => setProvince(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.city" /></label>
                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.cp" /></label>
                <input type="text" className="form-control" value={cp} pattern="\d*" onChange={(e) => setCp(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.address" /></label>
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.amount" /></label>
                <input type="number" step="0.01" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                <label><FormattedMessage id="project.entities.CreateMember.iban" /></label>
                <input type="text" className="form-control" value={iban} onChange={(e) => setIban(e.target.value)} required/>

            </div>
        );
    };

    return (
        <div>
            <CreateEditForm title={title} submitAction={editAction} componentForm={renderEditEntityForm()}/>
        </div>
    );

};

export default EditMember;