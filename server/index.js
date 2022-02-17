const server = require("./server")
const PORT = 3001 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})