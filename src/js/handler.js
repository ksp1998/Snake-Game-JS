import apple from '../images/apple.png';
import banana from '../images/banana.png';
import cherry from '../images/cherry.png';
import grapes from '../images/grapes.png';
import strawberry from '../images/strawberry.png';
import watermelon from '../images/watermelon.png';

let rows, columns;

const moveSound = new Audio('/assets/sounds/move.mp3');
const eatSound = new Audio('/assets/sounds/food.mp3');
const gameOverSound = new Audio('/assets/sounds/gameover.mp3');
const musicSound = new Audio('/assets/sounds/music.mp3');
moveSound.volume = eatSound.volume = gameOverSound.volume = .5;
musicSound.volume = .1;

let snake = [
    // head of the snake
    {x: 3, y: 5}
];

// initial direction of snake
let direction = { x: 0, y: 0 }

// initial speed of snake
let speed = 5;

// food images
const foodImages = [apple, banana, cherry, grapes, strawberry, watermelon];

// initial food location
let foodLocation = { x: 0, y: 0, bg: apple }

let score = 0;
let hiScore = 0;

let isInvisibleWall = false;
let playMusic = true;
let playSound = true;

window.addEventListener('load', () => {
    
    setGridSize();

    hiScore = localStorage.getItem("hiScore");

    if(hiScore === null) {
        hiScore = 0;
        localStorage.setItem("hiScore", JSON.stringify(hiScore))
    }
    else {
        hiScore = JSON.parse(hiScore);
        document.querySelector('#hiScore').innerHTML = hiScore;
    }

    window.requestAnimationFrame(gameLoop);
    newFoodLocation();
})

// Main game loop function
let lastPaintTime = 0;
const gameLoop = ctime => {

    window.requestAnimationFrame(gameLoop);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(direction)
    if(direction.x === 0 && direction.y === 0) {
        document.querySelector('.options button').style.display = 'block';
        document.querySelector('.instruction').style.transform = 'scaleX(1)';
    } else {
        document.querySelector('.options button').style.display = 'none';
        document.querySelector('.instruction').style.transform = 'scaleX(0)';
    }

    if(isGameOver()) {
        musicSound.pause();
        speed = Number.MIN_VALUE;
        if(playSound) gameOverSound.play();
        direction = {x: 0, y: 0};
        document.querySelector('.game_over').style.transform = 'scale(1)';
        document.querySelector('.game_over #yourScore').innerHTML = score;
        document.querySelector('.game_over #hiScore').innerHTML = hiScore;
        document.querySelector('.game_over .retry_form button').focus();
        localStorage.setItem("hiScore", JSON.stringify(hiScore));
    }
    displaySnake();
    displayFood();
    moveSnake();
    eatsFood();
    if(isInvisibleWall) {
        isWall();
    }
    if(playMusic) musicSound.play().catch((e) => {});
}

const isGameOver= () => {
    for(let i = 3; i < snake.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    if(!isInvisibleWall) {
        if(snake[0].x <= 0 || snake[0].x > rows || snake[0].y <= 0 || snake[0].y > columns) {
            // make the snake head visible
            snake[0] = {
                x: snake[0].x - direction.x, 
                y: snake[0].y - direction.y
            };
            return true; 
        }
    }

    return false;
}

const retry = e => {
    e.preventDefault();
    snake = [{x: 3, y: 5}];
    direction = {x: 0, y: 0};
    speed = 5;
    score = 0;
    document.querySelector('.game_over').style.transform = 'scale(0)'; 
}

const displaySnake = () => {
    document.querySelector('.board').innerHTML = '';
    const alpha_const = .5 / (snake.length - 1)
    snake.forEach((snakePart, i) => {
        
        const part = document.createElement('div');
        part.style.gridRowStart = snakePart.y;
        part.style.gridColumnStart = snakePart.x;

        if(i !== 0) {
            const alpha = 1 - i * alpha_const;
            part.style.backgroundColor = 'rgba(0, 128, 0, ' + alpha + ')';
        }
        part.classList.add((i === 0) ? 'snake_head' : 'snake_body');

        document.querySelector('.board').append(part);
    });
}

const displayFood = () => {
    const food = document.createElement('div');
    food.style.gridRowStart = foodLocation.y;
    food.style.gridColumnStart = foodLocation.x;

    food.style.background = `url(${foodLocation.bg})`;
    food.style.backgroundSize = 'cover';

    food.classList.add('food');
    food.setAttribute('id', 'food');

    document.querySelector('.board').append(food);

    // console.log(document.getElementById('food'));
}

const moveSnake = () => {

    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i+1] = {...snake[i]};
    }

    snake[0].x += direction.x;
    snake[0].y += direction.y;
}

const eatsFood = () => {

    if(snake[0].x === foodLocation.x && snake[0].y === foodLocation.y) {

        if(playSound) eatSound.play();
        // updating score
        score += 10;
        document.querySelector('#currentScore').innerHTML = score;
        
        // updating hi score
        if(score > hiScore) {
            hiScore = score;
            document.querySelector('#hiScore').innerHTML = hiScore;
        }
        
        // updating speed
        speed += (score <= 50) ? .25 : .1;
        // speed += .2;

        // adding new body part to the snake
        snake.unshift({
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        });
        newFoodLocation();
    }
}

const isWall = () => {
    snake.forEach(snakePart => {
        if(snakePart.x <= 0) {
            snakePart.x = rows;
        }
        if(snakePart.x > rows) {
            snakePart.x = 1;
        }
        if(snakePart.y <= 0) {
            snakePart.y = columns;
        }
        if(snakePart.y > columns) {
            snakePart.y = 1;
        }
    })
}

const newFoodLocation = () => {
    foodLocation.x = Math.round(Math.random() * (columns - 3) + 2);
    foodLocation.y = Math.round(Math.random() * (rows - 3) + 2);
    foodLocation.bg = foodImages[ Math.round(Math.random() * 10) % foodImages.length ];
}

const updateDirection = key => {
    if(key.code.includes('Arrow') && document.querySelector('.option_list').style.transform === 'scale(0)') {
        if(playSound) moveSound.play();
        switch (key.code) {
            case 'ArrowLeft':
                if(direction.x === 0)
                    direction = {x: -1, y: 0};
                break;

            case 'ArrowRight':
                if(direction.x === 0)
                    direction = {x: 1, y: 0};
                break;

            case 'ArrowUp':
                if(direction.y === 0)
                    direction = {x: 0, y: -1};
                break;

            case 'ArrowDown':
                if(direction.y === 0)
                    direction = {x: 0, y: 1};
                break;

            default: break;
        }
    }
}

window.addEventListener('keydown', updateDirection);

const setWallsVisibility = () => {

    // setting board walls
    if(document.querySelector('#walls').checked) {
        isInvisibleWall = true;
        document.querySelector('.board').style.borderWidth = '1px';
    }
    else {
        isInvisibleWall = false;
        document.querySelector('.board').style.borderWidth = '2vmin';
    }
}

const setGridSize = () => {

    // setting grid size
    rows = Number.parseInt(document.querySelector('#gridSize').value);
    columns = Number.parseInt(document.querySelector('#gridSize').value);

    document.documentElement.style.setProperty('--rows', rows);
    document.documentElement.style.setProperty('--columns', columns);
    newFoodLocation();
}

const setMusicAndSound = () => {
    // setting music
    playMusic = document.querySelector('#music').checked ? false : true;
    playMusic ? musicSound.play() : musicSound.pause();
    // setting sound
    playSound = document.querySelector('#sound').checked? false : true;
}

const showOptions = () => {
    let style = document.querySelector('.option_list').style;
    style.transform = (style.transform === 'scale(1)')
        ? 'scale(0)'
        : 'scale(1)';
}

const showGamePad = () => {
    const style = document.querySelector('.controls').style;
    if(style.transform === 'rotate(45deg) scale(0)') {
        style.transform = 'rotate(45deg) scale(1)';
    } else {
        style.transform = 'rotate(45deg) scale(0)';
    }
}

// snake : imported in Board component
// updateDirection : imported in Controls component
// retry : imported in GameOver component

export { snake, updateDirection, showGamePad, retry, showOptions, setWallsVisibility, setGridSize, setMusicAndSound };