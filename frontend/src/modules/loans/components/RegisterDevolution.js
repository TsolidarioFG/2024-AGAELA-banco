import "./../../../styles.css";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ScanQR from "../../app/components/ScanQR";


const RegisterDevolution = () => {

    const [showScanner, setShowScanner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowScanner(true);
    }, []);

    const handleScanSuccess = (result) => {
        setShowScanner(false);
        navigate(`/loans/related-devolutions`, { state: { productId: result } });
    };

    const handleRegisterManual = () => {
        navigate('register-manual');
    };

    return (
        <div>
            {showScanner && (
                <ScanQR onScanSuccess={handleScanSuccess} registerManual={handleRegisterManual}/>
            )}
        </div>
    );
};
export default RegisterDevolution;