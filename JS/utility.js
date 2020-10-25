import Point from './point.model.js'

export function getMouseLocationOnCanvas(e, canvas) { // Fuction that gets the location of the mouse when its on the canvas
    let rect = canvas.getBoundingClientRect(); // rect = getBoundingClientRect. This method returns the size of an element (canvas) and its position relative to the viewport.
    let x = e.clientX - rect.left; // we set x to be e.clientX minus rect left
    let y = e.clientY - rect.top; // we set y to be e.clientY minus rext top
    return new Point(x ,y ); // this function will return a detailed mouse position by going trough the constructor in point.model.js. Why? So we can use this function again and again.
}

// This function calculates the distance between where your mouse is located when down and where it ends when mouse up. (for the circle)
export function findDistance(location1, location2) { // Here is a photo to explain what we are doing: https://imgur.com/a/ADGfZYd

    let exp1 = Math.pow(location2.x - location1.x, 2);
    let exp2 = Math.pow(location2.y - location1.y, 2);

    let distance = Math.sqrt(exp1 + exp2);

    return distance;

}