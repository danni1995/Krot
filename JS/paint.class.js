import Point from './point.model.js';
import {TOOL_BUCKET, TOOL_COLORWHEEL, TOOL_DOTS, TOOL_ERASER, TOOL_EYEDROP, TOOL_PEN, TOOL_SHAPES, TOOL_SHAPES_CIRCLE, TOOL_SHAPES_RECTANGLE, TOOL_SHAPES_TRIANGLE, TOOL_TEXT} from './tool.js';
import { getMouseLocationOnCanvas } from './utility.js';

export default class Paint { // Here we have a class called Paint. This class is exported into app1.js.

    constructor(canvasID) { // Here we use a constructor becouse it has to be used with a class. We set the argument "canvasID" so we can fetch the properties in the file app1.js

        const canvas = document.getElementById(canvasID); // In the HTML we made an id for the canvas element. Here we make a veriable called canvas, and it is fetched using getElementById.
        this.canvas = canvas; // Here we declare that the variable is the canvas, so we can referance the canvas in the code below.
        this.context = canvas.getContext("2d"); // Here we set the context to 2d, it provides the 2D rendering context for the drawing surface of the <canvas> element.

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

        this.canvas.onmousemove = e => this.onMouseMove(e); // MouseMove will execute as well as long as the mouse is down (kind of like dragging)
        document.onmouseup = e => this.onMouseUp(e); // Mouse up will execute and will make everything stop

        this.startPos = getMouseLocationOnCanvas(e, this.canvas); // we make a property called startPos that uses the function getMouseLocation inside utility.js
        console.log(this.startPos); // can be removed, just checking if it works
    }


    // ON MOUSE MOVE
    onMouseMove(e) {
        this.currentPos = getMouseLocationOnCanvas(e, this.canvas); // we make a property called currentPos that uses the function getMouseLocation inside utility.js
        console.log(this.currentPos); // can be removed, just checking if it works

        // DRAWING SHAPES
        switch(this.tool){

            case TOOL_SHAPES_RECTANGLE: // If this tool is selected 
                this.drawShape(); // we call upon the function drawShape and that code will occur.
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


    }
}
