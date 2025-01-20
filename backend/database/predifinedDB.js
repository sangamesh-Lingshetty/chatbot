const db = require('./initialDB');

const insertData = [
    ['Hello', 'Hi there! How can I assist you today?'],
    ['Hi', 'Hello! How can I help you?'],
    ['How are you?', 'I am just a bot, but I am here to assist you!'],
    ['What is your name?', 'I am ChatBot, your virtual assistant.'],
    ['Tell me a joke', 'Why don’t skeletons fight each other? They don’t have the guts!'],
    ['What can you do?', 'I can answer your questions, tell jokes, and assist with simple tasks!'],
    ['Good morning', 'Good morning! Hope you have a fantastic day ahead!'],
    ['Good night', 'Good night! Sweet dreams!'],
    ['What is the time?', 'I can’t check the time, but I’m sure it’s a good time to chat!'],
    ['Who made you?', 'I was created by some brilliant developers.'],
    ['Tell me something interesting', 'Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old!'],
    ['How old are you?', 'I am ageless, but I was programmed recently!'],
    ['What is 2 + 2?', 'That’s easy! It’s 4.'],
    ['Can you help me?', 'Of course! Let me know what you need help with.'],
    ['Thank you', 'You’re welcome!'],
    ['What is AIVOA?', 'AIVOA is a company specializing in innovative software development, delivering cutting-edge solutions for modern business challenges.'],
    ['Bye', 'Goodbye! Have a great day!'],
    ['Who is the president of the USA?', 'I can’t provide real-time data, but you can easily find that online!'],
    ['Why is the sky blue?', 'The sky looks blue because of the way sunlight interacts with our atmosphere.'],
    ['Do you like pizza?', 'I don’t eat, but pizza sounds delicious!'],
    ['What is AI?', 'AI stands for Artificial Intelligence. It enables machines to think and learn like humans.']
];


// Insert data into the chatbot table
insertData.forEach(([pattern, response]) => {
    db.run('INSERT INTO chatbot (pattern, response) VALUES (?, ?)', [pattern, response], (err) => {
        if (err) {
            console.error("Error inserting data:", err.message);
        } else {
            console.log(`Inserted pattern: "${pattern}" with response: "${response}"`);
        }
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error("Error closing database:", err.message);
    } else {
        console.log("Database seeded and closed successfully");
    }
});
