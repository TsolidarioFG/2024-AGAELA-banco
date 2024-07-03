package es.udc.tfgproject.backend.rest.controllers;

import es.udc.tfgproject.backend.model.exceptions.AlreadyRegisteredLoanException;
import es.udc.tfgproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.tfgproject.backend.model.services.LoanService;
import es.udc.tfgproject.backend.rest.common.ErrorsDto;
import es.udc.tfgproject.backend.rest.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

import static es.udc.tfgproject.backend.rest.dtos.LoanConversor.toLoanDto;
import static es.udc.tfgproject.backend.rest.dtos.LoanConversor.toLoanDtos;

@RestController
@RequestMapping("/loans")
public class LoanController {

    private final static String ALREADY_REGISTERED_LOAN_EXCEPTION_CODE = "project.exceptions.AlreadyRegisteredLoan";

    @Autowired
    private LoanService loanService;
    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(AlreadyRegisteredLoanException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleAlreadyRegisteredLoanException(AlreadyRegisteredLoanException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(ALREADY_REGISTERED_LOAN_EXCEPTION_CODE, null,
                ALREADY_REGISTERED_LOAN_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @PostMapping("/register/entity/{entityId}/{productId}")
    public LoanDto registerEntityLoan(@PathVariable Long entityId, @PathVariable Long productId, @RequestBody LoanParamsDto params) throws AlreadyRegisteredLoanException, InstanceNotFoundException {
        return toLoanDto(loanService.registerLoan(productId, params.getLoanUserId(), null, entityId, params.getDateLoan(), params.getHomeTransport(), params.getAssumeSpent(), params.getAmountTransport(), params.getObservations(), params.getEntityFirstName(), params.getEntityLastName(), params.getEntityTfno(), params.getEntityEmail()));
    }

    @PostMapping("/register/member/{memberId}/{productId}")
    public LoanDto registerMemberLoan(@PathVariable Long memberId, @PathVariable Long productId, @RequestBody LoanParamsDto params) throws AlreadyRegisteredLoanException, InstanceNotFoundException {
        return toLoanDto(loanService.registerLoan(productId, params.getLoanUserId(), memberId, null, params.getDateLoan(), params.getHomeTransport(), params.getAssumeSpent(), params.getAmountTransport(), params.getObservations(), params.getEntityFirstName(), params.getEntityLastName(), params.getEntityTfno(), params.getEntityEmail()));
    }

    @PostMapping("/devolution/{productId}")
    public void registerDevolution(@PathVariable Long productId, @RequestBody DevolutionDto params) throws InstanceNotFoundException {
        loanService.registerDevolution(productId, params.getDevolutionUserId(), params.getObservations());
    }

    @GetMapping
    public List<LoanDto> findLoans(@RequestParam String keywords,
                                   @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                   @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
        return toLoanDtos(loanService.findLoans(keywords, startDate, endDate));
    }

    @GetMapping("/member")
    public List<LoanDto> findLoansByMember(){
        return toLoanDtos(loanService.findLoansByMember(null, null, null, null));
    }

    @GetMapping("/member/{memberId}")
    public List<LoanDto> findLoansByMember(@PathVariable Long memberId, @RequestParam(required = false) String keywords,
                                           @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                           @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
        return toLoanDtos(loanService.findLoansByMember(memberId, keywords, startDate, endDate));
    }

    @GetMapping("/entity")
    public List<LoanDto> findLoansByEntity(){
        return toLoanDtos(loanService.findLoansByEntity(null, null, null, null));
    }

    @GetMapping("/entity/{entityUserId}")
    public List<LoanDto> findLoansByEntity(@PathVariable Long entityUserId, @RequestParam(required = false) String keywords,
                                           @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                           @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
        return toLoanDtos(loanService.findLoansByEntity(entityUserId, keywords, startDate, endDate));
    }

    @GetMapping("/product/{productId}")
    public List<LoanDto> findLoansByProduct(@PathVariable Long productId, @RequestParam(required = false) String keywords,
                                            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
        return toLoanDtos(loanService.findLoansByProduct(productId, keywords, startDate, endDate));
    }

    @PutMapping("/{id}")
    public LoanDto updateLoan(@PathVariable Long id, @RequestBody LoanUpdateParamsDto loanDto) throws InstanceNotFoundException {
        /*
        * if (!id.equals(userId)) {
			throw new PermissionException();
		}*/

        return toLoanDto(loanService.updateLoan(id, loanDto.getProductId(), loanDto.getMemberId(), loanDto.getEntityUserId(), loanDto.getDateLoan(), loanDto.getHomeTransport(), loanDto.getAssumeSpent(), loanDto.getAmountTransport(), loanDto.getObservations(), loanDto.getDevolution(), loanDto.getEntityFirstName(), loanDto.getEntityLastName(), loanDto.getEntityTfno(), loanDto.getEntityEmail()));
    }

    @DeleteMapping("/{id}")
    public void deleteLoan(@PathVariable String id) throws InstanceNotFoundException {
        Long loanId = Long.parseLong(id);
        loanService.deleteLoan(loanId);
    }
}
