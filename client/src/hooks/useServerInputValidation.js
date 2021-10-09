import React, { useEffect, useState, useRef } from 'react';
import { sendAPIRequest } from '../utils/restfulAPI';
import { SERVER_FEATURES } from '../utils/constants';

export function useServerInputValidation(serverUrl, close) {
    const [serverInput, setServerInput] = useState(serverUrl);
    const [validServer, setValidServer] = useState(false);
    const [config, setConfig] = useState(null);
    const [features, setFeatures] = useState();

    const inputUrl = useRef();
    const context = { serverInput, setServerInput, validServer, setValidServer, config, setConfig, inputUrl };

    const updateServerInput = (newUrl) => updateServerInputImpl(newUrl, context);
    const resetModal = (url) => resetModalImpl(url, close, context);

    useEffect(() => {
        updateServerInput(serverUrl);
    }, []);

    return [serverInput, updateServerInput, config, validServer, resetModal, features, setFeatures];
}

function updateServerInputImpl(newUrl, context) {
    const { setServerInput, setValidServer, setConfig, inputUrl } = context;

    setServerInput(newUrl);
    inputUrl.current = newUrl;
    if (shouldAttemptConfigRequest(newUrl)) {
        sendConfigRequest(newUrl, context);
    } else {
        setConfig(null);
        setValidServer(false);
    }
}

// change to arrow function so it is not global
 const sendConfigRequest = async (serverURL, context) => {
    const { setValidServer, setConfig, inputUrl } = context;

    setValidServer(false);
    const requestBody = { requestType: "config" };
    const configResponse = await sendAPIRequest(requestBody, serverURL);

    // checking if same or not
    var is_same = (configResponse && SERVER_FEATURES.length === configResponse.features.length) && SERVER_FEATURES.every(function(element, index) {
        return element === configResponse.features[index]; 
    });

    if (configResponse && serverURL === inputUrl.current) {
        setConfig(configResponse);
        (is_same) ? setValidServer(true) : setValidServer(false);
    }

}

function resetModalImpl(serverUrl, close, context) {
    const { setServerInput, setValidServer, setConfig } = context;

    setServerInput(serverUrl);
    setConfig(null);
    setValidServer(true);
    close();
}

function shouldAttemptConfigRequest(resource) {
    const urlRegex = /https?:\/\/.+/;
    return resource.match(urlRegex) !== null && resource.length > 15;
}