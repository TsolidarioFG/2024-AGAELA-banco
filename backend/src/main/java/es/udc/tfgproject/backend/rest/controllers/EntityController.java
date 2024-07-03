package es.udc.tfgproject.backend.rest.controllers;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.services.EntityService;
import es.udc.tfgproject.backend.rest.dtos.EntityUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static es.udc.tfgproject.backend.rest.dtos.EntityUserConversor.*;

@RestController
@RequestMapping("/entities")
public class EntityController {
    @Autowired
    private EntityService entityService;

    @GetMapping
    public List<EntityUserDto> findEntities(@RequestParam String keywords){
        return toEntityUserDtos(entityService.findEntities(keywords));
    }

    @GetMapping("/product/{productId}")
    public Long findEntityIdByProductId(@PathVariable Long productId) throws InstanceNotFoundException {
        return entityService.findEntityIdByProductId(productId);
    }

    @GetMapping("/{id}")
    public EntityUserDto findEntityById(@PathVariable String id) throws InstanceNotFoundException {
        if (id == null || id.isEmpty() || id.equals("null") || id.equals("0")) {
            return null;
        } else {
            Long entityId = Long.parseLong(id);
            return toEntityUserDto(entityService.findEntityById(entityId));
        }
    }

    @PostMapping
    public EntityUserDto createEntity(@RequestBody EntityUserDto entityUserDto) {
        EntityUser newEntity = toEntityUser(entityUserDto);

        EntityUser createdEntity = entityService.createEntity(
                newEntity.getEntityName()
        );

        return toEntityUserDto(createdEntity);
    }

    @PutMapping("/{id}")
    public EntityUserDto updateEntity(@PathVariable Long id, @RequestBody EntityUserDto entityUserDto) throws InstanceNotFoundException {
        /*
        * if (!id.equals(userId)) {
			throw new PermissionException();
		}*/

		return toEntityUserDto(entityService.updateEntity(id, entityUserDto.getEntityName()));
    }

    @DeleteMapping("/{id}")
    public void deleteEntity(@PathVariable Long id) throws InstanceNotFoundException {
        entityService.deleteEntity(id);
    }


}
