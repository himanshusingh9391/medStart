import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';



function Home() {
    const location  = useLocation();
    const [latLng, setLatLng] = useState({});
    const [hospitals,setHospitals] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position)=>{
                setLatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                // console.log(latLng);
            })
        } 
    },[]);

    useEffect(()=>{
       
        const geoAPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latLng.lng},${latLng.lat},5000&bias=proximity:78.44847,17.41109&limit=20&apiKey=a8edd70c32be4bfc86f02a309537f2c8`
        axios.get(geoAPI).then(res=> {
            const featuresArr = res.data.features;
            const names = [];
            featuresArr.map((feature)=> names.push(feature.properties));
            setHospitals(names);
            // console.log(geoAPI)
        });
    },[latLng])



    
  return (
    
    <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'1rem',justifyContent:'space-between', overflow:'hidden',marginTop:'2rem',marginLeft:'1rem'}}>
            {
                hospitals.map((hospital)=>{
                    return(
                        <div >
                        <Card onClick = {() => navigate('/details', { state: hospital})}style={{width:'80vh',marginLeft:'4rem'}}>
                            <Card.Body style={{height:165,width:'68vh'}}>
                                <Card.Title>{hospital.name}</Card.Title>
                                <Card.Text style={{marginTop:'0.5rem'}}>{hospital.address_line2}</Card.Text>
                                <Card.Text style={{marginTop:'-1rem'}}>{hospital.categories}</Card.Text>
                            </Card.Body>

                        </Card>
                        </div>
                   )
                })
            }
    </div>
  )
}

export default Home
