export default class Paint {

    constructor(canvasID) {

        this.canvas = document.getElementById(canvasID);
        this.context = canvas.getContext("2d");
        
    }

    set activeTool(tool) {
        this.tool = tool;
        console.log(this.tool);
    }

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e) {

        this.canvas.onmousedown = e => this.onMouseDown(e);
        document.onmouseup = e => this.onMouseUp(e);

        console.log(e.clientX, e.clientY);
    }

    onMouseMove(e) {
        console.log(e.clientX, e.clientY);
    }

    onMouseUp(e) {
        this.canvas.onmousedown = null;
        document.onmouseup = null;
    }
}
