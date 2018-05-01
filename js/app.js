//**** Dear Reviewer,
//**** For the benefit of readability please find all my (student) comments marked up especially with:
//****
//**** Global score counter so checkCollisions(); and water(); have access
let points = 0;

// Enemies our player must avoid
var Enemy = function(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //**** Speed variable.
    this.s = s; 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
     //****checks enemy status on canvas
    if (this.x >= 505 || !this.y) {
        //**** 'resets' enemies/randmises attack!
        this.random(); 
    }
    //**** take position, add (speed) multiplied by delta time.
    this.x += this.s *dt; 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //**** once enemies have been drawn, analyse if player is within range.
    this.checkCollisions(); 
};

Enemy.prototype.random = function() {
    //**** array used to store a crude 'time delay' to set an enemy further back/off canvas on x axis.
    const enemyXCoord = [-101, -126, -151, -176, -202];
    let x;
    //**** allocate random 'time delay' 
    x = Math.floor(Math.random() * 5);
    this.x = enemyXCoord[x];
    //**** array used to store three possible paths on the y axis.
    const enemyYCoord = [62, 145, 228];
    let y;
    //**** allocate random path
    y = Math.floor(Math.random() * 3);
    this.y = enemyYCoord[y];
    //**** array used to store varying speeds
    const enemySpeed = [300, 400, 500];
    let s;
    //allocate random speed
    s = Math.floor(Math.random() * 3);
    this.s = enemySpeed[s];
}

Enemy.prototype.checkCollisions = function() {
    //**** Grab enemy x cord and take away player x coord, to find a difference.
    let diff = this.x - player.x;/
    //**** check the difference is within 'range' & on same Y path axis
    if((diff >= -75 && diff <= 75) && this.y == player.y) {
        document.getElementById('score-box').textContent = --points;
        player.x = 202;
        player.y = 394;
        if(points < 0) {
            //gameover!
            //Will look to adapt game functionality in time.
        }
    }

}

// Now write your own player class
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    //****Possible x coords: (left) 1x0, 2x101, 3x202, 4x303, 5x404 (right).
    //****Default position 202 (middle)
    this.x = x; 
    //****Possible y coords: (top) 1x-21, 2x62, 3x145, 4x228, 5x311, 6x394 (bottom).
    //****Default position 394 (bottom)
    this.y = y; 
};


// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(move) {
    //****sent from handleInput
    move;
    //****player reaches water
    if (this.y == -21) {
        //record point
        this.water();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    //**** use arugment from event listener to define which move to make.
    //**** Referencing coords note above, define 'out of bounds' to prevent off-canvas player 
    if (keyCode == 'left' && this.x > 100) {
        //**** make the calcuation/move and pass it to update.
        this.x -= 101;
        player.update(this.x);
    } else if (keyCode == 'right' && this.x < 304) {
        this.x += 101;
        player.update(this.x);
    } else if (keyCode == 'up' && this.y > 61) {
        this.y -= 83;
        player.update(this.y);
    } else if (keyCode == 'down' && this.y < 312) {
        this.y += 83;
        player.update(this.y);
    }    
};

//**** Simple function to handle points/score
Player.prototype.water = function () {
    //**** add +1 point
    document.getElementById('score-box').textContent = ++points;
    //**** move player up 1 pixel to avoid duplicate scores being counted.
    this.y+=1;
    //**** pause player to show that the player has reached the water
    setTimeout(function() {
        //**** return to default postion for another round.
        player.x = 202;
        player.y = 394;
    }, 500);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
//**** Generate three new enemy objects to place in the array
//**** Could be used to increase game difficulty / more enemies
for (let i = 0; i < 3; i++) {
    allEnemies[i] = new Enemy();
}
// Place the player object in a variable called player
//**** assign player default position
const player = new Player(202, 394);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
