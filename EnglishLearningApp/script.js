function uploadAudio() {
    const fileInput = document.getElementById('audioFile');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('transcription').innerText = `Transcription: ${data.transcription}`;
        document.getElementById('feedback').innerText = `Feedback: ${data.feedback}`;
    })
    .catch(error => console.error('Error:', error));
}
