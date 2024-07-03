package es.udc.tfgproject.backend.test.model.services;

import es.udc.tfgproject.backend.model.entities.*;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.services.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class MemberServiceTest {
    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberDao memberDao;
    @Autowired
    private LoanDao loanDao;
    @Autowired
    private ProductDao productDao;

    public Member createMember(String firstName, String lastName){
        Member member = new Member(firstName, lastName, null, "123456789", null, null, "España", "A Coruna", "A Coruna", 12345, "Rua", 10, "12345");
        memberDao.save(member);
        return member;
    }

    public Product createProduct(){
        Product product = new Product("PROD_01", null, "Mercado por AGAELA", 150F, "Tipo produto", null, "Produto 1", null, null, null);
        productDao.save(product);
        return product;
    }

    public Loan createMemberLoan(Member member, Product product){
        Loan loan = new Loan(LocalDateTime.now(), null, null, null, null, null, product, member, null, null,null, null, null, null, null);
        loanDao.save(loan);
        return loan;
    }

    @Test
    public void testFindMembersEmpty(){
        assertEquals(new ArrayList<>(), memberService.findMembers(""));
    }

    @Test
    public void testFindMembers(){
        Member member1 = createMember("Socio 1", "Apelido 1");
        Member member2 = createMember("Socio 2", "Apelido 2");

        assertEquals(2, memberService.findMembers("").size());
        assertTrue(memberService.findMembers("").contains(member1));
        assertTrue(memberService.findMembers("").contains(member2));
        assertEquals("Socio 1", memberService.findMembers("").get(0).getFirstName());
    }

    @Test
    public void testFindMembersWithKeywords(){
        Member member1 = createMember("Socio 1", "Apelido 1");
        Member member2 = createMember("Socio 2", "Apelido 2");

        assertEquals(1, memberService.findMembers("1").size());
        assertTrue(memberService.findMembers("").contains(member1));
    }

    @Test
    public void testFindMemberIdByProductId() throws InstanceNotFoundException {
        Product product = createProduct();
        Member member = createMember("Socio 1", "Apelido 1");
        createMemberLoan(member, product);
        assertEquals(member.getId(), memberService.findMemberIdByProductId(product.getId()));
    }

    @Test
    public void testFindMemberIdByProductIdWithNonExistentLoan() {
        Product product = createProduct();
        assertThrows(InstanceNotFoundException.class, () ->
                memberService.findMemberIdByProductId(product.getId()));
    }

    @Test
    public void testFindMemberById() throws InstanceNotFoundException {
        Member member = createMember("Socio 1", "Apelido 1");
        assertEquals(member, memberService.findMemberById(member.getId()));
    }

    @Test
    public void testFindMemberByIdNonExistent() {
        assertThrows(InstanceNotFoundException.class, () ->
                memberService.findMemberById(1L));
    }

    @Test
    public void testCreateMember() {
        Member member = memberService.createMember("Juan", "García", LocalDate.of(1990, 5, 15), "123456789", "juan@gmail.com", Member.Gender.MALE, "Spain", "A Coruña", "A Coruña", 15002, "Rua", 10, "ES123456789");
        assertNotNull(member.getId());
        assertEquals("Juan", member.getFirstName());
        assertEquals("García", member.getLastName());
        assertEquals(LocalDate.of(1990, 5, 15), member.getBirthdate());
        assertEquals("123456789", member.getTfno());
        assertEquals("juan@gmail.com", member.getEmail());
        assertEquals(Member.Gender.MALE, member.getGender());
        assertEquals("Spain", member.getCountry());
        assertEquals("A Coruña", member.getProvince());
        assertEquals("A Coruña", member.getCity());
        assertEquals(15002, member.getCp());
        assertEquals("Rua", member.getAddress());
        assertEquals(10, member.getAmount());
        assertEquals("ES123456789", member.getIBAN());
    }


    @Test
    public void testUpdateMember() throws InstanceNotFoundException {
        Member member = createMember("Socio", "Apelido");

        Member updatedMember = memberService.updateMember(member.getId(), "Juan", "García", LocalDate.of(1990, 5, 15), "123456789", "juan@gmail.com", Member.Gender.MALE, "Spain", "A Coruña", "A Coruña", 15002, "Rua", 10, "ES123456789");

        assertEquals("Juan", updatedMember.getFirstName());
        assertEquals("García", updatedMember.getLastName());
        assertEquals(LocalDate.of(1990, 5, 15), updatedMember.getBirthdate());
        assertEquals("123456789", updatedMember.getTfno());
        assertEquals("juan@gmail.com", updatedMember.getEmail());
        assertEquals(Member.Gender.MALE, updatedMember.getGender());
        assertEquals("Spain", updatedMember.getCountry());
        assertEquals("A Coruña", updatedMember.getProvince());
        assertEquals("A Coruña", updatedMember.getCity());
        assertEquals(15002, updatedMember.getCp());
        assertEquals("Rua", updatedMember.getAddress());
        assertEquals(10, updatedMember.getAmount());
        assertEquals("ES123456789", updatedMember.getIBAN());
    }

    @Test
    public void testUpdateNonExistentMember() {
        assertThrows(InstanceNotFoundException.class, () -> memberService.updateMember(1L, "Juan", "García", LocalDate.of(1990, 5, 15), "123456789", "juan@gmail.com", Member.Gender.MALE, "Spain", "A Coruña", "A Coruña", 15002, "Rua", 10, "ES123456789"));
    }

    @Test
    public void testDeleteMember() throws InstanceNotFoundException {
        Member member = createMember("Socio", "Apelido");

        memberService.deleteMember(member.getId());

        assertThrows(InstanceNotFoundException.class, () -> memberService.findMemberById(member.getId()));
    }

    @Test
    public void testDeleteNonExistentMember() {
        assertThrows(InstanceNotFoundException.class, () -> memberService.deleteMember(1L));
    }
}
