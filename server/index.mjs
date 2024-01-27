import { createServer } from "http";
const PORT = 8888;
const server = createServer((request, response) => {
    response.writeHead(200);
    response.end("Hi there");
});
server.listen(PORT, () => console.log("Server listening to: ", PORT));

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
