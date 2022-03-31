#  Socket.io Node-Express App Documentation 

## Description

a Node-Express Drawing app that incorporates Socket.io. This webpage allow users to connect and draw in real time.

The following are the useful UX decisions to enhance the overall experience. 

1. Crayon and Eraser mouse icons to indicate which tool the user is currently using

2. Option to toggle between drawing and erasing content

3.  A name input box which disappears upon entering of name 

4. A name board which shows all connected users and their crayon color.A name board for easy identification, we know exactly who is drawing what

5. Shared Drawing Progress which ensures all connected users see the drawing progress regardless of when they joined so that connected users do not have to draw in isolation if they join late. 


## Working Link
  [Wireframe](https://eric-asare.github.io/ConnectionsLab/week8/design/wireframe.png)
         
## Technical Requirements

At least one ‘emit’ event on the server-side and one ‘emit’ event on the client-side
The ability to open 2 browser tabs and share data in real-time between the two NOTE : Upload the code to glitch and submit the glitch link along with documentation 


## Production

  * ### The WireFrame
       ![Wireframe](https://eric-asare.github.io/ConnectionsLab/week8/design/wireframe.png)
         
  * ### SERVER - CLIENT FLOW
        1. Get input from the user using click 
        2. From the client-side, you emit the info to the server
        3. From the server-side, the server uses .on to listen 
        4. From the server-side, use io. socket to emit to all of the clients
        5. Client-side, listen with a .on
        6. Client-side display
      

## Challenges & Solutions
   * Name Board was not updating for all clients. solved by ensuring all info received on the server side are distributed to all clients. 

   * Could not get erase/draw button to fall below canvas

   * Could not get "someone joined to work"

   * It takes time to understand concepts and code so leave more time for that
  
      

## Lessons
  * Wireframes indeed make life easy. 
  * Sockets will be more understandable with practice
  * Glitch, great platform to host and share projects
  * You can change the image of your cursor. 
  * Host your images on an image hosting site to avoid any issues (Imgur is best for even editing images)

##  Next Steps
  * Remove user upon disconnect
  * Color Choice option


## Refrences & Resources
* (How RGB works with Javascript) https://stackoverflow.com/questions/14323082/why-doesnt-backgroundcolor-rgba-b-c-work

* (Free Icons)https://icons8.com/icons/set/eraser-cursor

* (CSS Buttons)https://getcssscan.com/css-buttons-examples




