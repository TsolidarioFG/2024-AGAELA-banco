package es.udc.tfgproject.backend.model.entities;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LoanDao extends PagingAndSortingRepository<Loan, Long> {

    @Query("SELECT l FROM Loan l WHERE l.id = :id")
    Optional<Loan> findLoanById(@Param("id") Long id);

    @Query("SELECT l FROM Loan l LEFT JOIN l.member m LEFT JOIN l.entityUser eu WHERE " +
            "l.member.id = :memberId AND " +
            "(LOWER(l.product.productName) LIKE LOWER(CONCAT('%', :keywords, '%')) OR " +
            "LOWER(l.product.code) LIKE LOWER(CONCAT('%', :keywords, '%'))) AND " +
            "((cast(:startDate as timestamp) IS NULL OR l.dateLoan >= :startDate) AND " +
            "(cast(:endDate as timestamp) IS NULL OR l.dateLoan <= :endDate))")
    List<Loan> findByMemberIdAndKeywordsAndDateRange(@Param("memberId") Long memberId,
                                                     @Param("keywords") String keywords,
                                                     @Param("startDate") LocalDateTime startDate,
                                                     @Param("endDate") LocalDateTime endDate);

    @Query("SELECT l FROM Loan l LEFT JOIN l.member m LEFT JOIN l.entityUser eu WHERE " +
            "l.entityUser.id = :entityUserId AND " +
            "(LOWER(l.product.productName) LIKE LOWER(CONCAT('%', :keywords, '%')) OR " +
            "LOWER(l.product.code) LIKE LOWER(CONCAT('%', :keywords, '%'))) AND " +
            "((cast(:startDate as timestamp) IS NULL OR l.dateLoan >= :startDate) AND " +
            "(cast(:endDate as timestamp) IS NULL OR l.dateLoan <= :endDate))")
    List<Loan> findByEntityUserIdAndKeywordsAndDateRange(@Param("entityUserId") Long entityUserId,
                                                     @Param("keywords") String keywords,
                                                     @Param("startDate") LocalDateTime startDate,
                                                     @Param("endDate") LocalDateTime endDate);


    @Query("SELECT l FROM Loan l LEFT JOIN l.member m LEFT JOIN l.entityUser eu WHERE " +
            "l.product.id = :productId AND " +
            "((LOWER(m.firstName) LIKE LOWER(CONCAT('%', :keywords, '%')) OR " +
            "LOWER(m.lastName) LIKE LOWER(CONCAT('%', :keywords, '%'))) OR " +
            "LOWER(eu.entityName) LIKE LOWER(CONCAT('%', :keywords, '%'))) AND " +
            "((cast(:startDate as timestamp) IS NULL OR l.dateLoan >= :startDate) AND " +
            "(cast(:endDate as timestamp) IS NULL OR l.dateLoan <= :endDate))")
    List<Loan> findByProductIdAndKeywordsAndDateRange(@Param("productId") Long productId,
                                                         @Param("keywords") String keywords,
                                                         @Param("startDate") LocalDateTime startDate,
                                                         @Param("endDate") LocalDateTime endDate);


    Optional<Loan> findFirstByProductIdAndDevolutionIsNull(Long productId);

    @Query("SELECT l FROM Loan l LEFT JOIN l.member m LEFT JOIN l.entityUser eu WHERE " +
            "((LOWER(m.firstName) LIKE LOWER(CONCAT('%', :keywords, '%')) OR " +
            "LOWER(m.lastName) LIKE LOWER(CONCAT('%', :keywords, '%'))) OR " +
            "LOWER(eu.entityName) LIKE LOWER(CONCAT('%', :keywords, '%')) OR " +
            "LOWER(l.product.productName) LIKE LOWER(CONCAT('%', :keywords, '%')) OR " +
            "LOWER(l.product.code) LIKE LOWER(CONCAT('%', :keywords, '%'))) AND " +
            "(eu IS NULL OR m IS NULL) AND " +
            "((cast(:startDate as timestamp) IS NULL OR l.dateLoan >= :startDate) AND " +
            "(cast(:endDate as timestamp) IS NULL OR l.dateLoan <= :endDate))")
    List<Loan> findByKeywordsAndDateRange(@Param("keywords") String keywords,
                                          @Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate);
}
