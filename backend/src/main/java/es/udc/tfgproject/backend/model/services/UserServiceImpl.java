package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.entities.User;
import es.udc.tfgproject.backend.model.entities.UserDao;
import es.udc.tfgproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.tfgproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.tfgproject.backend.model.exceptions.IncorrectPasswordException;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Override
    public void signUp(User user) throws DuplicateInstanceException {

        if (userDao.existsByUserName(user.getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", user.getUserName());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.RoleType.USER);

        userDao.save(user);

    }

    @Override
    @Transactional(readOnly=true)
    public User login(String userName, String password) throws IncorrectLoginException {

        Optional<User> user = userDao.findByUserName(userName);

        if (!user.isPresent()) {
            throw new IncorrectLoginException(userName, password);
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new IncorrectLoginException(userName, password);
        }

        return user.get();

    }

    @Override
    @Transactional(readOnly=true)
    public User loginFromId(Long id) throws InstanceNotFoundException {
        return permissionChecker.checkUser(id);
    }

    @Override
    public User updateProfile(Long id, String firstName, String lastName, String email) throws InstanceNotFoundException {

        User user = permissionChecker.checkUser(id);

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);

        return user;

    }

    @Override
    public void changePassword(Long id, String oldPassword, String newPassword)
            throws InstanceNotFoundException, IncorrectPasswordException {

        User user = permissionChecker.checkUser(id);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IncorrectPasswordException();
        } else {
            user.setPassword(passwordEncoder.encode(newPassword));
        }

    }

    @Override
    public List<User> findUsers(){
        return userDao.findByRole(User.RoleType.USER);
    }

    @Override
    public void deleteUser(Long userId) throws InstanceNotFoundException{
        Optional<User> optionalUser = userDao.findById(userId);

        if (!optionalUser.isPresent()) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

        User user = optionalUser.get();

        userDao.delete(user);
    }
}
