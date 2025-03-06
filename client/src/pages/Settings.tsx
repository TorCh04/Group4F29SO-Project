import { useOutletContext } from 'react-router-dom';
import logo from '../assets/logo_vertical.svg';
import UpdateProfileForm from '../components/UpdateProfileForm';
import UpdatePassword from '../components/UpdatePassword';
import  '../pages/styles/Settings.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface DashboardContext {
  userData: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  logout: () => void;
}

export default function Settings() {
  const { userData, logout } = useOutletContext<DashboardContext>();
  

  // useEffect(() => {
  //   axios
  //     .get<{email: string, firstName: string, lastName: string}>(
  //       `http://localhost:8080/api/users/${userData?.email}`
  //     )
  //     .then(response => {
  //       setName({
  //         firstName: response.data.firstName,
  //         lastName: response.data.lastName,
  //       });
  //     })
  //     .catch(error => console.error("Error fetching name data:", error));
  // }, [userData?.email]);

  

  return (
  <>
    <UpdateProfileForm />
    <p>Email: {userData?.email}</p>
    <p>First Name: {userData?.firstName}</p>
    <p>Last Name: {userData?.lastName}</p>

    
    {/* <UpdatePassword/> */}
    {/* <header>
      <h1>Welcome, {userData?.firstName}!</h1>
      <p>Email: {userData?.email}</p>
      <button onClick={logout}>Logout</button>
      <img src={logo} alt="Moogle Logo" />
    </header> */}
    </>
    
  );
}