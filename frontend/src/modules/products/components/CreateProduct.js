import React, {useEffect, useState} from "react";
import * as selectors from '../../users/selectors';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const CreateProduct = () => {
    const isAdmin = useSelector(selectors.isAdmin);

    return (
        <div>
        {isAdmin &&
        <div style={{marginTop:'35px'}}><Link to="/product-form" className="button-principal"><FormattedMessage id="project.products.createProduct"/></Link></div>
        }
        </div>
    );

};

export default CreateProduct;