import React, { useState } from 'react';
import { Collapse, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import { FaPencilAlt, FaFileUpload, FaSave } from 'react-icons/fa';
import { FILE_FORMATS } from '../../../utils/constants';

export function EditTripName(props) {
    const [collapse, setCollapse] = useState(false);
    const [tripName, setName] = useState("My Trip");

    const toggle = () => setCollapse(!collapse);

    return (
        <th>
            <Collapse isOpen={!collapse}>
                <Button color="none" style={{ cursor: 'pointer'}} onClick={toggle} data-testid="edit-button">{tripName}</Button>
                <LoadTripButton showMessage={props.showMessage} placeActions={props.placeActions} setName={setName} />
                <SaveTripButton tripName={tripName} placeActions={props.placeActions} />
            </Collapse>
            <Collapse isOpen={collapse} data-testid="trip-collapse">
                <TripInput tripName={tripName} setName={setName} toggle={toggle} />
            </Collapse>
        </th>
    );
}

function TripInput(props) {
    return (
        <InputGroup>
            <Input
                placeholder={props.tripName}
                onChange={e => props.setName(e.target.value)}
                valid={props.tripName != null && props.tripName != ""}
                invalid={props.tripName == null || props.tripName == ""}
                data-testid="trip-input"
            />
            <Collapse isOpen={props.tripName != null && props.tripName != ""}>
                <InputGroupAddon addonType="append">
                    <InputGroupText style={{ cursor: 'pointer' }} onClick={props.toggle} valid={props.tripName != null && props.tripName != ""} invalid={props.tripName == null || props.tripName == ""}>
                        Done
                    </InputGroupText>
                </InputGroupAddon>
            </Collapse>
        </InputGroup>
    );
}

export function LoadTripButton(props) {

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

export function SaveTripButton(props) {
    function handleJSONSave() {
        props.placeActions.saveFile(props);
    }
    return (
        <FaSave style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={handleJSONSave} />
    );
}