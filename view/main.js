let shapes = [];
let selectedShape = null;
let bandera = false;
let selectedText = null;
let isDrawingLine = false;
let lineStartX, lineStartY, lineEndX, lineEndY;

function mousePressed() {
  if (!isDrawingLine) {
    lineStartX = mouseX;
    lineStartY = mouseY;
    isDrawingLine = true;
  }
}
function setup() {
  let canvas = createCanvas(1450, 950);
  canvas.parent("sidebar");
  canvas.mousePressed(canvasMouseClicked);
}
function draw() {
  background(100);
  // Dibujar todas las formas
  for (let shape of shapes) {
    shape.display();
  }
}
function updateSidebar() {
  var height = document.getElementById("height");
  height.addEventListener("input", updateFigureFromInput);
  var width = document.getElementById("width");
  width.addEventListener("input", updateFigureFromInput);
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
  var texto = document.getElementById("texto");
  texto.addEventListener("input", updateFigureFromInput);
  var tamañotexto = document.getElementById("tamañotexto");
  tamañotexto.addEventListener("input", updateFigureFromInput);
  if (selectedShape instanceof Square) {
    let heightInput = selectedShape.height;
    let widthInput = selectedShape.width;
    height.value = heightInput;
    width.value = widthInput;
    bordeTamaño.value = selectedShape.strokeWeight;
    opacidad.value = selectedShape.opacity;
    opacidadBorde.value = selectedShape.opacityBorder;
    fillColor.value = selectedShape.color;
    borderColor.value = selectedShape.borderColor;
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
    let heightInput = selectedShape.height;
    let widthInput = selectedShape.width;
    height.value = heightInput;
    width.value = widthInput;
    bordeTamaño.value = selectedShape.strokeWeight;
    opacidad.value = selectedShape.opacity;
    fillColor.value = selectedShape.color;
    opacidadBorde.value = selectedShape.opacityBorder;
    borderColor.value = selectedShape.borderColor;
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
  if (selectedText instanceof TextShape) {
    y.value = selectedText.y;
    x.value = selectedText.x;
    texto.value = selectedText.textString;
    opacidad.value = selectedText.opacity;
    tamañotexto.value = selectedShape.fontSize;
    if (selectedText.color) {
      let rgb = hexToRgb(selectedText.color);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      color.value = hexColor;
    }
  }
}
// FUNCION PARA ACTUALIZAR LAS FIGURAS DESDE SUS RESPECTIVOS INPUTS
function updateFigureFromInput() {
  if (selectedShape) {
    let xInput = parseFloat(document.getElementById("Xpos").value);
    let yInput = parseFloat(document.getElementById("Ypos").value);
    let height = parseFloat(document.getElementById("height").value);
    let width= parseFloat(document.getElementById("width").value);
    let opacidad = parseFloat(document.getElementById("RellenoOpacidad").value);
    let opacidadBorde = parseFloat(document.getElementById("Bordeopacidad").value);
    let bordeTamaño = parseFloat(document.getElementById("Bordegrosor").value);
    let borderColor = document.getElementById("Bordecolor").value;
    var texto = document.getElementById("texto").value;
    var color = document.getElementById("RellenoColor").value;
    var tamañotexto = document.getElementById("tamañotexto").value;
    if (!isNaN(xInput)) {
      selectedShape.x = xInput;
      selectedShape.textString= texto;
    }
    if (!isNaN(yInput)) {
      selectedShape.y = yInput;
    }
    if (!isNaN(height) && !isNaN(width) && selectedShape instanceof Square) {
      selectedShape.height = height;
      selectedShape.width = width;
    }
    if (!isNaN(height) &&!isNaN(width) && selectedShape instanceof Circle) {
      selectedShape.height = height;
      selectedShape.width = width;
    }
    if (selectedShape instanceof TextShape) {
      selectedText.fontSize = parseFloat(tamañotexto);
      // Cambiado de 'tamañotexto' a 'tamañotexto.value'
      updateSidebar();
      selectedShape.textString = texto;
      updateSidebar();
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
  }
  updateSidebar();
}
class Shape {
  constructor(x, y,width,height, color, opacity, opacityBorder,fontSize) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.opacityBorder = opacityBorder;
    this.opacity = opacity;
    this.strokeWeight = 1;
    this.color = color;
    this.fontSize = fontSize;
    this.borderColor = '#ffffff';
  }
}
class TextShape extends Shape {
  constructor(x, y, textString, color, opacity,fontSize) {
    super(x, y, 0, 0, color, opacity, 0,fontSize);
    this.textString = textString;
    this.fontSize = fontSize;
    this.font = 'Arial';
  }
  display() {
    textSize(this.fontSize);
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    textFont(this.font);
    text(this.textString, this.x, this.y);
  }
  contains(x, y) {
    let textWidth = 20;
    let textHeight = textAscent() + textDescent();
    return (
      x >= this.x &&
      x <= this.x + textWidth &&
      y >= this.y - textAscent() &&
      y <= this.y + textDescent()
    );
  }
}
function addText() {
  // Si no se hizo clic en una forma existente, crear un nuevo texto en la posición del clic
  let textString = prompt("Ingresa el texto:");
   let x = 400;
   let y = 400;
   let fontSize = 310;
   let color = [255, 255, 255];
    let textShape = new TextShape(x, y, textString, color,255, fontSize);
    shapes.push(textShape);
    selectedShape = textShape;
    selectedText = textShape;
    textShape.name = "Texto"; 
    updateElementsList();
}

class Square extends Shape {
  constructor(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder) {
    super(x, y, width, height,color,borderColor, opacity,strokeWeight, opacityBorder);
  }
  display() {
    strokeWeight(this.strokeWeight);
    stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    rect(this.x, this.y, this.width, this.height);
  }
  contains(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
function addSquare() {
  bandera = false;
  let x = 30;
  let y = 40;
  let width = 50; 
  let height = 50; 
  let color = [255, 255, 255];
  let borderColor = '#000000';
  let opacity = 255;
  let opacityBorder = 255;
  let strokeWeight = 1;
  let square = new Square(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder);
  square.name = "Cuadrado"; 
  shapes.push(square);
  updateElementsList();
}
class Circle extends Shape {
  constructor(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder) {
    super(x, y, width, height, color,borderColor, opacity,strokeWeight, opacityBorder);

  }
  display() {
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    strokeWeight(this.strokeWeight);
    stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
    ellipse(this.x, this.y, this.width * 2, this.height * 2);
  }
  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d <= this.height;
  }
}
function addCircle() {
  bandera = false;
  let x = 400;
  let y = 400;
  let width = 50; // Ancho del círculo
  let height = 50; // Altura del círculo
  let opacityBorder = 255;
  let color = [255, 255, 255];
  let borderColor = '#000000';
  let opacity = 255;
  let strokeWeight = 1;
  let circle = new Circle(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder);
  circle.name = "Círculo"; 
  shapes.push(circle);
  updateElementsList();
}
function mouseDragged() {
  updateSidebar();
  if (selectedShape && bandera === true ) {
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
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
function swapShapes(indexA, indexB) {
  // Intercambiar las formas en el arreglo
  let temp = shapes[indexA];
  shapes[indexA] = shapes[indexB];
  shapes[indexB] = temp;
  updateSidebar();
  updateElementsList();
}