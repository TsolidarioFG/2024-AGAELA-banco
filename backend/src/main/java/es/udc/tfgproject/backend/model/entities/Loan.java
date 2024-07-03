package es.udc.tfgproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="\"Loan\"", schema="public")
public class Loan {
    private Long id;
    private LocalDateTime dateLoan;
    private Boolean homeTransport;
    private String assumeSpent;
    private Float amountTransport;
    private String observations;
    private LocalDateTime devolution;
    private Product product;
    private Member member;
    private EntityUser entity;
    private User loanUser;
    private User devolutionUser;
    private String entityFirstName;
    private String entityLastName;
    private String entityTfno;
    private String entityEmail;


    public Loan() {
    }

    public Loan(LocalDateTime dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, LocalDateTime devolution, Product product, Member member, EntityUser entity, User loanUser, User devolutionUser, String entityFirstName, String entityLastName, String entityTfno, String entityEmail) {
        this.dateLoan = dateLoan;
        this.homeTransport = homeTransport;
        this.assumeSpent = assumeSpent;
        this.amountTransport = amountTransport;
        this.observations = observations;
        this.devolution = devolution;
        this.product = product;
        this.member = member;
        this.entity = entity;
        this.loanUser = loanUser;
        this.devolutionUser = devolutionUser;
        this.entityFirstName = entityFirstName;
        this.entityLastName = entityLastName;
        this.entityTfno = entityTfno;
        this.entityEmail = entityEmail;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getDevolution() {
        return devolution;
    }

    public void setDevolution(LocalDateTime devolution) {
        this.devolution = devolution;
    }

    @ManyToOne(optional=false, fetch=FetchType.EAGER)
    @JoinColumn(name= "memberId")
    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    @ManyToOne(optional=false, fetch=FetchType.EAGER)
    @JoinColumn(name= "productId")
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @ManyToOne(optional=false, fetch=FetchType.EAGER)
    @JoinColumn(name= "entityId")
    public EntityUser getEntityUser() {
        return entity;
    }

    public void setEntityUser(EntityUser entity) {
        this.entity = entity;
    }

    @ManyToOne(optional=false, fetch=FetchType.EAGER)
    @JoinColumn(name= "loanUserId")
    public User getLoanUser() {
        return loanUser;
    }

    public void setLoanUser(User loanUser) {
        this.loanUser = loanUser;
    }

    @ManyToOne(optional=false, fetch=FetchType.EAGER)
    @JoinColumn(name= "devolutionUserId")
    public User getDevolutionUser() {
        return devolutionUser;
    }

    public void setDevolutionUser(User devolutionUser) {
        this.devolutionUser = devolutionUser;
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
