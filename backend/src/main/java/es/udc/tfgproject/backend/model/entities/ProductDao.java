package es.udc.tfgproject.backend.model.entities;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ProductDao extends PagingAndSortingRepository<Product, Long> {
    List<Product> findByProductNameContainingIgnoreCaseOrCodeContainingIgnoreCase(String productNameKeyword, String productCodeKeyword, Sort sort);

}
