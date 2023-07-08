import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Details() {

    const location = useLocation();
     const [latLng, setLatLng] = useState({})
    const navigate = useNavigate();
    const {name,lon,lat,formatted,address_line2,state,state_district,postcode} = location.state;

     useEffect(()=> {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position)=>{
                setLatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            })
        } 
    },[]);
    

  return (
    
    <div>
        <Row>
            <Col>
                <Card style={{padding:10,marginTop:'2rem',marginLeft:'4rem', width: '60vh'}}>
                <Card.Header><h3>{name}</h3>  </Card.Header>
                    <ListGroup variant="flush"  style={{marginTop:'1rem'}}>
                        <ListGroup.Item > 
                        <p>User Latitude : {latLng.lat} </p>
                        <p>User Longitude :{latLng.lng} </p>
                        <p>User Formatted Address : </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Hospital Latitude : {lat} </p>
                            <p>Hospital Longitude :{lon} </p>
                            <p>Hospital Formatted Address : {formatted} </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Hospital Address : {address_line2}</p>
                            <p>Hospital State : {state} </p>
                            <p>Hospital District : {state_district}</p>
                            <p>Hospital Postcode : {postcode}</p>
                        </ListGroup.Item>
                     </ListGroup>
                </Card>
            </Col>


            <Col>
                <Card style={{padding:10,marginTop:'2rem',marginLeft:'10rem', width:'50vh'}}>
                    <div>
                        <h5>Direction To  {name}:</h5>
                    </div>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default Details
