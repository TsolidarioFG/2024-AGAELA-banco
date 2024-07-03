package es.udc.tfgproject.backend.rest.dtos;

import java.time.LocalDateTime;

public class LoanDto {
    private Long id;
    private Long dateLoan;
    private Boolean homeTransport;
    private String assumeSpent;
    private Float amountTransport;
    private String observations;
    private LocalDateTime devolution;
    private String productName;
    private String productCode;
    private Long productId;
    private Long memberId;
    private String memberName;
    private Long entityUserId;
    private String entityUserName;
    private String entityFirstName;
    private String entityLastName;
    private String entityTfno;
    private String entityEmail;
    private Long loanUserId;
    private String loanUserName;
    private Long devolutionUserId;
    private String devolutionUserName;

    public LoanDto() {}


    public LoanDto(Long id, Long dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, LocalDateTime devolution, String productName, String productCode, Long productId, Long memberId, String memberName, Long entityUserId, String entityUserName, String entityFirstName, String entityLastName, String entityTfno, String entityEmail, Long loanUserId, String loanUserName, Long devolutionUserId, String devolutionUserName) {
        this.id = id;
        this.dateLoan = dateLoan;
        this.homeTransport = homeTransport;
        this.assumeSpent = assumeSpent;
        this.amountTransport = amountTransport;
        this.observations = observations;
        this.devolution = devolution;
        this.productName = productName;
        this.productCode = productCode;
        this.productId = productId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.entityUserId = entityUserId;
        this.entityUserName = entityUserName;
        this.entityFirstName = entityFirstName;
        this.entityLastName = entityLastName;
        this.entityTfno = entityTfno;
        this.entityEmail = entityEmail;
        this.loanUserId = loanUserId;
        this.loanUserName = loanUserName;
        this.devolutionUserId = devolutionUserId;
        this.devolutionUserName = devolutionUserName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getDateLoan() {
        return dateLoan;
    }

    public void setDateLoan(Long dateLoan) {
        this.dateLoan = dateLoan;
    }

    public LocalDateTime getDevolution() {
        return devolution;
    }

    public void setDevolution(LocalDateTime devolution) {
        this.devolution = devolution;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public Long getEntityUserId() {
        return entityUserId;
    }

    public void setEntityUserId(Long entityUserId) {
        this.entityUserId = entityUserId;
    }

    public String getEntityUserName() {
        return entityUserName;
    }

    public void setEntityUserName(String entityUserName) {
        this.entityUserName = entityUserName;
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

    public String getLoanUserName() {
        return loanUserName;
    }

    public void setLoanUserName(String loanUserName) {
        this.loanUserName = loanUserName;
    }

    public Long getDevolutionUserId() {
        return devolutionUserId;
    }

    public void setDevolutionUserId(Long devolutionUserId) {
        this.devolutionUserId = devolutionUserId;
    }

    public String getDevolutionUserName() {
        return devolutionUserName;
    }

    public void setDevolutionUserName(String devolutionUserName) {
        this.devolutionUserName = devolutionUserName;
    }
}
