package es.udc.tfgproject.backend.model.entities;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MemberDao extends PagingAndSortingRepository<Member, Long> {

	List<Member> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstNameKeyword, String lastNameKeyword);
	/*SELECT * FROM Member WHERE LOWER(first_name) LIKE %keyword% OR LOWER(last_name) LIKE %keyword%*/

	@Query("SELECT l.member.id FROM Loan l WHERE l.product.id = :productId AND l.devolution = null")
	Optional<Long> findMemberIdByProductId(Long productId);
	
}
