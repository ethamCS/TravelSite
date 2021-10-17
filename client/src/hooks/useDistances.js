import { control } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

export function useDistances() {
    const [distancesList, setDistancesList] = useState([]);
    const [totalDistance, setTotalDistance] = useState(0);

    const context = { distancesList, setDistancesList, totalDistance, setTotalDistance };

    const distanceActions = {
        getDistances: async (placesList, controllerSignal, serverSettings) => getDistances(placesList, controllerSignal, serverSettings, context),
    };

    return {distancesList, totalDistance, distanceActions};

}

async function getDistances(placesList, controllerSignal, serverSettings, context) {
    const {distancesList, setDistancesList, setTotalDistance} = context;
    const places = massagePlaces(placesList);
    const responseBody = await sendDistancesRequest(places, controllerSignal, serverSettings);

    if (responseBody) {
        setDistancesList(responseBody.distances)
    }
    else {
        setDistancesList([]);
    }
    getTotalDistance(context);
}

function massagePlaces(placesList) {
    let tempPlaces = [];
    placesList.map((place) => {
        const tempPlace = {"latitude": place['lat'].toString(), "longitude": place['lng'].toString(), "name": place['name']}
        tempPlaces.push(tempPlace)
    });
    return tempPlaces;
}

function getTotalDistance(context) {
    const {distancesList, setTotalDistance} = context;
    if ( distancesList && distancesList.length > 0) {
        setTotalDistance(distancesList.reduce((a, b) => a + b, 0));
    }
    else {
        setTotalDistance(0);
    }
}

async function sendDistancesRequest(placesList, controllerSignal, serverSettings) {
    const url = serverSettings.serverUrl;
    const requestBody = {requestType: "distances", places: placesList, earthRadius: 3959};

    const distancesResponse = await sendAPIRequest(requestBody, url, controllerSignal);

    return distancesResponse;
}