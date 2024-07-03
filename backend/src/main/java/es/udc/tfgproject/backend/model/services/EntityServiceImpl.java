package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.entities.EntityUserDao;
import es.udc.tfgproject.backend.model.entities.Member;
import es.udc.tfgproject.backend.model.entities.Product;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EntityServiceImpl implements EntityService {

    @Autowired
    private EntityUserDao entityUserDao;

    @Override
    public List<EntityUser> findEntities(String keywords){
        return entityUserDao.findByEntityNameContainingIgnoreCaseOrderByIdAsc(keywords);
    }

    @Override
    public Long findEntityIdByProductId(Long productId) throws InstanceNotFoundException {
        Optional<Long> entityUserId = entityUserDao.findEntityUserIdByProductId(productId);

		if(!entityUserId.isPresent())
            throw new InstanceNotFoundException("project.entities.product", productId);

        return entityUserId.get();
    }

    @Override
    public EntityUser findEntityById(Long id) throws InstanceNotFoundException{

        Optional<EntityUser> entityUser = entityUserDao.findById(id);

        if(!entityUser.isPresent()){
            throw new InstanceNotFoundException("project.entities", id);
        }

        return entityUser.get();
    }

    @Override
    public EntityUser createEntity(String entityName){
        EntityUser entityUser = new EntityUser(entityName);
        return entityUserDao.save(entityUser);
    }

    @Override
    public EntityUser updateEntity(Long entityId, String entityName) throws InstanceNotFoundException {
        Optional<EntityUser> optionalEntityUser = entityUserDao.findById(entityId);

        if (!optionalEntityUser.isPresent()) {
            throw new InstanceNotFoundException("project.entities", entityId);
        }

        EntityUser entityUser = optionalEntityUser.get();
        entityUser.setEntityName(entityName);

        return entityUserDao.save(entityUser);
    }

    @Override
    public void deleteEntity(Long entityId) throws InstanceNotFoundException {
        Optional<EntityUser> optionalEntityUser = entityUserDao.findById(entityId);

        if (!optionalEntityUser.isPresent()) {
            throw new InstanceNotFoundException("project.entities", entityId);
        }

        EntityUser entityUser = optionalEntityUser.get();

        entityUserDao.delete(entityUser);
    }

}
