# Configuration

Currently there are 4 entities: walls: 0, floor: 1, mobs: "e", silvercoins: "sc" and goldcoins "gc". This is how they are specified in the map config and are loaded accordingly.

# User guide

Open index.html,
Read the tip on how to play is the bottom left.
Enjoy!

# Todo
- [~] To avoid the player from jumping over mobs when colliding with there movement, we should block all movement along the dimensions of the mob collision. Although this needs more testing 

## Roadmanp
### v0.11
- [~] Make into a game you can *actually* play.

### v0.12
- Fix the collision detection to be more smooth. [x]
- Refactor the code into Typescript. 
- Use JSON to load map configuration.
### v0.13
- [~] Change map rendering to world oriented rather than player orientated. 
 
- REFACTOR
- MAJOR PROBLEM IS MOB CAN PUSH PLAYER THROUGH WALL
  - POSSIBLE FIX IS TI PUT IN SURROUONDING MAP WHEN CHECKING OR COLLISION AND ALLOWING WALLS TO HAVE HIGHER STATUS THAN MOBS
- ROWS AND COLUMNS ARE BACKWARDS
- THERE IS SOMETIMES A BLACK SCREEN BEFORE STARTING GAME (test by adding files to index.html) -- this is defo the reasons cus all other assets load
- MAKE A BASE CLASS NPC TO HAVE DIFFERNET NPCS DO DIFFRENT METHODS WHEN FINISHED
- WHEN DYING AFTER PIRCKING UP ITEM THE NPC ACCEPTS ITEM
- MOVE CONFIGURATION TO SET OF JSON FILES
- MOVING UP AND DOWN ROOM DOSENT LOAD

## Minor
- make canvas strechable and the textures to do so too
- npcs w/ dialouge
- stamina bar, w/sprint 
- pickup armour and add to a health as blue but overlappring current health
- More intelligent player spawing system (some spawns are unlucky occupied by mob)
- REFACTOR STUDY MAZE GEN ALGOS AND PATH FINDERS
- Add Other Items, NPCS, and Tasks
- ADD ITEMS + NPC

- fix collision detection, when going into an item for example it detects a top side collision 

- MOBS CAN PUSH THROUGH WALLS
- MOVE TO SERVER TO AVOID CHEATING

- WHEN DEAD SHOW THE CHARACTER DEAD AND CONTINUE UPDATING AND DRAWING MAP

- ROWS AND COLUMNS ARE BACKWARDS
- THERE IS SOMETIMES A BLACK SCREEN BEFORE STARTING GAME (test by adding files to index.html) -- this is defo the reasons cus all other assets load
- MAKE A BASE CLASS NPC TO HAVE DIFFERNET NPCS DO DIFFRENT METHODS WHEN FINISHED
