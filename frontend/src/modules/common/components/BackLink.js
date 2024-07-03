import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackLink = ({route}) => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        if(route){
            navigate(route)
        }else {
            navigate(-1)
        }
    }

    return (
        <button type="button" className="btn btn-link" onClick={handleOnClick}>
            <ArrowBackIcon />
        </button>
    );

};

export default BackLink;
