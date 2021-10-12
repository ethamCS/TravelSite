import React, { useState } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

export function useDistances(placesList) {
    const [distancesList, setDistancesList] = useState([]);


}



async function sendDistancesRequest(placesList) {
    const url = getOriginalServerUrl();
    const requestBody = {requestType: "distances", places: placesList, earthRadius: 6371};

    const distancesResponse = await sendAPIRequest(requestBody, url);

    return distancesResponse;
}