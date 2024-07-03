package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.Member;
import es.udc.tfgproject.backend.model.entities.User;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;

public interface PermissionChecker {
	
	void checkUserExists(Long userId) throws InstanceNotFoundException;
	
	User checkUser(Long userId) throws InstanceNotFoundException;
	
}
