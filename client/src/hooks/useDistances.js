import { control } from 'leaflet';
import React, { useState } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

export function useDistances() {
    const [distancesList, setDistancesList] = useState([]);
    const [totalDistance, setTotalDistance] = useState(0);

    const context = { distancesList, setDistancesList, totalDistance, setTotalDistance };

    const distanceActions = {
        getDistances: async (placesList, controllerSignal) => getDistances(placesList, controllerSignal, context),
    };

    return {distancesList, totalDistance, distanceActions};

}


async function getDistances(placesList, controllerSignal, context) {
    const {distancesList, setDistancesList, setTotalDistance} = context;
    const responseBody = await sendDistancesRequest(placesList, controllerSignal);

    if (responseBody) {
        setDistancesList(responseBody.distances);
    }
    else {
        setDistancesList([]);
    }
    getTotalDistance(context)
}

function getTotalDistance(context) {
    const {distancesList, setTotalDistance} = context;
    if (distancesList.length > 0) {
        setTotalDistance(distancesList.reduce((a, b) => a + b));
    }
    else {
        setTotalDistance(0);
    }
}


async function sendDistancesRequest(placesList, controllerSignal) {
    const url = getOriginalServerUrl();
    const requestBody = {requestType: "distances", places: placesList, earthRadius: 6371};

    const distancesResponse = await sendAPIRequest(requestBody, url, controllerSignal);

    return distancesResponse;
}