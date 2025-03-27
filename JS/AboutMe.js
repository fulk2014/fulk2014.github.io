// หา element ของ audio และปุ่มต่างๆ
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const playIcon = document.getElementById('play-icon');
const stopIcon = document.getElementById('stop-icon');
const fileInput = document.getElementById('file-input');  // Input สำหรับเลือกไฟล์เพลง
const songName = document.getElementById('song-name'); // แสดงชื่อเพลง

// ฟังก์ชันเริ่มเล่นเพลง
function playMusic() {
    audio.play();
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/1160/1160184.png"; // ไอคอน play
    stopIcon.src = "https://cdn-icons-png.flaticon.com/512/684/684809.png"; // ไอคอนหยุด
}

// ฟังก์ชันหยุดเพลง
function stopMusic() {
    audio.pause();
    audio.currentTime = 0; // รีเซ็ตเวลาเพลงกลับไปที่จุดเริ่มต้น
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/1160/1160184.png"; // เปลี่ยนเป็นไอคอน play
    stopIcon.src = "https://cdn-icons-png.flaticon.com/512/684/684809.png"; // ไอคอนหยุด
}

// ฟังก์ชันที่สลับระหว่างเล่นและหยุดเพลง
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        playMusic();
    } else {
        stopMusic();
    }
});

// ฟังก์ชันหยุดเพลงเมื่อคลิกปุ่มหยุด
stopBtn.addEventListener('click', stopMusic);

// เมื่อเพลงเริ่มเล่น เปลี่ยนสถานะปุ่ม
audio.onplay = () => {
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/1160/1160184.png"; // ไอคอน play
};

// เมื่อเพลงหยุด เปลี่ยนสถานะปุ่ม
audio.onpause = () => {
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/1160/1160184.png"; // ไอคอน play
};

// เมื่อเลือกไฟล์เพลงใหม่จาก input
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const audioURL = URL.createObjectURL(file);
        audio.src = audioURL; // เปลี่ยน src ของเพลง
        songName.textContent = `🎵 ${file.name}`; // อัปเดตชื่อเพลง
        playMusic(); // เริ่มเล่นเพลงใหม่
    }
});

// ฟังก์ชันอัพเดตคลื่นเสียง
const waveform = document.querySelectorAll('.wave');
function updateWaveform() {
    const volume = audio.volume; // ใช้ระดับเสียงของเพลง
    waveform.forEach((wave) => {
        const height = Math.random() * (volume * 100);
        wave.style.height = `${height}px`;
    });
}

// เริ่มการอัพเดตคลื่นเสียงทุก 100ms เมื่อเพลงกำลังเล่น
audio.addEventListener('play', () => {
    setInterval(updateWaveform, 100);
});
