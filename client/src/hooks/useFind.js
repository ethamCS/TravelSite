import React, { useEffect, useState, useRef } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';



export function useFind(value) {
    const [match, updateMatch] = useState(value);
    
    function setMatchValue(newValue) {
        return updateMatch(newValue);
    }

    return [match, setMatchValue, getPlaces];

}

async function getPlaces(matchString, controllerSignal, serverSettings) {
    if (matchString === "") {
        return [];
    }
    const responseBody = await sendFindRequest(matchString, 0, controllerSignal, serverSettings);

    if (responseBody) {
        return responseBody.places;
    }

    return [];

}

async function sendFindRequest(matchString, searchLimit, controllerSignal, serverSettings) {
    const url = serverSettings.serverUrl;
    const requestBody = {requestType: "find", match: matchString, limit: searchLimit};

    const findResponse = await sendAPIRequest(requestBody, url, controllerSignal);

    return findResponse;
}