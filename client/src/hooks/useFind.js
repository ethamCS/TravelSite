import React, { useEffect, useState, useRef } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';



export function useFind(value) {
    const [match, updateMatch] = useState(value);
    
    function setMatchValue(newValue) {
        return updateMatch(newValue);
    }

    return [match, setMatchValue, getPlaces];

}

async function getPlaces(matchString) {
    if (matchString === "") {
        return [];
    }
    const responseBody = await sendFindRequest(matchString, 0);

    if (responseBody) {
        return responseBody.places;
    }

    return [];

}

async function sendFindRequest(matchString, searchLimit) {
    const url = getOriginalServerUrl();
    const requestBody = {requestType: "find", match: matchString, limit: searchLimit};

    const findResponse = await sendAPIRequest(requestBody, url);

    return findResponse;
}