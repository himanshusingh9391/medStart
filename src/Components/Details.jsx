import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

function Details() {

    const location = useLocation();
     const [latLng, setLatLng] = useState({})
    const navigate = useNavigate();
    const [add, setAdd] = useState([]);
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

    useEffect(()=>{
        const API = `https://api.geoapify.com/v1/geocode/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json&apiKey=a7f4f14fc5b540a1a1ba1015b4453e45`
         axios.get(API).then(resp => {
            const features = resp.data.results
            const net = [];
            features.map((feature)=> net.push(feature));
            setAdd(net);
        })
    },[latLng]);

     useEffect(()=>{
        const GPI = `https://api.geoapify.com/v1/routing?waypoints=${latLng.lat},${latLng.lng}|${lat},${lon}&mode=drive&apiKey=a7f4f14fc5b540a1a1ba1015b4453e45`
        axios.get(GPI).then((response)=>{
            const featuresAr = response.data.features
            const now = [];
            featuresAr.map((feature)=> now.push(feature.properties));
            setSub(now);

        })
        .catch((error)=>{
            console.log(error)
        })
    },[latLng]);
    

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
                        <p>User Formatted Address : <div>{add.map((d)=>{return(<div>{d.neighbourhood}{d.formatted}</div>)})}</div></p> 
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
                        <div>
                            {sub.map((e,index)=>{
                                return(
                                    <div key={index}>       
                                    {e.legs[0].steps.map((m)=>{
                                        return(
                                            <ul>
                                                <li>{m.instruction.text}</li>
                                            </ul>
                                        )
                                    })}
                                    </div>
                                )
                            })}
                        </div>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default Details
