package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.entities.Product;

import java.util.List;

public interface ProductService {

    Product findProductById(Long id) throws InstanceNotFoundException;
    List<Product> findProducts(String keywords, String productState);
    //Producto duplicado?
    Product createProduct(String code, byte[] image, String origin, Float price, String type, String subtype, String productName, String description, String location, String observations);
    Product updateProduct(Long productId, String code, byte[] image, String origin, Float price, String type, String subtype, String productName, String description, String location, String observations) throws InstanceNotFoundException;
    void deleteProduct(Long productId) throws InstanceNotFoundException;
}
