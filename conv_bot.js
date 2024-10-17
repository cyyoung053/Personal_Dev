const apiUrl = "https://personaloai.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2023-03-15-preview";
const secretKey = "55acac26467a4b2f8c33f7e3e55922e4";

let conversationHistory = []; // To store the history of conversations
let currentConversation = []; // To track the current conversation

// Function to append messages to the chat window and format lists
function appendMessage(sender, message) {
    const chatWindow = document.getElementById('chatWindow');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');  // Optional: Add class for styling
    
    // Parse the message and format lists
    const formattedMessage = formatResponse(message);
    messageElement.innerHTML = `${sender}: ${formattedMessage}`; // Use innerHTML to render formatted content

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;  // Auto scroll to the bottom
}

// Function to format OpenAI response with lists and paragraphs
function formatResponse(message) {
    const lines = message.split('\n');  // Split message by newlines
    let formatted = '';
    let inList = false;

    lines.forEach(line => {
        line = line.trim();  // Trim whitespace from the start and end of each line
        if (line.match(/^[\*\-\d]\./)) {
            // Line is part of a list
            if (!inList) {
                formatted += '<ul>';  // Start a new list
                inList = true;
            }
            formatted += `<li>${line.substring(2).trim()}</li>`;  // Add list item, remove bullet/number
        } else {
            // Line is not a list, treat it as a paragraph
            if (inList) {
                formatted += '</ul>';  // Close the list if one was open
                inList = false;
            }
            if (line.length > 0) {
                formatted += `<p>${line}</p>`;  // Wrap non-empty lines in paragraphs
            }
        }
    });

    // Close the list if it was open at the end
    if (inList) {
        formatted += '</ul>';
    }

    return formatted;
}

// Function to store the current conversation to the history and update the list
function saveConversation() {
    if (currentConversation.length > 0) {
        conversationHistory.push(currentConversation);
        const conversationIndex = conversationHistory.length - 1;
        updateConversationList(conversationIndex);
    }
}

// Function to add conversation to the conversation history list
function updateConversationList(conversationIndex) {
    const conversationList = document.getElementById('conversationList');
    const listItem = document.createElement('li');

    // Get the first user message and truncate to 30 characters
    const firstMessage = conversationHistory[conversationIndex].find(msg => msg.sender === "You");
    const snippet = firstMessage ? firstMessage.message.substring(0, 30) + (firstMessage.message.length > 30 ? "..." : "") : "No Message";

    listItem.textContent = snippet;  // Display the first 30 characters
    listItem.addEventListener('click', () => displayConversation(conversationIndex));
    conversationList.appendChild(listItem);
}

// Function to call Azure OpenAI API with the full conversation history
async function callOpenAIAPI() {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": secretKey,
            },
            body: JSON.stringify({
                messages: currentConversation,  // Send the full conversation history
                max_tokens: 500,  // Adjust this value as needed
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        // Append the bot's message to the chat and store it in the conversation history
        appendMessage("Bot", botMessage);
        currentConversation.push({ role: "assistant", content: botMessage });  // Store bot message
    } catch (error) {
        appendMessage("Bot", "Sorry, there was an error processing your request.");
        console.error("Error:", error);
    }
}

// Function to display a past conversation
function displayConversation(index) {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML = '';  // Clear the current chat window
    const conversation = conversationHistory[index];
    conversation.forEach(msg => appendMessage(msg.sender, msg.message));
}

// Event listener for send button
document.getElementById('sendButton').addEventListener('click', function () {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== "") {
        appendMessage("You", userInput);
        currentConversation.push({ sender: "You", message: userInput });  // Store user's message
        callOpenAIAPI(userInput);
        document.getElementById('userInput').value = "";  // Clear input field
    }
});

// Optional: Enter key event listener for sending message
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === "Enter" && !e.shiftKey) {  // Enter key without Shift
        e.preventDefault();  // Prevent new line
        document.getElementById('sendButton').click();
    }
});

// Event listener for new chat button
document.getElementById('newChatButton').addEventListener('click', function () {
    if (currentConversation.length > 0) {
        saveConversation();  // Save the current conversation before starting a new one
    }
    currentConversation = [];  // Start a new conversation
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML = "";  // Clear chat window for new conversation
    appendMessage("Bot", "New conversation started!");
});
