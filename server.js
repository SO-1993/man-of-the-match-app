const express = require("express"); // Import the Express framework
const { Pool } = require("pg"); // Import the PostgreSQL client for Node.js
const cors = require("cors"); // Import CORS middleware for handling cross-origin requests

const app = express(); // Create an instance of an Express application
// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: "postgres", // Database user
  host: "localhost", // The server is running locally
  database: "man_of_the_match", // Name of database
  password: "your_db_password", // Database password
  port: 5432, // Default PostgreSQL port
});

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static("public")); // Serve static files from the public directory

// ROUTE TO GET PLAYERS FROM THE DATABASE
app.get("/players", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM players"); // Query to fetch all players
    res.json(result.rows); // Send the players as JSON response
  } catch {
    res.status(500).send(err.message); // Send an error response if something goes wrong
  }
});

// ROUTE TO RECORD A VOTE FOR A PLAYER
app.post("/vote", async (req, res) => {
  const { playerId } = req.body; // Extract player ID from request body
  try {
    await pool.query(
      "UPDATE votes SET vote_count = vote_count + 1 WHERE player_id = $1", // Update the vote count for the specified player
      [playerId]
    );
    res.send("Vote recorded"); // Send a success message
  } catch {
    res.status(500).send(err.message); // Send an error response if something goes wrong
  }
});

// ROUTE TO GET VOTE RESULTS
app.get("/results", async (req, res) => {
  try {
    // Query to fetch player names and their vote counts
    const result = await pool.query(
      "SELECT players.name, votes.vote_count FROM votes JOIN players ON votes.player_id = players.id"
    );
    res.json(result.rows); // Send the results as JSON response
  } catch {
    res.status(500).send(err.message); // Send an error response if something goes wrong
  }
});

// SET THE PORT FOR THE SERVER TO LISTEN ON
const port = process.env.PORT || 5001; // Use the port from the environment variable or default to 5000
app.listen(port, () => console.log(`Server running on port ${port}`)); // Start the server and log the port
