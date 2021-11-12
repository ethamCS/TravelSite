import React from 'react';
import { Input } from 'reactstrap';
import { FaFileUpload } from 'react-icons/fa';
import { FILE_FORMATS } from '../../../utils/constants';

export default function LoadTripButton(props) {

    function handleFileUpload(event) {
        const fileName = event.target.files[0].name;
        const fileObject = event.target.files[0];
        props.placeActions.readFile(fileName, fileObject, props)
    }

    const onIconClick = () => {
        const input = document.getElementById('file-input');

        if (input) {
            input.click();
        }
    };

    return (
        <React.Fragment>
            <FaFileUpload onClick={onIconClick} style={{ cursor: 'pointer', marginLeft: '10px' }} />
            <Input style={{ display: 'none' }} id="file-input" type="file" accept={FILE_FORMATS} onChange={handleFileUpload} />
        </React.Fragment>
    );
}