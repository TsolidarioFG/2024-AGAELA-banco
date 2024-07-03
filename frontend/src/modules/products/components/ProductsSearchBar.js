import {FormattedMessage, useIntl} from "react-intl";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const ProductsSearchBar = () => {
    const navigate = useNavigate();
    const products = useSelector(selectors.findProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [productState, setProductState] = useState("");
    const dispatch = useDispatch();
    const intl = useIntl();

    useEffect(() => {
        return () => {
            dispatch(actions.clearProductSearch());
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(actions.findProducts(searchTerm, productState));
    };

    const handleProductClick = (productId) => {
        navigate(`${productId}`)
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStateChange = (event) => {
        setProductState(event.target.value);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={handleChange}
                            className="search-input"
                            style={{ marginRight: '10px', width: '175px' }}
                        />
                        <select value={productState} onChange={handleStateChange} style={{width:'115px'}}>
                            <option value="">{intl.formatMessage({ id: 'project.products.ProductsSearchBar.filterAll' })}</option>
                            <option value="libre">{intl.formatMessage({ id: 'project.products.ProductsSearchBar.filterNoLoan' })}</option>
                            <option value="prestamo">{intl.formatMessage({ id: 'project.products.ProductsSearchBar.filterLoan' })}</option>
                        </select>
                        <button type="submit" className="button-search-special" style={{ marginLeft: '7px' }} >
                            <SearchIcon />
                        </button>
                    </form>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px", maxHeight: '490px', overflowY: 'auto'}}>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {products.result &&
                            products.result.map((product) => (
                                <li
                                    key={product.id}
                                    onClick={() => handleProductClick(product.id)}
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        cursor: "pointer",
                                        width:'300px'
                                    }}
                                >
                                    {`${product.productName} ( ${product.code} )`}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductsSearchBar;
