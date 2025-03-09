import UpdateProfileForm from '../components/Dashboard/Settings/UpdateProfileForm';
import  '../pages/styles/Settings.css';

export default function Settings() {
  

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

    
    {/* <UpdatePassword/> */}
    {/* <header>
      <h1>Welcome, {userData?.firstName}!</h1>
      <p>Email: {userData?.email}</p>
      
      <img src={logo} alt="Moogle Logo" />
    </header> */}
    </>
    
  );
}