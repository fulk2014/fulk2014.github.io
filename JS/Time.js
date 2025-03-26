function updateMoonSunClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // หาค่าหมุน
    const rotation = (hours % 12) * 30 + (minutes / 60) * 30; // หมุนทุก 30 องศาต่อชั่วโมง

    const clockElement = document.getElementById('star-clock');
    const iconElement = document.getElementById('moon-sun-icon');

    // เปลี่ยนภาพตามเวลา
    if (hours >= 6 && hours < 18) {
        // เช้า (พระอาทิตย์)
        iconElement.src = 'https://images.icon-icons.com/39/PNG/128/sun_gadu_sunrise_smile_6222.png'; // ไอคอนพระอาทิตย์
        clockElement.innerHTML = ` 
            <span style="color: orange;">☀️</span> 
            ${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}
            <span style="color: orange;">☀️</span>
        `;
    } else {
        // กลางคืน (พระจันทร์)
        iconElement.src = 'https://images.icon-icons.com/1465/PNG/512/640crescentmoon_100402.png'; // ไอคอนพระจันทร์
        clockElement.innerHTML = ` 
            <span style="color: #39FF14;">🌙</span> 
            ${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}
            <span style="color: #39FF14;">🌙</span>
        `;
    }

    // หมุนไอคอน (พระอาทิตย์/พระจันทร์)
    iconElement.style.transform = `rotate(${rotation}deg)`;
}

setInterval(updateMoonSunClock, 1000); // อัพเดตทุกวินาที
updateMoonSunClock(); // เรียกใช้ครั้งแรก

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
