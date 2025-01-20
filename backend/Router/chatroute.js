const express = require("express");

const router = express.Router();
const moment = require("moment")
const database = require("../database/initialDB");

router.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  // Insert user message into the database
  database.run(
    "INSERT INTO message_store (sender, message) VALUES (?, ?)",
    ["user", userMessage],
    (err) => {
      if (err) {
        console.error("Error inserting user message:", err.message);
        res.status(500).send("Internal server error");
        return;
      }

      // Fetch bot response based on pattern matching
      database.get(
        "SELECT response FROM chatbot WHERE pattern = ? COLLATE NOCASE",
        [userMessage],
        (error, row) => {
          if (error) {
            console.log("Error querying response:", error.message);
            res.status(500).send("Internal server error");
            return;
          }

          const botResponse = row
            ? row.response
            : "Sorry, I didn't understand that.";

          // Insert bot response into the database
          database.run(
            "INSERT INTO message_store (sender, message) VALUES (?, ?)",
            ["bot", botResponse],
            (err) => {
              if (err) {
                console.error("Error inserting bot response:", err.message);
                res.status(500).send("Internal server error");
                return;
              }

              // Send bot response back to the user
              res.json({ replay: botResponse });
            }
          );
        }
      );
    }
  );
});

router.get("/history", (req, res) => {
  database.all(
    "SELECT sender, message, timestamp FROM message_store ORDER BY timestamp ASC",
    [],
    (err, rows) => {
      if (err) {
        console.error("Error fetching message history:", err.message);
        res.status(500).send("Internal server error");
        return;
      }
      // Convert timestamps to local time
      const history = rows.map((row) => ({
        sender: row.sender,
        message: row.message,
        timestamp: moment
          .utc(row.timestamp)
          .local()
          .format("YYYY-MM-DD HH:mm:ss"),
      }));

      res.json({ history });
    }
  );
});

module.exports = router;
