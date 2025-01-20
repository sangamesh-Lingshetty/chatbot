const db = require('./initialDB');

db.all('SELECT * FROM message_store', [], (err, rows) => {
    if (err) {
        console.error("Error reading database:", err.message);
    } else {
        console.log("Chatbot data:");
        console.table(rows);
    }
    db.close();
});
