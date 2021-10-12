import React, { useState } from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

export function useDistances(placesList) {
    const [distancesList, setDistancesList] = useState([]);
    
}