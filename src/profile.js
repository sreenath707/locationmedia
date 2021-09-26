import { PinDropSharp } from "@mui/icons-material";
import { Grid,Button } from "@mui/material";


function Profile(props){
    return(
        <div style={{padding : '10px'}}>
            <Grid container >
                <Grid xs="12">
                    <img src={props.user.profilePic}
                        style={{marginLeft : "17%",height : '100%',borderRadius :"50%"}}
                    >
                    </img>
                </Grid>
                <Grid xs="12">
                    <div style={{display : 'flex',justifyContent : "center",marginTop : "10px",fontSize : '170%'}}>{props.user.userName}</div>
                </Grid>
                {props.user.bio &&
                <Grid xs="12">
                    <div style={{display : 'flex',justifyContent : "center",marginTop : "10px",fontSize : '100%'}}>{props.user.bio}</div>
                </Grid>
                }
                <Grid xs="12">
                <Button style={{marginLeft : "40%",marginTop : '20%'}} variant="outlined" color="error">
                    log out
                </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile;