package es.udc.tfgproject.backend.test.model.services;

import es.udc.tfgproject.backend.model.entities.*;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.services.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ProductServiceTest {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductDao productDao;

    public Product createProduct(String productCode, String productName){
        Product product = new Product(productCode, null, "Mercado por AGAELA", 150F, "Tipo produto", null, productName, null, null, null);
        productDao.save(product);
        return product;
    }

    @Test
    public void testFindProductsEmpty(){
        assertEquals(new ArrayList<>(), productService.findProducts("Producto",""));
    }

    @Test
    public void testFindProducts(){
        Product product1 = createProduct("PROD_01", "Produto 1");
        Product product2 = createProduct("PROD_02", "Produto 2");

        assertEquals(2, productService.findProducts("" ,"").size());
        assertTrue(productService.findProducts("", "").contains(product1));
        assertTrue(productService.findProducts("", "").contains(product2));
        assertEquals("PROD_01", productService.findProducts("", "").get(0).getCode());
    }

    @Test
    public void testFindProductsByKeywords(){
        Product product1 = createProduct("PROD_01", "Produto 1");
        createProduct("PROD_02", "Produto 2");

        assertEquals(1, productService.findProducts("1" ,"").size());
        assertTrue(productService.findProducts("", "").contains(product1));
    }

    @Test
    public void testFindProductsByState(){
        Product product1 = createProduct("PROD_01", "Produto 1");
        Product product2 = createProduct("PROD_02", "Produto 2");

        assertEquals(2, productService.findProducts("" ,"libre").size());

        product1.setState(Product.State.LOAN);
        assertEquals(1, productService.findProducts("" ,"libre").size());
        assertEquals(1, productService.findProducts("" ,"prestamo").size());
        assertTrue(productService.findProducts("" ,"prestamo").contains(product1));
        assertTrue(productService.findProducts("" ,"libre").contains(product2));
    }

    @Test
    public void testFindProductById() throws InstanceNotFoundException {
        Product product = createProduct("PROD_01", "Produto 1");
        assertEquals(product, productService.findProductById(product.getId()));
    }

    @Test
    public void testFindProductByIdNonExistent() {
        assertThrows(InstanceNotFoundException.class, () ->
                productService.findProductById(1L));
    }

    @Test
    public void testCreateProduct() {
        Product product = productService.createProduct("PROD_01", null, "Origen 1", 100F, "Tipo 1", "Subtipo 1", "Producto 1", "Descripción 1", "Ubicación 1", "Observaciones 1");

        assertNotNull(product.getId());
        assertEquals("PROD_01", product.getCode());
        assertEquals("Origen 1", product.getOrigin());
        assertEquals(100F, product.getPrice());
        assertEquals("Tipo 1", product.getType());
        assertEquals("Subtipo 1", product.getSubtype());
        assertEquals("Producto 1", product.getProductName());
        assertEquals("Descripción 1", product.getDescription());
        assertEquals("Ubicación 1", product.getLocation());
        assertEquals("Observaciones 1", product.getObservations());
    }

    @Test
    public void testUpdateProduct() throws InstanceNotFoundException {
        Product product = createProduct("PROD_01", "Producto 1");

        Product updatedProduct = productService.updateProduct(product.getId(), "PROD_02", null,"Origen 2", 200F, "Tipo 2", "Subtipo 2", "Producto 2", "Descripción 2", "Ubicación 2", "Observaciones 2");

        assertEquals(product.getId(), updatedProduct.getId());
        assertEquals("PROD_02", updatedProduct.getCode());
        assertEquals("Origen 2", updatedProduct.getOrigin());
        assertEquals(200F, updatedProduct.getPrice());
        assertEquals("Tipo 2", updatedProduct.getType());
        assertEquals("Subtipo 2", updatedProduct.getSubtype());
        assertEquals("Producto 2", updatedProduct.getProductName());
        assertEquals("Descripción 2", updatedProduct.getDescription());
        assertEquals("Ubicación 2", updatedProduct.getLocation());
        assertEquals("Observaciones 2", updatedProduct.getObservations());
    }

    @Test
    public void testUpdateNonExistentProduct() {
        assertThrows(InstanceNotFoundException.class, () -> productService.updateProduct(1L, "PROD_02", null,"Origen 2", 200F, "Tipo 2", "Subtipo 2", "Producto 2", "Descripción 2", "Ubicación 2", "Observaciones 2"));
    }

    @Test
    public void testDeleteProduct() throws InstanceNotFoundException {
        Product product = createProduct("PROD_01", "Producto 1");

        productService.deleteProduct(product.getId());

        assertThrows(InstanceNotFoundException.class, () ->
                productService.findProductById(product.getId()));
    }

    @Test
    public void testDeleteNonExistentProduct() {
        assertThrows(InstanceNotFoundException.class, () -> productService.deleteProduct(1L));
    }
}
