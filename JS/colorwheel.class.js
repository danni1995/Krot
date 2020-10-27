import {getMouseLocationOnCanvas} from "./utility.js";

export default class ColorWheel {

    constructor(callback) {

        this.canvas = document.getElementById("colorwheel");
        this.context = this.canvas.getContext("2d");

        this.imageData = this.context.getImageData(0,0, this.context.canvas.width, this.context.canvas.height);

        this.callback = callback;

        this.init();
        
    }

    init() {

        var image = new Image();
        image.onload = () => {
            this.context.drawImage(image, 0, 0, 300, 300);
            this.imageData = this.context.getImageData(0,0, this.context.canvas.width, this.context.canvas.height);
        }

        image.src = "/Toolbar/Icons/color-wheel-big-boy.png"; 

        this.canvas.addEventListener("mousemove", (e) => {
            const point = getMouseLocationOnCanvas(e, this.canvas);
            const pixel = this.getPixel(point);
            this.callback(pixel);
        });

        this.canvas.addEventListener("click", (e) => {
            document.querySelector(".color-wheel").style.display = "none";
        })


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