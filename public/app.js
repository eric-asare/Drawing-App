// variables to store current drawings and users
let pastDrawings = []
let pastUsers = []


//variables to store the color of each user's crayon
let or, og, ob, os = 10;
let r, g, b, s = 10;



// client side socket connection

let socket = io();

//listen for confirmation
socket.on('connect', () => {
    console.log("client connected via sockets");
})



// drawing setup
function setup() {
    createCanvas(0.9 * window.innerWidth, 400);
    cursor('https://i.imgur.com/i63PqXd.png?2');
    background(220);
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);

    or = r;
    og = g;
    ob = b;

    // listen for mouseData from server
    socket.on('mouseDataFromServer', (data) => {
        drawEllipseWithData(data);
    })


    // listen for userData from server
    socket.on('userData', (data) => {

        // populate name board with user Data
        addName(data.name, data.red, data.green, data.blue);
    })


    // populate nameboard with current users if new user joins
    if (pastUsers.length > 0) {
        for (let j = 0; j < pastUsers.length; j++) {
            let pastUser = pastUsers[j];
            addName(pastUser.name, pastUser.red, pastUser.green, pastUser.blue);
        }
    }

    // if new user joins, show old drawings
    if (pastDrawings.length > 0) {

        for (let i = 0; i < pastDrawings.length; i++) {
            drawEllipseWithData(pastDrawings[i]);
        }
    }
}

//emit information of mouse positon everytime mouse is moved
function mouseDragged() {

    let canvas = document.getElementById('defaultCanvas0');

    let eraserButton = document.getElementById('eraser');
    let pencilButton = document.getElementById('crayon');

    eraserButton.addEventListener('click', () => {

        // toggle between eraser and pencil button
        eraserButton.style.visibility = 'hidden';
        pencilButton.style.visibility = 'visible';

        // erasing colour 
        r = 220;
        b = 220;
        g = 220;
        s = 50;

        // change mouse pointer to an eraser
        canvas.style.cursor = "url('https://i.imgur.com/PzFOb3i.png?1'), auto";
    })



    pencilButton.addEventListener('click', () => {

        // toggle between eraser and pencil button
        eraserButton.style.visibility = 'visible';
        pencilButton.style.visibility = 'hidden';

        // old crayon colours
        r = or;
        g = og;
        b = ob;
        s = os;

        // change mouse pointer to crayon
        canvas.style.cursor = "url('https://i.imgur.com/i63PqXd.png?2'), auto";
    })


    // mouse data
    let mousePos = {
        x: round(mouseX),
        y: round(mouseY),
        red: r,
        blue: b,
        green: g,
        size: s
    };

    //emit mouse information to server
    socket.emit('mousePositionData', mousePos);
}

// listen for name entry
window.addEventListener('load', () => {

    let submitButton = document.getElementById('send-button');

    submitButton.addEventListener('click', () => {
        let input = document.getElementById('name-input');
        let name = input.value;


        userData = {
            'name': name,
            'red': or,
            'green': og,
            'blue': ob
        }

        // emit the user information to the server
        socket.emit('userData', userData);

        input.value = " ";
        let nameInputSection = document.querySelector('.header__name-input');
        nameInputSection.style.visibility = 'hidden';
    })
})




// function to draw ellipses

function drawEllipseWithData(data) {
    noStroke();
    fill(data.red, data.green, data.blue);
    ellipse(data.x, data.y, data.size, data.size);
}

//function to populate name board
function addName(name, rc, gc, bc) {

    list = document.getElementById("name-board");
    listItem = document.createElement('li');
    span = document.createElement('span');
    span.classList.add('color-dot');

    span.style.backgroundColor = "rgb(" + rc + "," + gc + "," + bc + ")";

    listItem.innerHTML = name
    listItem.appendChild(span);
    list.appendChild(listItem);
}


// listen for past Drawings data from server
socket.on('pastDrawings', (data) => {
    pastDrawings = data.oldDrawings
})

// listen for past Users data from server
socket.on('pastUsers', (usersData) => {
    pastUsers = usersData.oldUsers;
})