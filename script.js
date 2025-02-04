const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    // Display user message
    addMessageToChat("user", message);
    userInput.value = "";

    // Send message to backend
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot response
        addMessageToChat("bot", data.response);
    })
    .catch(() => {
        addMessageToChat("bot", "Sorry, something went wrong. Please try again.");
    });
}

function submitComplaint() {
    const name = document.getElementById("name").value;
    const apartment = document.getElementById("apartment").value;
    const issue = document.getElementById("issue").value;
    const description = document.getElementById("description").value;

    fetch("/submit_complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, apartment, issue, description })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("complaint-form").reset();
    })
    .catch(() => {
        alert("Failed to submit complaint. Please try again.");
    });
}

function addMessageToChat(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.innerText = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
