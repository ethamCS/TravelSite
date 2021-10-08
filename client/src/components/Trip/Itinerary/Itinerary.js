import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown, EditTripName } from './actions.js';
import { latLngToText } from '../../../utils/transformers';

export default function Itinerary(props) {
    return (
        <Table responsive hover>
            <Header placeActions={props.placeActions} openFind={props.openFind} openWhereIs={props.openWhereIs} />
            <Body places={props.places} placeActions={props.placeActions} />
        </Table>
    );
}

function Header(props) {
    return (
        <thead>
            <tr>
                <th />
                <EditTripName/>
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
        <tr style={{cursor: cursor }} onMouseDown={handleClick} onMouseUp={changeCursor}>    
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