package es.udc.tfgproject.backend.rest.dtos;

import es.udc.tfgproject.backend.model.entities.Loan;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import java.util.List;
import java.util.stream.Collectors;


public class LoanConversor {
    private LoanConversor(){}

    private final static long toMillis(LocalDateTime date) {
        return date.truncatedTo(ChronoUnit.MINUTES).atZone(ZoneOffset.systemDefault()).toInstant().toEpochMilli();
    }

    public final static LoanDto toLoanDto(Loan loan){
        Long memberId = loan.getMember() != null ? loan.getMember().getId() : null;
        String memberName = loan.getMember() != null ? loan.getMember().getFirstName() + ' ' + loan.getMember().getLastName() : null;
        Long entityUserId = loan.getEntityUser() != null ? loan.getEntityUser().getId() : null;
        String entityUserName = loan.getEntityUser() != null ? loan.getEntityUser().getEntityName() : null;
        Long loanUserId = loan.getLoanUser() != null ? loan.getLoanUser().getId() : null;
        String loanUserName = loan.getLoanUser() != null ? loan.getLoanUser().getUserName() : null;
        Long devolutionUserId = loan.getDevolutionUser() != null ? loan.getDevolutionUser().getId() : null;
        String devolutionUserName = loan.getDevolutionUser() != null ? loan.getDevolutionUser().getUserName() : null;
        long dateLoan = toMillis(loan.getDateLoan());

        return new LoanDto(loan.getId(), dateLoan, loan.getHomeTransport(), loan.getAssumeSpent(), loan.getAmountTransport(), loan.getObservations(), loan.getDevolution(), loan.getProduct().getProductName(), loan.getProduct().getCode(), loan.getProduct().getId(), memberId, memberName, entityUserId, entityUserName, loan.getEntityFirstName(), loan.getEntityLastName(), loan.getEntityTfno(), loan.getEntityEmail(), loanUserId, loanUserName, devolutionUserId, devolutionUserName);
    }

    public final static List<LoanDto> toLoanDtos (List<Loan> loans){
        return loans.stream().map(LoanConversor::toLoanDto).collect(Collectors.toList());
    }
}
