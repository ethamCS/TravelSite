import React from 'react';
import {Container, Row, Col} from 'reactstrap';

export default function Results(props) {
    return (
        <Container>
            <ResultHeader />
            <ResultBody places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} list={props.list} />
        </Container>
    );
}

function ResultHeader(props) {
    return (
        <Container>
            <Row>
                <Col>
                </Col> 
            </Row>
        </Container>
    );
}

unction ResultBody(props) {

    return (
        <tbody>
            <br/>
            <h5>Locations Found</h5>
            {props.list.map((place, index) => 
                <TableRow
                    key={`table-${JSON.stringify(place)}-${index}`}
                    place={place}
                    index={index}
                />
            )}
        </tbody>
    );
}

function TableRow(props){
    const name = props.place.name
    return (
        <tr>    
            <th scope="row">{props.index + 1}</th>
            <td >
                {name}
                <br />
                <small className="text-muted">{location}</small>
            </td>
            <td>   
            </td>
        </tr>
     
    );
}
