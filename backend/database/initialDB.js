const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create a new SQLite database file
const dbPath = path.join(__dirname, "chatbot.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Database connected successfully");
  }
});

// Create the chatbot table
db.serialize(() => {
  db.run(
    `
        CREATE TABLE IF NOT EXISTS chatbot (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pattern TEXT NOT NULL,
            response TEXT NOT NULL
        )
    `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table created successfully");
      }
    }
  );

  // Table to store the chat message log
  db.run(
    `
    CREATE TABLE IF NOT EXISTS message_store (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`,
    (err) => {
      if (err) {
        console.error("Error creating message_store table:", err.message);
      } else {
        console.log("Message store table created successfully");
      }
    }
  );
});

module.exports = db;
