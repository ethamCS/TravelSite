import React, { useState } from 'react';
import { Collapse, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FaPencilAlt, FaFileUpload, FaSave, FaLessThanEqual } from 'react-icons/fa';

const FILE_FORMATS = ".json, .csv, application/json, text/csv";

export function EditTripName(props) {
    const [cursor, setCursor] = useState('pointer');
    const [collapse, setCollapse] = useState(false);
    const [tripName, setName] = useState("My Trip");

    const changeCursor = () => {
        setCursor(prevState => {
            if (prevState === 'pointer') {
                return 'grabbing';
            }
            return 'pointer';
        });
    }

    const handleClick = (e) => {
        changeCursor();
    }

    const toggle = () => setCollapse(!collapse);

    return (
        <th>
            <Collapse isOpen={!collapse}>
                {tripName} <FaPencilAlt style={{ cursor: cursor }} onMouseDown={handleClick} onMouseUp={changeCursor} onClick={toggle} data-testid="edit-button"/>
                <LoadTripButton cursor={cursor} handleClick={handleClick} changeCursor={changeCursor} placeActions={props.placeActions} />
                <SaveTripButton cursor={cursor} handleClick={handleClick} changeCursor={changeCursor} />
            </Collapse>
            <Collapse isOpen={collapse} data-testid="trip-collapse">
                <TripInput cursor={cursor} tripName={tripName} setName={setName} handleClick={handleClick} changeCursor={changeCursor} toggle={toggle} />
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
                <InputGroupAddon>
                    <InputGroupText style={{ cursor: props.cursor }} onMouseDown={props.handleClick} onMouseUp={props.changeCursor} onClick={props.toggle} valid={props.tripName != null && props.tripName != ""} invalid={props.tripName == null || props.tripName == ""}>
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
        props.placeActions.readFile(fileName, fileObject)
    }

    const onIconClick = () => {
        const input = document.getElementById('file-input');

        if (input) {
            input.click();
        }
    };

    return (
        <React.Fragment>
            <FaFileUpload onClick={onIconClick} style={{ cursor: props.cursor, marginLeft: '10px' }} onMouseDown={props.handleClick} onMouseUp={props.changeCursor} />
            <Input style={{ display: 'none' }} id="file-input" type="file" accept={FILE_FORMATS} onChange={handleFileUpload} />
        </React.Fragment>
    );
}

export function SaveTripButton(props) {
    return (
        <FaSave style={{ cursor: props.cursor, marginLeft: '10px' }} onMouseDown={props.handleClick} onMouseUp={props.changeCursor} />
    );
}