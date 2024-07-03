import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import * as selectors from "../selectors";
import * as actions from '../actions';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {IconButton} from "@mui/material";

const GenerateQRPdf = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectors.findProducts);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        dispatch(actions.findProducts());
    }, [dispatch]);

    useEffect(() => {
        if (selectAll) {
            setSelectedProducts(products.result.map(product => product.id));
        } else {
            setSelectedProducts([]);
        }
    }, [selectAll, products.result]);

    const handleSelectProduct = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };

    const generatePdf = () => {
        const doc = new jsPDF();
        const qrSize = getQrSize(selectedSize);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const qrPerPage = Math.floor((pageWidth - margin * 2) / qrSize);
        let x = margin;
        let y = margin;

        selectedProducts.forEach((productId, index) => {
            const canvas = document.createElement('canvas');
            QRCode.toCanvas(canvas, `${productId}`, { width: qrSize * 4, height: qrSize * 4, errorCorrectionLevel: 'H'}, () => {
                const qrCodeDataUri = canvas.toDataURL('image/jpeg', 1);

                doc.addImage(qrCodeDataUri, 'PNG', x, y, qrSize, qrSize);

                const fontSize = qrSize / 2;
                doc.setFontSize(fontSize);

                const product = products.result.find(product => product.id === productId);
                if (product) {
                    const textWidth = doc.getStringUnitWidth(product.code) * fontSize / doc.internal.scaleFactor;
                    doc.text(x + (qrSize - textWidth) / 2, y + qrSize + 5, product.code);
                }

                x += qrSize;
                if ((index + 1) % qrPerPage === 0) {
                    x = margin;
                    y += qrSize + fontSize + 10;
                    if (y + qrSize > pageHeight - margin) {
                        doc.addPage();
                        x = margin;
                        y = margin;
                    }
                }
            });
        });

        if (selectedProducts.length > 0) {
            doc.save("qrcodes.pdf");
        } else {
            alert("No has seleccionado ningún producto.");
        }
    };

    const getQrSize = (size) => {
        switch (size) {
            case "small":
                return 25;
            case "medium":
                return 50;
            case "large":
                return 100;
            default:
                return 100;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h5 style={{marginBottom:'0'}}><p><FormattedMessage id="project.products.GenerateQRPdf.selectSize" /></p></h5>
                <label>
                    <input
                        type="radio"
                        value="small"
                        checked={selectedSize === "small"}
                        onChange={() => handleSelectSize("small")}
                    />
                    <FormattedMessage id="project.products.GenerateQRPdf.small" />
                </label>
                <label>
                    <input
                        type="radio"
                        value="medium"
                        checked={selectedSize === "medium"}
                        onChange={() => handleSelectSize("medium")}
                    />
                    <FormattedMessage id="project.products.GenerateQRPdf.medium" />
                </label>
                <label>
                    <input
                        type="radio"
                        value="large"
                        checked={selectedSize === "large"}
                        onChange={() => handleSelectSize("large")}
                    />
                    <FormattedMessage id="project.products.GenerateQRPdf.large" />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'20px'}}>
                <h5><p style={{ textAlign: 'center', margin: 0 ,marginBottom: '10px' }}>
                    <FormattedMessage id="project.products.GenerateQRPdf.selectProducts" />
                </p></h5>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                <input
                    type="text"
                    placeholder="Buscar produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton onClick={() => setSelectAll(!selectAll)} style={{ marginLeft: '10px' }}>
                    <CheckBoxIcon sx={{ color: 'green' }} />
                </IconButton>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '340px', overflowY: 'auto', width: '100%' }}>
                {products && products.result && products.result
                    .filter(product => product.code.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(product => (
                        <li key={product.id} style={{ listStyle: 'none' }}>
                            <label className="product-item">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                />
                                <span style={{ marginLeft: '10px' }}>{product.code} {product.productName} </span>
                            </label>
                        </li>
                    ))}
                </div>
            </div>

            <button className="button-search" style = {{marginTop: '20px'}} onClick={generatePdf}><FormattedMessage id="project.products.GenerateQRPdf.button" /></button>
        </div>
    );
};

export default GenerateQRPdf;
