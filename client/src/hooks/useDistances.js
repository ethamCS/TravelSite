import React, { useState } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

export function useDistances() {
    const [distancesList, setDistancesList] = useState([]);
    
    function updateDistances(newPlaces) {
        return setDistancesList(getDistances(newPlaces));
    }

    return [distancesList, updateDistances];

}

async function getDistances(placesList) {
    if (placesList.length < 2) {
        return [];
    }
    const responseBody = await sendDistancesRequest(placesList);

    if (responseBody) {
        return responseBody.distances;
    }

    return [];
}

async function sendDistancesRequest(placesList) {
    const url = getOriginalServerUrl();
    const requestBody = {requestType: "distances", places: placesList, earthRadius: 6371};

    const distancesResponse = await sendAPIRequest(requestBody, url);

    return distancesResponse;
}