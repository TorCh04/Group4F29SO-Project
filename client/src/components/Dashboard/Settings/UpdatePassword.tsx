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
            <h3 className="profile__heading">Security Settings</h3>
            <div className="profile__container">
                

                <div className="profile__section">
                    <h3 className="profile__subheading">Current Password</h3>
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