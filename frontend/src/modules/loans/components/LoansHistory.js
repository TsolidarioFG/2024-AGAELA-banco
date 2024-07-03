import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { FormattedMessage } from "react-intl";
import LoanItem from "./LoanItem";
import {useNavigate} from "react-router-dom";

const LoansHistory = ({id, getLoansAction, getLoansSelector, getActualLoansSelector, showOwner = false}) => {
    const dispatch = useDispatch();
    const [searchBar, setSearchBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searched, setSearched] = useState(false);
    const [filterDate, setFilterDate] = useState({ startDate: null, endDate: null });
    const loans = useSelector(getLoansSelector);
    const activeLoans = useSelector(getActualLoansSelector);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getLoansAction(id, "", null, null));
    }, [dispatch, getLoansAction]);

    useEffect(() => {
        if (searched) {
            dispatch(getLoansAction(id, searchTerm, filterDate.startDate, filterDate.endDate));
        }
    }, [searchTerm, filterDate, dispatch, getLoansAction]);

    const handleIconClick = () => {
        setSearchBar(prevSearchBar => !prevSearchBar);
        setSearched(true);
    };

    const handleStartDateChange = (event) => {
        const selectedStartDate = new Date(event.target.value);
        const selectedEndDate = new Date(filterDate.endDate);

        if (selectedEndDate && selectedStartDate > selectedEndDate) {
            setFilterDate({ ...filterDate, startDate: event.target.value, endDate: event.target.value });
        } else {
            setFilterDate({ ...filterDate, startDate: event.target.value });
        }
    };

    const handleEndDateChange = (event) => {
        const selectedStartDate = new Date(filterDate.startDate);
        const selectedEndDate = new Date(event.target.value);

        if (selectedStartDate && selectedStartDate > selectedEndDate) {
            setFilterDate({ ...filterDate, startDate: event.target.value, endDate: event.target.value });
        } else {
            setFilterDate({ ...filterDate, endDate: event.target.value });
        }
    };

    const loansWithDevolutionFalse = loans && loans.result && loans.result.filter(loan => !loan.devolution);
    const loansWithDevolutionTrue = loans && loans.result && loans.result.filter(loan => loan.devolution);

    const handleDevolveAll = () => {
        const allSelectedLoans = activeLoans && activeLoans.result ? activeLoans.result : [];
        navigate('/loans/confirmation-devolution', { state: { selectedLoans: allSelectedLoans } });
    };

    return (
        <div style={{ textAlign: 'left', width: '90%', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '15px' }}>
                <h5><b><FormattedMessage id="project.loans.MemberInfo.History" /></b></h5>
                {loans && loans.result && loans.result.length > 0 && (
                    <div>
                        <SearchIcon style={{ color: '#8087C1' }} onClick={handleIconClick} />
                    </div>
                )}
                {activeLoans && activeLoans.result && activeLoans.result.length > 0 && (
                    <button className="button-search" style={{ padding: '0px 10px' }} onClick={handleDevolveAll}>
                        <FormattedMessage id="project.loans.MemberInfo.loan.devolution.buttonAll" />
                    </button>
                )}
            </div>
            {searchBar && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginRight: '10px', width: '20px', flex: 1 }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <div>
                            <label htmlFor="startDate" style={{ marginBottom: '5px', marginRight: '5px' }}> <FormattedMessage id="project.loans.MemberInfo.history.dateSelectFrom" /></label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={filterDate.startDate}
                                onChange={handleStartDateChange}
                                style={{ marginBottom: '10px', width: '125px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" style={{ marginBottom: '5px', marginRight: '5px' }}><FormattedMessage id="project.loans.MemberInfo.history.dateSelectUntil" /></label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={filterDate.endDate}
                                onChange={handleEndDateChange}
                                style={{ width: '125px' }}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div>
                {loans && loans.result && loans.result.length > 0 ? (
                    <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                        {loansWithDevolutionFalse.slice().reverse().map((loan) => <LoanItem key={loan.id} loan={loan} showOwner={showOwner} />)}
                        {loansWithDevolutionTrue.slice().reverse().map((loan) => <LoanItem key={loan.id} loan={loan} showOwner={showOwner} />)}
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p>
                            <FormattedMessage id="project.loans.MemberInfo.noLoansMessage" />
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoansHistory;
