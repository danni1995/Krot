let canvas;
let ctx;
let savedImageData;
let dragging = false;
let strokeColor = 'black';
let fillColor = 'black';
let line_Width = 2;
let pen_Width =  4;
let currentTool = 'pen';
let canvasWidth = 600;
let canvasHeight = 600;




class ShapeBoundingBox{
    constructor(left, top, width, height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}

class MouseDownPos{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Location{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class penPoint{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let shapeBoundingBox = new ShapeBoundingBox(0,0,0);
let mousedown = new MouseDownPos(0,0);
let loc = new Location(0,0);

document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d')
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
}

function ChangeTool(toolClicked){
    document.getElementById('pen').className = "";
    document.getElementById('bucket').className = "";
    document.getElementById('text').className = "";
    document.getElementById('colordrop').className = "";
    document.getElementById('sword').className = "";
    document.getElementById('shapes').className = "";
    document.getElementById('extend').className = "";
    document.getElementById(toolClicked).className = "selected"
    currentTool = toolClicked;
}


// Mouse Position 

function GetMousePosition(x,y){
    // Get canvas size and position in web page
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}

//Save Image

function SaveCanvasImage(){
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

//Redraw Canvas Image 

function RedrawCanvasImage(){
    ctx.putImageData(savedImageData,0,0);
}

// Update Rubberband shape 

function UpdateRubberbandSizeData(loc){
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);

    if (loc.x > mousedown.x){
        shapeBoundingBox.left = mousedown.x;
    } else{
        shapeBoundingBox.left = loc.x;
    }

    if (loc.y > mousedown.y){
        shapeBoundingBox.top = mousedown.y;
    } else{
        shapeBoundingBox.top = loc.y;
    }
    
}

// Get Angle using X & Y

function getAngleUsingXandY(mouselocX, mouselocY){
    let adjacent = mousedown.x - mouselocX
    let opposite = mousedown.y - mouselocY
    return radiansToDegrees(Math.atan2(opposite, adjacent));
}

// Radians to Degrees
function radiansToDegrees(rad){
    return (rad * (180/Math.PI)).toFixed(2);
}


//Degrees to Radians

function degreesToRadians(degrees){
    return degrees * (math.PI / 180);
}

function UpdateRubberbandOnMove(loc){
    UpdateRubberbandSizeData(loc);
    drawRubberbandShape(loc);

}
function drawRubberbandShape(loc){
    ctx.strokeStyle = strokeColor;
    ctx.fillColor = fillColor;
    ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
}
//Draw Rubberband Shape


//Updage Rubberband on Movement


//ReactToMouseDown

function ReactToMouseDown(e){
    // Change the mouse pointer to a crosshair
    canvas.style.cursor = "crosshair";
    // Store location 
    loc = GetMousePosition(e.clientX, e.clientY);
    // Save the current canvas image
    SaveCanvasImage();
    // Store mouse position when clicked
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    // Store that yes the mouse is being held down
    dragging = true;
};




//ReactToMouseMove
function ReactToMouseMove(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);

    


//ReactToMouseUp
 function ReactToMouseUp(e){
     canvas.style.cursor ="default"
     loc = GetMousePosition(e.clientX, e.clientY);
     RedrawCanvasImage();
     UpdateRubberbandOnMove(loc);
     dragging = false;
     usingPen = false;
    
    }
//SaveImage
function SaveImage(){
    var imageFiles = document.getElementById('img-file');
    imageFile.setAttribute('download', 'image-png');
    imageFile.setAttribute('href', canvas.to.dataURL());
}


//OpenImage
function OpemImage(){
    let img = new Image();
    img.onload = function(){
        ctx.clearReact(0,0,canvas.width, canvas.height);
        ctx.drawImage(img,0,0);
    }
    img.src = 'image-png';
}

}
