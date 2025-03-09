const User = require('./models/User');

// Function to generate random temperature and humidity values
function generateRandomData(currentTemperature, currentHumidity) {
    let temperature = parseInt(currentTemperature, 10);
    let humidity = parseInt(currentHumidity, 10);

    // Update temperature
    if (Math.random() < 0.2) { // 20% chance to change
        const tempChange = Math.random() < 0.5 ? -1 : 1; // Increase or decrease by 1
        temperature = Math.max(17, Math.min(25, temperature + tempChange)); // Ensure within range 17-25
    }

    // Update humidity
    if (Math.random() < 0.33) { // 33% chance to change
        const humidityChange = Math.random() < 0.5 ? -1 : 1; // Increase or decrease by 1 or 2
        humidity = Math.max(47, Math.min(75, humidity + humidityChange * (Math.random() < 0.5 ? 1 : 2))); // Ensure within range 47-75
    }

    return { temperature, humidity };
}

// Function to update temperature and humidity for all users
async function updateUserData() {
    try {
        const users = await User.find();
        for (const user of users) {
            const { temperature, humidity } = generateRandomData(user.temperature, user.humidity);
            user.temperature = temperature;
            user.humidity = humidity;
            await user.save();
        }
        console.log('User data updated successfully');
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

// Function to start the simulation
function startSimulation() {
    setInterval(updateUserData, 60000); // Update every 60 seconds
}

module.exports = { startSimulation };