// Making Server Calls
import { useState, useEffect } from 'react';
import axios from "axios";

export default function ServerCall() {
    // State to store the data from the server
    const [array, setArray] = useState([]);

    // Function to fetch data from the server
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:8080/api");
        setArray(response.data.fruits);
        console.log(response.data.fruits);
    };

    // Use fetch function
    useEffect(() => {
        fetchAPI();
    }, []);


    return (
        <div>
            {array.map((fruit, index) => (
                <div key={index}>
                    <p>{fruit}</p>
                    <br></br>
                </div>
            ))}
        </div>
    )
}