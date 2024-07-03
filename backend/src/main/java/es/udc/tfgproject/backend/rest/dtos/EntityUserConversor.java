package es.udc.tfgproject.backend.rest.dtos;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.entities.EntityUserDao;
import es.udc.tfgproject.backend.model.entities.Product;

import java.util.List;
import java.util.stream.Collectors;

public class EntityUserConversor {
    private EntityUserConversor() {}

    public final static EntityUser toEntityUser(EntityUserDto entityUserDto) {
        return new EntityUser(entityUserDto.getEntityName());
    }

    public final static EntityUserDto toEntityUserDto(EntityUser entity){
        return new EntityUserDto(entity.getId(), entity.getEntityName());
    }

    public final static List<EntityUserDto> toEntityUserDtos(List<EntityUser> entitiesUser){
        return entitiesUser.stream().map(EntityUserConversor::toEntityUserDto).collect(Collectors.toList());
    }
}
