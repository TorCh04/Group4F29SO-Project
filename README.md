# F29SO-Project

## Project Setup
### Step 1: Install NodeJS
Download Link: [NodeJS](https://nodejs.org/).
### Step 2: Install the Node dependencies for the project
Open ```\Group4F29SO-Project\server``` in terminal and run ```npm install```.

Open ```\Group4F29SO-Project\client``` in terminal and run ```npm install```.

### Step 3: Set up MongoDB
Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass).

### Step 4: Setup a new connection on MongoDB Compass
Set the connection string to ```mongodb://localhost:27017/f29so``` and name it whatever you want.

### Step 5: Create a database
Within this connection, create a database called "f29so".

### Step 6: Create a collection
Within the new database create a collection called "users".

## Running The Project
First launch MongoDBCompass and ensure your connection is live.

Next, in one terminal instance run ```npm run dev``` in ```\Group4F29SO-Project\server```.

And in another terminal instance run ```npm run dev``` in ```\Group4F29SO-Project\client```.

After you've done that you can view the website on ```http://localhost:5173/``` in your web browser.

Each time you register a new user, you won't be able to see the new entry in the users collection until you refresh it but you'll still be able to login without refreshing.
