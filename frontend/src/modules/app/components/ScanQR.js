import React from 'react';
import QrReader from 'react-web-qr-reader';
import {FormattedMessage} from "react-intl";
import BackLink from "../../common/components/BackLink";

function ScanQR({ onScanSuccess, registerManual }) {

    const handleScan = data => {
        if (data) {
            onScanSuccess(data.data);
        }
    };

    const handleError = err => {
        console.error(err);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <BackLink/>
            <h5><b><FormattedMessage id="project.codigosQR.ScanQR.title"/></b></h5>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '50px' }}>
                <QrReader
                    delay={100}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '200px', height: '200px' }}
                />
            </div>
            {registerManual && (<button className="button-search" onClick={registerManual}><FormattedMessage id="project.codigosQR.registerManually"/></button>)}
        </div>
    );
}

export default ScanQR;
