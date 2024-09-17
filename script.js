// Function to handle speech recognition
document.getElementById('startButton').addEventListener('click', () => {
    const transcriptionElement = document.getElementById('transcription');
    const feedbackElement = document.getElementById('feedback');

    // Check if the browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        transcriptionElement.textContent = "Sorry, your browser does not support speech recognition.";
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set the language to English
    recognition.interimResults = false; // Don't show interim results
    recognition.maxAlternatives = 1; // Return the most confident result

    // Start speech recognition
    transcriptionElement.textContent = "Listening... 🎤";
    feedbackElement.textContent = ""; // Clear previous feedback

    recognition.start();

    // Event fired when the speech recognition service returns a result
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        transcriptionElement.textContent = `You said: '${transcript}'`;

        // Provide basic feedback based on the transcript
        feedbackElement.textContent = "Great! Your pronunciation is clear!";
    });

    // Event fired when the speech recognition service ends
    recognition.addEventListener('end', () => {
        transcriptionElement.textContent += " (Speech recognition ended)";
    });

    // Error handling
    recognition.addEventListener('error', (event) => {
        transcriptionElement.textContent = `Error: ${event.error}`;
        feedbackElement.textContent = "Please try again.";
    });
});
