let shapes = []; 
let selectedShape = null; 
let defaultColor = 'black'; 

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sidebar"); 
  canvas.mousePressed(canvasMouseClicked);
}

function draw() {
  background(220);
  // Dibujar todas las formas
  for (let shape of shapes) {
    shape.display();
  }
}

function updateSidebar() {
  var input = document.getElementById("tamaño");
  input.type = "number";
  input.addEventListener("input", updateFigureFromInput);
  var y = document.getElementById("Ypos");
  y.type = "number";
  y.addEventListener("input", updateFigureFromInput);
  var x = document.getElementById("Xpos");
  x.type = "number";
  x.addEventListener("input", updateFigureFromInput);

  if (selectedShape instanceof Square || selectedShape instanceof Text) {
    let size = selectedShape.size.toFixed(2); 
    let colorText = "Color: " + selectedShape.color;
    input.value = size;
    y.value = selectedShape.y.toFixed(2); 
    x.value = selectedShape.x.toFixed(2);
  }
  if (selectedShape instanceof Circle) {
    var circleRadius = selectedShape.radius.toFixed(2); 
    let colorText = "Color: " + selectedShape.color;
    input.value = circleRadius;
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
    let xInput = document.getElementById("Xpos");
    let yInput = document.getElementById("Ypos");

    if (selectedShape instanceof Square || selectedShape instanceof Text) {
      let size = parseFloat(document.getElementById("tamaño").value);
      if (!isNaN(size)) {
        selectedShape.size = size;
        updateSidebar();
      }
    }
    if (selectedShape instanceof Circle) {
      let radius = parseFloat(document.getElementById("tamaño").value);
      if (!isNaN(radius)) {
        selectedShape.radius = radius;
        updateSidebar();
      }
    }
    xInput.value = selectedShape.x.toFixed(2);
    yInput.value = selectedShape.y.toFixed(2);
  }
}

class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

class Square extends Shape {
  constructor(x, y, size, color) {
    super(x, y, color);
    this.size = size;
  }

  display() {
    stroke(this.color);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
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
  constructor(x, y, radius, color) {
    super(x, y, color);
    this.radius = radius;
  }

  display() {
    stroke(this.color);
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d <= this.radius;
  }
}

function mouseDragged() {
  // Mover la forma seleccionada con el mouse
  if (selectedShape) {
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
  }
}

function addSquare() {
  let x = 30;
  let y = 40;
  let size = 50;
  let color = defaultColor;
  let square = new Square(x, y, size, color);
  shapes.push(square);
}

function addCircle() {
  let x = random(width);
  let y = random(height);
  let radius = random(25, 50);
  let color = defaultColor;
  let circle = new Circle(x, y, radius, color);
  shapes.push(circle);
}

function addText() {
  let x = 50;
  let y = 60;
  let color = defaultColor;
  let textString = prompt("Ingresa un texto: ");
  let textObj = new TextObj(x, y, textString, color);
  shapes.push(textObj);
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
    return false;
  }
}

