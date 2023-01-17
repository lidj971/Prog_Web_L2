var dessin = [7,3,4,5,1,7,2,2,5,4,7,2,4,5,2,3,3,4,2,2,3,7,4,5,4,3,7,1];
var colors = document.querySelectorAll(".ball");
dessin.forEach(elem => {document.querySelector(".plateau").appendChild(colors[elem].cloneNode(false))});