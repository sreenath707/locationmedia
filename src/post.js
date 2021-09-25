import {Grid} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';


function Post(props)
{
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
            <Grid container style={{border: "1px solid white",height : '300px',marginTop : '10px'}}>
                
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