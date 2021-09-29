import React, { useEffect, useState, useRef } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';


export function useFind(value) {
    const match = value;

    return [value, sendFindRequest];

}

async function sendFindRequest(matchString, searchLimit) {
    const url = getOriginalServerUrl();
    const requestBody = {requestType: "find", match: matchString, limit: searchLimit};

    const findResponse = await sendAPIRequest(requestBody, url);
    return findResponse;
}