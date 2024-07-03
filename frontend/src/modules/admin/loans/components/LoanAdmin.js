import React, {useEffect} from "react";
import * as loansSelectors from '../../../loans/selectors';
import * as loansActions from '../../../loans/actions';
import * as actions from '../actions';
import {useDispatch, useSelector} from "react-redux";
import SearchList from "../../components/SearchList";
import {useNavigate} from "react-router-dom";

const LoanAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loans = useSelector(loansSelectors.getLoans);
    const title = 'project.admin.SearchList.loanTitle';

    const sortedLoans = {
        keywords: '',
        result: loans && loans.result && loans.result.slice().sort((a, b) => new Date(b.dateLoan) - new Date(a.dateLoan))
    };
    useEffect(() => {
        dispatch(loansActions.getLoans(""));
    }, [dispatch]);

    const renderLoanInfo = (loan) => {
        const dateLoan = new Date(loan && loan.dateLoan);
        const formattedDate = dateLoan.toLocaleDateString();
        const formattedTime = dateLoan.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'});
        const dateTime = `${formattedDate} ${formattedTime}`;

        return (
        <div>
            {loan && (
                <>
                    <div>{loan.productName + ' (' + loan.productCode + ')'}</div>
                    <div>{dateTime}</div>
                    <div>{loan.memberName}</div>
                    <div>{loan.entityUserName}</div>
                </>
            )}
        </div>
        );
    };

    const handleDelete = (loanId) => {
        dispatch(actions.deleteLoan(loanId));
    };

    const handleEdit = (loan) => {
        navigate(`editLoan/${loan.id}`, {state: {loan: loan}})
    };

    const handleDetails = (loan) => {
        navigate(`/admin-loans/details/${loan.id}`, {state: {loan: loan}})
    };

    return (
        <div>
            <SearchList
                title={title}
                component={sortedLoans}
                searchAction={loansActions.getLoans}
                infoToShow={renderLoanInfo}
                infoDeleteToShow={renderLoanInfo}
                createAction={() => navigate(`createLoan`)}
                editAction={handleEdit}
                deleteAction={handleDelete}
                detailsAction = {handleDetails}
            />
        </div>
    );

};

export default LoanAdmin;