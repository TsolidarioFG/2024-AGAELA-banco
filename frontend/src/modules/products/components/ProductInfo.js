import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../selectors';
import * as actions from '../actions';
import React, {useEffect} from "react";
import {FormattedMessage} from "react-intl";
import LoansHistory from "../../loans/components/LoansHistory";
import {findActualLoansByProduct, getLoansByProduct} from "../selectors";
import BackLink from "../../common/components/BackLink";

const ProductInfo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectors.getProduct);

    useEffect( () => {
        dispatch(actions.findProductById(id));
    }, [id]);

    const containerStyleWithImage = { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' };
    const containerStyleWithoutImage = { display: 'flex', flexDirection: 'row', alignItems: 'center' };

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BackLink/>
            <div style={product && product.image ? containerStyleWithImage : containerStyleWithoutImage}>
                <h3>{product && product.code}</h3>
                {product && product.image && (
                    <div>
                        <img src={`data:image/jpeg;base64,${product.image}`} style={{ height: '100px', marginRight: '30px' }} />
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '90%', marginTop: '20px' }}>
                <div>
                    <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.products.ProductInfo.productName"/></b> {product && product.productName}</p>
                </div>
                <div>
                    <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.products.ProductInfo.origin"/></b> {product && product.origin} </p>
                </div>
                <div>
                    <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.products.ProductInfo.price"/></b>{product && product.price}</p>
                </div>

                <div>
                    <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.products.ProductInfo.type"/></b> {product && product.type} </p>
                </div>
                <div>
                    <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.products.ProductInfo.subtype"/></b> {product && product.subtype} </p>
                </div>
                <div>
                    <p style={{ marginBottom: '5px', marginRight:'15px' }}><b><FormattedMessage id="project.products.ProductInfo.description"/></b> {product && product.description} </p>
                </div>
                <div>
                    <p style={{ marginBottom: '5px' }}><b><FormattedMessage id="project.products.ProductInfo.observations"/></b> {product && product.observations} </p>
                </div>
                <div>
                    <p style={{ marginBottom: '0px', marginRight:'31px' }}><b><FormattedMessage id="project.products.ProductInfo.state"/></b>
                        {product && product.state === 'NOT_LOAN' ? <FormattedMessage id="project.products.ProductInfo.state.noLoan"/> : <FormattedMessage id="project.products.ProductInfo.state.loan"/>}
                    </p>
                </div>
            </div>

            <LoansHistory
                id={id}
                getLoansAction={actions.findLoansByProduct}
                getLoansSelector={state => getLoansByProduct(state, id)}
                getActualLoansSelector={state => findActualLoansByProduct(state, id)}
                showOwner={true}
            />
        </div>
    );
};

export default ProductInfo;