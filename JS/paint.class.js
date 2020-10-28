import ColorWheel from './colorwheel.class.js';
import Fill from './fill.class.js';
import Point from './point.model.js';
import Eyedropper from './sword.js';
import {TOOL_BUCKET, TOOL_COLORWHEEL, TOOL_DOTS, TOOL_ERASER, TOOL_EYEDROP, TOOL_PEN, TOOL_SHAPES, TOOL_SHAPES_CIRCLE, TOOL_SHAPES_RECTANGLE, TOOL_SHAPES_TRIANGLE} from './tool.js';
import { findDistance, getMouseLocationOnCanvas} from './utility.js';

export default class Paint { // Here we have a class called Paint. This class is exported into app1.js.

    constructor(canvasID) { // Here we use a constructor becouse it has to be used with a class. We set the argument "canvasID" so we can fetch the properties in the file app1.js

        const canvas = document.getElementById(canvasID); // In the HTML we made an id for the canvas element. Here we make a veriable called canvas, and it is fetched using getElementById.
        this.canvas = canvas; // Here we declare that the variable is the canvas, so we can referance the canvas in the code below.
        this.context = canvas.getContext("2d"); // Here we set the context to 2d, it provides the 2D rendering context for the drawing surface of the <canvas> element.
    }


    set selectedColor(color) {
        this.color = color;
        this.context.strokeStyle = this.color;
    }

    // ACTIVE TOOL
    set activeTool(tool) { // set binds an object (activeTool) property (this.tool = tool;) to a function (paint.activeTool = selectedTool;(inside app1.js)) to be called when there is an attempt to set that property.
        this.tool = tool;
        console.log(this.tool); // can be removed, just to check if the active tool is correct and working.
    }


    // INIT
    init(){ // Here we set a method called init. We use this in app1.js (paint.init(); ) 
        this.canvas.onmousedown = e => this.onMouseDown(e); // We call the canvas and the mousedown event and call a method that is in this class. (onMouseDown(e))
        
    }


    // ON MOUSE DOWN
    onMouseDown(e) { // This is a method. When the mouse is down this executes.

        this.imageData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight); // veriable that saves the image data from when mouse goes down.

        this.canvas.onmousemove = e => this.onMouseMove(e); // MouseMove will execute as well as long as the mouse is down (kind of like dragging)
        document.onmouseup = e => this.onMouseUp(e); // Mouse up will execute and will make everything stop

        this.startPos = getMouseLocationOnCanvas(e, this.canvas); // we make a property called startPos that uses the function getMouseLocation inside utility.js

        if(this.tool === TOOL_PEN) { // If the mose is down and the tool selected is the pen tool
            this.context.beginPath(); // then begin a new path
            this.context.moveTo(this.startPos.x, this.startPos.y); 
        } else if(this.tool === TOOL_BUCKET) {
            new Fill(this.canvas, this.startPos, this.color);
        } else if (this.tool === TOOL_ERASER) {
            this.context.clearRect(this.startPos.x - 10, this.startPos.y - 10, 30, 30);
        } else if (this.tool === TOOL_EYEDROP){
            //Get color for pixel
            const pixel = this.getPixel(this.startPos)
            console.log(pixel);
            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            var hexValue = '#' + ('0000' + dColor.toString(16)).substr(-6);
            this.selectedColor = hexValue;
            
            
           
        }

    }



    // ON MOUSE MOVE
    onMouseMove(e) {
        this.currentPos = getMouseLocationOnCanvas(e, this.canvas); // we make a property called currentPos that uses the function getMouseLocation inside utility.js

        // DRAWING SHAPES
        switch(this.tool){

            case TOOL_SHAPES_RECTANGLE: // In case the specified tool is selected, then ...
            case TOOL_SHAPES_CIRCLE:
            case TOOL_SHAPES_TRIANGLE:
                this.drawShape(); // we call upon the function drawShape and that code will occur. All three shapes use drawShape()
                break;
            case TOOL_PEN: // If the mouse is moving while its down
                this.drawFreeLine(); // Then do drawFreeLine();
                break;
            case TOOL_ERASER:
                this.context.clearRect(this.currentPos.x - 10, this.currentPos.y - 10, 30, 30);
                break;
            default:
                break;
        }
    }


    // ON MOUSE UP
    onMouseUp(e) { // This is method
        this.canvas.onmousemove = null; // we call the canvas and set onmousemove to null
        document.onmouseup = null; // we call the onmouseup property and set it to null
    }


    // DRAW SHAPE FUNCTION
    drawShape() {

        this.context.putImageData(this.imageData, 0, 0); // Puts the image data (from getImageData) back onto the canvas

        this.context.beginPath(); // we use the method beginPath to Begin a path, we want this for all shapes.

        if(this.tool === TOOL_SHAPES_RECTANGLE) {
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y); // (starting position x value, starting position y value, calculate with, calculate height) 
        }else if (this.tool === TOOL_SHAPES_CIRCLE) {
            // To draw the circle we need to use arc(). It requires us to calculculate the distance between the starting point to the end point. 
            // To do that we need to use the distance formula (ugh math)
            let distance = findDistance(this.startPos, this.currentPos); // This function is inside utility.js and calculates the distance
            this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2 * Math.PI, false);
        }else if (this.tool === TOOL_SHAPES_TRIANGLE) {
            this.context.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x) / 2, this.startPos.y);
            this.context.lineTo(this.startPos.x, this.currentPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
            this.context.closePath();
        }

        this.context.stroke();
        this.context.lineWidth = 10; // This line of code controls the linewidth for the shapes
    }

    drawFreeLine() { // For the pen tool
        this.context.lineTo(this.currentPos.x, this.currentPos.y); // make a line to the current position
        this.context.stroke(); // Make a stroke baby
        this.context.lineWidth = 10; // Then make the stroke thick baby
    }


    getPixel(point) { // This gets the pixel color information in rgba
        if(point.x < 0 || point.y < 0 || point.x >= this.imageData.width, point.y >= this.imageData.height) { 
            return [-1, -1, -1, -1]; // impossible color
        } else {
            
            const offset = (point.y * this.imageData.width + point.x) * 4;
            return [
                this.imageData.data[offset + 0], // red
                this.imageData.data[offset + 1], // green
                this.imageData.data[offset + 2], // blue
                this.imageData.data[offset + 3] // alpha
            ];
            
        }
    }
}

