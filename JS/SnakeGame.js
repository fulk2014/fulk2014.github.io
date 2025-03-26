// การตั้งค่าพื้นฐานสำหรับเกมงู
const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

// ขนาดของแต่ละบล็อคในเกม
const box = 20;

// ความเร็วของงู
let score = 0;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = generateFood();
let direction = 'RIGHT';
let gameInterval;

// ฟังก์ชันเพื่อวาดเกม
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // เคลียร์หน้าจอ

    // วาดงู
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lightgreen'; // สีหัวงูและลำตัว
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // วาดอาหาร
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // วาดคะแนน
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, box, box);

    // เพิ่มความเร็วเกม
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(gameLoop, 100);
}

// ฟังก์ชันเล่นเกม
function gameLoop() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;

    // ตรวจสอบการชนกับขอบ
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head, snake)) {
        clearInterval(gameInterval);
        document.getElementById('game-result').innerText = 'Game Over! Final Score: ' + score;
        return;
    }

    snake.unshift(head);

    // ถ้าหากงูทานอาหาร
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // สุ่มที่อาหารใหม่
    } else {
        snake.pop(); // เอาท้ายงูออก
    }

    draw();
}

// ฟังก์ชันตรวจสอบการชน
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// ฟังก์ชันสร้างอาหารแบบสุ่ม
function generateFood() {
    let foodX = Math.floor(Math.random() * 20) * box;
    let foodY = Math.floor(Math.random() * 20) * box;
    return { x: foodX, y: foodY };
}

// ฟังก์ชันเปลี่ยนทิศทาง
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// เริ่มเกม
draw();
