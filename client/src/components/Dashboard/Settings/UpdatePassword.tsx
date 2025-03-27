import { useState } from 'react';
// import logo from "../assets/logo_vertical.svg";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


export default function UpdateProfileForm() {
    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const navigate = useNavigate();

    return (
        <div className="profile__center">
            <h3 className="profile__heading">Security Settings</h3>
            <div className="profile__container">
                

                <div className="profile__section">
                    <h3 className="profile__subheading">Change Password</h3>
                    <input 
                        type="text" 
                        placeholder="Current Password" 
                        className="profile__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="New Password" 
                        className="profile__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Confirm Password" 
                        className="profile__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="profile__button" onClick={() => {/* handle name update */}}>Submit</button>
                </div>

            </div>
        </div>


    )
}