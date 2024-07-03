import { FormattedMessage } from "react-intl";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../loans/selectors";
import * as actions from "../actions";

const MembersSearchBar = (props) => {
    const members = useSelector(selectors.findMembers);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(actions.clearMemberSearch());
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(actions.findMembers(searchTerm));
        setHasSearched(true);
    };

    const handleMemberClick = (memberId) => {
        props.setMemberId && props.setMemberId(memberId);
        props.operation(memberId);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                {props.title && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px", textAlign: 'center' }}>
                        <h5>
                            <FormattedMessage id={props.title} />
                        </h5>
                    </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Buscar socio..."
                            value={searchTerm}
                            onChange={handleChange}
                            className="search-input"
                        />
                        <button type="submit" className="button-search" style={{ marginLeft: '20px' }}>
                            <FormattedMessage id="project.loans.SelectMember.search" />
                        </button>
                    </form>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px", maxHeight: '500px', overflowY: 'auto'}}>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {members.result &&
                            members.result.map((member) => (
                                <li
                                    key={member.id}
                                    onClick={() => handleMemberClick(member.id)}
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        cursor: "pointer",
                                        width:'300px'
                                    }}
                                >
                                    {`${member.firstName} ${member.lastName}`}
                                </li>
                            ))}
                        {(!members.result || members.result.length === 0) && hasSearched &&
                            <FormattedMessage id="project.loans.MembersSearchBar.noMember" />
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MembersSearchBar;
