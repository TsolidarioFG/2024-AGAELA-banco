package es.udc.tfgproject.backend.rest.controllers;

import static es.udc.tfgproject.backend.rest.dtos.EntityUserConversor.toEntityUser;
import static es.udc.tfgproject.backend.rest.dtos.EntityUserConversor.toEntityUserDto;
import static es.udc.tfgproject.backend.rest.dtos.MemberConversor.toMember;
import static es.udc.tfgproject.backend.rest.dtos.MemberConversor.toMemberDto;
import java.util.List;

import es.udc.tfgproject.backend.model.entities.EntityUser;
import es.udc.tfgproject.backend.rest.dtos.EntityUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.entities.Member;
import es.udc.tfgproject.backend.model.services.MemberService;
import es.udc.tfgproject.backend.rest.dtos.MemberDto;

@RestController
@RequestMapping("/members")
public class MemberController {
	
	@Autowired
	private MemberService memberService;

	@GetMapping
	public List<Member> findMembers(@RequestParam String keywords){
		return memberService.findMembers(keywords);
	}

	@GetMapping("/{id}")
	public MemberDto findMemberById(@PathVariable String id) throws InstanceNotFoundException {
		if (id == null || id.isEmpty() || id.equals("null") || id.equals("0")) {
			return null;
		} else {
			Long memberId = Long.parseLong(id);
			return toMemberDto(memberService.findMemberById(memberId));
		}
	}


	@GetMapping("/product/{productId}")
	public Long findMemberIdByProductId(@PathVariable Long productId) throws InstanceNotFoundException {
		return memberService.findMemberIdByProductId(productId);
	}

	@PostMapping
	public MemberDto createMember(@RequestBody MemberDto memberDto) {
		Member newMember = toMember(memberDto);

		Member createdMember = memberService.createMember(
				newMember.getFirstName(),
				newMember.getLastName(),
				newMember.getBirthdate(),
				newMember.getTfno(),
				newMember.getEmail(),
				newMember.getGender(),
				newMember.getCountry(),
				newMember.getProvince(),
				newMember.getCity(),
				newMember.getCp(),
				newMember.getAddress(),
				newMember.getAmount(),
				newMember.getIBAN()
		);

		return toMemberDto(createdMember);
	}

	@PutMapping("/{id}")
	public MemberDto updateMember(@PathVariable Long id, @RequestBody MemberDto memberDto) throws InstanceNotFoundException {
        /*
        * if (!id.equals(userId)) {
			throw new PermissionException();
		}*/

		return toMemberDto(memberService.updateMember(id, memberDto.getFirstName(), memberDto.getLastName(), memberDto.getBirthdate(), memberDto.getTfno(), memberDto.getEmail(), memberDto.getGender(), memberDto.getCountry(), memberDto.getProvince(), memberDto.getCity(), memberDto.getCp(), memberDto.getAddress(), memberDto.getAmount(), memberDto.getIBAN()));
	}

	@DeleteMapping("/{id}")
	public void deleteMember(@PathVariable Long id) throws InstanceNotFoundException {
		memberService.deleteMember(id);
	}
	
}
