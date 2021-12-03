import { useState } from 'react';
import { sendAPIRequest } from '../utils/restfulAPI';
import { WHERE_OPT } from '../utils/constants';


export function useFind(value) {
    const [match, updateMatch] = useState(value);
    
    function setMatchValue(newValue) {
        return updateMatch(newValue);
    }

    return [match, setMatchValue, getPlaces];

}

async function getPlaces(matchString, controllerSignal, serverSettings, typeArray) {
    if (matchString === "") {
        return [];
    }
    const responseBody = await sendFindRequest(matchString, 0, controllerSignal, serverSettings, typeArray);

    if (responseBody) {
        return responseBody.places;
    }

    return [];

}

async function sendFindRequest(matchString, searchLimit, controllerSignal, serverSettings, typeArray) {
    const url = serverSettings.serverUrl;
    const arr =[]
    if (typeArray !== WHERE_OPT[0] && typeof typeArray !== 'undefined') {
        arr[0] = typeArray
    }
    else{ delete arr[0] }
    
    const requestBody = {
        requestType: "find", 
        match: matchString, 
        type: arr,
        limit: searchLimit
    };

    const findResponse = await sendAPIRequest(requestBody, url, controllerSignal);

    return findResponse;
}