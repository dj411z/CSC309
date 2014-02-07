CSC309
======
Global Variables:

	We keep a lot of global variables, such as gameplay configurations (number of Aliens, points per alien, etc.) for easy use and integration with our code. Other global variables include the stacks of the gameplay objects, the pre-initialized gameplay states, and booleans to determine whether the laser can be fired, direction in which the aliens move, etc.


Classes:
  Gameplay Objects:
  - Ship: main entity to move and shoot lasers
  - Alien: has random chance to drop bomb, also shifts downward towards the ship, 
  		on impact with / past the ship will end the game
  - Bomb: dropped by aliens, takes away a life on impact with ship
  - Laser: fired by ship at specified fire rate, destroys an alien on impact

  States of Game:
  - WelcomeState: initial screen when index.html loads, contains web image
  - PlayState: main process for all gameplay; responsible for initializing and moving gameplay objects and also
  		constantly rendering them to the canvas
  - GameoverState: screen for when game is over (no more lives); responsible for destroying gameplay objects, 
  		displaying the final score and level, and refreshing index.html after 5 seconds to allow for a new game

How our game works:
	- When the index.html file finishes loading, our onload handler draws the Welcome State screen, which just displays our image
	- The user then presses 'Enter' to start the game
	- In our code, the 'Enter' key initializes the ship and aliens, and starts the main game loop to continuously keep drawing and updating the gameplay objects

	- The aliens global stack is initially filled with 30 aliens (hardcoded yet configurable global variable)

	- The 'updating' consists of moving the non-ship objects at a constant rate, and also consistently testing for collisions between certain objects
	- The movement of the non-ship objects is hard-coded to a fixed coordinate change; for example, a bomb will always drop at 2 pixels per 20ms (the 20ms is the hard-coded amount of time between each game loop)
	- There are multiple methods to test collisions between laser-alien, ship-alien, and bomb-ship object pairs. These simply deal with comparing the locations of each object, while taking into account of their height and widths as seen when drawn on the canvas.

	- The ship is "updated" with the help of the keydown handler (when the user presses arrow keys / space)
	- The left/right arrow keys move the ship horizontally whereas the space bar calls the fireLaser() function
	- The fireLaser() function creates and adds a new laser object to the global lasers stack and also has helpers to prevent the user from "spamming" the space bar and shooting a large number of lasers

	- The user also has the option to pause the game, suspending all objects in their respective positions by stopping the game loop
	- The user can then press 'p' again to resume the game

	- When all the aliens are destroyed, the levelUp() function is called which initializes a new game, while increasing certain difficulties such as number aliens, movement speed, etc. 

	- When the global variable number of lives becomes 0, the draw() function for the GameoverState is called
	- The gameplay objects are all destroyed, and a simple message declaring score and level achieved is displayed
	- The index.html file is then refreshed after 5 seconds to "start" a new game

	
