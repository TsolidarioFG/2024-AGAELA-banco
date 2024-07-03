package es.udc.tfgproject.backend.rest.dtos;

import es.udc.tfgproject.backend.model.entities.Member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Date;

public class MemberDto {
	
	public interface AllValidations {}
	
	public interface UpdateValidations {}

	private Long id;
	private String firstName;
	private String lastName;
	private LocalDate birthdate;
	private String tfno;
	private String email;
	private Member.Gender gender;
	private String country;
	private String province;
	private String city;
	private int cp;
	private String address;
	private int amount;
	private String IBAN;

	public MemberDto() {}

	public MemberDto(Long id, String firstName, String lastName, LocalDate birthdate, String tfno, String email, Member.Gender gender, String country, String province, String city, int cp, String address, int amount, String IBAN) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthdate = birthdate;
		this.tfno = tfno;
		this.email = email;
		this.gender = gender;
		this.country = country;
		this.province = province;
		this.city = city;
		this.cp = cp;
		this.address = address;
		this.amount = amount;
		this.IBAN = IBAN;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName.trim();
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName.trim();
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
	@Email(groups={AllValidations.class, UpdateValidations.class})
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email.trim();
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	public String getTfno() {
		return tfno;
	}

	public void setTfno(String tfno) {
		this.tfno = tfno;
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	public Member.Gender getGender() {
		return gender;
	}

	public void setGender(Member.Gender gender) {
		this.gender = gender;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getCp() {
		return cp;
	}

	public void setCp(int cp) {
		this.cp = cp;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getIBAN() {
		return IBAN;
	}

	public void setIBAN(String IBAN) {
		this.IBAN = IBAN;
	}
}
