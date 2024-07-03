package es.udc.tfgproject.backend.model.entities;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface EntityUserDao extends PagingAndSortingRepository<EntityUser, Long> {

    List<EntityUser> findByEntityNameContainingIgnoreCaseOrderByIdAsc(String entityNameKeyword);

    @Query("SELECT l.entityUser.id FROM Loan l WHERE l.product.id = :productId AND l.devolution = null")
    Optional<Long> findEntityUserIdByProductId(Long productId);
}
