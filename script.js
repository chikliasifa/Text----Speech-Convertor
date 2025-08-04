// ---------- Text to Speech ----------
const speakBtn = document.getElementById("speakBtn");
const textInput = document.getElementById("textInput");

function loadVoicesAndSpeak(text) {
  const voices = speechSynthesis.getVoices();
  let speech = new SpeechSynthesisUtterance(text);

  // Auto-select female voice if available
  const femaleVoice = voices.find(voice =>
    voice.name.toLowerCase().includes("female") ||
    voice.name.toLowerCase().includes("woman") ||
    voice.name.toLowerCase().includes("girl")
  );

  speech.voice = femaleVoice || voices[0]; // fallback if no female voice
  speechSynthesis.speak(speech);
}

speakBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text !== "") {
    if (speechSynthesis.getVoices().length === 0) {
      // Voices may not be loaded immediately
      speechSynthesis.onvoiceschanged = () => loadVoicesAndSpeak(text);
    } else {
      loadVoicesAndSpeak(text);
    }
  } else {
    alert("Please enter some text!");
  }
});

// ---------- Speech to Text ----------
const startBtn = document.getElementById("startBtn");
const outputText = document.getElementById("outputText");

if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  startBtn.addEventListener("click", () => {
    recognition.start();
    outputText.innerText = "🎤 Listening...";
  });

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    outputText.innerText = speechResult;
  };

  recognition.onerror = (event) => {
    outputText.innerText = "❌ Error: " + event.error;
  };
} else {
  alert("Speech Recognition is not supported in this browser. Please use Google Chrome.");
}
