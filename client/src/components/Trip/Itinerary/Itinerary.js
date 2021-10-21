import React, { useState, useLayoutEffect } from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { EditTripName } from './TripName.js';
import { latLngToText } from '../../../utils/transformers';
import { useDistances } from '../../../hooks/useDistances';

export default function Itinerary(props) {
    const { distancesList, totalDistance, distanceActions } = useDistances();

    return (
        <Table responsive hover>
            <Header places={props.places} showMessage={props.showMessage} placeActions={props.placeActions} openFind={props.openFind} openWhereIs={props.openWhereIs} totalDistance={totalDistance} />
            <Body places={props.places} placeActions={props.placeActions} distancesList={distancesList} distanceActions={distanceActions} serverSettings={props.serverSettings} />
        </Table>
    );
}

function Header(props) {
    return (
        <thead>
            <tr>
                <th />
                <EditTripName placeActions={props.placeActions} showMessage={props.showMessage} />
                {props.places.length > 1 ? (
                    <th>
                        Round Trip Distance: <br />{props.totalDistance} mi
                    </th>) : (<th></th>)
                }
                <th>
                    <ItineraryActionsDropdown placeActions={props.placeActions} openFind={props.openFind} openWhereIs={props.openWhereIs} />
                </th>
            </tr>
        </thead>
    );
}

function renderRows(places, placeActions, distancesList) {
    return (places.map((place, index) =>
        <TableRow
            key={`table-${JSON.stringify(place)}-${index}`}
            place={place}
            placeActions={placeActions}
            index={index}
            distance={(index == 0 ? 0 : distancesList[index - 1])}
        />
    ));
}

function Body(props) {
    const [rows, setRows] = useState([]);
    useLayoutEffect(() => {
        const controller = new AbortController();
        async function fetchDistances() {
            props.distanceActions.getDistances(props.places, controller.signal, props.serverSettings);
        }
        fetchDistances();
        setRows(renderRows(props.places, props.placeActions, props.distancesList));
        return () => {
            controller.abort();
        }
    }, [props.places, props.distancesList.length]);

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

function TableRow(props) {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);
    const [cursor, setCursor] = useState('pointer');

    const changeCursor = () => {
        setCursor(prevState => {
            if (prevState === 'pointer') {
                return 'grabbing';
            }
            return 'pointer';
        });
    }

    const handleClick = (e) => {
        e.target.style = 'green';
        props.placeActions.selectIndex(props.index);
        changeCursor();
    }

    return (
        <tr style={{ cursor: cursor }} onMouseDown={handleClick} onMouseUp={changeCursor}>
            <th scope="row">{props.index + 1} </th>
            <td>
                {name}
                <br />
                <small className="text-muted">{location}</small>
            </td>
            {props.index > 0 ? (
                <td>
                    <small className="text-muted">Distance from last stop:</small>
                    <br />
                    <small className="text-muted"> {props.distance} mi</small>
                </td>
                ) : (<td></td>)
            }
            <td>
                <PlaceActionsDropdown placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}