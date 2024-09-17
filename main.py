from flask import Flask, request, jsonify
from transformers import pipeline
import os

# Initialize Flask app
app = Flask(__name__)

# Load Whisper model for automatic speech recognition (ASR)
asr_model = pipeline("automatic-speech-recognition", model="openai/whisper-large-v3")

# Set your API key securely from environment variables
os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv("HUGGINGFACEHUB_API_TOKEN", "your_default_token")

# Load text classification model for feedback (replace with your actual model)
feedback_model = pipeline("text-classification", model="your-feedback-model")

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    audio_file = request.files['file']

    if audio_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Process the audio file for transcription
        transcription = asr_model(audio_file)["text"]
        
        # Get feedback using the feedback model
        feedback = feedback_model(transcription)[0]["label"]  # Example output from classification model
        
        return jsonify({
            'transcription': transcription,
            'feedback': feedback
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

