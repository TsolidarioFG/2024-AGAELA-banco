package es.udc.tfgproject.backend.rest.dtos;

public class EntityUserDto {
    private Long id;
    private String entityName;

    public EntityUserDto(Long id, String entityName) {
        this.id = id;
        this.entityName = entityName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }
}
