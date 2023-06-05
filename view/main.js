let shapes = [];
let selectedShape = null;
let bandera = false;
let selectedText = null;
let lineStartX, lineStartY, lineEndX, lineEndY;
let isDrawingSquare = false;
let isDrawingCircle = false;
let isDrawingLine = false;
let circle = null;
let line = null;

function deselectShape() {
  selectedShape = null;
  updateSidebar();

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
  var cornerRadius = document.getElementById("cornerRadius");
  cornerRadius.addEventListener("input", updateFigureFromInput);

  width.value ="";
  height.value="";
  bordeTamaño.value ="";
  opacidad.value = "";
  fillColor.value = "";
  opacidadBorde.value = "";
  borderColor.value = "";
  y.value = "";
  x.value = "";
  cornerRadius.value = "";
  texto.value = "";
  tamañotexto.value = "";
}
function mouseClicked() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // Verificar si se hizo clic en alguna forma existente
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (shapes[i].contains(mouseX, mouseY)) {
        selectedShape = shapes[i];
        selectedText = null; // Reiniciar el objeto de texto seleccionado
        updateSidebar();
        break;
      }
      if (shapes[i] instanceof TextShape && shapes[i].contains(mouseX, mouseY)) {
        selectedShape = null; // Reiniciar la forma seleccionada
        selectedText = shapes[i];
        updateSidebar();
        break;
      }
    }

    // Verificar si no se hizo clic en ninguna forma y se está arrastrando el mouse
    if (!selectedShape && !selectedText && isDrawingLine === true && isDrawingSquare === true) {
      lineEndX = mouseX;
      lineEndY = mouseY;
  
      if (isDrawingSquare) {
        let x = lineStartX;
        let y = lineStartY;
        let width = lineEndX - lineStartX;
        let height = lineEndY - lineStartY;
        let color = [255, 255, 255];
        let borderColor = [0, 0, 0];
        let opacity = 255;
        let strokeWeight = 1;
        let cornerRadius = 1;
        let cuadrado = new Square(x, y, width, height, color, borderColor, opacity, strokeWeight, opacity, cornerRadius);
        cuadrado.name = "Cuadrado";
  
        shapes.push(cuadrado);
        cuadrado.display(); // Llamar a la función display() para dibujar el cuadrado en el lienzo
        updateElementsList();
      }
  
      if (isDrawingCircle) {
        let radius = dist(lineStartX, lineStartY, lineEndX, lineEndY) / 2;
        let x = lineStartX + radius;
        let y = lineStartY + radius;
        let color = [255, 255, 255];
        let borderColor = [0, 0, 0];
        let opacity = 255;
        let strokeWeight = 1;
        let circle = new Circle(x, y, radius, radius, color, borderColor, opacity, strokeWeight, opacity);
        circle.name = "Círculo";

        shapes.push(circle);
        circle.display(); // Llamar a la función display() para dibujar el círculo en el lienzo
        updateElementsList();
      }
      if (isDrawingLine) {
        lineEndX = mouseX;
        lineEndY = mouseY;
        isDrawingLine = false;
  
        let color = [0, 0, 0];
        let borderColor = [0, 0, 0];
        let opacity = 255;
        let strokeWeight = 1;
  
        let linea = new Linea(lineStartX, lineStartY, lineEndX, lineEndY, color, borderColor, opacity, strokeWeight);
        shapes.push(linea);
        linea.display(); // Llamar a la función display() para dibujar la línea en el lienzo
        updateElementsList();
      }
    }

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
  var cornerRadius = document.getElementById("cornerRadius");
  cornerRadius.addEventListener("input", updateFigureFromInput);
  
  if (selectedShape instanceof Square) {
    let heightInput = selectedShape.height;
    let widthInput = selectedShape.width;
    cornerRadius.value = selectedShape.cornerRadius;
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
  if (selectedShape instanceof TextShape) {
    y.value = selectedShape.y;
    x.value = selectedShape.x;
    texto.value = selectedShape.textString;
    opacidad.value = selectedShape.opacity;
    tamañotexto.value = selectedShape.fontSize;
    if (selectedShape.color) {
      let rgb = hexToRgb(selectedShape.color);
      let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
      color.value = hexColor;
    }
  }
}
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
    let cornerRadius = parseFloat(document.getElementById("cornerRadius").value);
    if (!isNaN(cornerRadius)) {
      selectedShape.cornerRadius = cornerRadius;
    }
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

      selectedShape.fontSize = parseFloat(tamañotexto); 
      selectedShape.textString = texto;
      if (color) {
        let rgb = hexToRgb(color);
        selectedShape.color = [rgb.r, rgb.g, rgb.b];
      }
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
  constructor(x, y,width,height, color, opacity, opacityBorder,fontSize,cornerRadius) {
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
    this.cornerRadius = 1;
  }
}
class Square extends Shape {
  constructor(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder, cornerRadius) {
    super(x, y, width, height, color, opacity, opacityBorder,cornerRadius);
    this.borderColor = borderColor;
    this.strokeWeight = strokeWeight;
  }

  display() {
    strokeWeight(this.strokeWeight);
    stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
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
class TextShape extends Shape {
  constructor(x, y, textString, color, opacity,fontSize) {
    super(x, y, 0, 0, color, opacity, 0,fontSize);
    this.textString = textString;
    this.fontSize = fontSize;
    this.font = 'Arial';
  }
  display() {
    textSize(this.fontSize);
    noStroke();
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
   let color = [0, 0, 0];
    let textShape = new TextShape(x, y, textString, color,255, fontSize);
    selectedShape = textShape;
    selectedText = textShape;
    textShape.name = "Texto"; 
    shapes.push(textShape);
    updateElementsList();
}
class Circle extends Shape {
  constructor(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder) {
    super(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder);
  }
  
  display() {
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    strokeWeight(this.strokeWeight);
    stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
    ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height);
  }
  
  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d <= this.height;
  }
}

class Linea extends Shape {
  constructor(x1, y1, x2, y2, color, borderColor, opacity, strokeWeight, opacityBorder) {
    super(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1), color, opacity, opacityBorder, 0, 0);
    this.startX = x1;
    this.startY = y1;
    this.endX = x2;
    this.endY = y2;
    this.borderColor = borderColor;
    this.strokeWeight = strokeWeight;
  }

  display() {
    strokeWeight(this.strokeWeight);
    stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacity);
    //line(this.startX, this.startY, this.endX, this.endY);
  }

  contains(x, y) {
    return false;
  }
}

function mouseDragged() {
  updateSidebar();
  
  if (selectedShape && bandera === true && isDrawingSquare === false) {
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
  }
  
  if (isDrawingSquare === true ) {
    if (shapes.length === 0 || !(shapes[shapes.length - 1] instanceof Square)) {
      let squareWidth = mouseX - lineStartX;
      let squareHeight = mouseY - lineStartY;
      let square = new Square(lineStartX, lineStartY, squareWidth, squareHeight, [255, 255, 255], [0, 0, 0], 255, 1, 255, 0);
      square.name = "Cuadrado";
      shapes.push(square);
      selectedShape = square;
      updateElementsList();
    }
  }
  
  if (isDrawingCircle && circle) {
    let radius = dist(lineStartX, lineStartY, mouseX, mouseY) / 2;
    let x = lineStartX + radius;
    let y = lineStartY + radius;
    circle.x = x;
    circle.y = y;
    circle.width = radius;
    circle.height = radius;
    updateElementsList();
  }

  if (isDrawingLine && line) {
    line.endX = mouseX;
    line.endY = mouseY;
  }
}

function draw() {
  background(100);
  if (isDrawingSquare && square) {
    let squareWidth = mouseX - lineStartX;
    let squareHeight = mouseY - lineStartY;
    square.width = squareWidth;
    square.height = squareHeight;
    square.display();
  }
  
  if (isDrawingCircle && circle) {
    let circleRadius = dist(lineStartX, lineStartY, mouseX, mouseY) / 2;
    let circleX = lineStartX;
    let circleY = lineStartY;
    circle.x = circleX;
    circle.y = circleY;
    circle.radius = circleRadius;
    circle.display();
  }
  
  for (let shape of shapes) {
    if (shape instanceof Linea) {
      strokeWeight(shape.strokeWeight);
      stroke(shape.borderColor[0], shape.borderColor[1], shape.borderColor[2], shape.opacity);
      line(shape.startX, shape.startY, shape.endX, shape.endY);
    } else {
      shape.display();
    }
  }
}

function pintarLineas() {
  bandera = false;
  isDrawingSquare = false;
  isDrawingCircle = false;
  isDrawingLine = true;
  selectedShape = null;
  updateElementsList();
}

function pintarCuadrados() {
  bandera = false;
  isDrawingSquare = true;
  isDrawingCircle = false;
  isDrawingLine = false;
}

function pintarCirculos() {
  bandera = false;
  isDrawingSquare = false;
  isDrawingCircle = true;
  isDrawingLine = false;
}

function seleccionar() {
  bandera = true;
  isDrawingSquare = false;
  isDrawingCircle = false;
  isDrawingLine = false;
}

function mousePressed() {
  if (isDrawingSquare === true) {
    lineStartX = mouseX;
    lineStartY = mouseY;
    square = new Square(lineStartX, lineStartY, 0, 0, [255, 255, 255], [0, 0, 0], 255, 1, 255, 0);
    square.name = "Cuadrado";
    shapes.push(square);
    updateElementsList();
  }
  
  if (isDrawingCircle === true) {
    lineStartX = mouseX;
    lineStartY = mouseY;
    let circleRadius = dist(lineStartX, lineStartY, mouseX, mouseY);
    circle = new Circle(lineStartX, lineStartY, circleRadius, 0, [255, 255, 255], [0, 0, 0], 255, 1, 255, 0);
    circle.name = "Circulo";
    shapes.push(circle);
    updateElementsList();
  }
  
  if (isDrawingLine === true) {
    lineStartX = mouseX;
    lineStartY = mouseY;
    line = new Linea(lineStartX, lineStartY, mouseX, mouseY, [0, 0, 0], [0, 0, 0], 255, 1, 255, 0);
    line.name = "Línea";
    shapes.push(line);
    selectedShape = line;
    updateElementsList();
  }
}

function mouseReleased() {
  isDrawingSquare = false;
  isDrawingCircle = false;
  isDrawingLine = false;
  square = null;
  circle = null;
  line = null;
}

function setup() {
  let canvas = createCanvas(1450, 950);
  canvas.parent("sidebar");
  canvas.mousePressed(canvasMouseClicked);
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
       return; // Salir de la función para evitar deseleccionar la forma
     }
     if (shapes[i] instanceof Text && shapes[i].contains(mouseX, mouseY)) {
       selectedShape = null; // Reiniciar la forma seleccionada
       selectedText = shapes[i];
       updateSidebar();
       return; // Salir de la función para evitar deseleccionar la forma
     }
   }
 }

 // Si no se hizo clic en ninguna forma, deseleccionar la forma actual
 deselectShape();
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
function Eliminar() {
  // Verificar si se presionó la tecla "d" para eliminar la forma seleccionada
  if (selectedShape) {
    let index = shapes.indexOf(selectedShape);
    shapes.splice(index, 1);
    selectedShape = null;
    updateSidebar();
    updateElementsList();
    deselectShape();
  }
}
function moveShapeDown() {
  // Verificar si hay una forma seleccionada
  if (selectedShape) {
    let index = shapes.indexOf(selectedShape);
    if (index < shapes.length - 1) {
      swapShapes(index, index + 1);
    }
  }
}
function moveShapeUp() {
  // Verificar si hay una forma seleccionada
  if (selectedShape) {
    let index = shapes.indexOf(selectedShape);
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
