package es.udc.tfgproject.backend.model.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import es.udc.tfgproject.backend.model.entities.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.entities.MemberDao;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	private MemberDao memberDao;

	@Override
	public List<Member> findMembers(String keywords){
		return memberDao.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(keywords, keywords);
	}

	@Override
	public Member findMemberById(Long id) throws InstanceNotFoundException{

		Optional<Member> member = memberDao.findById(id);

		if(!member.isPresent()){
			throw new InstanceNotFoundException("project.entities.member", id);
		}

		return member.get();
	}

	@Override
	public Long findMemberIdByProductId(Long productId) throws InstanceNotFoundException{
		Optional<Long> memberId = memberDao.findMemberIdByProductId(productId);

		if(!memberId.isPresent())
			throw new InstanceNotFoundException("project.entities.member.product", productId);

		return memberId.get();
	}

	@Override
	public Member createMember(String firstName, String lastName, LocalDate birthdate, String tfno, String email, Member.Gender gender, String country, String province, String city, int cp, String address, int amount, String iban){
		Member member = new Member(firstName, lastName, birthdate, tfno, email, gender, country, province, city, cp, address, amount, iban);
		return memberDao.save(member);
	}

	@Override
	public Member updateMember(Long memberId, String firstName, String lastName, LocalDate birthdate, String tfno, String email, Member.Gender gender, String country, String province, String city, int cp, String address, int amount, String iban) throws InstanceNotFoundException {
		Optional<Member> optionalMember = memberDao.findById(memberId);

		if (!optionalMember.isPresent()) {
			throw new InstanceNotFoundException("project.entities.member", memberId);
		}

		Member member = optionalMember.get();
		member.setFirstName(firstName);
		member.setLastName(lastName);
		member.setBirthdate(birthdate);
		member.setTfno(tfno);
		member.setEmail(email);
		member.setGender(gender);
		member.setCountry(country);
		member.setProvince(province);
		member.setCity(city);
		member.setCp(cp);
		member.setAddress(address);
		member.setAmount(amount);
		member.setIBAN(iban);

		return memberDao.save(member);
	}

	@Override
	public void deleteMember(Long memberId) throws InstanceNotFoundException {
		Optional<Member> optionalMember = memberDao.findById(memberId);

		if (!optionalMember.isPresent()) {
			throw new InstanceNotFoundException("project.entities.member", memberId);
		}

		Member member = optionalMember.get();

		memberDao.delete(member);
	}

}
