import { FormattedMessage } from "react-intl";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../loans/selectors";
import * as actions from "../actions";

const EntitySearchBar = (props) => {
    const entities = useSelector(selectors.getEntities);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(actions.clearEntitySearch());
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(actions.findEntities(searchTerm));
        setHasSearched(true);
    };

    const handleEntityClick = (entityId) => {
        props.setEntityId && props.setEntityId(entityId);
        props.operation(entityId);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Buscar entidade..."
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
                        {entities.result &&
                            entities.result.map((entity) => (
                                <li
                                    key={entity.id}
                                    onClick={() => handleEntityClick(entity.id)}
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        cursor: "pointer",
                                        width:'300px'
                                    }}
                                >
                                    {entity.entityName}
                                </li>
                            ))}
                        {(!entities.result || entities.result.length === 0) && hasSearched &&
                            <FormattedMessage id="project.loans.MembersSearchBar.noMember" />
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EntitySearchBar;
