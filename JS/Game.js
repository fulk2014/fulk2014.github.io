// ตัวอย่างฟังก์ชันที่อาจเพิ่มการโต้ตอบกับไอคอน
document.querySelectorAll('.game-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        // ตัวอย่างการเปลี่ยนสีไอคอนเมื่อคลิก
        this.style.filter = 'brightness(1.5)';
        setTimeout(() => {
            this.style.filter = '';
        }, 300);
    });
});
