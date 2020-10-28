import {getMouseLocationOnCanvas} from "./utility.js";

export default class Eyedropper {
  

constructor(){

  var canvas = document.getElementById('my-canvas').getContext('2d');

  // create an image object and get it’s source
  var img = new Image();
  img.src = 'image.jpg';



var loc = getMouseLocationOnCanvas();


  // convert RGB to HEX
  var hex = rgbToHex(R,G,B);
  // getting image data and RGB values
  var img_data = canvas.getImageData(x, y, 1, 1).data;
  var R = img_data[0];
  var G = img_data[1];
  var B = img_data[2];  var rgb = R + ',' + G + ',' + B;

  // making the color the value of the input
  $('#rgb input').val(rgb);
  $('#hex input').val('#' + hex);




}


}


