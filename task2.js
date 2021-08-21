const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var score = 0, highscore = 0;
var frames=1;
var holeframe = 150;
var holes = [];
var isalive = true;

// play block 
var block = {
    x: 50,
    y: 310,
    side: 50,
    color: "brown",
    drawBlock: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.side, this.side);
    }
}

//holes
class hole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.drawHoles = function () {
            ctx.fillStyle = "white";
            if (y == 0) {
                this.y = 0;
                ctx.fillRect(this.x, this.y, 90, 90);
            }
            else {
                this.y = 360;
                ctx.fillRect(this.x, this.y, 90, 90);
            }
        };
    }
}
// top and bottom walls 
var walls = {
    x: 0,
    y: 0,
    width: 800,
    height: 90,
    color: 'green',
    drawWalls: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y + 360, this.width, this.height);
    }
}

// detect collision 

function collision() {
    this.collision = function (hole) {
        if ((hole.x > 0 && hole.x < 100 && hole.y == 0 && block.y == 90) || (hole.x > 0 && hole.x < 100 && hole.y == 360 && block.y == 310)) {
            return true;
        }
    }
}
// animate 
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames++;
    block.drawBlock();
    walls.drawWalls();


    for ( j = 0; j < holes.length; j += 1) {
        if (collision(holes[j])) {
            isalive = false;
        }
    }
    if (frames == 1 || (frames / holeframe) % 1 == 0) {
        var xyadd = Math.round(Math.random());
        holes.push(new hole(800, xyadd));
        score++;
       
    } document.getElementById("score").innerHTML="Your Score:"+ score;
    for ( i = 0; i < holes.length; i += 1) {
        holes[i].x -= 3;
        holes[i].drawHoles();
    }
    if(!isalive){
        document.getElementById("head").innerText="GAME OVER---PLAY AGAIN!!";
        // document.getElementById("heading").display=hidden;
    }
    else {
        requestAnimationFrame(animation);
    }
   
}
 window.requestAnimationFrame(animation);
//  add event listener
 canvas.addEventListener('click', function (e) {
    if (block.y === 310) {
        block.y = 90;
    }
    else {
        block.y = 310;
    }
});
document.addEventListener('keyup', function (e) {
    if (e.code === 'Space') {
        if (block.y === 310) {
            block.y = 90;
        }
        else {
            block.y = 310;
        }
    }
}) 