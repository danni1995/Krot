import Point from "./point.model.js";
import Paint from "./paint.class.js";

// This file is only for the bucket tool. Found an algorithm to make the fill happen. Its not the fastest but it works!
export default class Fill { // Name of the class

    constructor(canvas, point, color) {
        this.context = canvas.getContext("2d"); // Here we set the context to 2d, it provides the 2D rendering context for the drawing surface of the <canvas> element.

        this.imageData = this.context.getImageData(0,0, this.context.canvas.width, this.context.canvas.height); // veriable that saves the image data when the bucket is used

        const targetColor = this.getPixel(point); // targetColor is the color that is on the canvas before we use the bucket.

        const fillColor = this.hexToRgba(color); // fillColor is the color we want to replace the targetColor

        this.fillStack = []; // Empty arrray

        this.floodFill(point, targetColor, fillColor); // floodFill has the arguments of point, targetColor and fillColor

        this.fillColor();


    }

    floodFill(point, targetColor, fillColor) { // Here is the floodFill Algorithm that allows up to fill up an area as long as the currentColor and targetColor match. 
        if (this.colorMatch(targetColor, fillColor)) return; // If the same color is on the canvas as the one your trying to fill, return. nothing happens. (example: cant fill something with white if it is already white)

        const currentColor = this.getPixel(point); // currentColor is the same as targetColor. 

        if(this.colorMatch(currentColor, targetColor)) { // If the currentColor and targetColor is the same, then the algorithm will shoot off!
            this.setPixel(point, fillColor); 

            this.fillStack.push([new Point(point.x + 1, point.y), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x - 1, point.y), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x, point.y + 1), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x, point.y - 1), targetColor, fillColor]);

        }
    }

    fillColor() {
        if(this.fillStack.length) { 

            let range = this.fillStack.length; // veriable range is the fillstack lenght

            for(let i = 0; i < range; i++) { // For loop that continues on until i is bigger than fillstack lenght.
                this.floodFill(this.fillStack[i][0], this.fillStack[i][1], this.fillStack[i][2]);
            }

            this.fillStack.splice(0, range); // Then it adds everything into the array ( the emty one above)

            this.fillColor(); 
        } else{
            this.context.putImageData(this.imageData, 0, 0); // Else store image data
            this.fillStack = []; // Reset fillStack to nothing
        }
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

    setPixel(point, fillColor) {
        const offset = (point.y * this.imageData.width + point.x) * 4;

        this.imageData.data[offset + 0] = fillColor[0]; // red
        this.imageData.data[offset + 1] = fillColor[1]; // green
        this.imageData.data[offset + 2] = fillColor[2]; // blue
        this.imageData.data[offset + 3] = fillColor[3]; // alpha
    }

    colorMatch( color1, color2) {
        return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] == color2[2] && color1[3] === color2[3] ;
    }

    hexToRgba(hex) { // This converts from hex (has to be 6 no more no less) to rgba
        console.log(hex);
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); // This converts it
        return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255
        ]
    }
}