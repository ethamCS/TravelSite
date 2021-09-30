import React from 'react';
import {Container, Row, Col, Table} from 'reactstrap';
import { latLngToText, placeToLatLng } from '../../utils/transformers';

export default function Results(props) {

    return (
        <Table responsive striped>
            <ResultHeader />
            <ResultBody placesList={props.placesList}/>
        </Table>
    );
}

function ResultHeader(props) {
    return (
        <thead>
            <tr>
                <th />
                <th>Results</th>
            </tr>
        </thead>
    );
}

function ResultBody(props) {
    
    return (
        <tbody>
            {props.placesList.map((place, index) => 
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
    const location = placeToLatLng(props.place);
    const newLocation = latLngToText(location);

    return (
        <tr onClick={() => props.placeActions.selectIndex(props.index)}>    
            <th scope="row">{props.index + 1} </th>
            <td>
                {name}
                <br />
                <small className="text-muted">{newLocation}</small>
            </td>
        </tr>
    );
}