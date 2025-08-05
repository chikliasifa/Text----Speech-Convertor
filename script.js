const speakBtn = document.getElementById("speakBtn");
const textInput = document.getElementById("textInput");

function loadVoicesAndSpeak(text) {
  const voices = speechSynthesis.getVoices();
  let speech = new SpeechSynthesisUtterance(text);

  // Strictly prioritize female voices
  const femaleVoice = voices.find(voice =>
    voice.name.toLowerCase().includes("female") ||
    voice.name.toLowerCase().includes("woman") ||
    voice.name.toLowerCase().includes("samantha") || // Common female voice names
    voice.name.toLowerCase().includes("zira")
  );

  speech.voice = femaleVoice || voices[0]; // Default fallback if no female voice
  speech.pitch = 1;
  speech.rate = 1;
  speech.lang = "en-US";

  speechSynthesis.cancel(); // Stop any ongoing speech
  speechSynthesis.speak(speech);
}

speakBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text !== "") {
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = () => loadVoicesAndSpeak(text);
    } else {
      loadVoicesAndSpeak(text);
    }
  } else {
    alert("Please type something to convert!");
  }
});
