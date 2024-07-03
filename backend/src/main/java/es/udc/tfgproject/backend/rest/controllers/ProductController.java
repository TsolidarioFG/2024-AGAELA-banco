package es.udc.tfgproject.backend.rest.controllers;

import es.udc.tfgproject.backend.model.entities.Product;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.services.ProductService;
import es.udc.tfgproject.backend.rest.dtos.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static es.udc.tfgproject.backend.rest.dtos.ProductConversor.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ProductDto findProductById(@PathVariable Long id) throws InstanceNotFoundException {
        return toProductDto(productService.findProductById(id));
    }

    @GetMapping
    public List<Product> findProducts(@RequestParam(required = false) String keywords, @RequestParam(required = false) String productState){
        if(keywords == null || keywords.isEmpty()){
            if (productState != null && !productState.equals("")) {
                return productService.findProducts("", productState);
            } else {
                return productService.findProducts("", "");
            }
        } else {
            if (productState != null && !productState.equals("")) {
                return productService.findProducts(keywords, productState);
            } else {
                return productService.findProducts(keywords, "");
            }
        }
    }

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        Product newProduct = toProduct(productDto);

        Product createdProduct = productService.createProduct(
                newProduct.getCode(),
                newProduct.getImage(),
                newProduct.getOrigin(),
                newProduct.getPrice(),
                newProduct.getType(),
                newProduct.getSubtype(),
                newProduct.getProductName(),
                newProduct.getDescription(),
                newProduct.getLocation(),
                newProduct.getObservations()
        );

        return toProductDto(createdProduct);
    }

    @PutMapping("/{id}")
    public ProductDto updateMember(@PathVariable Long id, @RequestBody ProductDto productDto) throws InstanceNotFoundException {
        /*
        * if (!id.equals(userId)) {
			throw new PermissionException();
		}*/

        return toProductDto(productService.updateProduct(id, productDto.getCode(), productDto.getImage(), productDto.getOrigin(), productDto.getPrice(), productDto.getType(), productDto.getSubtype(), productDto.getProductName(), productDto.getDescription(), productDto.getLocation(), productDto.getObservations()));
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) throws InstanceNotFoundException {
        productService.deleteProduct(id);
    }
}
