package es.udc.tfgproject.backend.rest.dtos;

import es.udc.tfgproject.backend.model.entities.Product;

public class ProductDto {

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
    private String state;

    public ProductDto(Long id, String code, byte[] image, String origin, Float price, String type, String subtype, String productName, String description, String location, String observations, String state) {
        this.id = id;
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
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}

