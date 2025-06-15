document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const megaMenu = document.getElementById("megaMenu");

    menuToggle.addEventListener("click", function () {
        megaMenu.classList.toggle("show-menu");
    });
});



function toggleMegaMenu() {
    const menu = document.getElementById("megaMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

