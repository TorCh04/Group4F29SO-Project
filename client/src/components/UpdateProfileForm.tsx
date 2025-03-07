import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import axios from 'axios';
import React from 'react';

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
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
    } | null;
    logout: () => void;
    }

export default function UpdateProfileForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({
                                            email: '',
                                            curPassword: '',
                                            newPassword: '',
                                            samePassword: ''
                                        });
    const [success, setSuccess] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {userData, logout } = useOutletContext<ProfileContext>();
    const [usersData, setUserData] = useState({});
    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setConfirmEmail('');
        setCurPassword('');
        setNewPassword('');
        setConfirmPassword('');
        };



    // const updateName = {
    //     $set: {
    //         quantity: 5,
    //     },
    //     };



    
    const updateName = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sending update name request...');
        try {
            const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:8080/updateName', 
            { firstName, lastName },  // Request body (corrected)
            { headers: { Authorization: `Bearer ${token}` } } // Headers (moved to the right place)
        );     
        console.log('Response reached');
        console.log(response.data);
        setUserData(response.data);
        setSuccess(prevSuccess => ({ ...prevSuccess, name: 'Name changed successfully' }));
        resetForm();
        window.location.reload(); 
        } catch (error) {
            console.error("Error updating name:", error);
        }
        
    };

    const updateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sending update email request...');
        if (email !== confirmEmail) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Emails do not match' }));
            return;
        }
        try {
            const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:8080/updateEmail', 
            { email },  
            { headers: { Authorization: `Bearer ${token}` } } // Headers (moved to the right place)
        );     
        console.log('Response reached');
        console.log(response.data);
        setSuccess(prevSuccess => ({ ...prevSuccess, email: 'Email changed successfully' }));
        resetForm();
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };


    const verifyCurPassword = async (curPassword: string) => {
        try 
        {   
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8080/verifyPassword', 
                { curPassword },
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            if (response.status === 200) {
                // Store token in localStorage
                console.log("password matches!")
                return true;
                

            }
            else {
                return false;
            }
        
        // Handle the response from the server
        } catch (error) {
        console.error('Error verifying old password:', error);
        }
        
    };
    
    const updatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(prevSuccess => ({ ...prevSuccess, password: '' }));

        const isCurPasswordCorrect = await verifyCurPassword(curPassword);
        if (!isCurPasswordCorrect) {
            console.log("Old password is incorrect");
            setErrors(prevErrors => ({ ...prevErrors, newPassword: '' }));
            setErrors(prevErrors => ({ ...prevErrors, curPassword: 'Your current password is incorrect' }));
            return;
            } else {
            setErrors(prevErrors => ({ ...prevErrors, newPassword: '' }));
            setErrors(prevErrors => ({ ...prevErrors, curPassword: '' }));
            }

        if (newPassword !== confirmPassword) {
            console.log("Passwords do not match");
            setErrors(prevErrors => ({ ...prevErrors, newPassword: 'Passwords do not match' }));
            return;
            } else {
            setErrors(prevErrors => ({ ...prevErrors, newPassword: '' }));
            
            if (curPassword === newPassword || curPassword == confirmPassword) {
                setErrors(prevErrors => ({ ...prevErrors, samePassword: 'New password cannot be the same as current password' }));
                return;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, samePassword: '' }));
            }
            }
        
        
        // Don't think I need these
        // setErrors(prevErrors => ({
        //     ...prevErrors,
        //     curPassword: isOldPasswordCorrect ? '' : 'Your current password is incorrect',
        //     newPassword: newPassword === confirmPassword ? '' : 'Passwords do not match',
        //     samePassword: oldPassword === confirmPassword ? '' : 'New password is the same as the current one'
        // }));

        console.log('Sending update password request...');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
            'http://localhost:8080/updatePassword', 
            { confirmPassword },
            { headers: { Authorization: `Bearer ${token}` } } 
        );     
        console.log('Response reached');
        console.log(response.data);
        setSuccess(prevSuccess => ({ ...prevSuccess, password: 'Passwords changed succesfully' }));
        resetForm();
            
            // Ideally, update userData from the parent context
            // setFormData({ email: '', firstName: '', lastName: '', password: '', confirmPassword: '' }); // Clear input fields after submission
        } catch (error) {
            console.error("Error updating password:", error);
        } 
    };

    // // Testing
    console.log("Updating Name:", firstName);
    console.log("Updating Email:", email);
    console.log("Updating Password:", curPassword);
    console.log("Updating New Password:", newPassword);
    console.log("Updating Confirm Password:", confirmPassword);
    



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
                    <form onSubmit={updateName}>
                        <input
                        type="text"
                        placeholder="First Name"
                        className="profile__input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="profile__input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} 
                        />
                        <input type="submit" value="Submit" className="profile__button" />
                        {success.name && <p className="success__message">{success.name}</p>}
                    </form>                    
                </div>

                <div className="profile__section">
                    <h3 className="profile__subheading">Update Email</h3>
                    <form onSubmit={updateEmail}>
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
                        className="profile__input"value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                    />
                    {errors.email && <p className="error__message">{errors.email}</p>}
                    <input type="submit" value="Submit" className="profile__button" />
                    {success.email && <p className="success__message">{success.email}</p>}
                    </form>
                </div>
            </div>

            {/* Update Password Form */}
            <h3 className="profile__heading">Security Settings</h3>
            <div className="settings__container">
                <div className="profile__section">
                    <h3 className="profile__subheading">Current Password</h3>
                    <form onSubmit={updatePassword}>
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="profile__input"
                            value={userData?.password}
                            onChange={(e) => {
                                                setCurPassword(e.target.value);
                                                verifyCurPassword(e.target.value);
                                            }
                                    }
                        />
                        {errors.curPassword && <p className="error__message">{errors.curPassword}</p>}
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
                        <input type="submit" value="Submit" className="profile__button" />
                        {errors.newPassword && <p className="error__message">{errors.newPassword}</p>}
                        {errors.samePassword && <p className="error__message">{errors.samePassword}</p>}
                        {success.password && <p className="success__message">{success.password}</p>}
                    </form>
                    
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