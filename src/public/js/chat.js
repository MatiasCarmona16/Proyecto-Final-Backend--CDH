const socket = io();

document.querySelector('#chat-input button').addEventListener('click', () => {
    const input = document.querySelector('#chat-input input');
    const message = input.value;
    socket.emit('chat message', { user, message });
    input.value = '';
});

socket.on('chat message', (msg) => {
    const chatContent = document.querySelector('#chat-content');
    const newMessage = document.createElement('p');
    newMessage.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
    chatContent.appendChild(newMessage);

    chatContent.scrollTop = chatContent.scrollHeight;
});

socket.on('chat history', (messages) => {
    const chatContent = document.querySelector('#chat-content');
    messages.forEach((msg) => {
        const newMessage = document.createElement('p');
        newMessage.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
        chatContent.appendChild(newMessage);
    });

    chatContent.scrollTop = chatContent.scrollHeight;
});