let shapes = [];
let selectedShape = null;
let defaultColor = 'blue';
let bandera = false;
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sidebar");
  canvas.mousePressed(canvasMouseClicked);
}
function seleccionar() {
  bandera = true;
}
function Eliminar() {
  // Verificar si se presionó la tecla "d" para eliminar la forma seleccionada
  if (selectedShape) {
    let index = shapes.indexOf(selectedShape);
    shapes.splice(index, 1);
    selectedShape = null;
    updateSidebar();
  }
}
function draw() {
  updateSidebar();
  background(220);
  // Dibujar todas las formas
  for (let shape of shapes) {
    shape.display();
  }
}
function hexToRgb(color) {
  if (typeof color === 'string' && color.startsWith('#')) {
    // Eliminar el símbolo "#" si está presente
    color = color.substring(1);
    // Convertir a valores RGB
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    return { r, g, b };
  } else if (Array.isArray(color) && color.length === 3) {
    // El color ya está en formato RGB
    let r = color[0];
    let g = color[1];
    let b = color[2];
    return { r, g, b };
  } else {
    // Formato de color no válido
    return null;
  }
}
function rgbToHex(r, g, b) {
  // Convierte los valores RGB a formato hexadecimal (#rrggbb)
  let hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return hex;
}
function componentToHex(c) {
  // Convierte un componente de color decimal a formato hexadecimal
  let hex = c.toString(16).padStart(2, "0");
  return hex;
}
function updateSidebar() {
  var input = document.getElementById("tamaño");
  input.addEventListener("input", updateFigureFromInput);
  var y = document.getElementById("Ypos");
  y.addEventListener("input", updateFigureFromInput);
  var x = document.getElementById("Xpos");
  x.addEventListener("input", updateFigureFromInput);
  var fillColor = document.getElementById("RellenoColor");
  fillColor.addEventListener("input", updateFigureFromInput);
  var opacidad= document.getElementById("RellenoOpacidad");
  opacidad.addEventListener("input", updateFigureFromInput);
  var bordeTamaño = document.getElementById("Bordegrosor");
  bordeTamaño.addEventListener("input", updateFigureFromInput);
  var borderColor = document.getElementById("Bordecolor");
  borderColor.addEventListener("input", updateFigureFromInput);
  if (selectedShape instanceof Square) {
    let size = selectedShape.size;
    bordeTamaño.value= selectedShape.strokeWeight;
    opacidad.value = selectedShape.opacity;
    fillColor.value = selectedShape.color;
    borderColor.value = selectedShape.borderColor;
    input.value = size;
    y.value = selectedShape.y;
    x.value = selectedShape.x;
    if (selectedShape.color) {
      let rgb = hexToRgb(selectedShape.color);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      fillColor.value = hexColor;
    }
  }
  if (selectedShape instanceof Circle) {
    bordeTamaño.value= selectedShape.strokeWeight;
    opacidad.value = selectedShape.opacity;
    fillColor.value = selectedShape.color;
    borderColor.value = selectedShape.borderColor;
    input.value = selectedShape.radius;
    y.value = selectedShape.y;
    x.value = selectedShape.x;
    if (selectedShape.color) {
      let rgb = hexToRgb(selectedShape.color);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      fillColor.value = hexColor;
    }
  }
  if (selectedShape instanceof Text) {
    let size = selectedShape.size.toFixed(2);
    let colorText = selectedShape.color;
    input.value = size;
    y.value = selectedShape.y.toFixed(2);
    x.value = selectedShape.x.toFixed(2);
  }
}
function canvasMouseClicked() {
  // Verificar si se hizo clic dentro del lienzo
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // Verificar si se hizo clic en alguna forma
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (shapes[i].contains(mouseX, mouseY)) {
        selectedShape = shapes[i];
        updateSidebar();
        break;
      }
    }
  }
}
// Función para actualizar la figura desde el input
function updateFigureFromInput() {
  if (selectedShape) {
    let xInput = parseFloat(document.getElementById("Xpos").value);
    let yInput = parseFloat(document.getElementById("Ypos").value);
    let size = parseFloat(document.getElementById("tamaño").value);
    let opacidad = parseFloat(document.getElementById("RellenoOpacidad").value);
    let bordeTamaño = parseFloat(document.getElementById("Bordegrosor").value);
    let borderColor = document.getElementById("Bordecolor").value;
    var color = document.getElementById("RellenoColor").value;
    if (!isNaN(xInput)) {
      selectedShape.x = xInput;
    }
    if (!isNaN(yInput)) {
      selectedShape.y = yInput;
    }
    if (!isNaN(size) && selectedShape instanceof Square) {
      selectedShape.size = size;
    }
    if (!isNaN(size) && selectedShape instanceof Circle) {
      selectedShape.radius = size ;
    }
    if (!isNaN(opacidad)) {
      selectedShape.opacity = opacidad;
    }
    if (!isNaN(bordeTamaño)) {
      selectedShape.strokeWeight = bordeTamaño;
    }
    if (color) {
      let rgb = hexToRgb(color);
      selectedShape.color = [rgb.r, rgb.g, rgb.b];
    }
    if (borderColor) {
      selectedShape.borderColor = borderColor;
    }
  }
  updateSidebar();
}
class Shape {
  constructor(x, y, color,opacity) {
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.strokeWeight = 1;
    this.color = color;
    this.borderColor = '#ffffff';
  }
}
class Square extends Shape {
  constructor(x, y, size, color, borderColor, opacity, strokeWeight) {
    super(x, y, color, opacity);
    this.size = size;
    this.borderColor = borderColor;
    this.strokeWeight = strokeWeight;
  }
  display() {
    strokeWeight(this.strokeWeight); // Aplicar el grosor del borde
    stroke(this.borderColor);
    fill(this.color[0], this.color[1], this.color[2], this.opacity); // Utiliza RGBA para el relleno
    rect(this.x, this.y, this.size);
  }
  contains(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.size &&
      y >= this.y &&
      y <= this.y + this.size
    );
  }
}
class Circle extends Shape {
  constructor(x, y, radius, color, borderColor, opacity, strokeWeight) {
    super(x, y, color, opacity);
    this.radius = radius;
    this.borderColor = borderColor;
    this.strokeWeight = strokeWeight;
  }
  display() {
    fill(this.color[0], this.color[1], this.color[2], this.opacity); // Utiliza RGBA para el relleno
    strokeWeight(this.strokeWeight); // Aplicar el grosor del borde
    stroke(this.borderColor);
    ellipse(this.x, this.y, this.radius * 2);
  }
  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d <= this.radius;
  }
}
function mouseDragged() {
  // Mover la forma seleccionada con el mouse
  if (selectedShape && bandera === true && mouseX <= 400 - selectedShape.size && mouseY <= 400 - selectedShape.size &&  mouseY >= 0 ) {
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
  }
  if (selectedShape && bandera === true && mouseX <= 400 - selectedShape.radius && mouseY <= 400 - selectedShape.radius &&  mouseY >= 0 + selectedShape.radius  &&  mouseX >= 0 + selectedShape.radius ) {
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
  }
}
function addSquare() {
  bandera = false;
  let x = 30;
  let y = 40;
  let size = 50;
  let color =  [255, 255, 255];
  let borderColor = '#000000';
  let opacity = 255; 
  let strokeWeight = 1; 
  let square = new Square(x, y, size, color, borderColor, opacity, strokeWeight);
  shapes.push(square);
}
function addCircle() {
  bandera = false;
  let x = 100;
  let y = 100;
  let radius = 50;
  let color =[255, 255, 255];
  let borderColor ='#000000';
  let opacity = 255; 
  let strokeWeight = 1; 
  let circle = new Circle(x, y, radius, color, borderColor, opacity, strokeWeight);
  shapes.push(circle);
}
function addText() {
  let x = 50;
  let y = 60;
  let color = defaultColor;
  let textString = prompt("Ingresa un texto: ");
  let textObj = new TextObj(x, y, textString, color);
  shapes.push(textObj);
  bandera = false;
}
class TextObj extends Shape {
  constructor(x, y, textString, color) {
    super(x, y, color);
    this.textString = textString;
  }
  display() {
    fill(this.color);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.textString, this.x, this.y);
  }
  contains(x, y) {
  }
}
