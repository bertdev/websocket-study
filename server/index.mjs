import { createServer } from "http";
const PORT = 8888;
const server = createServer((request, response) => {
    response.writeHead(200);
    response.end("Hi there");
});
server.listen(PORT, () => console.log("Server listening to: ", PORT));

