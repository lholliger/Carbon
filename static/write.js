function post(route, dataString)
{

  $.ajax({
    type: "POST",
    url: route,
    data: dataString,

  });
}
function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}


var mouseDown = false;
document.body.onmousedown = function() {
  mouseDown = true;
  console.log("down");
}
document.body.onmouseup = function() {
  mouseDown = false;
  lx = 0;
  ly = 0;
}

var canvas, ctx;
function redraw() {
canvas = document.getElementById("writer");

canvas.ontouchstart = function(e) {
  if (e.touches) e = e.touches[0];
  return false;
}


canvas.height = 1150;
canvas.width = 863;

ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(0, 0, 900, 1200);
ctx.fillStyle = "white";
ctx.fill();


ctx.fillStyle = "blue";

for (i = 0; i < 35; i++) {
  ctx.beginPath();

  ctx.rect(0, i * 29 + 129, 900, 1);

  ctx.fill();

}


ctx.beginPath();
ctx.fillStyle = "red";
ctx.rect(140, 0, 1, 2000);
ctx.fill();
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function restore() {
  var myCanvas = document.getElementById('writer');
var ctx = myCanvas.getContext('2d');
var img = new Image;
img.onload = function(){
  ctx.drawImage(img,0,0); // Or at whatever offset you like
};
img.src = httpGet("/sheet/" + name);
}




redraw();

var ftype = get("type");
if (ftype == "textbook") {
  var pagenumber = get("pagenumber");
}
if (ftype == "notebook") {
  var pagenumber = get("pagenumber");
}
if (ftype == "paper") {
  var name = get("filename");

  if (get("new") == "true") {} else {
  restore();
}
}



function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
ctx.fillStyle = "black";
var lx, ly;
ctx.fillStyle = "black";

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  if (mouseDown) {
    ctx.beginPath();
    if (lx == 0 && ly == 0) {
      ctx.moveTo(mousePos.x, mousePos.y);

    } else {
    ctx.moveTo(lx, ly);
  }
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  lx = mousePos.x;
  ly = mousePos.y;
}

}, false);

var startx = 0;
var starty = 0;
canvas.addEventListener('touchstart', function(e) {
  var rect = canvas.getBoundingClientRect();

  var touchobj = e.changedTouches[0];
  startx = parseInt(touchobj.clientX - rect.left);
  starty = parseInt(touchobj.clientY - rect.top);
  e.preventDefault()
}, false)

canvas.addEventListener('touchmove', function(e) {
  var rect = canvas.getBoundingClientRect();

  var touchobj = e.changedTouches[0];

  if (startx == 0 && starty == 0) {
    ctx.moveTo(touchobj.clientX - rect.left, touchobj.clientY - rect.top);
  } else {
    ctx.moveTo(startx, starty);
  }
  ctx.lineTo(touchobj.clientX - rect.left, touchobj.clientY - rect.top);
  startx = touchobj.clientX - rect.left;
  starty = touchobj.clientYß - rect.top;
  ctx.stroke();


  e.preventDefault()
}, false)


canvas.addEventListener('touchend', function(e) {
  startx = 0;
  starty = 0;
}, false)


function save() {
  var dataURL = canvas.toDataURL();
  if (ftype == "paper") {
  post('/save/', {name: name, data: dataURL, type: ftype});
}
}
