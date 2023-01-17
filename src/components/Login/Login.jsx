import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'

function Login({ saveUserData }) {

  const [user, setUser] = useState({
    'email': '',
    'password': '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [errorsList, setErrorsList] = useState([])
  let navigate = useNavigate()

  let getInputValue = (e) => {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  let validateFormData = () => {
    const schema = Joi.object({
      email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))
    })
    return schema.validate(user, { abortEarly: false })
  }
  let submitFormData = async (e) => {
    e.preventDefault()
    let validationResponse = validateFormData()
    console.log(validationResponse);
    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details)
    } else {
      // alert('submitFormData')
      console.log('before post', user);
      let { data } = await axios.post(
        'https://sticky-note-fe.vercel.app/signin',
        user
      )
      console.log('data', data);

      if (data.message === 'success') {
        localStorage.setItem('token', data.token)
        saveUserData()
        goToHome()
      } else {
        setErrorMessage(data.message)
      }
    }

  }
  let goToHome = () => {
    navigate('/home')

  }
  return (
    <div className=' w-75 m-auto py-5'>
      <h2>Login form</h2>
      {errorsList.map((error, index) => (
        <div key={index} className='alert alert-danger p-2'>{error.message}</div>
      ))}
      {errorMessage ? <div className='alert alert-danger p-2'>{errorMessage}</div> : ''}

      <form onSubmit={submitFormData}>

        <div className='input-data my-2'>
          <label htmlFor='email' className='age'>E-mail</label>
          <input onChange={getInputValue} id='email' type='email' className='form-control my-3' name='email' />
        </div>
        <div className='input-data my-2'>
          <label htmlFor='password' className='age'>Password</label>
          <input onChange={getInputValue} id='password' type='password' className='form-control my-3' name='password' />
        </div>
        <button className='btn btn-info my-3 float-end'>Login</button>
        <div className='clear-fix'></div>

      </form>
    </div>
  )
}

export default Login