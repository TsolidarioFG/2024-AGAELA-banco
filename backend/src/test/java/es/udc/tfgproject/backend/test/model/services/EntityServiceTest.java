package es.udc.tfgproject.backend.test.model.services;

import es.udc.tfgproject.backend.model.entities.*;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.services.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class EntityServiceTest {
    @Autowired
    private EntityService entityService;
    @Autowired
    private EntityUserDao entityUserDao;
    @Autowired
    private LoanDao loanDao;
    @Autowired
    private ProductDao productDao;

    public EntityUser createEntity(String entityName){
        EntityUser entity = new EntityUser(entityName);
        entityUserDao.save(entity);
        return entity;
    }

    public Product createProduct(){
        Product product = new Product("PROD_01", null, "Mercado por AGAELA", 150F, "Tipo produto", null, "Produto 1", null, null, null);
        productDao.save(product);
        return product;
    }

    public Loan createEntityLoan(EntityUser entityUser, Product product){
        Loan loan = new Loan(LocalDateTime.now(), null, null, null, null, null, product, null, entityUser, null, null, null,null, null, null);
        loanDao.save(loan);
        return loan;
    }

    @Test
    public void testFindEntityIdByProductId() throws InstanceNotFoundException {
        Product product = createProduct();
        EntityUser entityUser = createEntity("Entidade 1");
        createEntityLoan(entityUser, product);
        assertEquals(entityUser.getId(),entityService.findEntityIdByProductId(product.getId()));
    }

    @Test
    public void testFindEntityIdByProductIdWithNonExistentLoan() {
        Product product = createProduct();
        assertThrows(InstanceNotFoundException.class, () ->
                entityService.findEntityIdByProductId(product.getId()));
    }

    @Test
    public void testFindEntityById() throws InstanceNotFoundException {
        EntityUser entityUser = createEntity("Entidade 1");
        assertEquals(entityUser,entityService.findEntityById(entityUser.getId()));
    }

    @Test
    public void testFindEntityByIdNonExistent() {
        assertThrows(InstanceNotFoundException.class, () ->
                entityService.findEntityById(1L));
    }

    @Test
    public void testCreateEntity() {
        EntityUser entity = entityService.createEntity("Entidade 1");

        assertNotNull(entity.getId());
        assertEquals("Entidade 1", entity.getEntityName());
    }

    @Test
    public void testCreateAndFindEntities() {
        entityService.createEntity("Entidade 1");
        entityService.createEntity("Entidade 2");
        entityService.createEntity("Proba 3");

        List<EntityUser> entities = entityService.findEntities("Entidade");

        assertEquals(2, entities.size());
    }

    @Test
    public void testFindEntitiesWithNoResults() {
        List<EntityUser> entities = entityService.findEntities("Nome non existente");

        assertEquals(0, entities.size());
    }

    @Test
    public void testUpdateEntity() throws InstanceNotFoundException {
        EntityUser entity = entityService.createEntity("Nome de entidade");

        EntityUser updatedEntity = entityService.updateEntity(entity.getId(), "Novo nome");

        assertEquals("Novo nome", updatedEntity.getEntityName());
    }

    @Test
    public void testUpdateNonExistentEntity() {
        assertThrows(InstanceNotFoundException.class, () -> {
            entityService.updateEntity(1L, "Nome");
        });
    }

    @Test
    public void testDeleteEntity() throws InstanceNotFoundException {
        EntityUser entity = entityService.createEntity("Entidade");

        entityService.deleteEntity(entity.getId());

        assertThrows(InstanceNotFoundException.class, () -> {
            entityService.findEntityById(entity.getId());
        });
    }

    @Test
    public void testDeleteNonExistentEntity() {
        assertThrows(InstanceNotFoundException.class, () -> {
            entityService.deleteEntity(1L);
        });
    }


}
