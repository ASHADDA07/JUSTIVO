function sendMessage() {
  const input = document.getElementById("userMessage");
  const text = input.value.trim();
  if (!text) return;

  const chat = document.getElementById("chatArea");

  const userMsg = document.createElement("div");
  userMsg.className = "chat-bubble user";
  userMsg.innerText = text;
  chat.appendChild(userMsg);

  input.value = "";

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "chat-bubble bot";
    botMsg.innerText =
      "Based on general legal principles, this issue may involve applicable laws or rights. This information is for educational purposes only. For case-specific advice, please consult a licensed advocate.";
    chat.appendChild(botMsg);

    chat.scrollTop = chat.scrollHeight;
  }, 700);
}
