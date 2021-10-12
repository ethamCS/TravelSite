import React, { useState } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

export function useDistances(placesList) {
    const [distancesList, setDistancesList] = useState([]);
    setDistancesList(getDistances(placesList));

    return [distancesList, getDistances];

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