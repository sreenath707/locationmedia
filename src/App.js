import { AppBar,BottomNavigation,BottomNavigationAction } from '@mui/material';
import Button from '@mui/material/Button';
import Post from './post'
import RestoreIcon from '@mui/icons-material/Restore';
import {useState} from 'react'


let posts = [
  {
    userName : 'sreenath707',
    profilePic : 'https://i.pinimg.com/originals/36/60/58/366058cd421e6a981e50c6f800abbbd0.png',
    caption : 'this is cool'
  },
  {
    userName : 'sreenath707',
    profilePic : 'https://i.pinimg.com/originals/36/60/58/366058cd421e6a981e50c6f800abbbd0.png',
    caption : 'this is cool'
  },
  {
    userName : 'sreenath707',
    profilePic : 'https://i.pinimg.com/originals/36/60/58/366058cd421e6a981e50c6f800abbbd0.png',
    caption : 'this is cool'
  }
]

function App() {
  const [value,setValue] = useState(0);
  return (
    <div >
        <AppBar style={{paddingLeft : '30%',height : '50px', background : "#101210"}}>
           <div style={{margin : '10px',fontSize : '170%',fontWeight : 700}}>TravelGram</div>
        </AppBar>
       
       
        <div style={{background : '#141715',paddingTop : '50px',paddingBotom : '50px'}}>
            {value==0?posts.map(post=>{
              return(<Post postdetails = {post}></Post>)
            }):
            value==1 ? <div>buss</div> :<div>nothing</div>
          }
        </div>


        <BottomNavigation
          value={value}
          onChange={(e,v)=>{setValue(v)}}
          showLabels
          style={{position : 'sticky',bottom : 0,width: '100%',background : '#101210'}}
        >
          <BottomNavigationAction style={{color : value===0?'blue':'white'}} label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction style={{color : value===1?'blue':'white'}} label="Favorites" icon={<RestoreIcon />} />
          <BottomNavigationAction style={{color : value===2?'blue':'white'}} label="Nearby" icon={<RestoreIcon />} />
        </BottomNavigation>
    </div>

      
  );
}

export default App;
