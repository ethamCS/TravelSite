import React, { useEffect, useState, useRef } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';



export function useFind(value) {
    const [match, updateMatch] = useState(value);
    
    function setMatchValue(newValue) {
        return updateMatch(newValue);
    }

    return [match, setMatchValue, getPlaces];

}

async function getPlaces(matchString, controllerSignal) {
    if (matchString === "") {
        return [];
    }
    const responseBody = await sendFindRequest(matchString, 0, controllerSignal);

    if (responseBody) {
        return responseBody.places;
    }

    return [];

}

async function sendFindRequest(matchString, searchLimit, controllerSignal) {
    const url = getOriginalServerUrl();
    const requestBody = {requestType: "find", match: matchString, limit: searchLimit};

    const findResponse = await sendAPIRequest(requestBody, url, controllerSignal);

    return findResponse;
}