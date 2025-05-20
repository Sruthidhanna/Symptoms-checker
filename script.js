const symptoms = document.querySelectorAll('.symptom');
const checkBtn = document.getElementById('checkBtn');
const sosBtn = document.getElementById('sosBtn');
const responseDiv = document.getElementById('response');
let selectedSymptoms = [];

// Speech synthesis helper function
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel(); // stop previous speech if any
    window.speechSynthesis.speak(utterance);
  }
}

// Toggle symptom selection
symptoms.forEach(symptom => {
  symptom.addEventListener('click', () => {
    symptom.classList.toggle('selected');
    const name = symptom.dataset.name;
    if (selectedSymptoms.includes(name)) {
      selectedSymptoms = selectedSymptoms.filter(s => s !== name);
    } else {
      selectedSymptoms.push(name);
    }
  });
});

// Check Symptoms button click
checkBtn.addEventListener('click', () => {
  if (selectedSymptoms.length === 0) {
    const msg = "Please select at least one symptom.";
    responseDiv.textContent = msg;
    speak(msg);
    return;
  }

  const loadingMsg = "Analyzing your symptoms, please wait...";
  responseDiv.textContent = loadingMsg;
  speak(loadingMsg);

  // Simulate AI processing delay
  setTimeout(() => {
    const advice = `Based on your symptoms (${selectedSymptoms.join(', ')}), we recommend consulting a healthcare provider. If symptoms worsen, press the SOS Emergency button for help.`;
    responseDiv.textContent = advice;
    speak(advice);
  }, 2000);
});
// SOS Emergency button click
sosBtn.addEventListener('click', () => {
  const alertMsg = "Attempting to send emergency alert with your location.";
  responseDiv.textContent = alertMsg;
  speak(alertMsg);

  if (!navigator.geolocation) {
    const errorMsg = "Geolocation is not supported by your browser.";
    responseDiv.textContent = errorMsg;
    speak(errorMsg);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const successMsg = `Emergency alert sent! Your location is Latitude ${latitude.toFixed(3)}, Longitude ${longitude.toFixed(3)}. Help is on the way.`;
      responseDiv.textContent = successMsg;
      speak(successMsg);

      // Here you would call your backend or API to send emergency alert with location
    },
    () => {
      const failMsg = "Unable to retrieve your location. Please check your device settings.";
      responseDiv.textContent = failMsg;
      speak(failMsg);
    }
  );
});
