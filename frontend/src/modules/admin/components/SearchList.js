import React, {useEffect, useState} from 'react';
import {FormattedMessage} from "react-intl";
import {useDispatch} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";
import DeleteConfirmation from "./DeleteConfirmation";

function SearchList({title, component, infoToShow, infoDeleteToShow, searchAction, detailsAction, createAction, editAction, deleteAction}) {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const componentDeleteDetails = infoDeleteToShow(selectedComponent);
    const [search, setSearch] = useState(false);

    useEffect( () => {
        if(search)
            dispatch(searchAction(searchTerm));
    }, [search]);

    const handleComponentClick = (component) => {
        detailsAction(component);
    };

    const handleCreateClick = () => {
        createAction();
    };

    const handleEditClick = (componentComplete, e) => {
        e.stopPropagation();
        editAction(componentComplete);
    };

    const handleDeleteClick = (componentComplete, e) => {
        e.stopPropagation();
        setSelectedComponent(componentComplete);
        setSearch(false);
        setOpenDeleteDialog(true);
    };

    const handleSearch = (searchTerm) => {
        dispatch(searchAction(searchTerm));
        setHasSearched(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        deleteAction(selectedComponent.id);
        setSearch(true);
        setOpenDeleteDialog(false);
    };

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        handleSearch(term);
    };

    const renderComponentList = () => {
        const list = component.result || component;
        if (!Array.isArray(list)) {
            return null;
        }

        return list.map((item) => (
            <li
                key={item.id}
                onClick={detailsAction ? () => handleComponentClick(item) : undefined}
                style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    width:"100%",
                    justifyContent: "space-between",
                }}
            >
                {infoToShow(item)}
                <div style={{ display: "flex", alignItems: "center" }}>
                    {editAction && (
                        <IconButton onClick={(e) => handleEditClick(item, e)}>
                            <EditIcon style={{ color: "#888db7" }} />
                        </IconButton>
                    )}
                    <IconButton onClick={(e) => handleDeleteClick(item, e)}>
                        <DeleteIcon style={{ color: "#E57373" }} />
                    </IconButton>
                </div>
            </li>
        ));
    };

    return (
        <div className="search-list-container">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                {title && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px", textAlign: 'center' }}>
                        <h5>
                            <FormattedMessage id={title} />
                        </h5>
                    </div>
                )}
                {searchAction && createAction && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "50px", width:"100%" }}>
                        <div style={{ display: "flex", alignItems: "center", width:"100%"}}>
                            <input
                                type='text'
                                placeholder='Buscar...'
                                value={searchTerm}
                                onChange={handleChange}
                                style={{ flex: "1", marginRight: "20px", padding: "8px", width:"100%"}}
                            />
                            <IconButton onClick={handleCreateClick} style={{ backgroundColor: "#74cc78", borderRadius: "50%", padding: "8px" }}>
                                <AddIcon style={{ color: "#FFFFFF" }} />
                            </IconButton>
                        </div>
                    </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", width:"100%", marginTop: "10px", maxHeight: '500px', overflowY: 'auto' }}>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {renderComponentList()}
                        {((!component.result && !Array.isArray(component)) || (Array.isArray(component) && component.length === 0)) && hasSearched &&
                            <FormattedMessage id="project.admin.SearchList.noResult" />
                        }
                    </ul>
                </div>
                <DeleteConfirmation
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onConfirm={handleConfirmDelete}
                    componentToDeleteDetails={componentDeleteDetails}
                />
            </div>
        </div>
    );
}

export default SearchList;
