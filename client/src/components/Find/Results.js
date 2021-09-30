import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { latLngToText, placeToLatLng } from '../../utils/transformers';
import { useState } from 'react';


export default function Results(props) {

    return (
        <Table responsive striped>
            <ResultHeader />
            <ResultBody places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} placesList={props.placesList} />
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
    const place = props.place;
    const [cursor, setCursor] = useState('pointer');


    const changeCursor = () => {
        setCursor(prevState => {
            if (prevState === 'pointer') {
                return 'grabbing';
            }
            return 'pointer';
        });
    }

    const handleClick = () => {
        props.placeActions.append(place);
        changeCursor();
    }

    return (
        <tr style={{ cursor: cursor }} onMouseDown={handleClick} onMouseUp={changeCursor}>
            <th scope="row">{props.index + 1} </th>
            <td >
                {name}
                <br />
                <small className="text-muted">{newLocation}</small>
            </td>
        </tr>

    );
}
