package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.entities.User;
import es.udc.tfgproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.tfgproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.tfgproject.backend.model.exceptions.IncorrectPasswordException;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;

import java.util.List;

public interface UserService {
    void signUp(User user) throws DuplicateInstanceException;

    User login(String userName, String password) throws IncorrectLoginException;

    User loginFromId(Long id) throws InstanceNotFoundException;

    User updateProfile(Long id, String firstName, String lastName, String email) throws InstanceNotFoundException;

    void changePassword(Long id, String oldPassword, String newPassword)
            throws InstanceNotFoundException, IncorrectPasswordException;

    List<User> findUsers();

    void deleteUser(Long userId) throws InstanceNotFoundException;

}
