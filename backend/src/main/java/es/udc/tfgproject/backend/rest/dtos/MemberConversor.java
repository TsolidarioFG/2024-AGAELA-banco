package es.udc.tfgproject.backend.rest.dtos;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.model.entities.Member;

public class MemberConversor {
	
	private MemberConversor() {}

	public final static Member toMember(MemberDto memberDto) {
		return new Member(memberDto.getFirstName(), memberDto.getLastName(), memberDto.getBirthdate(), memberDto.getTfno(), memberDto.getEmail(), memberDto.getGender(), memberDto.getCountry(), memberDto.getProvince(), memberDto.getCity(), memberDto.getCp(), memberDto.getAddress(), memberDto.getAmount(), memberDto.getIBAN());
	}

	public final static MemberDto toMemberDto(Member member) {
		return new MemberDto(member.getId(), member.getFirstName(), member.getLastName(), member.getBirthdate(), member.getTfno(), member.getEmail(),
				member.getGender(), member.getCountry(), member.getProvince(), member.getCity(), member.getCp(), member.getAddress(), member.getAmount(), member.getIBAN());
	}

}
