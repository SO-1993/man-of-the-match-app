// FETCH PLAYERS FROM THE SERVER AND DISPLAY THEM ON THE PAGE

fetch("/players")
  .then((response) => response.json()) // Convert the response to JSON format
  .then((players) => {
    const playersList = document.getElementById("players-list"); // Get the players list container
    players.forEach((player) => {
      const button = document.createElement("button"); // Create a button for each player
      button.innerText = player.name; // Set button text to player's name

      button.onclick = () => {
        // Send a POST request to vote for this player
        fetch("/vote", {
          method: "POST", // Set the request method to POST
          headers: { "Content-Type": "application/json" }, // Set the request headers
          body: JSON.stringify({ playerId: player.id }), // Convert player ID to JSON
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to submit vote");
            }
            alert("Vote submitted!"); // Alert user that vote was submitted
          })
          .catch((err) => console.error("Error submitting vote:", err)); // Log any errors
      };

      playersList.appendChild(button); // Add the button to the players list container
    });
  })
  .catch((err) => console.error("Error fetching players:", err)); // Log errors when fetching players

// FETCH AND DISPLAY THE RESULTS

const fetchResults = () => {
  // Send a GET request to fetch results
  fetch("/results")
    .then((response) => response.json()) // Convert the response to JSON format
    .then((results) => {
      const resultsDiv = document.getElementById("results"); // Get the results container
      resultsDiv.innerHTML = ""; // Clear existing results
      results.forEach((result) => {
        const resultItem = document.createElement("div"); // Create a new div for each result
        resultItem.innerText = `${result.name}: ${result.vote_count} votes`; // Set text to player name and vote count
        resultsDiv.appendChild(resultItem); // Add the result item to the results container
      });
    });
};

// SET AN INTERVAL TO FETCH RESULTS EVERY 5 SECONDS
setInterval(fetchResults, 5000); // Call fetchResults() every 5000 milliseconds (5 seconds)
