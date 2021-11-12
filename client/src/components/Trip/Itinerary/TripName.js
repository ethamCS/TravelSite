import React, { useState } from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { Collapse, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Tooltip } from 'reactstrap';
import { FaStopwatch } from 'react-icons/fa';
import LoadTripButton from './LoadTripButton';
import SaveTripButton from './SaveTripButton';
import SaveTripModal from '../../SaveTripModal/SaveTripModal';
import TripInput from './TripInput';

export function EditTripName(props) {
    const [collapse, setCollapse] = useState(false);
    const [tripName, setName] = useState("My Trip");
    const [fileName, setFileName] = useState(tripName);
    const [tooltipOpen, setToolTipOpen] = useState(false);
    const [showSaveFile, toggleSaveFile] = useToggle(false);

    const toggle = () => setCollapse(!collapse);

    return (
        <th>
            <Collapse isOpen={!collapse}>
                <Button color="none" style={{ cursor: 'pointer' }} onClick={toggle} data-testid="edit-button">{tripName}</Button>
                <FaStopwatch onClick={props.toggleShorter} style={{ cursor: 'pointer' }} id="tooltip-optimize" data-testid="optimize" />
                <Tooltip delay={{ show: 500, hide: 100 }} flip isOpen={tooltipOpen} toggle={() => { setToolTipOpen(!tooltipOpen) }} data-testid="tool-tip" target="tooltip-optimize">Optimize Trip!</Tooltip>
                <LoadTripButton showMessage={props.showMessage} placeActions={props.placeActions} setName={setName} />
                <SaveTripButton tripName={tripName} placeActions={props.placeActions} toggleSaveFile={toggleSaveFile} />
                <SaveTripModal isOpen={showSaveFile} closeSaveTrip={toggleSaveFile} placeActions={props.placeActions} fileName={fileName} setFileName={setFileName} />
            </Collapse>
            <Collapse isOpen={collapse} data-testid="trip-collapse">
                <TripInput tripName={tripName} setName={setName} toggle={toggle} />
            </Collapse>
        </th>
    );
}