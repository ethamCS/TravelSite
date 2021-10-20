import { useState, useEffect } from 'react';
import { placeToLatLng, validateLatLng } from '../utils/transformers';
import { reverseGeocode } from '../utils/reverseGeocode';
import { LOG } from '../utils/constants';
import { DEFAULT_STARTING_PLACE } from '../utils/constants';
import * as tripSchema from '../../schemas/TripFile.json';
import * as csvSchema from '../../schemas/csvSchema.json';
import { isJsonResponseValid } from '../utils/restfulAPI';
import { MIME_TYPE } from '../utils/constants';


export function usePlaces() {
    const [places, setPlaces] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const context = { places, setPlaces, selectedIndex, setSelectedIndex };

    const placeActions = {
        append: async (place) => append(place, context),
        removeAtIndex: (index) => removeAtIndex(index, context),
        removeAll: () => removeAll(context),
        selectIndex: (index) => selectIndex(index, context),
        moveToHome: async () => moveToHome(context),
        readFile: (fileName, fileObject, props) => readFile(fileName, fileObject, props, context),
        saveFile: (props) => saveFile(props, context)
    };

    return { places, selectedIndex, placeActions };
}

async function append(place, context) {
    const { places, setPlaces, setSelectedIndex } = context;

    const newPlaces = [...places];

    validateLatLng(place);

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

function csvToJson(file) {
    var output = []
    const papa = require('papaparse');
    output = papa.parse(file.text, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {

        }
    });
    return output;
}

async function appendPlaces(obj) {
    let array = [];
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].name) {
            var place = { lat: parseFloat(obj[i].latitude), lng: parseFloat(obj[i].longitude), name: obj[i].name }
            array.push(place);
        } else {
            const fullPlace = await reverseGeocode(placeToLatLng(obj[i]));
            array.push(fullPlace);
        }
    }

    return array;
}

function parseFile(file, context, props) {
    const { setPlaces, setSelectedIndex } = context;

    const extension = file.name.split('.').pop();
    if (extension === "json") {
        if (isJsonResponseValid(JSON.parse(file.text), tripSchema)) {
            props.setName(file.name.split('.')[0]);
            var obj = JSON.parse(file.text);
            (async () => {
                let newPlaces = await appendPlaces(obj.places);
                setPlaces(newPlaces);
                setSelectedIndex(newPlaces.length - 1);
            })()
        }
    } else if (extension === "csv") {
        var csv = csvToJson(file);
        if (isJsonResponseValid(csv, csvSchema)) {
            props.setName(file.name.split('.')[0]);
            (async () => {
                let newPlaces = await appendPlaces(csv.data);
                setPlaces(newPlaces);
                setSelectedIndex(newPlaces.length - 1);
            })()
        }
    }
}

function readFile(fileName, fileObject, props, context) {
    const reader = new FileReader();
    reader.readAsText(fileObject, "UTF-8");
    reader.onload = event => {
        const file = { name: fileName, text: event.target.result };
        parseFile(file, context, props);
    }
}

function saveFile(props, context) {
    const tripJSON = buildJSON(context);
    const fileName = props.tripName.replace(/ /g, "_").toLowerCase();
    downloadFile(fileName + ".json", MIME_TYPE.JSON, tripJSON);
}

function buildJSON(context) {
    const { places } = context;
    let newPlaces = [];
    for (var i = 0; i < places.length; i++) {
        var place = { name: places[i].name, latitude: places[i].lat.toString(), longitude: places[i].lng.toString() };
        newPlaces.push(place);
    }

    const tripJSON = {
        places: newPlaces
    };

    return JSON.stringify(tripJSON, null, 2);
}

function downloadFile(fileNameWithExtension, mimeType, fileText) {
    const file = new Blob([fileText], { type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = fileNameWithExtension;
    document.body.appendChild(link);
    link.click();
    setTimeout(function () {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 0);
}