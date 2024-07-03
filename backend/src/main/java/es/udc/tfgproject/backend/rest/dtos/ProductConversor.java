package es.udc.tfgproject.backend.rest.dtos;

import es.udc.tfgproject.backend.model.entities.Product;

import java.util.List;
import java.util.stream.Collectors;

public class ProductConversor {
    private ProductConversor() {}

    public final static Product toProduct(ProductDto productDto) {
        return new Product(productDto.getCode(), productDto.getImage(), productDto.getOrigin(), productDto.getPrice(), productDto.getType(), productDto.getSubtype(), productDto.getProductName(), productDto.getDescription(), productDto.getLocation(), productDto.getObservations());
    }

    public final static ProductDto toProductDto(Product product){
        return new ProductDto(product.getId(), product.getCode(), product.getImage(), product.getOrigin(), product.getPrice(), product.getType(), product.getSubtype(), product.getProductName(), product.getDescription(), product.getLocation(), product.getObservations(), product.getState().toString());
    }

    public final static List<ProductDto> toProductDtos(List<Product> products){
        return products.stream().map(ProductConversor::toProductDto).collect(Collectors.toList());
    }
}
