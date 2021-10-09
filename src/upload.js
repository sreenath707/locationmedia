import TextField from '@mui/material/TextField';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import RoomIcon from '@mui/icons-material/Room';
import {Grid} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import './style.css'
import { useState } from 'react';
import Popover from '@mui/material/Popover';
const axios = require('axios');

function Upload(props){

    
    const [anchorEl, setAnchorEl] = useState(null);
    const [popover,setpopover] = useState(false);

    const [caption,setCaption] = useState('');
    const [isPosted,setIsPosted] = useState(false);


    function postUploadHandler(event){
        axios.post('http://localhost:80/post',
         
        {
            userName : props.user.username,
            profilePic : props.user.profilePic,
            caption : caption,
            location : props.gpsCords
        })
        
        console.log("arroved");
        setIsPosted(true);
        setTimeout(()=>{setIsPosted(false)},5000);

    }


    const markerIcon = new L.Icon({
        iconUrl: "https://toppng.com/uploads/preview/map-marker-icon-600x-map-marker-11562939743ayfahlvygl.png",
        iconSize: [35, 45],
        iconAnchor: [17, 46]
      })
    return (
        <div style={{padding: '10px'}}>
            <TextField onChange={(e)=>{setCaption(e.target.value)}} style={{color : 'white'}} id="standard-basic" label="What's in your mind" variant="standard" focused />
            <Grid container style={{borderRadius : '3%',border: "1px solid white",height : '300px',marginTop : '10px'}}>
            <MapContainer  style={{ borderRadius : '3%',zIndex : 100,width : '100%'}} center={props.gpsCords} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={markerIcon} position={props.gpsCords}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            </Grid>

            <Button
                onClick={postUploadHandler}
                 style={{marginTop : '10px',marginLeft : '80%'}} variant="contained" endIcon={<SendIcon />}>
                Post
            </Button>
            {
                isPosted && <div style={{marginLeft : '40%', marginTop : '10%', fontSize : '140%'}}>Posted...</div>
            }


        </div>
    )
}

export default Upload;  