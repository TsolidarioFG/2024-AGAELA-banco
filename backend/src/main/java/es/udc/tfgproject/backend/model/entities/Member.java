package es.udc.tfgproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="\"Member\"", schema="public")
public class Member {

	public enum Gender {FEMALE, MALE};

	private Long id;
	private String firstName;
	private String lastName;
	private LocalDate birthdate;
	private String tfno;
	private String email;
	private Gender gender;
	private String country;
	private String province;
	private String city;
	private int cp;
	private String address;
	private int amount;
	private String IBAN;

	public Member() {}

	public Member(String firstName, String lastName, LocalDate birthdate, String tfno, String email, Gender gender, String country, String province, String city, int cp, String address, int amount, String IBAN) {
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

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public String getTfno() {
		return tfno;
	}

	public void setTfno(String tfno) {
		this.tfno = tfno;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
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
