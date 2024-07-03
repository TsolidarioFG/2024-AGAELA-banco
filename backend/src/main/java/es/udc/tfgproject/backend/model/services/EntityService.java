package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.entities.Member;
import es.udc.tfgproject.backend.model.entities.Product;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;

import javax.swing.text.html.parser.Entity;
import java.util.List;

public interface EntityService  {
    List<EntityUser> findEntities(String keywords);
    Long findEntityIdByProductId(Long productId) throws InstanceNotFoundException;
    EntityUser findEntityById(Long id) throws InstanceNotFoundException;
    EntityUser createEntity(String entityName);
    EntityUser updateEntity(Long entityId, String entityName) throws InstanceNotFoundException;
    void deleteEntity(Long entityId) throws InstanceNotFoundException;
}
