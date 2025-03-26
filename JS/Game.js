document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    let isDefaultBackground = true;

    themeToggle.addEventListener("click", function () {
        if (isDefaultBackground) {
            body.style.background = "url('https://images6.alphacoders.com/132/thumb-1920-1326045.jpeg') no-repeat center center fixed";
        } else {
            body.style.background = "url('https://images6.alphacoders.com/137/thumb-1920-1371030.png') no-repeat center center fixed";
        }
        body.style.backgroundSize = "cover";
        isDefaultBackground = !isDefaultBackground;
    });
});
