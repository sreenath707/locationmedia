import { AppBar,BottomNavigation,BottomNavigationAction } from '@mui/material';
import Button from '@mui/material/Button';
import Post from './post'
import RestoreIcon from '@mui/icons-material/Restore';
import {useState,useEffect} from 'react'
import Profile from './profile'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import Upload from './upload';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { MarginTwoTone } from '@mui/icons-material';


const axios = require('axios');



function App() {

  const [posts,setPosts] = useState([]);
  const [curPosts,setCurPosts] = useState([]);
  const [value,setValue] = useState(0);
  const [gpsCords,setgpsCords] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isIncorrect,setIsInCorrect] = useState(false);
  const [isGoing,setIsGoing] = useState(false);

  const [postUserName,setPostUserName] = useState('');
  const [postPassword,setPostPassword] = useState('');
  const [postEmail,setPostEmail] = useState('');
  let history = useHistory();
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currUser")));

  function fetchPostHandler(){
    axios.get('http://localhost:80/post')
    .then(data=>{
      setPosts(data.data);
    })
    .catch(e=>{console.log(e)})
  }

  useEffect(()=>{
    
    console.log("entered");
    navigator.geolocation.getCurrentPosition(position=>{
      setgpsCords([position.coords.latitude,position.coords.longitude]);
    },error=>{
      console.log(error);
    })

    axios.get('http://localhost:80/post')
      .then(data=>{
        setPosts(data.data);
        setCurrentUser(()=>(JSON.parse(localStorage.getItem("currUser"))));
        console.log(JSON.parse(localStorage.getItem("currUser")));
      })
      .catch(e=>{console.log(e)})

      setTimeout(() => {
        if(currentUser != JSON.parse(localStorage.getItem("currUser"))){
          setCurrentUser(JSON.parse(localStorage.getItem("currUser")));
        }
      }, 2000);

  },[isGoing])

  function formSubmitHandler(){
    axios.post('http://localhost:80/user',{username :userName,password})
    .then(data=>{
      if(data.data[0]){
        localStorage.setItem("currUser",JSON.stringify(data.data[0]) );
        setIsGoing(prev=>(!prev));
        history.push("/home");
      }
      else{
        setIsInCorrect(true);
        setTimeout(()=>{setIsInCorrect(false)},5000);
      }
    })
    .catch(e=>{console.log(e)})
  }
  function postFormSubmitHandler(){
    axios.post('http://localhost:80/userPost',{username :postUserName,password : postPassword,email : postEmail})
    .then(data=>{
      history.push("/");
    })
    .catch(e=>{console.log(e)})
  }


  return (

        <switch>
          <Route path="/home">
            {currentUser ?
              <div style={{maxWidth : '500px'}}>
                  <AppBar style={{display : "flex", justifyContent : 'center' ,height : '50px', background : "#101210"}}>
                    <div style={{margin : '10px',fontSize : '170%',fontWeight : 700}}>TravelGram</div>
                  </AppBar>
                
                
                  <div style={{minHeight : '700px',color : 'white',background : '#141715',paddingTop : '50px',paddingBotom : '50px'}}>
                      {value==0?posts.map(post=>{
                          if(post.userName === currentUser.username){
                            return null;
                          }else{
                            return(<Post postdetails = {post}></Post>)
                          }
                      }):
                      value==1 ? 
                      <Upload  user={currentUser} gpsCords={gpsCords}></Upload> :

                      <Profile user={currentUser}></Profile>
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
              </div> : <div>login and come back</div>
              }
            </Route>
            <Route path="/signup">
              <div>
                  <AppBar  style={{display : "flex", justifyContent : 'center' ,height : '50px', background : "#101210"}}>
                    <div style={{margin : '10px',fontSize : '170%',fontWeight : 700}}>TravelGram</div>
                  </AppBar>
                  
                  <form  style={{borderRadius : "10%",marginTop : '200px', marginLeft : "75px", background : "black", padding : "20px",maxWidth : "265px"}}>
                    <h1 style={{ color : "#1976d2" }}>signup</h1>
                    <div style={{marginBottom : "10px"}}>
                      <TextField onChange={(e)=>{setPostEmail(e.target.value)}} style={{color : 'white'}} id="standard-basic" label="email" variant="standard" focused />                      
                    </div>
                    <div style={{marginBottom : "10px"}}>
                      <TextField onChange={(e)=>{setPostUserName(e.target.value)}} style={{color : 'white'}} id="standard-basic" label="Username" variant="standard" focused />                      
                    </div>
                    <div style={{marginBottom : "10px"}}>
                      <TextField type="password" onChange={(e)=>{setPostPassword(e.target.value)}} style={{color : 'white'}} id="standard-basic" label="password" variant="standard" focused />
                    </div>
                    <a href="/" style={{textDecoration : 'none',color : 'yellow'}}>already have an account? login</a>
                    <div>
                      <Button style={{marginTop : "20px"}} onClick={postFormSubmitHandler} variant="outlined">signup</Button>
                    </div>
                  </form>
                </div>
            </Route>
            <Route path="/" exact>
              <div>
                  <AppBar style={{display : "flex", justifyContent : 'center' ,height : '50px', background : "#101210"}}>
                    <div style={{margin : '10px',fontSize : '170%',fontWeight : 700}}>TravelGram</div>
                  </AppBar>
                  
                  <form action="/" method="post" style={{borderRadius : "10%",marginTop : '200px', marginLeft : "75px", background : "black", padding : "20px",maxWidth : "265px"}}>
                    <h1 style={{ color : "#1976d2" }}>login</h1>
                    <div style={{marginBottom : "10px"}}>
                      <TextField onChange={(e)=>{setUserName(e.target.value)}} style={{color : 'white'}} id="standard-basic" label="Username" variant="standard" focused />                      
                    </div>
                    <div style={{marginBottom : "10px"}}>
                      <TextField type="password" onChange={(e)=>{setPassword(e.target.value)}} style={{color : 'white'}} id="standard-basic" label="password" variant="standard" focused />
                    </div>
                    {isIncorrect && <div style={{color : 'red',marginBottom : '10px'}}>username or password is incorrect</div>}
                    <a href="/signup" style={{textDecoration : 'none',color : 'yellow',marginBottom : "10px"}}>don't have account? signup</a>
                    <div>
                      <Button style={{marginTop : "20px"}} onClick={formSubmitHandler} variant="outlined">login</Button>
                    </div>
                  </form>
                </div>
            </Route>

        </switch>
      
  );
}

export default App;
