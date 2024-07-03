import React, { useState } from 'react';
import ProductsSearchBar from "./ProductsSearchBar";
import {Link, useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import ScanQR from "../../app/components/ScanQR";
import GenerateQRPdf from "./GenerateQRPdf";

const ProductList = () => {
    const navigate = useNavigate();
    const [showScanner, setShowScanner] = useState(false);
    const [showGeneratePdf, setShowGeneratePdf] = useState(false);

    const handleScanSuccess = (result) => {
        navigate(`${result}`);
        setShowScanner(false);
    };

    const handleScanClick = () => {
        setShowScanner(true);
    };

    const handleClickGeneratePdf = () => {
        setShowGeneratePdf(true);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
            {showScanner ? (
                <ScanQR onScanSuccess={handleScanSuccess} registerManual={null}/>
            ) : showGeneratePdf ? (
                <GenerateQRPdf />
            ) : (
                <>
                <div style={{marginTop:'10px'}}>
                    <button className="button-secondary" onClick={handleScanClick} style={{marginRight:'40px'}}>
                        <FormattedMessage id="project.products.ProductList.scan" />
                    </button>
                    <button className="button-secondary" onClick={handleClickGeneratePdf}>
                        <FormattedMessage id="project.products.ProductList.buttonPDF" />
                    </button>
                </div>
                <ProductsSearchBar/>
                <div style={{marginTop:'30px'}}><button className="button-secondary" onClick={()=>navigate(`/map`)}><FormattedMessage id="project.statistics.SeeStatistics"/></button></div>
                </>
            )}
        </div>
    );

};

export default ProductList;
