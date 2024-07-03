import {FormattedMessage} from "react-intl";
import "../../../styles.css";
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { Icon } from 'leaflet';
import L from 'leaflet';
import React, {useEffect, useState} from "react";
import * as selectors from '../../loans/selectors';
import * as actions from '../../loans/actions';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Alert } from "@mui/material";

const Map = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loans = useSelector(selectors.findActualLoansMap);
    const member = useSelector(selectors.getMember);
    const galicia = [43.3623, -8.4115];
    const [markers, setMarkers] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loansLoaded, setLoansLoaded] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    const customIcon = new Icon({
        iconUrl: '/ubi.png',
        iconSize: [30, 30],
    });

    useEffect(() => {
        dispatch(actions.getLoans("", null, null));
    }, []);

    useEffect(() => {
        if (loans) {
            setLoansLoaded(true);
        }
    }, [loans]);

    useEffect(() => {
        if (loansLoaded) {
            for (const loan of loans.result) {
                const memberId = loan && loan.memberId;
                dispatch(actions.findMemberById(memberId));
            }
        }
    }, [loansLoaded]);

    useEffect(() => {
        if (member && memberList.length - 1 < (loans && loans.result.length)) {
            const newMemberItem = { id: member.id, data: member };
            setMemberList(prevMemberList => [...prevMemberList, newMemberItem]);
        }
    }, [member]);


    /*useEffect(() => {
        const fetchGeocode = async () => {
            try {
                while ((memberList && memberList.length) !== (loans && loans.result?.length || 0)) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                const newMarkers = [];
                    for (const loan of (loans && loans.result)) {
                        const actualMember = memberList && memberList.find(member => member.data.id === loan.memberId);
                        if (actualMember && actualMember.data.address) {
                            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${actualMember.data.address}`);
                            const data = await response.json();
                            if (data.length > 0) {
                                const position = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                                const existingMarkerIndex = newMarkers.findIndex(marker => marker.position[0] === position[0] && marker.position[1] === position[1]);
                                if (existingMarkerIndex !== -1) {
                                    newMarkers[existingMarkerIndex].loanNames.push({ code: loan.productCode, id: loan.productId });
                                } else {
                                    newMarkers.push({ position, loanNames: [{ code: loan.productCode, id: loan.productId }] });
                                }
                            }
                        }
                    }
                    setMarkers(newMarkers);
            } catch (error) {
                console.error('Error fetching geocode:', error);
            }
        };

        fetchGeocode();
    }, [memberList]);*/

    useEffect(() => {
        const fetchGeocode = async () => {
            try {
                const geocodePromises = (loans?.result || []).map(async (loan) => {
                    const actualMember = memberList?.find(member => member.data.id === loan.memberId);
                    if (actualMember?.data.address) {
                        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${actualMember.data.address}`);
                        const data = await response.json();
                        if (data.length > 0) {
                            const position = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                            return { loan, position };
                        }
                    }
                    return null;
                });

                const geocodeResults = await Promise.all(geocodePromises);

                const validGeocodeResults = geocodeResults.filter(result => result !== null);

                const newMarkers = [];
                validGeocodeResults.forEach(({ loan, position }) => {
                    const existingMarkerIndex = newMarkers.findIndex(marker => marker.position[0] === position[0] && marker.position[1] === position[1]);
                    if (existingMarkerIndex !== -1) {
                        newMarkers[existingMarkerIndex].loanNames.push({ code: loan.productCode, id: loan.productId });
                    } else {
                        newMarkers.push({ position, loanNames: [{ code: loan.productCode, id: loan.productId }] });
                    }
                });

                setMarkers(newMarkers);
            } catch (error) {
                setFetchError(true);
            }
        };

        if (memberList.length > 0 && loans?.result?.length > 0) {
            fetchGeocode();
        }
    }, [memberList, loans]);




    const handleLoanNameClick = (url) => {
        navigate(url)
    };

    const renderPopupContent = (loanNames) => {
        if (showAll) {
            return loanNames.map((loan, index) => (
                <div key={index} onClick={() => handleLoanNameClick(`/products/product-list/${loan.id}`)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
                    {loan.code}
                </div>
            ));
        } else {
            return loanNames.slice(0, 2).map((loan, index) => (
                <div key={index} onClick={() => handleLoanNameClick(`/products/product-list/${loan.id}`)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
                    {loan.code}
                </div>
            ));
        }
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const createClusterCustomIcon = cluster => {
        const count = cluster.getChildCount();

        const clusterColor = "#8087C1";
        const iconSize = 40;

        return L.divIcon({
            html: `<div style="background-color: ${clusterColor}; width: ${iconSize}px; height: ${iconSize}px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><span style="color: white; font-size: 16px;">${count}</span></div>`,
            className: 'custom-cluster-icon',
            iconSize: [iconSize, iconSize],
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            {fetchError && <Alert severity="warning">Error al obtener los datos de geocodificación. Por favor, inténtalo de nuevo más tarde.</Alert>}
            <h5><b><FormattedMessage id="project.statistics.Map.title"/></b></h5>
            <MapContainer center={galicia} zoom={10} style={{ height: '500px', width: '90%', marginTop: '30px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
                {markers && markers.map(({ position, loanNames }) => (
                    <Marker key={`${position[0]}-${position[1]}`} position={position} icon={customIcon}>
                        <Popup open={false} autoClose={true}>
                            {renderPopupContent(loanNames)}
                            {loanNames.length > 2 && (
                                <button className="button-seeMore" style={{marginTop:'10px'}} onClick={toggleShowAll}>{showAll? 'Ver menos' : 'Ver más'}</button>
                            )}
                        </Popup>
                    </Marker>
                ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );


};
export default Map;