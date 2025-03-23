# F29SO-Project
Access the live website [here](https://moogle-expo-fc7f4aee8a60.herokuapp.com) or follow the instructions below for development purposes.

## Project Setup
### Step 1: Install NodeJS
Download Link: [NodeJS](https://nodejs.org/).
### Step 2: Install the Node dependencies for the project
Open ```\Group4F29SO-Project``` in terminal and run ```npm install```.

### Step 3: Set up MongoDB
Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass).

### Step 4: Setup a new connection on MongoDB Compass
Set the connection string to ```mongodb://localhost:27017/f29so``` and name it whatever you want.

## Running The Project
First launch MongoDBCompass and ensure your connection is live.

Next, in a terminal instance run ```npm run dev``` in ```\Group4F29SO-Project```.

After you've done that you can view the website on ```http://localhost:5173/``` in your web browser.

Each time you register a new user or make a change to the database, you won't be able to see the new entry until you refresh MongoDBCompass but you'll still be able to login without refreshing.
