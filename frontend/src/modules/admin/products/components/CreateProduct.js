import React, {useRef, useState} from "react";
import * as actions from '../actions';
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import CreateEditForm from "../../components/CreateEditForm";
import {fileToBase64} from "../../../../backend/utils";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [origin, setOrigin] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [subtype, setSubtype] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [observations, setObservations] = useState("");
    const [image, setImage] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const fileInputRef = useRef(null);
    const title = "project.entities.CreateProduct.title";
    const createAction = actions.createProduct(code, image, origin, price, type, subtype, productName, description, location, observations, () => navigate(`/admin-products`), errors => setBackendErrors(errors));

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        fileToBase64(file)
            .then((base64String) => {
                setImage(base64String);
            })
            .catch((error) => {
                console.error("Error al convertir el archivo a base64:", error);
            });
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const renderProductForm = () => {
        return (
            <div className="form-group">
                <label> <FormattedMessage id="project.entities.CreateProduct.code"/></label>
                <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} required />
                <label> <FormattedMessage id="project.entities.CreateProduct.origin"/></label>
                <input type="text" className="form-control" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                <label> <FormattedMessage id="project.entities.CreateProduct.price"/></label>
                <input type="number" step="0.01" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <label> <FormattedMessage id="project.entities.CreateProduct.type"/></label>
                <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
                <label> <FormattedMessage id="project.entities.CreateProduct.subtype"/></label>
                <input type="text" className="form-control" value={subtype} onChange={(e) => setSubtype(e.target.value)} />
                <label> <FormattedMessage id="project.entities.CreateProduct.productName"/></label>
                <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                <label> <FormattedMessage id="project.entities.CreateProduct.description"/></label>
                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label> <FormattedMessage id="project.entities.CreateProduct.location"/></label>
                <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}> <FormattedMessage id="project.entities.CreateProduct.image" /></label>
                    <div style={{ flexGrow: '1' }}></div>
                    <button type="button" className="button-seeMore" onClick={handleButtonClick}>
                        <FormattedMessage id="project.entities.CreateProduct.selectImage" />
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
                </div>
                <div>{image && (
                    <img style={{height:'70px', margin:'10px'}} src={`data:image/jpeg;base64,${image}`} />
                )}
                </div>
                <label> <FormattedMessage id="project.entities.CreateProduct.observations"/></label>
                <textarea className="form-control" rows="3" value={observations} onChange={(e) => setObservations(e.target.value)} />
            </div>
        );
    };

    return (
        <div>
            <CreateEditForm title={title} submitAction={createAction} componentForm={renderProductForm()}/>
        </div>
    );

};

export default CreateProduct;