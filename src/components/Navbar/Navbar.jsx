import React from 'react'
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
function Navbar({ userData, handleLogOut }) {

  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary ${styles.bgNavbar}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ?
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/movies">Movies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tvShows">Tv Shows</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/people">People</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul> : ''}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div className='d-flex align-items-center'>
                <i className='fab fa-facebook mx-2'></i>
                <i className='fab fa-spotify mx-2'></i>
                <i className='fab fa-instagram mx-2'></i>
                <i className='fab fa-youtube mx-2'></i>
              </div>
              {userData ?
                <li className="nav-item">
                  <div className='d-flex align-items-center'>
                    <Link to={'/profile'}>hello:{userData.first_name}</Link>
                    <Link className="nav-link" to="/login" onClick={handleLogOut}>Logout</Link>
                  </div>
                </li> : <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>

                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>


                </>}


            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar