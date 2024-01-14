webSocket = new WebSocket("http://localhost:3000/chat");
webSocket.send("Here's some text that the server is urgently awaiting!");
