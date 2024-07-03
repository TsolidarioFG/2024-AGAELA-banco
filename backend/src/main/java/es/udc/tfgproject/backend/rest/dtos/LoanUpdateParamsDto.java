package es.udc.tfgproject.backend.rest.dtos;
import java.time.LocalDateTime;

public class LoanUpdateParamsDto {
    private LocalDateTime dateLoan;
    private Boolean homeTransport;
    private String assumeSpent;
    private Float amountTransport;
    private String observations;
    private LocalDateTime devolution;
    private Long productId;
    private Long memberId;
    private Long entityUserId;
    private String entityFirstName;
    private String entityLastName;
    private String entityTfno;
    private String entityEmail;

    public LoanUpdateParamsDto() {}

    public LoanUpdateParamsDto(LocalDateTime dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, LocalDateTime devolution, Long productId, Long memberId, Long entityUserId, String entityFirstName, String entityLastName, String entityTfno, String entityEmail) {
        this.dateLoan = dateLoan;
        this.homeTransport = homeTransport;
        this.assumeSpent = assumeSpent;
        this.amountTransport = amountTransport;
        this.observations = observations;
        this.devolution = devolution;
        this.productId = productId;
        this.memberId = memberId;
        this.entityUserId = entityUserId;
        this.entityFirstName = entityFirstName;
        this.entityLastName = entityLastName;
        this.entityTfno = entityTfno;
        this.entityEmail = entityEmail;
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

    public LocalDateTime getDateLoan() {
        return dateLoan;
    }

    public void setDateLoan(LocalDateTime dateLoan) {
        this.dateLoan = dateLoan;
    }

    public LocalDateTime getDevolution() {
        return devolution;
    }

    public void setDevolution(LocalDateTime devolution) {
        this.devolution = devolution;
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

    public Long getEntityUserId() {
        return entityUserId;
    }

    public void setEntityUserId(Long entityUserId) {
        this.entityUserId = entityUserId;
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
}
