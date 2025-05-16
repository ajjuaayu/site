const API_KEY = "AIzaSyDqdZB1nPUU9CpnvPLGr0zWnwboWx6zbkE"; // Replace with your real API key

async function generateRiddle() {
  const riddleText = document.getElementById("riddle");
  riddleText.textContent = "Generating riddle... 🤔";

  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

  const prompt = {
    contents: [
      {
        role: "user",
        parts: [
          { text: "Generate a creative and tricky riddle with its answer." }
        ]
      }
    ]
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prompt)
    });

    const data = await response.json();
    const riddle = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to get riddle 😕";
    riddleText.innerHTML = riddle.replace(/\n/g, "<br>");
  } catch (error) {
    riddleText.textContent = "Error fetching riddle!";
    console.error(error);
  }
}
