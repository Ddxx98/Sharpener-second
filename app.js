const http = require('http');
const routeHandle = require("./routes")

routeHandle.show()

const server = http.createServer(routeHandle.route);

server.listen(3000, () => {
    console.log('Server is running');
});
