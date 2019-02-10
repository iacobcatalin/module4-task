document.addEventListener("DOMContentLoaded", start);

var parentDiv;
var n = 15;
var m = 15;
var sideWidth = 10;
var elementSpace = 10;

function start() {
    createDivElements();
}

function createDivElements() {
    parentDiv = document.createElement("div");
    parentDiv.className = "parent-div";
    parentDiv.style.width = ((sideWidth + elementSpace) * n) + "px";
    document.body.appendChild(parentDiv);

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            div = document.createElement("div");
            div.style.width=sideWidth + "px";
            div.style.height=sideWidth + "px";
            div.style.marginRight=sideWidth + "px";
            div.style.marginBottom=sideWidth + "px";
            
            if (i==j){
                div.className = "black";
            }
            if (i==n-j-1){
                div.className = "white";
            }
            parentDiv.appendChild(div);           
        }
    }
}