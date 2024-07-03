package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.Loan;
import es.udc.tfgproject.backend.model.entities.Member;
import es.udc.tfgproject.backend.model.exceptions.AlreadyRegisteredLoanException;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface LoanService {
    Loan registerLoan(Long productId, Long userId, Long memberId, Long entityId, LocalDateTime dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, String firstName, String lastName, String tfno, String email) throws InstanceNotFoundException, AlreadyRegisteredLoanException;

    void registerDevolution(Long productId, Long userId, String observations) throws InstanceNotFoundException;

    List<Loan> findLoans(String keywords, LocalDate startDate, LocalDate endDate);
    List<Loan> findLoansByMember(Long memberId, String keywords, LocalDate startDate, LocalDate endDate);
    List<Loan> findLoansByEntity(Long entityId, String keywords, LocalDate startDate, LocalDate endDate);
    List<Loan> findLoansByProduct(Long productId, String keywords, LocalDate startDate, LocalDate endDate);

    Loan updateLoan(Long loanId, Long productId, Long memberId, Long entityId, LocalDateTime dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, LocalDateTime devolution, String firstName, String lastName, String tfno, String email) throws InstanceNotFoundException;
    void deleteLoan(Long loanId) throws InstanceNotFoundException;
}
