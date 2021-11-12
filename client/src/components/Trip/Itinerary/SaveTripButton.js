import React from 'react';
import { FaSave } from 'react-icons/fa';

export default function SaveTripButton(props) {
    return (
        <FaSave style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={props.toggleSaveFile} />
    );
}