const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X"; // ผู้เล่นเริ่มก่อน
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// ตรวจสอบว่ามีผู้ชนะหรือไม่
function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // คืนค่าผู้ชนะ
        }
    }
    if (!board.includes("")) {
        return "Tie"; // เสมอ
    }
    return null;
}

// เมื่อผู้เล่นคลิกช่อง
function handleClick(event) {
    const index = event.target.dataset.index;
    
    if (board[index] === "" && gameActive) {
        board[index] = "X";
        event.target.textContent = "X";
        
        let winner = checkWinner();
        if (winner) {
            endGame(winner);
            return;
        }
        
        currentPlayer = "O";
        setTimeout(aiMove, 500); // AI คิดก่อนเดิน
    }
}

// ให้ AI คิดและเล่น
function aiMove() {
    if (!gameActive) return;

    let bestMove = getBestMove();
    board[bestMove] = "O";
    cells[bestMove].textContent = "O";

    let winner = checkWinner();
    if (winner) {
        endGame(winner);
        return;
    }

    currentPlayer = "X";
    statusText.textContent = `Player X's Turn`;
}

// จบเกมเมื่อมีผู้ชนะ
function endGame(winner) {
    gameActive = false;
    if (winner === "Tie") {
        statusText.textContent = "It's a Tie!";
    } else {
        statusText.textContent = `Player ${winner} Wins!`;
    }
}

// คำนวณ Best Move ด้วย MiniMax Algorithm
function getBestMove() {
    let bestScore = -Infinity;
    let move;
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O"; 
            let score = minimax(board, 0, false);
            board[i] = "";
            
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    
    return move;
}

// Minimax Algorithm
function minimax(newBoard, depth, isMaximizing) {
    let winner = checkWinner();
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (winner === "Tie") return 0;
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "O";
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "X";
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// รีเซ็ตเกม
function resetGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
// ปุ่มกลับไปหน้าเมนู
document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "Game.html"; // เปลี่ยนเป็นหน้าหลักของเกม
});
