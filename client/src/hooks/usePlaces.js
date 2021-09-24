import { useState, useEffect } from 'react';
import { placeToLatLng } from '../utils/transformers';
import { reverseGeocode } from '../utils/reverseGeocode';
import { LOG } from '../utils/constants';
import { DEFAULT_STARTING_PLACE } from '../utils/constants';


export function usePlaces() {
    const [places, setPlaces] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const context = { places, setPlaces, selectedIndex, setSelectedIndex };

    const placeActions = {
        append: async (place) => append(place, context),
        removeAtIndex: (index) => removeAtIndex(index, context),
        removeAll: () => removeAll(context),
        selectIndex: (index) => selectIndex(index, context),
        moveToHome: async () => moveToHome(context)
    };

    return { places, selectedIndex, placeActions };
}

async function append(place, context) {
    const { places, setPlaces, setSelectedIndex } = context;

    const newPlaces = [...places];

    const fullPlace = await reverseGeocode(placeToLatLng(place));
    newPlaces.push(fullPlace);

    setPlaces(newPlaces);
    setSelectedIndex(newPlaces.length - 1);
}

export async function moveToHome(context) {
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    function onSuccess({ coords }) {
        const place = { latitude: coords.latitude, longitude: coords.longitude };
        append(place, context);

        LOG.info(`The user is located at ${JSON.stringify(place)}.`);
    }

    function onError(error) {
        append(DEFAULT_STARTING_PLACE, context);
        LOG.info(error.message);
    }
}

function removeAtIndex(index, context) {
    const { places, setPlaces, selectedIndex, setSelectedIndex } = context;

    if (index < 0 || index >= places.length) {
        LOG.error(`Attempted to remove index ${index} in places list of size ${places.length}.`);
        return;
    }
    const newPlaces = places.filter((place, i) => index !== i);
    setPlaces(newPlaces);

    if (newPlaces.length === 0) {
        setSelectedIndex(-1);
    } else if (selectedIndex >= index && selectedIndex !== 0) {
        setSelectedIndex(selectedIndex - 1);
    }
}

function removeAll(context) {
    const { setPlaces, setSelectedIndex } = context;

    setPlaces([]);
    setSelectedIndex(-1);
}

function selectIndex(index, context) {
    const { places, setSelectedIndex } = context;

    if (index < -1 || index >= places.length) {
        LOG.error(`Attempted to select index ${index} in places list of size ${places.length}.`);
        setSelectedIndex(-1);
        return;
    }
    setSelectedIndex(index);
}