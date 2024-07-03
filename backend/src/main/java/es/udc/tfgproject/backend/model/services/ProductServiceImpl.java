package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.Product;
import es.udc.tfgproject.backend.model.entities.ProductDao;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productDao;

    @Override
    public Product findProductById(Long id) throws InstanceNotFoundException {
        Optional<Product> productOptional = productDao.findById(id);

        if(!productOptional.isPresent()) {
            throw new InstanceNotFoundException("project.entities.product", id);
        }
        return productOptional.get();
    }

    @Override
    public List<Product> findProducts(String keywords, String productState) {
        Sort sortByIdAsc = Sort.by(Sort.Direction.ASC, "id");

        List<Product> products = productDao.findByProductNameContainingIgnoreCaseOrCodeContainingIgnoreCase(keywords, keywords, sortByIdAsc);

        switch (productState) {
            case "libre":
                products = products.stream()
                        .filter(product -> product.getState() == Product.State.NOT_LOAN)
                        .collect(Collectors.toList());
                break;
            case "prestamo":
                products = products.stream()
                        .filter(product -> product.getState() == Product.State.LOAN)
                        .collect(Collectors.toList());
                break;
            default:
                break;
        }

        return products;
    }

    @Override
    public Product createProduct(String code, byte[] image, String origin, Float price, String type, String subtype, String productName, String description, String location, String observations){
        Product product = new Product(code, image, origin, price, type, subtype, productName, description, location, observations);
        return productDao.save(product);
    }


    @Override
    public Product updateProduct(Long productId, String code, byte[] image, String origin, Float price, String type, String subtype, String productName, String description, String location, String observations) throws InstanceNotFoundException {
        Optional<Product> optionalProduct = productDao.findById(productId);

        if (!optionalProduct.isPresent()) {
            throw new InstanceNotFoundException("project.entities.product", productId);
        }

        Product product = optionalProduct.get();
        product.setCode(code);
        product.setImage(image);
        product.setOrigin(origin);
        product.setPrice(price);
        product.setType(type);
        product.setSubtype(subtype);
        product.setProductName(productName);
        product.setDescription(description);
        product.setLocation(location);
        product.setObservations(observations);

        return productDao.save(product);
    }

    @Override
    public void deleteProduct(Long productId) throws InstanceNotFoundException {
        Optional<Product> optionalProduct = productDao.findById(productId);

        if (!optionalProduct.isPresent()) {
            throw new InstanceNotFoundException("project.entities.product", productId);
        }

        Product product = optionalProduct.get();

        productDao.delete(product);
    }

}
