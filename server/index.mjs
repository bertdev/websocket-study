import { createServer } from "http";
import crypto from "crypto";

const PORT = 8888;
const WEBSOCKET_MAGIC_STRING_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const server = createServer((_request, response) => {
    response.writeHead(200);
    response.end("Hi there");
});
server.listen(PORT, () => console.log("Server listening to: ", PORT));

server.on("upgrade", onSocketUpgrade);

function onSocketUpgrade(request, socket, _headers) {
    const {'sec-websocket-key': clientWebSocketKey} = request.headers;
    console.log(`${clientWebSocketKey} is connected`);
    const headers = prepareHandShakeHeaders(clientWebSocketKey);
    socket.write(headers);
}

function prepareHandShakeHeaders(id) {
    const acceptKey = createSocketAccept(id); 
    const headers = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${acceptKey}`,
        ""
    ].map(line => line.concat("\r\n")).join("");
    return headers;
}

function createSocketAccept(id) {
    const shaAlgorithm = crypto.createHash("sha1");
    shaAlgorithm.update(id.concat(WEBSOCKET_MAGIC_STRING_KEY));
    return shaAlgorithm.digest("base64");
}

// Error handling to keep server up
;
[
    "unhandledRejection",
    "uncaughtException"

].forEach(event => {
    process.on(event, (err) => {
       console.error(`Something bad happened! event: ${event}, msg: ${err.stack || err}`);
    });
});
