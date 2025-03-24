from flask import Flask, request, jsonify
import requests
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

logging.basicConfig(level=logging.DEBUG)

CUSTOM_INSTRUCTION = (
    "Respond as a legal assistant specialized in Ontario laws. Provide clear, concise, "
    "and legally accurate information. Ensure that your responses reflect the current legal "
    "practices and statutes of Ontario, Canada. At the end of your response, list only the "
    "relevant legal resources with their titles and links, formatted strictly as follows:\n\n"
    "Resources:\n1. [Resource Title](Resource URL)\n2. [Another Resource](Resource URL)\n\n"
    "Do not use any other format or include any other text or extra information. If you're unsure, "
    "inform the user that the response is general information and not legal advice."
)

OLLAMA_URL = "http://localhost:11434/api/generate"

@app.route('/api/generate', methods=['POST'])
def generate_response():
    data = request.json
    user_message = data.get('Message', '').strip()

    if not user_message:
        return jsonify({'error': 'Message field is required'}), 400

    prompt = f"{CUSTOM_INSTRUCTION}\nUser: {user_message}\nAssistant:"

    try:
        response = requests.post(OLLAMA_URL, json={'model': 'mistral', 'prompt': prompt, 'stream': False})
        response.raise_for_status()  # Raise an error if the request fails

        logging.debug(f"Raw response from Ollama: {response.text}")

        response_data = response.json()
        assistant_reply = response_data.get("response", "No response generated.")

        return jsonify({'response': assistant_reply})

    except requests.exceptions.RequestException as e:
        logging.error(f"Error communicating with Ollama API: {str(e)}")
        return jsonify({'error': 'Failed to communicate with Ollama API'}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000, use_reloader=False)
