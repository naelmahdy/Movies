import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Movies from './components/Movies/Movies';
import TvShows from './components/TvShows/TvShows';
import Register from './components/Register/Register';
import People from './components/People/People';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Profile from './components/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
// import MasterLayout from './components/MasterLayout/MasterLayout';

function App() {
  const [userData, setUserData] = useState(null)
  let saveUserData = () => {
    let encodedToken = localStorage.getItem('token')
    let decodedToken = jwtDecode(encodedToken)
    // console.log('decodedToken', decodedToken);
    setUserData(decodedToken)
  }
  // saveUserData()
  const handleLogOut = () => {
    localStorage.removeItem('token')
    saveUserData(null)
    return <Navigate to={'/login'} />
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveUserData()
    }
  }, [])

  return (
    <>
      <HashRouter>
        <Navbar userData={userData} handleLogOut={handleLogOut} />
        <div className="container">
          <Routes>


            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
            <Route path="/tvShows" element={<ProtectedRoute><TvShows /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile userData={userData} /></ProtectedRoute>} />
            <Route path="/login" element={<Login saveUserData={saveUserData} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/people" element={<ProtectedRoute><People /></ProtectedRoute>} />
            <Route path="/details/:id/:mediaType" element={<ProtectedRoute><Details /></ProtectedRoute>} />
            <Route path="*" element={<Notfound />} />

          </Routes>
        </div>

      </HashRouter>

    </>
  );
}

export default App;
