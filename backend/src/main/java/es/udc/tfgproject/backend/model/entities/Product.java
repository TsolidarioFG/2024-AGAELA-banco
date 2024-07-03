package es.udc.tfgproject.backend.model.entities;

import javax.persistence.*;

@Entity
@Table(name="\"Product\"", schema="public")
public class Product {
    public enum State {NOT_LOAN, LOAN};

    private Long id;
    private String code;
    private byte[] image;
    private String origin;
    private Float price;
    private String type;
    private String subtype;
    private String productName;
    private String description;
    private String location;
    private String observations;
    private State state;

    public Product() {
    }

    public Product(String code, byte[] image, String origin, Float price, String type, String subtype, String productName, String description, String location, String observations) {
        this.code = code;
        this.image = image;
        this.origin = origin;
        this.price = price;
        this.type = type;
        this.subtype = subtype;
        this.productName = productName;
        this.description = description;
        this.location = location;
        this.observations = observations;
        this.state = State.NOT_LOAN;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
