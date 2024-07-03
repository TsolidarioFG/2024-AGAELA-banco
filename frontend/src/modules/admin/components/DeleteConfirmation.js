import React from "react";
import {FormattedMessage} from "react-intl";
import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const DeleteConfirmation = ({open, onClose, onConfirm, componentToDeleteDetails}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="subtitle1" align="center">
                    <FormattedMessage id="project.admin.DeleteConfirmation.title" />
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" align="center">{componentToDeleteDetails}</Typography>
            </DialogContent>
            <DialogActions>
                <button onClick={onClose} className="button-cancel">
                    <FormattedMessage id="project.admin.DeleteConfirmation.cancel"/>
                </button>
                <button onClick={onConfirm} className="button-confirmation">
                    <FormattedMessage id="project.admin.DeleteConfirmation.confirm"/>
                </button>
            </DialogActions>
        </Dialog>
    );

};

export default DeleteConfirmation;