import React, { useState } from 'react';
import { sendAPIRequest } from '../utils/restfulAPI';

export function useTour() {

    const tourActions = {
        getDistances: async (placesList, controllerSignal, serverSettings) => getDistances(placesList, controllerSignal, serverSettings, context),
    };

    return {distancesList, totalDistance, distanceActions};

}

async function getTour() {

}

async function sendTourRequest(placesList, controllerSignal, serverSettings) {
    const url = serverSettings.serverUrl;
    const requestBody = {requestType: "tour", places: placesList, earthRadius: 3959, reponse: 1};

    const tourResponse = await sendAPIRequest(requestBody, url, controllerSignal);

    return tourResponse;
}