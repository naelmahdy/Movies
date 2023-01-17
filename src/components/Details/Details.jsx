import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// 
// mediaType id
function Details() {
  let params = useParams()
  // console.log(params);
  const [itemDetails, setItemDetails] = useState({})
  const imgUrl = 'https://image.tmdb.org/t/p/original'
  let getItemsDetails = async () => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=814feb60aee126a869660e81c84d9251&language=en-US`)
    setItemDetails(data);
    console.log(data);
    console.log('itemDetails', itemDetails);
    // setItemDetails(data.results)
  }
  useEffect(() => {
    getItemsDetails(
    )
  }, [getItemsDetails])

  return (
    <div className='row py-3'>
      <div className='col-md-3'>
        {params.mediaType === 'person' ?
          <img className='w-100' src={`${imgUrl}${itemDetails.profile_path}`} alt='d' />
          :
          <img className='w-100' src={`${imgUrl}${itemDetails.poster_path}`} alt='d' />
        }


      </div>
      <div className='col-md-9'>
        <h2>{itemDetails.title}{itemDetails.name}</h2>
        <p className='text-muted'>{itemDetails.overview}{itemDetails.biography}</p>
      </div>

    </div>
  )
}

export default Details