import React,{ useEffect, useState,useRef, useContext } from "react"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MovieDataContext from "./MovieDataContext";


export default function Row(props){
const {title,fetchURL,selectMovie}=props
const [movies,setMovies]=useState([])
const sliderRef = useRef(null);
const {query}=useContext(MovieDataContext)

useEffect(()=>{
  fetch(fetchURL)
  .then((response)=>response.json())
  .then(data=>setMovies(data.results))
},[fetchURL])


const slideLeft = () => {
  let slider = sliderRef.current;
  slider.scrollLeft = slider.scrollLeft - 500;
};
const slideRight = () => {
  let slider = sliderRef.current;
  slider.scrollLeft = slider.scrollLeft + 500;
};

  return (<>
  <div className="home_row">
  <div className="movie_title">{title}</div>
    <div className="movies" ref={sliderRef}>
    <div onClick={slideLeft} className="left_arrow"><ArrowBackIosIcon/></div>
    <div className="movies_category">
      {movies
      .filter(
        movie=>movie.title.toLowerCase().includes(query)
      )
    .map(movie=>{
      return (
      <img key={movie.id}
      className="home_movie"
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.name}
      id={movie.id}
      onClick={()=>selectMovie(movie)}/>)
    })}</div>
    <div onClick={slideRight} className="right_arrow"><ArrowForwardIosIcon/></div>
    </div>
  </div>
  </>
  )
} 