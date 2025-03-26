const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
let playerX = canvas.width / 2 - PLAYER_WIDTH / 2;
let playerY = canvas.height - PLAYER_HEIGHT - 10;
let playerSpeed = 5;

let player = {
    x: playerX,
    y: playerY,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    velocityY: 0,
    jumping: false
};

let obstacles = [];
let score = 0;
let isGameOver = false;

const GRAVITY = 0.5;
const JUMP_STRENGTH = -12;
const GROUND_Y = canvas.height - 50;

// ปรับปรุงการฟังเหตุการณ์การกดปุ่ม
document.getElementById('left').addEventListener('click', () => {
    player.x -= playerSpeed;
    if (player.x < 0) player.x = 0;  // จำกัดไม่ให้ตัวละครออกนอกจอ
});

document.getElementById('right').addEventListener('click', () => {
    player.x += playerSpeed;
    if (player.x > canvas.width - PLAYER_WIDTH) player.x = canvas.width - PLAYER_WIDTH;  // จำกัดไม่ให้ตัวละครออกนอกจอ
});

document.getElementById('up').addEventListener('click', () => {
    if (!player.jumping) {
        player.velocityY = JUMP_STRENGTH;
        player.jumping = true;
    }
});

document.getElementById('down').addEventListener('click', () => {
    player.y += playerSpeed;
    if (player.y > canvas.height - PLAYER_HEIGHT) player.y = canvas.height - PLAYER_HEIGHT;  // จำกัดไม่ให้ตัวละครออกนอกจอ
});

// ฟังก์ชันวาดตัวละคร
function drawPlayer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// ฟังก์ชันวาดอุปสรรค
function drawObstacles() {
    obstacles.forEach((obstacle) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// ฟังก์ชันวาดพื้น
function drawGround() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, GROUND_Y, canvas.width, 50);
}

// ฟังก์ชันอัพเดตตำแหน่งและพฤติกรรมของตัวละคร
function updatePlayer() {
    player.velocityY += GRAVITY;  // การดึงดูดของแรงโน้มถ่วง
    player.y += player.velocityY;

    if (player.y >= GROUND_Y) {
        player.y = GROUND_Y;
        player.velocityY = 0;
        player.jumping = false;
    }
}

// ฟังก์ชันสร้างอุปสรรคใหม่
function createObstacle() {
    const obstacleHeight = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // ปรับความสูงให้น้อยลง
    obstacles.push({
        x: canvas.width,
        y: GROUND_Y - obstacleHeight,
        width: 20,
        height: obstacleHeight
    });
}

// ฟังก์ชันอัพเดตตำแหน่งของอุปสรรค
function updateObstacles() {
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= 5;

        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
        }
    });
}

// ฟังก์ชันตรวจสอบการชน
function checkCollision() {
    obstacles.forEach((obstacle) => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            isGameOver = true;
        }
    });
}

// ฟังก์ชันแสดงคะแนน
function updateScore() {
    document.getElementById('score').textContent = score;
}

// ฟังก์ชันเริ่มเกมใหม่
function restartGame() {
    score = 0;
    obstacles = [];
    player.y = GROUND_Y;
    player.velocityY = 0;
    isGameOver = false;
    player.x = canvas.width / 2 - PLAYER_WIDTH / 2;  // รีเซ็ตตำแหน่งตัวละคร
}

// ฟังก์ชันหลักในการอัพเดตเกม
function gameLoop() {
    if (isGameOver) {
        alert("Game Over! Score: " + score);
        restartGame();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawPlayer();
    drawObstacles();
    updatePlayer();
    updateObstacles();
    checkCollision();
    updateScore();

    if (Math.random() < 0.01) createObstacle(); // สร้างอุปสรรคใหม่

    requestAnimationFrame(gameLoop);
}

// เริ่มเกม
gameLoop();
