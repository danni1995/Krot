import Point from './point.model.js'

export function getMouseLocationOnCanvas(e, canvas) { // Fuction that gets the location of the mouse when its on the canvas
    let rect = canvas.getBoundingClientRect(); // rect = getBoundingClientRect. This method returns the size of an element (canvas) and its position relative to the viewport.
    let x = e.clientX - rect.left; // we set x to be e.clientX minus rect left
    let y = e.clientY - rect.top; // we set y to be e.clientY minus rext top
    return new Point(x ,y ); // this function will return a detailed mouse position by going trough the constructor in point.model.js. Why? So we can use this function again and again.
}