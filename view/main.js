let shapes = [];
let selectedShape = null;
let bandera = false;
let selectedText = null;
let isDrawingLine = false;
let lineStartX, lineStartY, lineEndX, lineEndY;

function moveShapeUp() {
  // Verificar si hay una forma seleccionada
  if (selectedShape) {
    let index = shapes.indexOf(selectedShape);
    // Mover la forma hacia arriba intercambiándola con la forma anterior en el arreglo
    if (index > 0) {
      swapShapes(index, index - 1);
    }
  }
}
function mousePressed() {
  if (!isDrawingLine) {
    lineStartX = mouseX;
    lineStartY = mouseY;
    isDrawingLine = true;
  }
}
function moveShapeDown() {
  // Verificar si hay una forma seleccionada
  if (selectedShape) {
    let index = shapes.indexOf(selectedShape);
    // Mover la forma hacia abajo intercambiándola con la forma siguiente en el arreglo
    if (index < shapes.length - 1) {
      swapShapes(index, index + 1);
    }
  }
}
function swapShapes(indexA, indexB) {
  // Intercambiar las formas en el arreglo
  let temp = shapes[indexA];
  shapes[indexA] = shapes[indexB];
  shapes[indexB] = temp;
  updateSidebar();
  updateElementsList();
}
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
    updateElementsList();
  }
}
function draw() {
  background(100);
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
function updateElementsList() {
  var i= 0;
  var sidebarElements = document.getElementById("sidebar-elements");
  sidebarElements.innerHTML = ""; // Limpiar la lista de elementos existente
  var ul = document.createElement("ul");
  for (let shape of shapes) {
    i++;
    var li = document.createElement("li");
    li.textContent = shape.name + " "+ i;
    ul.appendChild(li);
  }
  sidebarElements.appendChild(ul);
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
  var opacidad = document.getElementById("RellenoOpacidad");
  opacidad.addEventListener("input", updateFigureFromInput);
  var bordeTamaño = document.getElementById("Bordegrosor");
  bordeTamaño.addEventListener("input", updateFigureFromInput);
  var borderColor = document.getElementById("Bordecolor");
  borderColor.addEventListener("input", updateFigureFromInput);
  var opacidadBorde = document.getElementById("Bordeopacidad");
  opacidadBorde.addEventListener("input", updateFigureFromInput);

  if (selectedShape instanceof Square) {
    let size = selectedShape.size;
    bordeTamaño.value = selectedShape.strokeWeight;
    opacidad.value = selectedShape.opacity;
    opacidadBorde.value = selectedShape.opacityBorder;
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
    if (selectedShape.borderColor) {
      let rgb = hexToRgb(selectedShape.borderColor);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      borderColor.value = hexColor;
    }
  }
  if (selectedShape instanceof Circle) {
    bordeTamaño.value = selectedShape.strokeWeight;
    opacidad.value = selectedShape.opacity;
    fillColor.value = selectedShape.color;
    opacidadBorde.value = selectedShape.opacityBorder;
    borderColor.value = selectedShape.borderColor;
    input.value = selectedShape.radius;
    y.value = selectedShape.y;
    x.value = selectedShape.x;
    if (selectedShape.color) {
      let rgb = hexToRgb(selectedShape.color);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      fillColor.value = hexColor;
    }
    if (selectedShape.borderColor) {
      let rgb = hexToRgb(selectedShape.borderColor);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      borderColor.value = hexColor;
    }
  }
  if (selectedShape instanceof Text) {
    input.value = selectedShape.textString;
    let size = selectedShape.size.toFixed(2);
    if (selectedShape.color) {
      let rgb = hexToRgb(selectedShape.color);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      fillColor.value = hexColor;
    }
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
        selectedText = null; // Reiniciar el objeto de texto seleccionado
        updateSidebar();
        break;
      }

      if (shapes[i] instanceof Text && shapes[i].contains(mouseX, mouseY)) {
        selectedShape = null; // Reiniciar la forma seleccionada
        selectedText = shapes[i];
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
    let texto = parseFloat(document.getElementById("texto").value);
    let opacidad = parseFloat(document.getElementById("RellenoOpacidad").value);
    let opacidadBorde = parseFloat(document.getElementById("Bordeopacidad").value);
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
      selectedShape.radius = size;
    }

    if (selectedShape instanceof Text) {
      selectedShape.textString = texto.value;
      selectedText.color = texto.value;
    }
    if (!isNaN(opacidad)) {
      selectedShape.opacity = opacidad;
    }
    if (!isNaN(opacidadBorde)) {
      selectedShape.opacityBorder = opacidadBorde;
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
      let rgb = hexToRgb(borderColor);
      selectedShape.borderColor = [rgb.r, rgb.g, rgb.b];
    }
    if (selectedText) {

    }
  }
  updateSidebar();
}
class Shape {
  constructor(x, y, color, opacity, opacityBorder) {
    this.x = x;
    this.y = y;
    this.opacityBorder = opacityBorder;
    this.opacity = opacity;
    this.strokeWeight = 1;
    this.color = color;
    this.borderColor = '#ffffff';
  }
}

function mouseDragged() {
  updateSidebar();
  // Mover la forma seleccionada con el mouse
  if (selectedShape && bandera === true && mouseX <= 400 - selectedShape.size && mouseY <= 400 - selectedShape.size && mouseY >= 0) {
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
    if (selectedShape instanceof TextObj) {
      selectedText = true;
      selectedShape.x = mouseX;
      selectedShape.y = mouseY;
    }
  }
  if (selectedText && bandera === true) {
    selectedText.x = mouseX;
    selectedText.y = mouseY;
  }

  if (selectedShape && bandera === true && mouseX <= 400 - selectedShape.radius && mouseY <= 400 - selectedShape.radius && mouseY >= 0 + selectedShape.radius && mouseX >= 0 + selectedShape.radius) {
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
    if (selectedShape instanceof TextObj) {
      selectedShape.x = mouseX;
      selectedShape.y = mouseY;
    }
  }
}

class Square extends Shape {
  constructor(x, y, size, color, borderColor, opacity, strokeWeight, opacityBorder) {
    super(x, y, color, opacity, opacityBorder);
    this.size = size;
    this.borderColor = borderColor;
    this.strokeWeight = strokeWeight;
  }
  display() {
    strokeWeight(this.strokeWeight); // Aplicar el grosor del borde
    stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
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
function addSquare() {
  bandera = false;
  let x = 30;
  let y = 40;
  let size = 50;
  let color = [255, 255, 255];
  let borderColor = '#000000';
  let opacity = 255;
  let opacityBorder = 255;
  let strokeWeight = 1;
  let square = new Square(x, y, size, color, borderColor, opacity, strokeWeight, opacityBorder);
  square.name = "Cuadrado"; 
  shapes.push(square);
  
  updateElementsList();
}

class Circle extends Shape {
  constructor(x, y, radius, color, borderColor, opacity, strokeWeight, opacityBorder) {
    super(x, y, color, opacity, opacityBorder);
    this.radius = radius;
    this.borderColor = borderColor;
    this.strokeWeight = strokeWeight;
  }
  display() {
    fill(this.color[0], this.color[1], this.color[2], this.opacity); // Utiliza RGBA para el relleno
    strokeWeight(this.strokeWeight); // Aplicar el grosor del borde
    stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
    ellipse(this.x, this.y, this.radius * 2);
  }
  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d <= this.radius;
  }
}
function addCircle() {
  bandera = false;
  let x = 100;
  let y = 100;
  let radius = 50;
  let opacityBorder = 255;
  let color = [255, 255, 255];
  let borderColor = '#000000';
  let opacity = 255;
  let strokeWeight = 1;
  let circle = new Circle(x, y, radius, color, borderColor, opacity, strokeWeight,opacityBorder);
  circle.name = "Circulo"; 
  shapes.push(circle);
  updateElementsList();
}
class TextObj extends Shape {
  constructor(x, y, textString, color) {
    super(x, y, color);
    this.textString = textString;
  }
  display() {
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    textSize(20);
    text(this.textString, this.x, this.y);
  }
  contains(x, y) {
  }
}
function addText() {
  let x = 50;
  let y = 60;
  let color = [255, 255, 255];
  let textString = prompt("Ingresa un texto: ");
  let textObj = new TextObj(x, y, textString, color);
  shapes.push(textObj);
  bandera = false;
}
