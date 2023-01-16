import SearchIcon from '@mui/icons-material/Search';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState,useContext } from 'react';
import MovieDataContext from "./MovieDataContext";


export default function Navbar({refreshPage}){
  const [search,setSearch]=useState(false)
  const {query,setQuery}=useContext(MovieDataContext)

  return (
    <div className='home'>
    <nav className='home_navbar'>
      <div><img
      className="home_logo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
      alt="Netflix Logo"
    /></div>
      <div className='navbar_menu'>
        <div>Home</div>
        <div>TV Shows</div>
        <div>Movies</div>
        <div>Latest</div>
        <div>My List</div>
      </div>
      <div className='navbar_info'>
        <SearchIcon onClick={()=>setSearch(!search)}/>
        {search && <input value={query} placeholder='Search...' type="text" onChange={e=>setQuery(e.target.value)}/>}
      <p>KIDS</p>
      <CardGiftcardIcon/>
      <NotificationsNoneIcon/>
      <img className='navbar_avatar' src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
              alt="Netflix Logo"
          />
      </div>
    </nav>
    </div>
  )
}