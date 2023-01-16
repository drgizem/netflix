import Navbar from "./Navbar"
import Row from "./Row"
import Requests from "../Requests"
import "./Home.css"
import {useEffect, useState} from "react"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Youtube from "react-youtube"
import MovieDataContext from "./MovieDataContext"


export default function Home(){
  const [selected,setSelected]=useState({})
  const [playing,setPlaying]=useState(false)
  const [trailer,setTrailer]=useState(null)
  const [query,setQuery]=useState("")

  const url=`https://api.themoviedb.org/3/movie/${selected.id}?api_key=4e828b48007bf6658d97157440c415e8&append_to_response=videos`

  useEffect(()=>{
    fetch(Requests.requestNetflixOriginal)
    .then((response)=>response.json())
    .then(data=>setSelected(data.results[
      Math.floor(Math.random()*data.results.length-1)
    ]))
  },[])

  const opts={
    height :"700",
    width : "100%",
    playerVars:{
      autoplay:1,
    },
  }
  const playVideo=async()=>{
    const res = await fetch(
      url,
      {
        method: 'GET',
      }
    )
  const data = await res.json()
  const trail = data.videos.results.find(vid => vid.name.includes("Trailer"))
  setTrailer(trail ? trail : data.videos.results[0])
  setPlaying(true)
}
  const selectMovie=(movie)=>{
    setSelected(movie)
    setPlaying(false)
  }

  return (<>
  <MovieDataContext.Provider
  value={{query,setQuery}}>
  <div className="container">
    <Navbar/>
    {query ==="" && <header className="selected" style={{
      backgroundSize :"cover",
      backgroundImage : `url(
          "http://image.tmdb.org/t/p/original/${selected.backdrop_path}"
      )`
  }}>
    <div className="selected_info">
      <h1 className="selected_title">{selected.name || selected.title}</h1>
      <div className="selected_overview">{selected.overview}</div>
      <div className="selected_btn">
      <button className="play" onClick={playVideo}><ArrowRightIcon/><span>Play</span></button>
      <button className="info">More Info</button>
      </div>
    </div>
    {playing && <Youtube className="select_video" videoId={trailer.key} opts={opts} />}
      </header>}
    <div className="categories">
    <Row title="Action" fetchURL={Requests.requestAction} selectMovie={selectMovie}/>
    <Row title="Horror" fetchURL={Requests.requestHorror} selectMovie={selectMovie}/>
    <Row title="Comedy" fetchURL={Requests.requestComedy} selectMovie={selectMovie}/>
    <Row title="Romance" fetchURL={Requests.requestRomance} selectMovie={selectMovie}/>
    <Row title="Top Rated" fetchURL={Requests.requestTopRated} selectMovie={selectMovie}/>
    <Row title="Up Coming" fetchURL={Requests.requestUpComing} selectMovie={selectMovie}/>
    </div>
    </div>
    </MovieDataContext.Provider>
  </>
  )
}