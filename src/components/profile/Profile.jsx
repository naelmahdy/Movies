import React from 'react'

function Profile({ userData }) {
  console.log(userData);
  return (
    <>
      <div className='profile w-50 bg-info mt-5 py-4 m-auto text-center'>
        <h2>name:{userData.first_name}{userData.last_name}</h2>
        <h2>age:{userData.age}</h2>
        <h2>email:{userData.email}</h2>
      </div>
    </>
  )
}

export default Profile
