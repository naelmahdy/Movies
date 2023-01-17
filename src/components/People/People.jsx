import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Home/home.module.scss'

function People() {
  const [trendingPerson, setTrendingPerson] = useState([])
  const imgUrl = 'https://image.tmdb.org/t/p/original'
  let getTrendingPerson = async () => {
    let { data } = await axios.get('https://api.themoviedb.org/3/trending/person/day?api_key=814feb60aee126a869660e81c84d9251')
    // console.log(data.results);
    setTrendingPerson(data.results)
  }
  useEffect(() => {
    getTrendingPerson()
  }, [])

  return (

    <div className='row my-5'>
      <div className='col-md-4'>
        <div className={`${styles.borderMovie} w-25 mb-4`}></div>
        <h3>Trending </h3>
        <h3> Movies</h3>
        <h3> To Watch Now</h3>
        <span className='text-muted'>most watched person by day</span>
        <div className={`${styles.borderMovie} w-100 mt-4`}></div>
      </div>
      {trendingPerson.slice(0, 16).map((item, index) => (
        <div key={index} className='col-md-2 '>
          <Link to={`/details/${item.id}/${item.media_type}`} className='nav-link'>
            <div className='item position-relative'>
              <img className='w-100' src={`${imgUrl}${item.profile_path}`} alt='d' />
              <h2 className='h6'> {item.title}{item.name} </h2>
              <span className='position-absolute top-0 end-0 p-2 bg-info'>{item.popularity.toFixed(1)}</span>
            </div>
          </Link>


        </div>
      ))}
    </div>
  )
}

export default People;