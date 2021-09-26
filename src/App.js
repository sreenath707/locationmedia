import { AppBar,BottomNavigation,BottomNavigationAction } from '@mui/material';
import Button from '@mui/material/Button';
import Post from './post'
import RestoreIcon from '@mui/icons-material/Restore';
import {useState,useEffect} from 'react'
import Profile from './profile'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Upload from './upload';


const axios = require('axios');




let user = {
  userName : "sreenath707",
  profilePic : 'https://i.pinimg.com/originals/36/60/58/366058cd421e6a981e50c6f800abbbd0.png',
  bio  : 'New to Travelgram'
}

function App() {

  const [posts,setPosts] = useState([]);
  const [value,setValue] = useState(0);
  const [gpsCords,setgpsCords] = useState([]);

  function fetchPostHandler(){
    axios.get('http://localhost:80/post')
    .then(data=>{
      setPosts(data.data);
    })
    .catch(e=>{console.log(e)})
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      setgpsCords([position.coords.latitude,position.coords.longitude]);
    },error=>{
      console.log(error);
    })

    axios.get('http://localhost:80/post')
      .then(data=>{
        setPosts(data.data);
      })
      .catch(e=>{console.log(e)})

  },[])

  return (

      <div >
          <AppBar style={{paddingLeft : '30%',height : '50px', background : "#101210"}}>
            <div style={{margin : '10px',fontSize : '170%',fontWeight : 700}}>TravelGram</div>
          </AppBar>
        
        
          <div style={{minHeight : '600px',color : 'white',background : '#141715',paddingTop : '50px',paddingBotom : '50px'}}>
              {value==0?posts.map(post=>{
                return(<Post postdetails = {post}></Post>)
              }):
              value==1 ? 
              <Upload  user={user} gpsCords={gpsCords}></Upload> :

              <Profile user={user}></Profile>
            }
          </div>


          <BottomNavigation
            value={value}
            onChange={(e,v)=>{setValue(v)}}
            showLabels
            style={{zIndex : 1000,position : 'sticky',bottom : 0,width: '100%',background : '#101210'}}
          >
            <BottomNavigationAction onClick={fetchPostHandler} style={{color : value===0?'white':'#585c61'}} label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction onClick={()=>{
                    navigator.geolocation.getCurrentPosition(position=>{
                      setgpsCords([position.coords.latitude,position.coords.longitude]);
                    },error=>{
                      console.log(error);
                    })
                  }}
              style={{color : value===1?'white':'#585c61'}} label="Post"
              icon={<AddBoxIcon />} 
            />
            <BottomNavigationAction style={{color : value===2?'white':'#585c61'}} label="Profile" icon={<PersonIcon />} />
          </BottomNavigation>
      </div>


      
  );
}

export default App;
