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
    this.s = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x >= 505 || !this.y) {
        this.random();
    }
    this.x += this.s *dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkCollisions();
};

Enemy.prototype.random = function() {
    const enemyXCoord = [-101, -126, -151, -176, -202];
    let x;
    x = Math.floor(Math.random() * 5);
    this.x = enemyXCoord[x];
    const enemyYCoord = [62, 145, 228];
    let y;
    y = Math.floor(Math.random() * 3);
    this.y = enemyYCoord[y];
    const enemySpeed = [300, 400, 500];
    let s;
    s = Math.floor(Math.random() * 3);
    this.s = enemySpeed[s];
}

Enemy.prototype.checkCollisions = function() {
    let diff = this.x - player.x;//(50)
    //0 - 202 //200 - 300 = -100

    //this.x  //80 >82 = range.  grab player X value (400) grab enemy value (250)
//400-250 = 150 or 250-400 = -150) 
    if((diff >= -75 && diff <= 75) && this.y == player.y) {
        document.getElementById('score-box').textContent = --points;
        player.x = 202;
        player.y = 394;
        if(points < 0) {
            //gameover!
        }
    }

}

// Now write your own player class
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png'; //17, 63, 84, 139, 67, 76
    this.x = x; //Default position 202 (middle)
    //Possible x coords: (left) 1x0, 2x101, 3x202, 4x303, 5x404 (right).
    this.y = y; //Default position 394 (bottom)
    //Possible y coords: (top) 1x-21, 2x62, 3x145, 4x228, 5x311, 6x394 (bottom).
};


// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(move) {
    move;
    if (this.y == -21) { //player reaches water
    //record point
    document.getElementById('score-box').textContent = ++points; //add +1 point
    this.y+=1; // move player up 1 pixel to avoid duplicate scores being counted.
    setTimeout(function(){ // pause to show that the player has reached the water
        player.x = 202; //return to default postion for another round.
        player.y = 394;
    }, 1000);
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //, 17, 63, 84, 139, this.x, this.y, 101, 171);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'left' && this.x > 100) {
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
for (let i = 0; i < 3; i++) {
    allEnemies[i] = new Enemy();
    //allEnemies[i].random();
}
// Place the player object in a variable called player
    // Student says: assign player default position
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
