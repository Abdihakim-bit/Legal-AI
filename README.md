# Legal AI

![Legal AI Chatbot]([Assets/Legal AI Chatbot.png](https://raw.githubusercontent.com/Abdihakim-bit/Legal-AI/refs/heads/main/Assets/Legal%20AI%20Chatbot.png))

## Description

This project is an AI-powered legal chatbot designed to help people in Ontario, Canada interpret laws and access legal information. It provides general legal insights based on available references but does not replace professional legal advice.

The application includes a React-based frontend and a Flask backend that serves as a proxy for communicating with the Ollama Minstrel model API running locally.

## Features

✅ AI-powered legal information retrieval

✅ Provides references for responses when available

✅ User-friendly React-based frontend

✅ Flask backend for handling API requests

✅ Local execution of the Ollama Minstrel model 

## Tech Stack

- Frontend: React (JSX, Vite, CSS)

- Backend: Flask

- AI Model: Ollama Minstrel (Local API)

- Version Control: Git

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

✔️ Node.js and npm

✔️ Python (with Flask)

✔️ Ollama Minstrel model running locally

✔️ Git

### Steps
1️⃣ Clone the Repository
```bash
git clone https://github.com/Abdihakim-bit/Legal-AI.git
cd legal-ai
```
2️⃣ Install Frontend Dependencies and Run it
```bash
cd Frontend/legal-ai-frontend
npm install
npm run dev
```
3️⃣ Setup and Run the Backend
```bash
cd Backend
pip install -r requirements.txt
flask run
```

## Usage

1. Start the frontend and backend servers.

2. Access the web application via http://localhost:5173.

3. Enter legal queries to receive AI-generated insights.

## Disclaimer
⚠️  Legal AI is for informational purposes only and does not provide legally binding advice. While it aims to assist with understanding laws and regulations, it is not a substitute for professional legal consultation. For specific legal concerns, always consult a licensed legal professional.

## License  

This project is licensed under the **MIT License**.  

### Why MIT?  
I chose the MIT License because it is a widely used, permissive open-source license. It allows anyone to use, modify, and distribute the software with minimal restrictions, while still requiring attribution to the original authors. This ensures flexibility while encouraging contributions and innovation in the legal tech space.
  
See the [LICENSE](LICENSE) file for full details.
