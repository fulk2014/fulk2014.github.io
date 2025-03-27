// หา element ของ audio และปุ่มต่างๆ
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const playIcon = document.getElementById('play-icon');
const stopIcon = document.getElementById('stop-icon');

// ฟังก์ชันเริ่มเล่นเพลง
function playMusic() {
    audio.play();
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/1160/1160184.png"; // เปลี่ยนเป็นไอคอน play
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
// หา element ที่เกี่ยวข้อง
const waveform = document.querySelectorAll('.wave');
const audio = document.getElementById('audio');

// ฟังก์ชันที่จะอัพเดตคลื่นเสียง
function updateWaveform() {
    const volume = audio.volume; // ใช้ระดับเสียงของเพลง
    waveform.forEach((wave, index) => {
        // ปรับความสูงของคลื่นเสียงตามระดับเสียง
        const height = Math.random() * (volume * 100);
        wave.style.height = `${height}px`;
    });
}

// เริ่มการอัพเดตคลื่นเสียงทุก 100ms เมื่อเพลงกำลังเล่น
audio.addEventListener('play', () => {
    setInterval(updateWaveform, 100);
});
