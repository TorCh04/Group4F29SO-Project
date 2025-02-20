import React, { useState } from 'react';
import Header from '../components/Header';
import roombaImage from '../assets/roomba.svg';

export default function DevicesPage() {
    const [isSliderOn, setIsSliderOn] = useState(false); // State for slider
    const [text, setText] = useState("Roomba"); // State for text under the image

    const toggleSlider = () => {
        setIsSliderOn(!isSliderOn);
    };

    return (
        <>
            {/*Title*/}
            <h1
                style={{
                    marginTop: '10px',
                    textAlign: 'left',
                    fontSize: '32px',
                    color: 'white',
                    padding: "1em 2em 1em 1em"
                }}
            >
                {"Smart Devices"}
            </h1>
            
            {/* Box */}
            <div
                style={{
                    border: '2px solid black',
                    width: '300px',
                    height: '400px', 
                    display: 'flex',
                    flexDirection: 'column', // Stack items vertically
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    margin: '20px 0 20px 20px', 
                }}
            >
                {/* Image */}
                <img
                    src={roombaImage}
                    alt="Roomba"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                />

                {/* Text Under the Image */}
                <p
                    style={{
                        marginTop: '10px',
                        textAlign: 'center',
                        fontSize: '32px',
                        color: 'white',
                    }}
                >
                    {text}
                </p>

                {/* Slider Switch in Bottom-Left Corner */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px', // Position it in the bottom-left corner
                    }}
                >
                    <label
                        style={{
                            display: 'inline-block',
                            position: 'relative',
                            width: '60px',
                            height: '34px',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isSliderOn}
                            onChange={toggleSlider}
                            style={{
                                opacity: 0,
                                width: 0,
                                height: 0,
                            }}
                        />
                        <span
                            style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: isSliderOn ? 'green' : 'red', // Green when ON, Red when OFF
                                transition: '.4s',
                                borderRadius: '34px',
                            }}
                        ></span>
                        <span
                            style={{
                                position: 'absolute',
                                height: '26px',
                                width: '26px',
                                left: '4px',
                                bottom: '4px',
                                backgroundColor: 'white',
                                transition: '.4s',
                                borderRadius: '50%',
                                transform: isSliderOn ? 'translateX(26px)' : 'translateX(0)',
                            }}
                        ></span>
                    </label>
                </div>
            </div>
        </>
    );
}