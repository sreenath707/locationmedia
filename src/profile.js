import { PinDropSharp } from "@mui/icons-material";
import { Grid,Button } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';


function Profile(props){
    let history = useHistory();
    useEffect(()=>{
        console.log(props.user);
    },[])
    return(
        <div style={{padding : '10px'}}>
            <Grid container >
                <Grid xs="12">
                    <img src={props.user.profilePic}
                        style={{marginLeft : "37%",height : '100px',width : "100px",borderRadius :"50%"}}
                    >
                    </img>
                </Grid>
                <Grid xs="12">
                    <div style={{display : 'flex',justifyContent : "center",marginTop : "10px",fontSize : '170%'}}>{props.user.username}</div>
                </Grid>
                {props.user.bio &&
                <Grid xs="12">
                    <div style={{display : 'flex',justifyContent : "center",marginTop : "10px",fontSize : '100%'}}>{props.user.bio}</div>
                </Grid>
                }
                <Grid xs="12">
                <Button style={{marginLeft : "40%",marginTop : '20%'}} variant="outlined" color="error"
                    onClick={()=>{history.push("/")}}                
                >
                    log out
                </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile;