// variables to store current drawings and users
let users = []
let previousDrawings = []

//Initialize the express 'app' object
let express = require("express");

//Initialize the actual HTTP server
let http = require("http");
let io = require("socket.io");


let app = express();
let server = http.createServer(app);

// Wrap sockets around the http server
io = new io.Server(server);


// when socket connect, display the id of the socket 
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);


    // send previous Drawings when new client joins
    let data = { oldDrawings: previousDrawings };

    // socket.emit to only that socket
    socket.emit('pastDrawings', data);

    //send previous users
    let usersData = { oldUsers: users };

    //socket.emit to only that socket
    socket.emit('pastUsers', usersData);


    // drop a message on server when socket disconnects
    socket.on('disconnect', () => {
        console.log('socket has been disconnected: ', socket.id);
    })


    // listen from mouse position data from client side
    socket.on('mousePositionData', (data) => {
        if (!previousDrawings.includes(data)) {
            previousDrawings.push(data);
        }


        // once you receive the data emit it to all sockets or clients
        io.sockets.emit('mouseDataFromServer', data);


    })

    // on receiving user message
    socket.on('userData', (data) => {

        //add user ID to data
        data["ID"] = socket.id;

        if (!users.includes(data)) {
            users.push(data);
        }
        // sending DATA to ALL clients
        io.sockets.emit('userData', data);
    })

})


app.use('/', express.static('public'));

//run the createServer
let port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});