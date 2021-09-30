import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { latLngToText } from '../../../utils/transformers';

export default function Itinerary(props) {
    return (
        <Table responsive striped>
            <Header placeActions={props.placeActions} openFind={props.openFind} />
            <Body places={props.places} placeActions={props.placeActions} />
        </Table>
    );
}

function Header(props) {
    return (
        <thead>
            <tr>
                <th/>
                <th>My Trip</th>
                <th>
                    <ItineraryActionsDropdown placeActions={props.placeActions} openFind={props.openFind}/>
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
    console.log(props.key);

    return (
        <tr>    
            <th scope="row">{props.index + 1} onClick={() => props.placeActions.selectIndex(props.index)}</th>
            <td>
                {name}
                <br/>
                <small className="text-muted">{location}</small>
            </td>
            <td>
                <PlaceActionsDropdown placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}