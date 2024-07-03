import React, {useState} from "react";
import {FormattedMessage} from "react-intl";

const ProductForm = () => {
    const [code, setCode] = useState("");
    const [origin, setOrigin] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [subtype, setSubtype] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [observations, setObservations] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);

    const handleCreateButtonClick = () => {

    };

    return (
        <div>
            <div className="card-body" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <p><b>
                    <FormattedMessage id="project.products.ProductForm.title" />
                </b></p>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.code"/></label>
                    <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.productName"/></label>
                    <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.origin"/></label>
                    <input type="text" className="form-control" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.price"/></label>
                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.type"/></label>
                    <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.subtype"/></label>
                    <input type="text" className="form-control" value={subtype} onChange={(e) => setSubtype(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.description"/></label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.location"/></label>
                    <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> <FormattedMessage id="project.products.ProductForm.observations"/></label>
                    <input type="text" className="form-control" value={observations} onChange={(e) => setObservations(e.target.value)} />
                </div>
                <div style={{textAlign: 'center', marginTop: '10%'}}>
                    <button className="button-search" onClick={handleCreateButtonClick}><FormattedMessage id="project.products.ProductForm.buttonCreate"/></button>
                </div>
            </div>
        </div>
    );

};

export default ProductForm;