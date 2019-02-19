document.addEventListener("DOMContentLoaded", start);

var selectedItem;
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
var items;

function start() {
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
        div.style.borderRadius = "50%";
        div.style.display = "inline-block";
        div.style.marginRight = elementSpace + "px";
        div.className = "menuItem";
        document.body.appendChild(div);
    }
}

function addEventListeners() {
    var menuItem;
    items = document.getElementsByClassName("menuItem");
    for (var i = 0; i < items.length; i++) {
        menuItem = items[i];
        menuItem.addEventListener("mousedown", menuItemMouseDown);
    }
}
function menuItemMouseDown(e) {
    timeout = setTimeout(() => {
        body.addEventListener("mousemove", menuItemMouseMove);
        animationFrame = requestAnimationFrame(update);
    }, 10);

    body.addEventListener("mouseup", menuItemUpMove);
    selectedItem = e.target;
    difX = e.clientX - e.target.offsetLeft;
    difY = e.clientY - e.target.offsetTop;
    mouseX = e.clientX;
    mouseY = e.clientY;


}

function menuItemMouseMove(e) {
    // console.log(e.clientX, e.clientY);
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function update(e) {
    selectedItem.style.top = (mouseY - difY) + "px";
    selectedItem.style.left = (mouseX - difX) + "px";

    var r1 = {
        x: selectedItem.offsetLeft,
        y: selectedItem.offsetTop,
        w: selectedItem.offsetWidth,
        h: selectedItem.offsetHeight
    };
    var r2;
    var dist;
    var hit = false;
    for (var i = 0; i < items.length; i++) {
        if (items[i] == selectedItem) {
            continue;
        }
        menuItem = items[i];
        r2 = {
            x: menuItem.offsetLeft,
            y: menuItem.offsetTop,
            w: menuItem.offsetWidth,
            h: menuItem.offsetHeight
        };
        dist = (r2.x - r1.x) * (r2.x - r1.x) + (r2.y - r1.y) * (r2.y - r1.y);
        var d = Math.sqrt(dist);
        // if (r1.x + r1.w < r2.x || r1.x > r2.x + r2.w || r1.y + r1.h < r2.y || r1.y > r2.y + r2.h) { // coliziune patrate
        if (d > (r1.w / 2) + (r2.w / 2)) {
            menuItem.style.background = "red";
        }
        else {
            hit = true;
            menuItem.style.background = "yellow";
        }
    }
    if (hit) {
        selectedItem.style.background = "yellow";
    }
    else {
        selectedItem.style.background = "red";
    }


    animationFrame = requestAnimationFrame(update);
}
function menuItemUpMove(e) {
    clearTimeout(timeout);
    selectedItem.style.top = (e.clientY - difY) + "px";
    selectedItem.style.left = (e.clientX - difX) + "px";
    body.removeEventListener("mousemove", menuItemMouseMove);
    body.removeEventListener("mouseup", menuItemUpMove);
}

function pageLeave() {
    body.removeEventListener("mousemove", menuItemMouseMove);
    body.removeEventListener("mouseup", menuItemUpMove);
}