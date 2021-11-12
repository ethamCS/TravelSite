import React, { useState } from 'react';
import { sendAPIRequest } from '../utils/restfulAPI';
import { massagePlaces } from '../utils/transformers';

export function useTour() {
    const [tourList, setTourList] = useState([]);
    const context = { tourList, setTourList };

    const tourActions = {
        getTour: async (placesList, controllerSignal, serverSettings) => getTour(placesList, controllerSignal, serverSettings, context),
    };

    return { tourList, tourActions };

}

async function getTour(placesList, controllerSignal, serverSettings, context) {
    const { tourList, setTourList } = context;
    const places = massagePlaces(placesList);
    const responseBody = await sendTourRequest(places, controllerSignal, serverSettings);

    // if (responseBody) {
    //     setTourList(responseBody.places);
    // }
    // else {
    //     setTourList(placesList);
    // }
}

async function sendTourRequest(placesList, controllerSignal, serverSettings) {
    const url = serverSettings.serverUrl;
    const requestBody = {requestType: "tour", places: placesList, earthRadius: 3959, reponse: 1};

    const tourResponse = await sendAPIRequest(requestBody, url, controllerSignal);

    return tourResponse;
}