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
    const resetModal = () => resetModalImpl(serverUrl, close, context);

    useEffect(() => {
        updateServerInput(serverUrl);
        // getFeatures();
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

 const sendConfigRequest = async (serverURL, context) => {
    const { setValidServer, setConfig, inputUrl } = context;

    setValidServer(false);
    const requestBody = { requestType: "config" };
    const configResponse = await sendAPIRequest(requestBody, serverURL);

    var is_same = (configResponse && SERVER_FEATURES.length === configResponse.features.length) && SERVER_FEATURES.every(function(element, index) {
        return element === configResponse.features[index]; 
    });

    if (configResponse && is_same && serverURL === inputUrl.current) {
        setConfig(configResponse);
        setValidServer(true);
    }

}


// const getFeatures = async () => {
//     try{
//        const features = await sendConfigRequest(serverURL, context);
//        console.log("tsadadaest  " + features);
//        if (features  !== null){
//            console.log("sdada  " + features);
//        }
//     }

//     catch(e){

//     }

// };


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