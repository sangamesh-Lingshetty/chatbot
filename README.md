# ChatBot Application

[Visit ChatBot Live](https://chatbot-eta-azure.vercel.app/)

This project is a fully responsive chatbot application that allows users to interact with predefined queries and receive intelligent responses. The system stores user data and fetches predefined responses to assist users in real-time.

---

## 🚀 Features

- Fully responsive design for all devices.
- User-friendly interface with real-time interaction.
- Stores user queries and fetches predefined responses.
- Provides predefined examples for users to try.
- Future-ready with WebSocket integration planned.

---

## 🛠️ Tools & Technologies

- **Frontend**: React.js, TailwindCSS, Lucid React
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Hosting**: Vercel

---

## 📦 Predefined Text Examples

Here are some sample inputs you can try with the chatbot:

```javascript
const insertData = [
    ['Hello', 'Hi there! How can I assist you today?'],
    ['Hi', 'Hello! How can I help you?'],
    ['How are you?', 'I am just a bot, but I am here to assist you!'],
    ['Tell me a joke', 'Why don’t skeletons fight each other? They don’t have the guts!'],
    ['What is AI?', 'AI stands for Artificial Intelligence. It enables machines to think and learn like humans.'],
    ['Good morning', 'Good morning! Hope you have a fantastic day ahead!'],
    ['Good night', 'Good night! Sweet dreams!'],
];
