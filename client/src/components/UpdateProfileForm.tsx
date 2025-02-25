import { useState } from 'react';
import logo from "../assets/logo_vertical.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UpdateProfileForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { email });
            if (response.status === 200) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                navigate('/devices');
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="profile__center">
            <h3 className="profile__heading">Profile</h3>
            <div className="profile__container">
                <div className="profile__section">
                    <h3 className="profile__subheading">First Name Last Name</h3>
                </div>
                <div className="profile__section">
                    <h3 className="profile__subheading">Email</h3>
                </div>
            </div>


            <h3 className="profile__heading">Update Profile</h3>
            <div className="profile__container">
                <div className="profile__section">
                    <h3 className="profile__subheading">Update Name</h3>
                    <input
                        type="text"
                        placeholder="New Name"
                        className="profile__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="profile__button" onClick={() => {/* handle name update */}}>Submit</button>
                </div>

                <div className="profile__section">
                    <h3 className="profile__subheading">Update Email</h3>
                    <input
                        type="email"
                        placeholder="New Email"
                        className="profile__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Confirm Email"
                        className="profile__input"
                    />
                    <button className="profile__button" onClick={() => {/* handle email update */}}>Submit</button>
                </div>
            </div>

            {/* Update Password Form */}
            <h3 className="profile__heading">Security Settings</h3>
            <div className="profile__container">
                <div className="profile__section">
                    <h3 className="profile__subheading">Current Password</h3>
                    <input
                        type="password"
                        placeholder="Current Password"
                        className="profile__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="profile__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="profile__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="profile__button" onClick={() => {/* handle name update */}}>Submit</button>
                </div>
            </div>

            <h3 className="profile__heading">Privacy Settings</h3>
            <div className="profile__container">
                <div className="profile__section">
                    <div className="privacy__extra__links">
                            <label className="privacy__checkbox__label">
                                Disable Leaderboard
                                <input type="checkbox" className="login__checkbox" />
                                <span className="login__checkbox__custom"></span>
                            </label>
                            <label className="privacy__checkbox__label">
                                Friends can see my email
                                <input type="checkbox" className="login__checkbox" />
                                <span className="login__checkbox__custom"></span>
                            </label>

                    </div>
                </div>
            </div>




        </div>


    )
}