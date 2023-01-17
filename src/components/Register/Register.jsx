import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'


function Register() {
  const [user, setUser] = useState({
    'first_name': '',
    'last_name': '',
    'age': '',
    'email': '',
    'password': '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [errorsList, setErrorsList] = useState([])
  let navigate = useNavigate()

  // https://routeegypt.herokuapp.com/signin
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
        'https://sticky-note-fe.vercel.app/signup',
        user
      )
      if (data.message === 'success') {
        // alert('good')
        goToLogin()
      } else {
        // alert(data.message)
        setErrorMessage(data.message)
      }
    }

  }
  let goToLogin = () => {
    navigate('/login')

  }
  let getInputValue = (e) => {
    let myUser = { ...user }
    // myUser.first_name = e.target.valu
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    // console.log(user);
  }
  let validateFormData = () => {

    const schema = Joi.object({
      first_name: Joi.string().alphanum().required().min(2).max(10),
      last_name: Joi.string().alphanum().required().min(2).max(10),
      age: Joi.number().required().min(20).max(80),
      email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))
    })
    return schema.validate(user, { abortEarly: false })
  }
  return (
    <>

      <div className=' w-75 m-auto py-5'>
        <h2>Register form</h2>
        {errorsList.map((error, index) => (
          <div key={index} className='alert alert-danger p-2'>{error.message}</div>
        ))}
        {errorMessage ? <div className='alert alert-danger p-2'>{errorMessage}</div> : ''}

        <form onSubmit={submitFormData}>
          <div className='input-data my-2'>
            <label htmlFor='first-name' className='first-name'>First Name</label>
            <input onChange={getInputValue} id='first-name' type='text' className='form-control my-3' name='first_name' />
          </div>
          <div className='input-data my-2'>
            <label htmlFor='last-name' className='last-name'>Last Name</label>
            <input onChange={getInputValue} id='last-name' type='text' className='form-control my-3' name='last_name' />
          </div>
          <div className='input-data my-2'>
            <label htmlFor='age' className='age'>Age</label>
            <input onChange={getInputValue} id='age' type='number' className='form-control my-3' name='age' />
          </div>
          <div className='input-data my-2'>
            <label htmlFor='email' className='age'>E-mail</label>
            <input onChange={getInputValue} id='email' type='email' className='form-control my-3' name='email' />
          </div>
          <div className='input-data my-2'>
            <label htmlFor='password' className='age'>Password</label>
            <input onChange={getInputValue} id='password' type='password' className='form-control my-3' name='password' />
          </div>
          <button className='btn btn-info my-3 float-end'>Register</button>
          <div className='clear-fix'></div>

        </form>
      </div>


    </>
  )
}

export default Register