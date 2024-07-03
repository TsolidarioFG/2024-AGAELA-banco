import React, {useEffect} from "react";
import * as entitySelectors from '../../../loans/selectors';
import * as actions from '../../../loans/actions';
import * as actionsEntity from '../actions';
import {useDispatch, useSelector} from "react-redux";
import SearchList from "../../components/SearchList";
import {useNavigate} from "react-router-dom";

const EntityAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const entities = useSelector(entitySelectors.getEntities);

    const title = 'project.admin.SearchList.entityTitle';

    useEffect(() => {
        dispatch(actions.findEntities(""));
    }, [dispatch]);


    const renderEntityInfo = (entity) => (
        <div>
            {entity && entity.entityName}
        </div>
    );

    const renderDeleteEntityInfo = (entity) => {
            return entity && entity.entityName;
    };

    const handleDelete = (entityId) => {
        dispatch(actionsEntity.deleteEntity(entityId));
    };

    const handleEdit = (entity) => {
        navigate(`editEntity/${entity.id}`, {state: {entity: entity}})
    };

    return (
        <div>
                <SearchList
                    title={title}
                    component={entities}
                    searchAction={actions.findEntities}
                    infoToShow={renderEntityInfo}
                    infoDeleteToShow={renderDeleteEntityInfo}
                    createAction={() => navigate(`createEntity`)}
                    editAction={handleEdit}
                    deleteAction={handleDelete}
                />
        </div>
    );

};

export default EntityAdmin;