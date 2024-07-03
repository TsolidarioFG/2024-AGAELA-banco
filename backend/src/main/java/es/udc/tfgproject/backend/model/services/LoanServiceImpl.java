package es.udc.tfgproject.backend.model.services;

import es.udc.tfgproject.backend.model.entities.*;
import es.udc.tfgproject.backend.model.exceptions.AlreadyRegisteredLoanException;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {
    @Autowired
    private LoanDao loanDao;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private MemberDao memberDao;
    @Autowired
    private EntityUserDao entityDao;


    @Override
    public Loan registerLoan(Long productId, Long userId, Long memberId, Long entityId, LocalDateTime dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, String firstName, String lastName, String tfno, String email) throws InstanceNotFoundException, AlreadyRegisteredLoanException {
        Optional<Loan> existingLoan = loanDao.findFirstByProductIdAndDevolutionIsNull(productId);
        if(existingLoan.isPresent()){
            throw new AlreadyRegisteredLoanException();
        }

        Optional<Product> optionalProduct = productDao.findById(productId);
        if (!optionalProduct.isPresent()) {
            throw new InstanceNotFoundException("project.entities.loan.product", productId);
        }
        Product product = optionalProduct.get();
        product.setState(Product.State.LOAN);

        User loanUser = null;
        if (userId != null) {
            Optional<User> optionalUser = userDao.findById(userId);
            if (!optionalUser.isPresent()) {
                throw new InstanceNotFoundException("project.entities.loan.user", userId);
            }
            loanUser = optionalUser.get();
        }

        Member member = null;
        if (memberId != null) {
            Optional<Member> optionalMember = memberDao.findById(memberId);
            if (!optionalMember.isPresent()) {
                throw new InstanceNotFoundException("project.entities.loan.member", memberId);
            }
            member = optionalMember.get();
        }

        EntityUser entity = null;
        if (entityId != null) {
            Optional<EntityUser> optionalEntity = entityDao.findById(entityId);
            if (!optionalEntity.isPresent()) {
                throw new InstanceNotFoundException("project.entities.loan.entity", entityId);
            }
            entity = optionalEntity.get();
        }

        Loan loan = new Loan(LocalDateTime.now(), false, "", (float) 0, "", null, product, member, entity, loanUser, null, "", "", "", "");

        if(dateLoan != null){
            loan.setDateLoan(dateLoan);
        }
        if (homeTransport != null) {
            loan.setHomeTransport(homeTransport);
        }
        if (assumeSpent != null) {
            loan.setAssumeSpent(assumeSpent);
        }
        if (amountTransport != null) {
            loan.setAmountTransport(amountTransport);
        }
        if (observations != null) {
            loan.setObservations(observations);
        }
        if (firstName != null) {
            loan.setEntityFirstName(firstName);
        }
        if (lastName != null) {
            loan.setEntityLastName(lastName);
        }
        if (tfno != null) {
            loan.setEntityTfno(tfno);
        }
        if (email != null) {
            loan.setEntityEmail(email);
        }

        loanDao.save(loan);

        return loan;
    }

    @Override
    public void registerDevolution(Long productId, Long userId, String observations) throws InstanceNotFoundException {
        Optional<Loan> loan = loanDao.findFirstByProductIdAndDevolutionIsNull(productId);

        if(!loan.isPresent()){
            throw new InstanceNotFoundException("project.entities.loan", productId);
        }

        Product product = productDao.findById(productId).get();
        product.setState(Product.State.NOT_LOAN);

        User devolutionUser = null;
        if(userId != null)
            devolutionUser = userDao.findById(userId).get();

        loan.get().setDevolution(LocalDateTime.now());
        loan.get().setDevolutionUser(devolutionUser);

        if(!Objects.equals(observations, "") && observations != null){
            loan.get().setObservations(observations);
        }
    }

    @Override
    public List<Loan> findLoans(String keywords, LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = (startDate != null) ? startDate.atStartOfDay() : null;
        LocalDateTime endDateTime = (endDate != null) ? endDate.atTime(LocalTime.MAX) : null;
        return loanDao.findByKeywordsAndDateRange(keywords, startDateTime, endDateTime);
    }

    public List<Loan> findLoansByMember(Long memberId, String keywords, LocalDate startDate, LocalDate endDate){
        LocalDateTime startDateTime = (startDate != null) ? startDate.atStartOfDay() : null;
        LocalDateTime endDateTime = (endDate != null) ? endDate.atTime(LocalTime.MAX) : null;
        return loanDao.findByMemberIdAndKeywordsAndDateRange(memberId, keywords, startDateTime, endDateTime);
    }

    @Override
    public List<Loan> findLoansByEntity(Long entityId, String keywords, LocalDate startDate, LocalDate endDate){
        LocalDateTime startDateTime = (startDate != null) ? startDate.atStartOfDay() : null;
        LocalDateTime endDateTime = (endDate != null) ? endDate.atTime(LocalTime.MAX) : null;
        return loanDao.findByEntityUserIdAndKeywordsAndDateRange(entityId, keywords, startDateTime, endDateTime);
    }

    @Override
    public List<Loan> findLoansByProduct(Long productId, String keywords, LocalDate startDate, LocalDate endDate){
        LocalDateTime startDateTime = (startDate != null) ? startDate.atStartOfDay() : null;
        LocalDateTime endDateTime = (endDate != null) ? endDate.atTime(LocalTime.MAX) : null;
        return loanDao.findByProductIdAndKeywordsAndDateRange(productId, keywords, startDateTime, endDateTime);
    }

    @Override
    public Loan updateLoan(Long loanId, Long productId, Long memberId, Long entityId, LocalDateTime dateLoan, Boolean homeTransport, String assumeSpent, Float amountTransport, String observations, LocalDateTime devolution, String firstName, String lastName, String tfno, String email) throws InstanceNotFoundException {
        Optional<Loan> optionalLoan = loanDao.findLoanById(loanId);
        Optional<Product> optionalProduct = productDao.findById(productId);
        Optional<Member> optionalMember = Optional.empty();
        if(memberId != null)
            optionalMember = memberDao.findById(memberId);
        Optional<EntityUser> optionalEntity = Optional.empty();
        if(entityId != null)
            optionalEntity = entityDao.findById(entityId);

        if (!optionalLoan.isPresent()) {
            throw new InstanceNotFoundException("project.entities.loan", loanId);
        }

        if (!optionalProduct.isPresent()) {
            throw new InstanceNotFoundException("project.entities.loanProduct", productId);
        }

        Loan loan = optionalLoan.get();
        loan.setProduct(optionalProduct.get());
        if(optionalMember.isPresent())
            loan.setMember(optionalMember.get());
        else
            loan.setMember(null);
        if(optionalEntity.isPresent())
            loan.setEntityUser(optionalEntity.get());
        else
            loan.setEntityUser(null);
        loan.setHomeTransport(homeTransport);
        loan.setAssumeSpent(assumeSpent);
        loan.setAmountTransport(amountTransport);
        loan.setObservations(observations);
        loan.setEntityFirstName(firstName);
        loan.setEntityLastName(lastName);
        loan.setEntityTfno(tfno);
        loan.setEntityEmail(email);
        loan.setDateLoan(dateLoan);
        loan.setDevolution(devolution);

        return loanDao.save(loan);
    }

    @Override
    public void deleteLoan(Long loanId) throws InstanceNotFoundException {
        Optional<Loan> optionalLoan = loanDao.findLoanById(loanId);

        if (!optionalLoan.isPresent()) {
            throw new InstanceNotFoundException("project.entities.loan", loanId);
        }

        Loan loan = optionalLoan.get();

        loanDao.delete(loan);
    }
}
