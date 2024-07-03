package es.udc.tfgproject.backend.rest.dtos;

import java.time.LocalDateTime;

public class LoanParamsDto  {
    private LocalDateTime dateLoan;
    private Boolean homeTransport;
    private String assumeSpent;
    private Float amountTransport;
    private String observations;
    private String entityFirstName;
    private String entityLastName;
    private String entityTfno;
    private String entityEmail;
    private Long loanUserId;

    public LoanParamsDto(LocalDateTime dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, String entityFirstName, String entityLastName, String entityTfno, String entityEmail, Long loanUserId) {
        this.dateLoan = dateLoan;
        this.homeTransport = homeTransport;
        this.assumeSpent = assumeSpent;
        this.amountTransport = amountTransport;
        this.observations = observations;
        this.entityFirstName = entityFirstName;
        this.entityLastName = entityLastName;
        this.entityTfno = entityTfno;
        this.entityEmail = entityEmail;
        this.loanUserId = loanUserId;
    }

    public LocalDateTime getDateLoan() {
        return dateLoan;
    }

    public void setDateLoan(LocalDateTime dateLoan) {
        this.dateLoan = dateLoan;
    }

    public Boolean getHomeTransport() {
        return homeTransport;
    }

    public void setHomeTransport(Boolean homeTransport) {
        this.homeTransport = homeTransport;
    }

    public String getAssumeSpent() {
        return assumeSpent;
    }

    public void setAssumeSpent(String assumeSpent) {
        this.assumeSpent = assumeSpent;
    }

    public Float getAmountTransport() {
        return amountTransport;
    }

    public void setAmountTransport(Float amountTransport) {
        this.amountTransport = amountTransport;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public String getEntityFirstName() {
        return entityFirstName;
    }

    public void setEntityFirstName(String entityFirstName) {
        this.entityFirstName = entityFirstName;
    }

    public String getEntityLastName() {
        return entityLastName;
    }

    public void setEntityLastName(String entityLastName) {
        this.entityLastName = entityLastName;
    }

    public String getEntityTfno() {
        return entityTfno;
    }

    public void setEntityTfno(String entityTfno) {
        this.entityTfno = entityTfno;
    }

    public String getEntityEmail() {
        return entityEmail;
    }

    public void setEntityEmail(String entityEmail) {
        this.entityEmail = entityEmail;
    }

    public Long getLoanUserId() {
        return loanUserId;
    }

    public void setLoanUserId(Long loanUserId) {
        this.loanUserId = loanUserId;
    }
}
