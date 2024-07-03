import React, {useRef, useState} from "react";
import * as actions from '../actions';
import {useLocation, useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import CreateEditForm from "../../components/CreateEditForm";
import {fileToBase64} from "../../../../backend/utils";

const EditProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state.product;
    const [code, setCode] = useState(product ? product.code : "");
    const [origin, setOrigin] = useState(product ? product.origin : "");
    const [price, setPrice] = useState(product ? product.price : "");
    const [type, setType] = useState(product ? product.type : "");
    const [subtype, setSubtype] = useState(product ? product.subtype : "");
    const [productName, setProductName] = useState(product ? product.productName : "");
    const [description, setDescription] = useState(product ? product.description : "");
    const [locationValue, setLocationValue] = useState(product ? product.location : "");
    const [observations, setObservations] = useState(product ? product.observations : "");
    const [image, setImage] = useState(product ? product.image : null);
    const [backendErrors, setBackendErrors] = useState(null);
    const title = "project.entities.EditProduct.title";
    const fileInputRef = useRef(null);
    const editAction = actions.updateProduct(product.id, code, image, origin, price, type, subtype, productName, description, locationValue, observations, () => navigate(`/admin-products`), errors => setBackendErrors(errors));

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            fileToBase64(file)
                .then((base64String) => {
                    setImage(base64String);
                })
                .catch((error) => {
                    console.error("Error al convertir el archivo a base64:", error);
                });
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const renderEditProductForm = () => {
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
                <input type="text" className="form-control" value={locationValue} onChange={(e) => setLocationValue(e.target.value)} />
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}> <FormattedMessage id="project.entities.CreateProduct.image" /></label>
                    <div style={{ flexGrow: '1' }}></div>
                    <button type="button" className="button-seeMore" onClick={handleButtonClick}>
                        <FormattedMessage id="project.entities.CreateProduct.updateImage" />
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
            <CreateEditForm title={title} submitAction={editAction} componentForm={renderEditProductForm()}/>
        </div>
    );
};

export default EditProduct;
