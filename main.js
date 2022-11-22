const fs = require('fs');
// file name is passed as first argument or default to 'style.css'
// read style.css file to a string
var style = fs.readFileSync(process.argv[2] || 'style.css', 'utf8');

// split the string into an array on a regex match of any hex color
// var colors = style.split(/#[0-9a-f]{3,6,8}/i);
var colors = style.split(/(#[0-9a-f]{3,8})/i);

const invertColor = (hex) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  let alphaPart = '';
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length > 6) {
    console.log(hex);
    alphaPart = hex.substring(6, 8);
    hex = hex.substring(0, 6);
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b) + alphaPart;
};

const padZero = (str, len) => {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
};

// console log the first 20 elements of the array using a for loop
const recolored = colors.map((color, index) => {
  if (color.length > 9 || color[0] !== '#') return color;
  // Invert the color
  const inverted_color = invertColor(color);
  return inverted_color;
});

// turn the array back into a string
const newStyle = recolored.join('');

// write the new string to a new file
fs.writeFileSync('new-style.css', newStyle);
