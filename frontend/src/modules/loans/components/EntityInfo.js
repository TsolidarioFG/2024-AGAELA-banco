import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../selectors';
import * as actions from '../actions';
import React, {useEffect, useState} from "react";
import {findActualLoansByEntity, getLoansByEntity} from "../selectors";
import LoansHistory from "./LoansHistory";
import BackLink from "../../common/components/BackLink";

const EntityInfo = () => {
    const entity = useSelector(selectors.getEntity);
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    const { id } = useParams();

    useEffect(() => {

        const entityId = Number(id);

        if (!Number.isNaN(entityId)) {
            dispatch(actions.findEntityById(entityId, errors => setBackendErrors(errors)));
        }

    }, [id, dispatch]);

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <BackLink/>
            <h3>{entity && entity.entityName}</h3>

            <LoansHistory
                id={id}
                getLoansAction={actions.findLoansByEntity}
                getLoansSelector={state => getLoansByEntity(state, id)}
                getActualLoansSelector={state => findActualLoansByEntity(state, id)}
            />
        </div>
    );

};

export default EntityInfo;