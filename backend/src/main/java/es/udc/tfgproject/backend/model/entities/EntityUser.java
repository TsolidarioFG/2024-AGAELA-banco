package es.udc.tfgproject.backend.model.entities;

import javax.persistence.*;

@Entity
@Table(name="\"EntityUser\"", schema="public")
public class EntityUser {
    private Long id;
    private String entityName;

    public EntityUser() {}

    public EntityUser(String entityName) {
        this.entityName = entityName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
