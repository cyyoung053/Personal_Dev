document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");
    const chatWindow = document.getElementById("chatWindow");
    const conversationList = document.getElementById("conversationList");
    const newChatButton = document.getElementById("newChatButton");

    // Variables to keep track of the current conversation
    let currentConversation = null;
    let fullConversationText = ""; // Store the full conversation text

    // Mock function to send a message to Azure OpenAI
    function sendMessage(message) {
        return new Promise((resolve) => {
            // Simulate a delay for the response
            setTimeout(() => {
                const response = `OpenAI: Response to "${message}"`;
                resolve(response);
            }, 1000);
        });
    }

    // Function to append messages to the chat window
    function appendMessageToChatWindow(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Function to add or update the current conversation in the conversation history
    function updateConversationHistory(sender, message) {
        // Update the full conversation text with new messages
        fullConversationText += `\n${sender}: ${message}`;

        // Truncate to the first 30 characters to display in the list
        const truncatedText = fullConversationText.slice(0, 30) + '...';

        if (!currentConversation) {
            // Create a new conversation list item if one doesn't exist yet
            currentConversation = document.createElement("li");
            currentConversation.textContent = truncatedText;
            conversationList.appendChild(currentConversation);
        } else {
            // Update the existing conversation item with truncated text
            currentConversation.textContent = truncatedText;
        }
    }

    // Handle sending message
    sendButton.addEventListener("click", async () => {
        const message = userInput.value.trim();
        if (message) {
            // Append user message to chat window
            appendMessageToChatWindow("You", message);

            // Update conversation history with the user's message
            updateConversationHistory("You", message);

            // Clear input box
            userInput.value = "";

            // Send message to Azure OpenAI (mocked here)
            const response = await sendMessage(message);

            // Append OpenAI response to chat window
            appendMessageToChatWindow("OpenAI", response);

            // Update conversation history with OpenAI response
            updateConversationHistory("OpenAI", response);
        }
    });

    // Handle creating a new chat
    newChatButton.addEventListener("click", () => {
        // Clear the chat window and input field
        chatWindow.innerHTML = "";
        userInput.value = "";

        // Clear the current conversation variables
        currentConversation = null;
        fullConversationText = "";

        // Optionally, you could remove all conversation history or just add a new one
        // conversationList.innerHTML = ""; // Uncomment if you want to clear the entire history
    });
});

function logout() {
    localStorage.removeItem('accessToken'); // Clear access token
    localStorage.removeItem('idToken'); // Clear ID token
    window.location.replace('index.html'); // Redirect to login page
}

document.addEventListener('DOMContentLoaded', function() {
// Check if tokens exist in localStorage
const accessToken = localStorage.getItem('accessToken');
const idToken = localStorage.getItem('idToken');

// If tokens are missing, redirect to index.html to login
if (!accessToken || !idToken) {
  window.location.replace('index.html');
}
});
