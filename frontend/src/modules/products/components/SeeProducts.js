import {FormattedMessage} from "react-intl";
import "./../../../styles.css";
import {Link} from "react-router-dom";


const SeeProducts = () => {

    return (
        <div>
            <Link to="/products/product-list" className="button-principal">
                <FormattedMessage id="project.products.SeeProducts.button" />
            </Link>
        </div>
    );
};
export default SeeProducts;