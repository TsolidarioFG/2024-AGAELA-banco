package es.udc.tfgproject.backend.rest.dtos;

import es.udc.tfgproject.backend.model.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserConversor {

    private UserConversor() {}

    public final static UserDto toUserDto(User user) {
        return new UserDto(user.getId(), user.getUserName(), user.getFirstName(), user.getLastName(), user.getEmail(),
                user.getRole().toString());
    }

    public final static User toUser(UserDto userDto) {

        return new User(userDto.getUserName(), userDto.getPassword(), userDto.getFirstName(), userDto.getLastName(),
                userDto.getEmail());
    }

    public final static List<UserDto> toUserDtos(List<User> users){
        return users.stream().map(UserConversor::toUserDto).collect(Collectors.toList());
    }

    public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {

        return new AuthenticatedUserDto(serviceToken, toUserDto(user));

    }

}
