package es.udc.tfgproject.backend.test.model.services;

import es.udc.tfgproject.backend.model.entities.*;
import es.udc.tfgproject.backend.model.exceptions.AlreadyRegisteredLoanException;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.services.LoanService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class LoanServiceTest {
    @Autowired
    private LoanService loanService;
    @Autowired
    private MemberDao memberDao;
    @Autowired
    private EntityUserDao entityUserDao;
    @Autowired
    private LoanDao loanDao;
    @Autowired
    private ProductDao productDao;

    public Member createMember(String firstName, String lastName){
        Member member = new Member(firstName, lastName, null, "123456789", null, null, "España", "A Coruna", "A Coruna", 12345, "Rua", 10, "12345");
        memberDao.save(member);
        return member;
    }

    public EntityUser createEntity(String entityName){
        EntityUser entity = new EntityUser(entityName);
        entityUserDao.save(entity);
        return entity;
    }

    public Product createProduct(String productCode, String productName){
        Product product = new Product(productCode, null, "Mercado por AGAELA", 150F, "Tipo produto", null, productName, null, null, null);
        productDao.save(product);
        return product;
    }

    public Loan createMemberLoan(Member member, Product product){
        Loan loan = new Loan(LocalDateTime.now(), null, null, null, null, null, product, member, null, null, null, null,null, null, null);
        loanDao.save(loan);
        return loan;
    }

    public Loan createEntityLoan(EntityUser entityUser, Product product){
        Loan loan = new Loan(LocalDateTime.now(), null, null, null, null, null, product, null, entityUser, null, null, null,null, null, null);
        loanDao.save(loan);
        return loan;
    }


    @Test
    public void testRegisterMemberLoan() throws InstanceNotFoundException, AlreadyRegisteredLoanException {
        Member member = createMember("Socio", "Apelido");

        Product product = createProduct("PROD_01", "Producto 1");

        Loan loan = loanService.registerLoan(product.getId(), null, member.getId(), null, null,false, "AGAELA", 10F, "Observacion", null, null, null, null);

        assertEquals(product, loan.getProduct());
        assertEquals(member, loan.getMember());
        assertNull(loan.getEntityUser());
        assertFalse(loan.getHomeTransport());
        assertEquals("AGAELA", loan.getAssumeSpent());
        assertEquals(10, loan.getAmountTransport());
        assertEquals("Observacion", loan.getObservations());
    }

    @Test
    public void testRegisterEntityLoan() throws InstanceNotFoundException, AlreadyRegisteredLoanException {
        EntityUser entityUser = createEntity("Entidade");

        Product product = createProduct("PROD_01", "Producto 1");

        Loan loan = loanService.registerLoan(product.getId(), null, null, entityUser.getId(), null, false, "AGAELA", 10F, "Observacion", "Pepe", "Castro", "123456789", "pepe@gmail.com");

        assertEquals(product, loan.getProduct());
        assertNull(loan.getMember());
        assertEquals(entityUser, loan.getEntityUser());
        assertFalse(loan.getHomeTransport());
        assertEquals("AGAELA", loan.getAssumeSpent());
        assertEquals(10, loan.getAmountTransport());
        assertEquals("Observacion", loan.getObservations());
        assertEquals("Pepe", loan.getEntityFirstName());
        assertEquals("Castro", loan.getEntityLastName());
        assertEquals("123456789", loan.getEntityTfno());
        assertEquals("pepe@gmail.com", loan.getEntityEmail());
    }

    @Test
    public void testRegisterLoanWithNonExistentProduct() {
        Member member = createMember("Socio", "Apelido");

        assertThrows(InstanceNotFoundException.class, () ->
                loanService.registerLoan(1L, null, member.getId(), null, null,false, "AGAELA", 10F, "Observacion", null, null, null, null));
    }

    @Test
    public void testRegisterLoanWithNonExistentMember() {
        Product product = createProduct("PROD_01", "Producto 1");

        assertThrows(InstanceNotFoundException.class, () ->
                loanService.registerLoan(product.getId(), null, 1L, null, null, false, "AGAELA", 10F, "Observacion", null, null, null, null));
    }

    @Test
    public void testRegisterLoanWithNonExistentEntity() {
        Product product = createProduct("PROD_01", "Producto 1");

        assertThrows(InstanceNotFoundException.class, () ->
                loanService.registerLoan(product.getId(), null, null, 1L, null,false, "AGAELA", 10F, "Observacion", null, null, null, null));
    }

    @Test
    public void testRegisterMemberLoanAlreadyRegistered() throws AlreadyRegisteredLoanException, InstanceNotFoundException {
        Member member = createMember("Socio", "Apelido");

        Product product = createProduct("PROD_01", "Producto 1");

        loanService.registerLoan(product.getId(), null, member.getId(), null, null,false, "AGAELA", 10F, "Observacion", null, null, null, null);

        assertThrows(AlreadyRegisteredLoanException.class, () ->
                loanService.registerLoan(product.getId(), null, member.getId(), null, null,false, "AGAELA", 10F, "Observacion", null, null, null, null));
    }

    @Test
    public void testRegisterDevolution() throws InstanceNotFoundException {
        Member member = createMember("Socio", "Apelido");
        Product product1 = createProduct("PROD_01", "Producto 1");
        Loan loan1 = createMemberLoan(member, product1);
        String observations = "Producto 1 devuelto";

        assertNull(loan1.getDevolution());

        loanService.registerDevolution(product1.getId(), null, observations);

        assertNotNull(loan1.getDevolution());
        assertEquals(observations, loan1.getObservations());
    }

    @Test
    public void testRegisterDevolutionWithNonExistentProduct() {
        assertThrows(InstanceNotFoundException.class, () ->
                loanService.registerDevolution(1L, null,""));
    }

    @Test
    public void testFindLoansEmpty(){
        assertEquals(new ArrayList<>(), loanService.findLoans("", null, null));
    }

    @Test
    public void testFindNoLoans(){
        Member member = createMember("Socio", "Apelido");

        Product product1 = createProduct("PROD_01", "Producto 1");
        Product product2 = createProduct("PROD_02", "Producto 2");


        createMemberLoan(member, product1);
        createMemberLoan(member, product2);
        assertEquals(0, loanService.findLoans("Grúa", null, null).size());
    }

    @Test
    public void testFindAllLoans(){
        Member member = createMember("Socio", "Apelido");
        EntityUser entityUser = createEntity("Entidade");

        Product product1 = createProduct("PROD_01", "Producto 1");
        Product product2 = createProduct("PROD_02", "Producto 2");
        Product product3 = createProduct("PROD_03", "Producto 3");


        Loan loan1 = createMemberLoan(member, product1);
        Loan loan2 = createMemberLoan(member, product2);
        Loan loan3 = createEntityLoan(entityUser, product3);

        assertEquals(3, loanService.findLoans("", null, null).size());
        assertTrue(loanService.findLoans("", null, null).contains(loan1));
        assertTrue(loanService.findLoans("", null, null).contains(loan2));
        assertTrue(loanService.findLoans("", null, null).contains(loan3));
    }

    @Test
    public void testFindLoans(){
        Member member = createMember("Socio", "Apelido");
        EntityUser entityUser = createEntity("Entidade");

        Product product1 = createProduct("PROD_01", "Producto 1");
        Product product2 = createProduct("PROD_02", "Producto 2");
        Product product3 = createProduct("PROD_03", "Producto 3");

        createMemberLoan(member, product1);
        Loan loan2 = createMemberLoan(member, product2);
        createEntityLoan(entityUser, product3);

        assertEquals(1, loanService.findLoans("2",  null, null).size());
        assertTrue(loanService.findLoans("2", null, null).contains(loan2));
    }

    @Test
    public void testFindLoansByMemberEmpty(){
        Member member = createMember("Socio", "Apelido");
        assertEquals(new ArrayList<>(), loanService.findLoansByMember(member.getId(), "", null, null));
    }

    @Test
    public void testFindLoansByMember(){
        Member member = createMember("Socio", "Apelido");
        Product product1 = createProduct("PROD_01", "Producto 1");
        Product product2 = createProduct("PROD_02", "Producto 2");

        Loan loan1 = createMemberLoan(member, product1);
        Loan loan2 = createMemberLoan(member, product2);

        assertEquals(2, loanService.findLoansByMember(member.getId(), "", null, null).size());
        assertTrue(loanService.findLoansByMember(member.getId(), "", null, null).contains(loan1));
        assertTrue(loanService.findLoansByMember(member.getId(), "", null, null).contains(loan2));
    }

    @Test
    public void testFindLoansByMemberWithKeywordsAndDateRange(){
        Member member = createMember("Socio", "Apelido");
        Product product1 = createProduct("PROD_01", "Producto 1");
        Product product2 = createProduct("PROD_02", "Producto 2");

        Loan loan1 = createMemberLoan(member, product1);
        Loan loan2 = createMemberLoan(member, product2);

        LocalDate startDate = LocalDate.now().plusDays(1);
        assertEquals(0, loanService.findLoansByMember(member.getId(), "keyword", startDate, null).size());

        assertEquals(2, loanService.findLoansByMember(member.getId(), "Producto", null, null).size());
        assertTrue(loanService.findLoansByMember(member.getId(), "Producto", null, null).contains(loan1));
        assertTrue(loanService.findLoansByMember(member.getId(), "Producto", null, null).contains(loan2));
    }

    @Test
    public void testFindLoansByEntityEmpty(){
        EntityUser entityUser = createEntity("Entidade");
        assertEquals(new ArrayList<>(), loanService.findLoansByEntity(entityUser.getId(), "", null, null));
    }

    @Test
    public void testFindLoansByEntity(){
        EntityUser entityUser = createEntity("Entidade");
        Product product1 = createProduct("PROD_01", "Producto 1");
        Product product2 = createProduct("PROD_02", "Producto 2");

        Loan loan1 = createEntityLoan(entityUser, product1);
        Loan loan2 = createEntityLoan(entityUser, product2);

        assertEquals(2, loanService.findLoansByEntity(entityUser.getId(), "", null, null).size());
        assertTrue(loanService.findLoansByEntity(entityUser.getId(), "", null, null).contains(loan1));
        assertTrue(loanService.findLoansByEntity(entityUser.getId(), "", null, null).contains(loan2));
    }

    @Test
    public void testFindLoansByEntityWithKeywordsAndDateRange(){
        EntityUser entityUser = createEntity("Entidade");
        Product product1 = createProduct("PROD_01", "Producto 1");
        Product product2 = createProduct("PROD_02", "Producto 2");

        Loan loan1 = createEntityLoan(entityUser, product1);
        Loan loan2 = createEntityLoan(entityUser, product2);

        LocalDate startDate = LocalDate.now().plusDays(1);
        assertEquals(0, loanService.findLoansByEntity(entityUser.getId(), "keyword", startDate, null).size());

        assertEquals(2, loanService.findLoansByEntity(entityUser.getId(), "Producto", null, null).size());
        assertTrue(loanService.findLoansByEntity(entityUser.getId(), "Producto", null, null).contains(loan1));
        assertTrue(loanService.findLoansByEntity(entityUser.getId(), "Producto", null, null).contains(loan2));
    }

    @Test
    public void testFindLoansByProductEmpty(){
        Product product = createProduct("PROD_01", "Producto 1");
        assertEquals(new ArrayList<>(), loanService.findLoansByProduct(product.getId(), "", null, null));
    }

    @Test
    public void testFindLoansByProduct(){
        Product product = createProduct("PROD_01", "Producto 1");
        Member member = createMember("Socio", "Apelido");
        EntityUser entityUser = createEntity("Entidade");

        Loan loan1 = createMemberLoan(member, product);
        Loan loan2 = createEntityLoan(entityUser, product);

        assertEquals(2, loanService.findLoansByProduct(product.getId(), "", null, null).size());
        assertTrue(loanService.findLoansByProduct(product.getId(), "", null, null).contains(loan1));
        assertTrue(loanService.findLoansByProduct(product.getId(), "", null, null).contains(loan2));
    }

    @Test
    public void testFindLoansByProductWithKeywordsAndDateRange(){
        Product product = createProduct("PROD_01", "Producto 1");
        Member member = createMember("Socio", "Apelido");
        EntityUser entityUser = createEntity("Entidade");

        Loan loan1 = createMemberLoan(member, product);
        createEntityLoan(entityUser, product);

        LocalDate startDate = LocalDate.now().plusDays(1);
        assertEquals(0, loanService.findLoansByProduct(product.getId(), "keyword", startDate, null).size());

        assertEquals(1, loanService.findLoansByProduct(product.getId(), "Socio", null, null).size());
        assertTrue(loanService.findLoansByProduct(product.getId(), "Socio", null, null).contains(loan1));
    }

    @Test
    public void testUpdateLoan() throws InstanceNotFoundException {
        Member member = createMember("Socio", "Apelido");
        EntityUser entityUser = createEntity("Entidade");
        Product product = createProduct("PROD_01", "Producto 1");
        Loan loan = createMemberLoan(member, product);

        Long newProductId = createProduct("PROD_02", "Producto 2").getId();
        Long newEntityId = entityUser.getId();
        LocalDateTime newDateLoan = LocalDateTime.now().minusDays(1);
        Boolean newHomeTransport = true;
        String newAssumeSpent = "Novo asume gasto";
        Float newAmountTransport = 20F;
        String newObservations = "Nova observación";
        LocalDateTime newDevolution = LocalDateTime.now().minusHours(1);
        String newFirstName = "Novo nome";
        String newLastName = "";
        String newTfno = "987654321";
        String newEmail = "user@gmail.com";

        Loan updatedLoan = loanService.updateLoan(loan.getId(), newProductId, null, newEntityId, newDateLoan,
                newHomeTransport, newAssumeSpent, newAmountTransport, newObservations, newDevolution, newFirstName,
                newLastName, newTfno, newEmail);

        assertEquals(newProductId, updatedLoan.getProduct().getId());
        assertEquals(newEntityId, updatedLoan.getEntityUser().getId());
        assertEquals(newDateLoan, updatedLoan.getDateLoan());
        assertEquals(newHomeTransport, updatedLoan.getHomeTransport());
        assertEquals(newAssumeSpent, updatedLoan.getAssumeSpent());
        assertEquals(newAmountTransport, updatedLoan.getAmountTransport());
        assertEquals(newObservations, updatedLoan.getObservations());
        assertEquals(newDevolution, updatedLoan.getDevolution());
        assertEquals(newFirstName, updatedLoan.getEntityFirstName());
        assertEquals(newLastName, updatedLoan.getEntityLastName());
        assertEquals(newTfno, updatedLoan.getEntityTfno());
        assertEquals(newEmail, updatedLoan.getEntityEmail());
    }

    @Test
    public void testUpdateNonExistentLoan() {
        assertThrows(InstanceNotFoundException.class, () -> loanService.updateLoan(1L, 2L, null, null, null, null,
                null, null, null, null, null, null, null, null));
    }

    @Test
    public void testDeleteLoan() throws InstanceNotFoundException {
        Member member = createMember("Socio", "Apelido");
        Product product = createProduct("PROD_01", "Producto 1");
        Loan loan = createMemberLoan(member, product);

        loanService.deleteLoan(loan.getId());

        Optional<Loan> deletedLoan = loanDao.findLoanById(loan.getId());
        assertFalse(deletedLoan.isPresent());
    }

    @Test
    public void testDeleteNonExistentLoan() {
        assertThrows(InstanceNotFoundException.class, () -> loanService.deleteLoan(1L));
    }
}
