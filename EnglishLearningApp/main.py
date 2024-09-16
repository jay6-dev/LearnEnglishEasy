from flask import Flask, request, jsonify
# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("automatic-speech-recognition", model="openai/whisper-large-v3")

# Load model directly
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq

processor = AutoProcessor.from_pretrained("openai/whisper-large-v3")
model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-large-v3")
import os

# Set your API key directly in the code (replace with your actual key)
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"

# Example of loading a model with the API key set
feedback_model = pipeline("text-classification", model="your-model")


@app.route('/upload', methods=['POST'])
def upload():
    audio_file = request.files['file']
    
    # Example transcription
    transcription = "Example transcription text"
    
    # Get feedback from model
    feedback = "Example feedback text"
    
    return jsonify({
        'transcription': transcription,
        'feedback': feedback
    })

if __name__ == '__main__':
    app.run(debug=True)
