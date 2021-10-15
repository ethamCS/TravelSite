import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { EditTripName } from './TripName.js';
import { latLngToText } from '../../../utils/transformers';
import { useDistances } from '../../../hooks/useDistances';

export default function Itinerary(props) {
    const {distancesList, totalDistance, distanceActions} = useDistances();

    return (
        <Table responsive hover>
            <Header places={props.places} placeActions={props.placeActions} openFind={props.openFind} openWhereIs={props.openWhereIs} totalDistance={totalDistance} distanceActions={distanceActions}/>
            <Body places={props.places} placeActions={props.placeActions} distancesList={distancesList} distanceActions={distanceActions}/>
        </Table>
    );
}

function Header(props) {
    return (
        <thead>
            <tr>
                <th />
                <EditTripName />
                <th>
                    Total Trip Distance: {props.totalDistance}
                </th>
                <th>
                    <ItineraryActionsDropdown placeActions={props.placeActions} openFind={props.openFind} openWhereIs={props.openWhereIs} />
                </th>
            </tr>
        </thead>
    );
}

function Body(props) {
    return (
        <tbody>
            {props.places.map((place, index) =>
                <TableRow
                    key={`table-${JSON.stringify(place)}-${index}`}
                    place={place}
                    placeActions={props.placeActions}
                    index={index}
                />
            )}
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
            <td>
                <PlaceActionsDropdown placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}