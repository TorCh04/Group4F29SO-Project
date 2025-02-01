const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: ["https://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({"fruits": ["apple", "banana", "strawberry"]});
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});