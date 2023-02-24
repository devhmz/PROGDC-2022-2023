const chatlog = document.getElementById('chatlog');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');

const apiUrl = 'https://api.openai.com/v1/engine/<engine-id>/completions';
const apiKey = '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';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get user message
  const messageText = messageInput.value;

  // Add user message to chat log
  appendMessage('user', messageText);

  // Send message to ChatGPT API
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      prompt: messageText,
      max_tokens: 50,
      temperature: 0.5,
      n: 1,
      stop: '\n'
    })
  });

  // Get response from ChatGPT API
  const responseData = await response.json();
  const chatGPTResponse = responseData.choices[0].text.trim();

  // Add ChatGPT response to chat log
  appendMessage('chatgpt', chatGPTResponse);

  // Clear message input field
  messageInput.value = '';
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('p');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatlog.appendChild(messageElement);
  chatlog.scrollTop = chatlog.scrollHeight;
}
