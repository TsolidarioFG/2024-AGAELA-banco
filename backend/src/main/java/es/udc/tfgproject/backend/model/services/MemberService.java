package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.tfgproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.tfgproject.backend.model.exceptions.IncorrectPasswordException;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.entities.Member;

import java.time.LocalDate;
import java.util.List;

public interface MemberService {

	List<Member> findMembers(String keywords);

	Member findMemberById(Long id) throws InstanceNotFoundException;

	Long findMemberIdByProductId(Long productId) throws InstanceNotFoundException;

	Member createMember(String firstName, String lastName, LocalDate birthdate, String tfno, String email, Member.Gender gender, String country, String province, String city, int cp, String address, int amount, String iban);

	Member updateMember(Long memberId, String firstName, String lastName, LocalDate birthdate, String tfno, String email, Member.Gender gender, String country, String province, String city, int cp, String address, int amount, String iban) throws InstanceNotFoundException;

	void deleteMember(Long memberId) throws InstanceNotFoundException;

}
