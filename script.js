let col = 8;
let row = 8;

let field = document.getElementById('field');
let scoreFill = document.getElementById('score');
let pause = document.getElementById('pause');
let again = document.getElementById('again');
let againBtn = document.getElementById('againBtn');
let p = document.getElementById('p');

for (let i = 1; i < col * row + 1; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = row;

for (let i = 0; i < excel.length; i++) {
    if (x > col) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('x', x);
    excel[i].setAttribute('y', y);
    x++;
}



function generateSnake() {
    let x = Math.round(Math.random() * (col - 3) + 3);
    let y = Math.round(Math.random() * (row - 1) + 1);
    return [x, y];
}

let coord = generateSnake();
let snakeBody = [];

function createSnake() {
    snakeBody = [document.querySelector('[x = "' + coord[0] + '"][y = "' + coord[1] + '"]'),
    document.querySelector('[x = "' + (coord[0] - 1) + '"][y = "' + coord[1] + '"]'),
    document.querySelector('[x = "' + (coord[0] - 2) + '"][y = "' + coord[1] + '"]')];
    for (let i = 1; i < snakeBody.length; i++) {
        snakeBody[i].classList.add("snake-body");
    }
    snakeBody[0].classList.add("snake-head");
    snakeBody[snakeBody.length - 1].classList.add("snake-tail");
}


let food;
let fcoords = [0, 0];
function generateFood() {
    fcoords[0] = Math.round(Math.random() * (col - 1) + 1);
    fcoords[1] = Math.round(Math.random() * (row - 1) + 1);
    return [fcoords[0], fcoords[1]];
}
function createFood() {

    let foodCoord = generateFood();
    food = document.querySelector('[x = "' + foodCoord[0] + '"][y = "' + foodCoord[1] + '"]');

    while (food.classList.contains('snake-body')
        || food.classList.contains('snake-head')
        || food.classList.contains('snake-tail')
        || food.classList.contains('snake-angle')) {
        let foodCoord = generateFood();
        food = document.querySelector('[x = "' + foodCoord[0] + '"][y = "' + foodCoord[1] + '"]');
    }


    food.classList.add('food');

}//   food

createSnake();
createFood();

let direction = 'right';
let step = false;
let score = 0;


function move() {
    let snakeCoord = [snakeBody[0].getAttribute('x'), snakeBody[0].getAttribute('y')];
    snakeBody[0].classList.remove('snake-head');
    snakeBody[snakeBody.length - 1].classList.remove('snake-body');
    snakeBody[snakeBody.length - 1].classList.remove('snake-tail');
    snakeBody[snakeBody.length - 1].classList.remove('snake-angle');
    for (let i = 0; i < excel.length; i++) {
        excel[i].style.transform = "rotate(0deg)";
    }
    snakeBody.pop();
    snakeBody[0].classList.remove('snake-body');

    if (direction == 'right') {
        if (snakeCoord[0] < col) {
            snakeBody.unshift(document.querySelector('[x = "' + (+snakeCoord[0] + 1)
                + '"][y = "' + snakeCoord[1] + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[x = "1"][y = "' + snakeCoord[1] + '"]'));
        }
    }
    else if (direction == 'left') {
        if (snakeCoord[0] > 1) {
            snakeBody.unshift(document.querySelector('[x = "' + (+snakeCoord[0] - 1)
                + '"][y = "' + snakeCoord[1] + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[x = "' + col
                + '"][y = "' + snakeCoord[1] + '"]'));
        }
    }
    if (direction == 'up') {
        if (snakeCoord[1] < row) {
            snakeBody.unshift(document.querySelector('[x = "' + snakeCoord[0]
                + '"][y = "' + (+ snakeCoord[1] + 1) + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[x = "' + snakeCoord[0]
                + '"][y = "1"]'));
        }
    }
    else if (direction == 'down') {
        if (snakeCoord[1] > 1) {
            snakeBody.unshift(document.querySelector('[x = "' + snakeCoord[0]
                + '"][y = "' + (+ snakeCoord[1] - 1) + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[x = "' + snakeCoord[0]
                + '"][y = "' + row + '"]'));
        }
    }// arrow move

    if (snakeBody[0].classList.contains('snake-body')) {
        again.style.display = "block";
        p.innerHTML = 'CONGRATS!<br>YOUR SCORE:<br><br><span>' + score  + '</span>';
        clearInterval(interval);
    }// end of game

    if (direction == 'right') {
        snakeBody[0].style.transform = "rotate(0deg)";
    }
    else if (direction == 'left') {
        snakeBody[0].style.transform = "rotate(180deg)";
    }
    else if (direction == 'up') {
        snakeBody[0].style.transform = "rotate(270deg)";
    }
    else if (direction == 'down') {
        snakeBody[0].style.transform = "rotate(90deg)";
    }//  head

    snakeBody[0].classList.add('snake-head');
    for (let i = 1; i < snakeBody.length - 1; i++) {
        let xAngle = snakeBody[i].getAttribute('x');
        let yAngle = snakeBody[i].getAttribute('y');
        let xNext = snakeBody[i - 1].getAttribute('x');
        let yNext = snakeBody[i - 1].getAttribute('y');
        let xPrev = snakeBody[i + 1].getAttribute('x');
        let yPrev = snakeBody[i + 1].getAttribute('y');
        if ((yAngle == yPrev) && (xAngle == xNext)) {
            if (xPrev > xAngle) {
                if (xPrev == col && xAngle == 1) {
                    if ((yPrev == 1) && (xNext == 1) && (yNext == row)) {
                        snakeBody[i].style.transform = "rotate(0deg)";
                    }// from left col 1 
                    else if ((yPrev == row) && (xNext == 1) && (yNext == 1)) {
                        snakeBody[i].style.transform = "rotate(90deg)";
                    }// from left col row
                    else if (yNext > yAngle) {
                        snakeBody[i].style.transform = "rotate(90deg)";
                    }// to up from the wall
                    else if (yNext < yAngle) {
                        snakeBody[i].style.transform = "rotate(0deg)";
                    }// to down from the wall
                }// from the wall
                else if (yNext == 1 && yAngle == row) {
                    snakeBody[i].style.transform = "rotate(180deg)";
                }// to up to the wall
                else if (yNext == row && yAngle == 1) {
                    snakeBody[i].style.transform = "rotate(270deg)";
                }// to down to the wall
                else if (yNext > yAngle) {
                    snakeBody[i].style.transform = "rotate(180deg)";
                }// to up
                else if (yNext < yAngle) {
                    snakeBody[i].style.transform = "rotate(270deg)";
                }// to down
            }// from right 
            else if (xPrev < xAngle) {
                if (xPrev == 1 && xAngle == col) {
                    if ((yPrev == 1) && (xNext == col) && (yNext == row)) {
                        snakeBody[i].style.transform = "rotate(270deg)";
                    }// from right 1 1 
                    else if ((yPrev == row) && (xNext == col) && (yNext == 1)) {
                        snakeBody[i].style.transform = "rotate(180deg)";
                    }// from right 1 row
                    else if (yNext > yAngle) {
                        snakeBody[i].style.transform = "rotate(180deg)";
                    }// to up from the wall
                    else if (yNext < yAngle) {
                        snakeBody[i].style.transform = "rotate(270deg)";
                    }// to down from the wall
                }// from the wall
                else if (yNext == 1 && yAngle == row) {
                    snakeBody[i].style.transform = "rotate(90deg)";
                }// to up to the wall
                else if (yNext == row && yAngle == 1) {
                    snakeBody[i].style.transform = "rotate(0deg)";
                }// to down to the wall
                else if (yNext > yAngle) {
                    snakeBody[i].style.transform = "rotate(90deg)";
                }// to up
                else if (yNext < yAngle) {
                    snakeBody[i].style.transform = "rotate(0deg)";
                }// to down
            }// form left
            snakeBody[i].classList.add('snake-angle');
        }//     horizontal to vertical
        else if ((xAngle == xPrev) && (yAngle == yNext)) {
            if (yPrev > yAngle) {
                if (yPrev == col && yAngle == 1) {
                    if ((xPrev == 1) && (xNext == col) && (yNext == 1)) {
                        snakeBody[i].style.transform = "rotate(0deg)";
                    }// from down col 1 
                    else if ((xPrev == row) && (xNext == 1) && (yNext == 1)) {
                        snakeBody[i].style.transform = "rotate(270deg)";
                    }// from down col row
                    else if (xNext > xAngle) {
                        snakeBody[i].style.transform = "rotate(270deg)";
                    }// to right from the wall
                    else if (xNext < xAngle) {
                        snakeBody[i].style.transform = "rotate(0deg)";
                    }// to left from the wall
                }// from the wall
                else if (xNext == 1 && xAngle == col) {
                    snakeBody[i].style.transform = "rotate(180deg)";
                }// to right to the wall
                else if (xNext == col && xAngle == 1) {
                    snakeBody[i].style.transform = "rotate(90deg)";
                }// to left to the wall
                else if (xNext > xAngle) {
                    snakeBody[i].style.transform = "rotate(180deg)";
                }// to right
                else if (xNext < xAngle) {
                    snakeBody[i].style.transform = "rotate(90deg)";
                }// to left
            }// from up 
            else if (yPrev < yAngle) {
                if (yPrev == 1 && yAngle == col) {
                    if ((xPrev == 1) && (xNext == col) && (yNext == row)) {
                        snakeBody[i].style.transform = "rotate(90deg)";
                    }// from up col 1 
                    else if ((xPrev == row) && (xNext == 1) && (yNext == row)) {
                        snakeBody[i].style.transform = "rotate(180deg)";
                    }// from up col row
                    else if (xNext > xAngle) {
                        snakeBody[i].style.transform = "rotate(180deg)";
                    }// to right from the wall
                    else if (xNext < xAngle) {
                        snakeBody[i].style.transform = "rotate(90deg)";
                    }// to left from the wall
                }// from the wall
                else if (xNext == 1 && xAngle == col) {
                    snakeBody[i].style.transform = "rotate(270deg)";
                }// to right to the wall
                else if (xNext == col && xAngle == 1) {
                    snakeBody[i].style.transform = "rotate(0deg)";
                }// to left to the wall
                else if (xNext > xAngle) {
                    snakeBody[i].style.transform = "rotate(270deg)";
                }// to right
                else if (xNext < xAngle) {
                    snakeBody[i].style.transform = "rotate(0deg)";
                }// to left 
            }// from down 
            snakeBody[i].classList.add('snake-angle');
        }//    vertical to horizontal  
        // angle
        else if (xAngle == xNext) {
            snakeBody[i].style.transform = "rotate(90deg)";
        }// vertical
        else if (yAngle == yNext) {
            snakeBody[i].style.transform = "rotate(0deg)";
        }// hotizontal
        snakeBody[i].classList.add("snake-body");
    }//  body


    let xTail = snakeBody[snakeBody.length - 1].getAttribute('x');
    let yTail = snakeBody[snakeBody.length - 1].getAttribute('y');
    let xBody = snakeBody[snakeBody.length - 2].getAttribute('x');
    let yBody = snakeBody[snakeBody.length - 2].getAttribute('y');
    if (xTail == xBody) {
        if (yTail == row && yBody == 1) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(270deg)";
        }// from down to up to wall
        else if (yTail == 1 && yBody == row) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(90deg)";
        }// from up to down to wall 
        else if (yTail < yBody) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(270deg)";
        }// from down to up
        else if (yTail > yBody) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(90deg)";
        }// from up to down
    }// vertical
    else if (yTail == yBody) {
        if (xTail == col && xBody == 1) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(0deg)";
        }// from left to right to wall
        else if (xTail == 1 && xBody == col) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(180deg)";
        }// from left to right to wall
        else if (xTail < xBody) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(0deg)";
        }// from left to right
        else if (xTail > xBody) {
            snakeBody[snakeBody.length - 1].style.transform = "rotate(180deg)";
        }// from left to right
    }// horizontal
    snakeBody[snakeBody.length - 1].classList.add('snake-tail');
    snakeBody[snakeBody.length - 1].classList.add('snake-body');//  tail

    if (snakeBody[0].getAttribute('x') == food.getAttribute('x')
        && snakeBody[0].getAttribute('y') == food.getAttribute('y')) {
        food.classList.remove('food');
        let posx = snakeBody[snakeBody.length - 1].getAttribute('x');
        let posy = snakeBody[snakeBody.length - 1].getAttribute('y');
        let obj = document.querySelector('[x = "' + posx + '"][y = "' + posy + '"]');
        obj.classList.add('snake-body', 'snake-tail');
        let xTail = obj.getAttribute('x');
        let yTail = obj.getAttribute('y');
        let xBody = snakeBody[snakeBody.length - 2].getAttribute('x');
        let yBody = snakeBody[snakeBody.length - 2].getAttribute('y');
        if (xTail == xBody) {
            if (yTail == row && yBody == 1) {
                obj.style.transform = "rotate(270deg)";
            }// from down to up to wall
            else if (yTail == 1 && yBody == row) {
                obj.style.transform = "rotate(90deg)";
            }// from up to down to wall 
            else if (yTail < yBody) {
                obj.style.transform = "rotate(270deg)";
            }// from down to up
            else if (yTail > yBody) {
                obj.style.transform = "rotate(90deg)";
            }// from up to down
        }// vertical
        else if (yTail == yBody) {
            if (xTail == col && xBody == 1) {
                obj.style.transform = "rotate(0deg)";
            }// from left to right to wall
            else if (xTail == 1 && xBody == col) {
                obj.style.transform = "rotate(180deg)";
            }// from left to right to wall
            else if (xTail < xBody) {
                obj.style.transform = "rotate(0deg)";
            }// from left to right
            else if (xTail > xBody) {
                obj.style.transform = "rotate(180deg)";
            }// from left to right
        }// horizontal
        snakeBody.push(obj);
        setTimeout(createFood(), 300);
        score++;
        scoreFill.textContent = 'SCORE: ' + score;
        if (score == 5) {
            speed = 200;
            clearInterval(interval);
            interval = setInterval(move, speed);
        }
        else if (score == 10) {
            speed = 190;
            clearInterval(interval);
            interval = setInterval(move, speed);
        }
        else if (score == 15) {
            speed = 180;
            clearInterval(interval);
            interval = setInterval(move, speed);

        }
        else if (score == 20) {
            speed = 170;
            clearInterval(interval);
            interval = setInterval(move, speed);

        }
        else if (score == 25) {
            speed = 160;
            clearInterval(interval);
            interval = setInterval(move, speed);

        }
        else if (score == 30) {
            speed = 150;
            clearInterval(interval);
            interval = setInterval(move, speed);

        }
    }// eat food

    step = true;
}

let speed = 210;
let interval = setInterval(move, speed);

let _pause = true;
pause.onclick = function () {
    if (_pause == true) {
        clearInterval(interval);
        _pause = false;
    }
    else if (_pause == false) {
        interval = setInterval(move, speed);
        _pause = true;
    }
}
pause.onmousedown = function () {
    pause.style.opacity = "0.5";
}
pause.onmouseup = function () {
    pause.style.opacity = "1";
}

againBtn.onclick = function () {
    score = 0;
    scoreFill.textContent = 'SCORE: ' + score;
    direction = 'right';  
    again.style.display = 'none';
    for (let i = 0; i < excel.length; i++) {
        excel[i].className = "excel";
        excel[i].style.transform = "rotate(0deg)";
    }
    snakeBody = [];
    createSnake();
    createFood();
    speed = 210;
    interval = setInterval(move, speed);
}
againBtn.onmousedown = function () {
    againBtn.style.opacity = "0.5";
}
againBtn.onmouseup = function () {
    againBtn.style.opacity = "1";
}

window.addEventListener('keydown', function (e) {
    if (step == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            step = false;
        }
        else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            step = false;
        }
        else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            step = false;
        }
        else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            step = false;
        }
        else if (e.keyCode == 65 && direction != 'right') {
            direction = 'left';
            step = false;
        }
        else if (e.keyCode == 87 && direction != 'down') {
            direction = 'up';
            step = false;
        }
        else if (e.keyCode == 68 && direction != 'left') {
            direction = 'right';
            step = false;
        }
        else if (e.keyCode == 83 && direction != 'up') {
            direction = 'down';
            step = false;
        }
    }
    if (e.keyCode == 32) {
        pause.style.opacity = "0.5";
        againBtn.style.opacity = "0.5";
        if (again.style.display == 'none') {
            if (_pause == true) {
                clearInterval(interval);
                _pause = false;
            }
            else if (_pause == false) {
                interval = setInterval(move, speed);
                _pause = true;
            }
        }
        else if (again.style.display == 'block') {            
            score = 0;            
            scoreFill.textContent = 'SCORE: ' + score;
            direction = 'right';       
            again.style.display = 'none';
            for (let i = 0; i < excel.length; i++) {
                excel[i].className = "excel";
                excel[i].style.transform = "rotate(0deg)";
            }
            snakeBody = [];
            createSnake();
            createFood();            
            speed = 210;
            interval = setInterval(move, speed);
        }
    }
});

window.addEventListener('keyup', function (e) {
    if (e.keyCode == 32) {
        pause.style.opacity = "1";
        againBtn.style.opacity = "1";
    }
});


var body = document.getElementById('body');
var manager = new Hammer.Manager(body);
var Swipe = new Hammer.Swipe();
manager.add(Swipe);

manager.on('swipe', function(e) {
    var dir = e.offsetDirection;
    if (step ==true){
        if (dir == 2 && direction!= 'right'){
            direction = 'left';
            step = false;
        }
        else if (dir == 4 && direction!= 'left'){
            direction = 'right';
            step = false;
        }
        else if (dir == 8 && direction!= 'down'){
            direction = 'up';
            step = false;
        }
        else if (dir == 16 && direction!= 'up'){
            direction = 'down';
            step = false;
        }
    }
});
