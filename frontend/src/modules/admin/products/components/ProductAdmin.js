import React, {useEffect} from "react";
import * as productsSelectors from '../../../products/selectors';
import * as productsActions from '../../../products/actions';
import * as actions from '../actions';
import {useDispatch, useSelector} from "react-redux";
import SearchList from "../../components/SearchList";
import {useNavigate} from "react-router-dom";

const ProductAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(productsSelectors.findProducts);

    const title = 'project.admin.SearchList.productTitle';

    useEffect(() => {
        dispatch(productsActions.findProducts("", ""));
    }, [dispatch]);

    const renderEntityInfo = (product) => (
        <div>
            {product.productName + ' (' + product.code + ')'}
        </div>
    );

    const renderDeleteEntityInfo = (product) => {
        return product && product.productName + ' (' + product.code + ')';
    };

    const handleDelete = (productId) => {
        dispatch(actions.deleteProduct(productId));
    };

    const handleEdit = (product) => {
        navigate(`editProduct/${product.id}`, {state: {product: product}})
    };

    const handleMemberInfo = (product) => {
        navigate(`/products/product-list/${product.id}`)
    };

    return (
        <div>
            <SearchList
                title={title}
                component={products}
                searchAction={productsActions.findProducts}
                infoToShow={renderEntityInfo}
                infoDeleteToShow={renderDeleteEntityInfo}
                detailsAction={handleMemberInfo}
                createAction={() => navigate(`createProduct`)}
                editAction={handleEdit}
                deleteAction={handleDelete}
            />
        </div>
    );

};

export default ProductAdmin;