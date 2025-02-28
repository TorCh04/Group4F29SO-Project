import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import axios from 'axios';

const seeds = ['Mason', 'Leo', 'Adrian', 'Jessica', 'Brian', 'Robert', 'Chase', 'Brooklyn', 'Jocelyn',
            'Liam', 'Mackenzie', 'Eliza', 'Caleb', 'Luis', 'Nolan', 'Alexander', 'Vivian', 'Christian', 
            'Eden', 'Sara'];
const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];

const avatar = createAvatar(thumbs, {
    "seed": randomSeed
});

const svg = avatar.toString();

interface ProfileContext {
    userData: {
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    logout: () => void;
    }

export default function UpdateProfileForm() {
    const [name, setName] = useState({firstName: '', lastName: ''});
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPasssword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {userData, logout } = useOutletContext<ProfileContext>();

    const updateName = async () => {
        try {
            const { firstName, lastName } = name; // Extract values correctly
            const response = await axios.put('/api/users/', { firstName, lastName });
            console.log(response.data);
            
            // Ideally, update userData from the parent context
            setName({ firstName: '', lastName: '' }); // Clear input fields after submission
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };
    
    
    console.log("Updating Name:", name);
    
    
    return (
        <div className="profile__center">
            <h3 className="settings__heading">Settings</h3>
            <h3 className="profile__heading">Profile</h3>
            <div className="profile__container">
                <svg className='circle__img'
                    dangerouslySetInnerHTML={{ __html: svg }}
                    width="40"
                    height="40"
                    transform="scale(0.8)"
                />
                <div className="profile__section">
                    <h3 className="profile__info">{userData?.firstName} {userData?.lastName}</h3>
                </div>
                <div className="profile__section">
                    <h3 className="profile__info">{userData?.email}</h3>
                </div>
            </div>


            <h3 className="profile__heading">Update Profile</h3>
            <div className="settings__container">
                <div className="profile__section">
                    <h3 className="profile__subheading">Update Name</h3>
                    <input
                        type="text"
                        placeholder="New Name"
                        className="profile__input"
                        value={name.firstName}
                        onChange={(e) => setName({...name, firstName: e.target.value})}
                        
                    />
                    <button className="profile__button" onClick={() => updateName()}>Submit</button>
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
            <div className="settings__container">
                <div className="profile__section">
                    <h3 className="profile__subheading">Current Password</h3>
                    <input
                        type="password"
                        placeholder="Current Password"
                        className="profile__input"
                        value={oldPassword}
                        onChange={(e) => setOldPasssword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="profile__input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="profile__input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="profile__button" onClick={() => {/* handle name update */}}>Submit</button>
                </div>
            </div>

            
            <h3 className="profile__heading">Privacy Settings</h3>
            <div className="privacy__container">
                <div className="profile__section">
                    <div className="privacy__extra__links">
                            <label className="privacy__checkbox__label">
                                Disable Leaderboard
                                <input type="checkbox" className="privacy__checkbox" />
                                <span className="privacy__checkbox__custom"></span>
                            </label>
                            <label className="privacy__checkbox__label">
                                Friends can see my email
                                <input type="checkbox" className="privacy__checkbox" />
                                <span className="privacy__checkbox__custom"></span>
                            </label>
                    </div>
                </div>
            </div>
        </div>
    )
}