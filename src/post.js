import {Grid} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import RoomIcon from '@mui/icons-material/Room';


function Post(props)
{
    const markerIcon = new L.Icon({
        iconUrl: "https://toppng.com/uploads/preview/map-marker-icon-600x-map-marker-11562939743ayfahlvygl.png",
        iconSize: [35, 45],
        iconAnchor: [17, 46]
      })  
    const [isLiked,setIsLiked] = useState(false);
    function changeLikeStatus(){
        setIsLiked(prev=>!prev);
    }
    return(
        <div style={{padding : '5%'}}>
            <Grid container style={{maxHeight : '50px'}}>
                <Grid item xs='2' style={{maxHeight : '60px'}}>
                    <img src={props.postdetails.profilePic}
                        style={{height : '100%',borderRadius :"50%"}}
                    >

                    </img>
                </Grid>
                <Grid item xs='10' style={{fontSize : '120%'}}>
                    <div style={{marginTop : '13px',color : 'white'}}>{props.postdetails.userName}</div>
                </Grid>
            </Grid>
            <Grid container style={{borderRadius : '3%',border: "1px solid white",height : '300px',marginTop : '20px'}}>
            <MapContainer  style={{borderRadius : '3%',zIndex : 100,width : '100%'}} center={props.postdetails.location} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={markerIcon} position={props.postdetails.location}>
                    
                </Marker>
            </MapContainer>
            </Grid>
            <Grid container style={{maxHeight : '50px'}}>
                {
                    !isLiked ?
                    <Grid item xs='2' style={{color : 'white'}}>
                        <FavoriteBorderIcon fontSize='large' onClick={changeLikeStatus}></FavoriteBorderIcon>
                    </Grid>:
                    <Grid item xs='2' style={{color : 'red'}}>
                        <FavoriteIcon onClick={changeLikeStatus} fontSize='large'></FavoriteIcon>
                    </Grid>
                }
                
                
                <Grid item xs='10' style={{paddingTop : '7px',fontSize : '105%',color : 'white'}}>
                    {props.postdetails.caption}
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Post;