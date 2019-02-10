document.addEventListener("DOMContentLoaded", start);

var menuItem;
var difX;
var difY;
var body;
var timeout;
var requestAnimationFrame = window.requestAnimationFrame;
var mouseX;
var mouseY;
var animationFrame;
var parentDiv;
var n = 5;
var sideWidth = 50;
var elementSpace = 5;

function start() {
    createDivElements();
    menuItem = document.getElementsByClassName("menuItem")[0];
    body = document.body;
    body.addEventListener("mouseleave", pageLeave);
    addEventListeners();
}

function createDivElements() {
    for (var i = 0; i < n; i++) {
        div = document.createElement("div");
        div.style.width = sideWidth + "px";
        div.style.height = sideWidth + "px";
        div.style.background = "red";
        div.style.display = "inline-block";
        div.style.marginRight = elementSpace + "px";
        div.className = "menuItem";
        document.body.appendChild(div);
    }
}

function addEventListeners() {
    menuItem.addEventListener("mousedown", menuItemMouseDown);

}
function menuItemMouseDown(e) {
    timeout = setTimeout(() => {
        body.addEventListener("mousemove", menuItemMouseMove);
        animationFrame = requestAnimationFrame(update);
    }, 10);

    body.addEventListener("mouseup", menuItemUpMove);
    difX = e.clientX - menuItem.offsetLeft;
    difY = e.clientY - menuItem.offsetTop;
}

function menuItemMouseMove(e) {
    console.log(e.clientX, e.clientY);
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function update(e) {
    menuItem.style.top = (mouseY - difY) + "px";
    menuItem.style.left = (mouseX - difX) + "px";
    animationFrame = requestAnimationFrame(update);
}
function menuItemUpMove(e) {
    clearTimeout(timeout);
    menuItem.style.top = (e.clientY - difY) + "px";
    menuItem.style.left = (e.clientX - difX) + "px";
    body.removeEventListener("mousemove", menuItemMouseMove);
    body.removeEventListener("mouseup", menuItemUpMove);
}

function pageLeave() {
    body.removeEventListener("mousemove", menuItemMouseMove);
    body.removeEventListener("mouseup", menuItemUpMove);
}