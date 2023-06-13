window.addEventListener("load", (event) => {
    

    console.log("page is fully loaded");
    // Obtener la URL actual
    const url = window.location.href;
    // Encontrar la posición del signo de igual "=" en la URL
    const igualIndex = url.indexOf("=");
    // Obtener el ID a partir del signo de igual "=" utilizando substring
    const idProyecto = url.substring(igualIndex + 1);
    console.log(idProyecto);

    // Crear un objeto FormData y agregar el ID del proyecto
    const formData = new FormData();
    formData.append('id_proyecto', idProyecto);
    // Realizar una solicitud AJAX utilizando fetch
    fetch('obteneridproyecto.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error al guardar el proyecto.');
            }
        })
        .then(data => {
            console.log(data); // Mensaje de respuesta del servidor
        })
        .catch(error => {
            console.log(error); // Mensaje de error en caso de fallo en la solicitud
        });
});

let shapes = [];
let selectedShape = null;
let bandera = false;
let selectedText = null;
let isDrawingSquare = false;
let isDrawingCircle = false;
let isDrawingLine = false;
let circle = null;
let line = null;
let validar = true;
let id = 0;
let lineStartX, lineStartY, endX, endY;



function setup() {
    let canvas = createCanvas(1450, 950);
    canvas.parent("sidebar");
    canvas.mousePressed(canvasMouseClicked);
    obtenerFiguras();
   
}
function draw() {

    background(100);
    // Dibujar todas las formas
    // console.log(shapes);
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

    if (isDrawingLine && linea) {
        linea.x2 = mouseX;
        linea.y2 = mouseY;
        updateElementsList();
    }

    for (let shape of shapes) {

        shape.display();
    }
}
function deselectShape() {

    selectedShape = null;
    updateSidebar();
    document.getElementById("medidas").style.display = "none";
    document.getElementById("TEXTO").style.display = "none";
    document.getElementById("CUADRADO").style.display = "none";
    document.getElementById("FIGURA1").style.display = "none";
    document.getElementById("FIGURA2").style.display = "none";
    document.getElementById("FIGURA3").style.display = "none";
    document.getElementById("FIGURA4").style.display = "none";
    document.getElementById("TEXTO").style.display = "none";
    document.getElementById("xinput").style.display = "none";
    document.getElementById("yinput").style.display = "none";

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

    width.value = "";
    height.value = "";
    bordeTamaño.value = "";
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
        if (!selectedShape && !selectedText && !isDrawingLine && isDrawingSquare === true) {
            lineEndX = mouseX;
            lineEndY = mouseY;
        }
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
            let opacityBorder = 255;
            let strokeWeight = 1;
            let circle = new Circle(x, y, radius, radius, color, borderColor, opacity, strokeWeight, opacityBorder);
            circle.name = "Círculo";

            shapes.push(circle);
            circle.display(); // Llamar a la función display() para dibujar el círculo en el lienzo
            updateElementsList();
        }
        if (isDrawingLine) {
            lineEndX = mouseX;
            lineEndY = mouseY;
            let borderColor = [0, 0, 0];
            let opacityBorder = 255;
            let strokeWeight = 10;
            let linea = new Linea(lineStartX, lineStartY, lineEndX, lineEndY, borderColor, opacityBorder, strokeWeight);
            shapes.push(linea);
            LINEA.name = "Linea";
            linea.display(); // Llamar a la función display() para dibujar la línea en el lienzo
            updateElementsList();
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

    if (selectedShape instanceof Square && bandera === true) {
        document.getElementById("medidas").style.display = "block";
        document.getElementById("xinput").style.display = "block";
        document.getElementById("yinput").style.display = "block";
        document.getElementById("CUADRADO").style.display = "block";
        document.getElementById("TEXTO").style.display = "none";
        document.getElementById("FIGURA1").style.display = "block";
        document.getElementById("FIGURA2").style.display = "block";
        document.getElementById("FIGURA3").style.display = "block";
        document.getElementById("FIGURA4").style.display = "block";
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
    if (selectedShape instanceof Circle && bandera === true) {
        document.getElementById("medidas").style.display = "block";
        document.getElementById("TEXTO").style.display = "none";
        document.getElementById("CUADRADO").style.display = "none";
        document.getElementById("xinput").style.display = "block";
        document.getElementById("yinput").style.display = "block";
        document.getElementById("FIGURA1").style.display = "block";
        document.getElementById("FIGURA2").style.display = "block";
        document.getElementById("FIGURA3").style.display = "block";
        document.getElementById("FIGURA4").style.display = "block";
        let heightInput = selectedShape.height;
        let widthInput = selectedShape.width;
        height.value = heightInput;
        width.value = widthInput;
        bordeTamaño.value = selectedShape.strokeWeight;
        opacidad.value = selectedShape.opacity;
        fillColor.value = selectedShape.color;
        opacidadBorde.value = selectedShape.opacityBorder;
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
    if (selectedShape instanceof TextShape && bandera === true) {
        document.getElementById("medidas").style.display = "block";
        document.getElementById("FIGURA1").style.display = "none";
        document.getElementById("FIGURA2").style.display = "none";
        document.getElementById("FIGURA3").style.display = "none";
        document.getElementById("FIGURA4").style.display = "block";
        document.getElementById("CUADRADO").style.display = "none";
        document.getElementById("TEXTO").style.display = "block";
        document.getElementById("xinput").style.display = "block";
        document.getElementById("yinput").style.display = "block";
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
    if (selectedShape instanceof Linea && bandera === true) {
        document.getElementById("medidas").style.display = "block";
        document.getElementById("TEXTO").style.display = "none";
        document.getElementById("CUADRADO").style.display = "none";
        document.getElementById("FIGURA1").style.display = "none";
        document.getElementById("FIGURA2").style.display = "none";
        document.getElementById("FIGURA3").style.display = "block";
        document.getElementById("FIGURA4").style.display = "none";
        document.getElementById("xinput").style.display = "block";
        document.getElementById("yinput").style.display = "block";
        y.value = selectedShape.y;
        x.value = selectedShape.x;
        width.value = selectedShape.width;
        bordeTamaño.value = selectedShape.strokeWeight;
        opacidadBorde.value = selectedShape.opacityBorder;
        borderColor.value = selectedShape.borderColor;
        if (selectedShape.borderColor) {
            let rgb = hexToRgb(selectedShape.borderColor);
            let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
            borderColor.value = hexColor;
        }
    }
}
function updateFigureFromInput() {
    if (selectedShape) {
        let xInput = parseFloat(document.getElementById("Xpos").value);
        let yInput = parseFloat(document.getElementById("Ypos").value);
        let height = parseFloat(document.getElementById("height").value);
        let width = parseFloat(document.getElementById("width").value);
        let opacidad = parseFloat(document.getElementById("RellenoOpacidad").value);
        let opacidadBorde = parseFloat(document.getElementById("Bordeopacidad").value);
        let bordeTamaño = parseFloat(document.getElementById("Bordegrosor").value);
        let borderColor = document.getElementById("Bordecolor").value;
        var texto = document.getElementById("texto").value;
        var color = document.getElementById("RellenoColor").value;
        var tamañotexto = document.getElementById("tamañotexto").value;
        let cornerRadius = parseFloat(document.getElementById("cornerRadius").value);
        if (selectedShape instanceof Linea) {
            selectedShape.display();
        }
        if (!isNaN(cornerRadius)) {
            selectedShape.cornerRadius = cornerRadius;
        }
        if (!isNaN(xInput)) {
            selectedShape.x = xInput;
            selectedShape.textString = texto;
        }
        if (!isNaN(yInput)) {
            selectedShape.y = yInput;
        }
        if (!isNaN(height) && !isNaN(width) && selectedShape instanceof Square) {
            selectedShape.height = height;
            selectedShape.width = width;
        }
        if (!isNaN(height) && !isNaN(width) && selectedShape instanceof Circle) {
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
    constructor(x, y, width, height, color, opacity, opacityBorder, fontSize, cornerRadius) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.opacityBorder = opacityBorder;
        this.opacity = opacity;
        this.strokeWeight = 1;
        this.color = color;
        this.fontSize = fontSize;
        this.borderColor = '#000000';
        this.cornerRadius = 1;
        this.visible = true;
    }
}
class Square extends Shape {
    constructor(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder, cornerRadius) {
        super(x, y, width, height, color, opacity, opacityBorder, cornerRadius);
        this.borderColor = borderColor;
        this.strokeWeight = strokeWeight;
        this.visible = true;
    }

    display() {
        if (this.visible === true) {
            strokeWeight(this.strokeWeight);
            stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
            fill(this.color[0], this.color[1], this.color[2], this.opacity);
            rect(this.x, this.y, this.width, this.height, this.cornerRadius);
        }
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
    constructor(x, y, textString, color, opacity, fontSize) {
        super(x, y, 0, 0, color, opacity, 0, fontSize);
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
    let fontSize = 31;
    let color = [0, 0, 0];
    let textShape = new TextShape(x, y, textString, color, 255, fontSize);
    selectedShape = textShape;
    selectedText = textShape;
    textShape.name = "Texto";
    shapes.push(textShape);
    updateElementsList();

}
class Circle extends Shape {
    constructor(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder) {
        super(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder);
        this.borderColor = borderColor;
        this.opacity = opacity;
    }

    display() {
        stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
        fill(this.color[0], this.color[1], this.color[2], this.opacity);
        strokeWeight(this.strokeWeight);
        ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height);
    }

    contains(x, y) {
        let d = dist(x, y, this.x + this.width / 2, this.y + this.height / 2);
        return d <= this.width / 2;
    }
}
class Linea extends Shape {
    constructor(x1, y1, x2, y2, borderColor, opacityBorder, strokeWeight) {
        super(x1, y1, x2 - x1, y2 - y1);
        this.borderColor = borderColor;
        this.opacityBorder = opacityBorder;
        this.strokeWeight = strokeWeight;
    }
    display() {
        stroke(this.borderColor[0], this.borderColor[1], this.borderColor[2], this.opacityBorder);
        strokeWeight(this.strokeWeight);
        ddaLine(this.x, this.y, this.x2, this.y2);
    }
    contains(x, y) {
        // Verificar si el punto (x, y) está cerca de la línea (dentro de un umbral de distancia)
        let threshold = 5;
        let d = distPointToLine(x, y, this.x, this.y, this.x2, this.y2);
        return d <= threshold;
    }
}
function mouseDragged() {
    updateSidebar();
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return; // Salir de la función si el mouse está fuera del canvas
    }
    if (selectedShape && bandera === true) {
        selectedShape.x = mouseX;
        selectedShape.y = mouseY;
    }
    if (isDrawingSquare === true) {
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
        lineEndX = mouseX;
        lineEndY = mouseY;
        linea.x2 = lineEndX;
        linea.y2 = lineEndY;
        updateElementsList();
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
    isDrawingLine = false;
    isDrawingCircle = false;
    selectedShape = null;
}
function pintarCirculos() {
    bandera = false;
    isDrawingSquare = false;
    isDrawingCircle = true;
    isDrawingLine = false;
    selectedShape = null;
}
function seleccionar() {
    bandera = true;
    isDrawingSquare = false;
}
function mousePressed() {
    if (isDrawingSquare) {
        lineStartX = mouseX;
        lineStartY = mouseY;
        square = new Square(lineStartX, lineStartY, 0, 0, [255, 255, 255], [0, 0, 0], 255, 1, 255, 0);
        square.name = "Cuadrado";
        shapes.push(square);
        updateElementsList();
    }
    if (isDrawingCircle) {
        lineStartX = mouseX;
        lineStartY = mouseY;
        let circleRadius = dist(lineStartX, lineStartY, mouseX, mouseY);
        circle = new Circle(lineStartX, lineStartY, circleRadius, 0, [255, 255, 255], [0, 0, 0], 255, 1, 255, 0);
        circle.name = "Circulo";
        shapes.push(circle);
        updateElementsList();
    }
    if (isDrawingLine) {
        lineStartX = mouseX;
        lineStartY = mouseY;
        linea = new Linea(lineStartX, lineStartY, mouseX, mouseY, [0, 0, 0], 25, 10);
        linea.name = "Linea";
        shapes.push(linea);
        updateElementsList();
    }
}
function mouseReleased() {
    // Guardar las coordenadas finales de la línea y finalizar el dibujo
    if (isDrawingLine) {
        lineEndX = mouseX;
        lineEndY = mouseY;
        linea.x2 = lineEndX; // Actualiza las coordenadas finales de la línea
        linea.y2 = lineEndY;
        updateElementsList();
    }
    isDrawingSquare = false;
    isDrawingCircle = false;
    isDrawingLine = false;
    square = null;
    circle = null;
    linea = null;
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
            if (shapes[i] instanceof Linea && shapes[i].contains(mouseX, mouseY)) {
                selectedShape = shapes[i];
                selectedText = null; // Reiniciar el objeto de texto seleccionado
                updateSidebar();
                break;
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
function toggleShapeVisibility(index) {
    shapes[index].visible = !shapes[index].visible;

    // Función para ocultar una figura específica
    function hideShape(shape) {
        shape.visible = false;
    }

    // Función para mostrar una figura específica
    function showShape(shape) {
        shape.visible = true;
    }

    updateElementsList();
}
function updateElementsList() {
    var sidebarElements = document.getElementById("sidebar-elements");
    sidebarElements.innerHTML = ""; // Limpiar la lista de elementos existente

    for (let i = shapes.length - 1; i >= 0; i--) {
        let shape = shapes[i];

        // Crear un elemento de lista para cada figura
        let listItem = document.createElement("li");

        // Crear un botón de ocultar/mostrar y asignarle la función toggleShapeVisibility() con el índice de la figura como argumento
        let visibilityButton = document.createElement("button");
        visibilityButton.innerText = shape.hidden ? "Mostrar" : "Ocultar";
        visibilityButton.addEventListener("click", () => toggleShapeVisibility(i));
        listItem.appendChild(visibilityButton);

        // Agregar el nombre de la figura al elemento de lista
        let shapeName = document.createElement("span");
        shapeName.innerText = shape.name;
        listItem.appendChild(shapeName);

        // Insertar el elemento al final de la lista
        sidebarElements.appendChild(listItem);
    }
}
function toggleShapeVisibility(index) {
    // Verificar que el índice sea válido
    if (index >= 0 && index < shapes.length) {
        // Obtener la figura correspondiente al índice
        let shape = shapes[index];
        // Cambiar la propiedad 'hidden' de la figura
        shape.hidden = !shape.hidden;

        // Actualizar el texto del botón en la lista de elementos
        let visibilityButton = document.querySelector("#sidebar-elements li:nth-child(" + (index + 1) + ") button");
        visibilityButton.innerText = shape.hidden ? "Mostrar" : "Ocultar";

        // Volver a dibujar todas las figuras en el lienzo
        redrawCanvas();
    }
}
function redrawCanvas() {
    // Dibujar todas las figuras que no están ocultas
    for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];

        if (!shape.hidden) {
            drawShape(shape); // Llamada a la función para dibujar la figura en el lienzo
        }
    }
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
function distPointToLine(x, y, x1, y1, x2, y2) {
    let A = x - x1;
    let B = y - y1;
    let C = x2 - x1;
    let D = y2 - y1;

    let dot = A * C + B * D;
    let lenSq = C * C + D * D;
    let param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    let dx = x - xx;
    let dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}
function ddaLine(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        // Dibujar el pixel en la posición (x, y)
        stroke(0);
        point(x, y);

        // Actualizar las coordenadas (x, y)
        x += xIncrement;
        y += yIncrement;
    }
}
function capturarLienzoYGuardar(id) {
    id = id;
    validar= false;
    // Capturar el lienzo en un objeto p5.Image
    const imagenLienzo = get();

    // Convertir la imagen a formato Base64
    const imagenDataURL = imagenLienzo.canvas.toDataURL();

    // Llamar a la función guardarCambios() pasando la imagen en formato Base64
    guardarCambios(imagenDataURL, id);
}

function guardarCambios(imagenDataURL, id) {
    const figurasJson = obtenerFigurasJson();
    const figurasTextLong = obtenerFigurasTextLong();
    const nombreProyecto = document.getElementById('nombreProyectoInput').value;

    // Crear un objeto FormData para enviar los datos al servidor
    const formData = new FormData();
    formData.append('nombre_proyecto', nombreProyecto);
    formData.append('usuario_id', id); // Reemplaza con el ID del usuario
    formData.append('imagen_proyecto', imagenDataURL);
    formData.append('figuras_json', figurasJson);
    formData.append('figuras_textlong', figurasTextLong);

    // Crear una solicitud AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'proyectos.php'); // Reemplaza con la ruta al script que procesará la solicitud

    // Agregar un listener de evento para manejar la respuesta del servidor
    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Mensaje de respuesta del servidor
        } else {
            console.log('Error al guardar el proyecto.'); // Mensaje de error si la solicitud falla
        }
    });

    // Enviar los datos al servidor
    xhr.send(formData);
}

function obtenerFiguras() {

    let id = document.getElementById("obtener_id").value;

    $.ajax({
        url: "obtener_proyecto.php",
        type: "POST",
        data: {
            idProyecto: id
        },
        success: function (response) {
            const proyecto = JSON.parse(response);
            const figurasJson = proyecto.figuras_json;
            const figuras = JSON.parse(figurasJson);
            var nombreProyecto = proyecto.nombre_proyecto;
            document.getElementById("nombreProyectoInput").value = nombreProyecto;
            for (let i = 0; i < figuras.length; i++) {
                const figura = figuras[i];
                const width = figura.width;
                const height = figura.height;
                const x = figura.x;
                const y = figura.y;
                const radius = figura.radius;
                const opacityBorder = figura.opacityBorder;
                const opacity = figura.opacity;
                const strokeWeight = figura.strokeWeight;
                const color = figura.color;
                const fontSize = figura.fontSize;
                const borderColor = figura.borderColor;
                const cornerRadius = figura.cornerRadius;
                const visible = figura.visible;
                const name = figura.name;
                const lineStartX = figura.x;
                const lineStartY = figura.y;
                const x2 = figura.x2;
                const y2 = figura.y2;
                const textString = figura.textString;

                console.log(figura);

                if (figuras[i].name === 'Cuadrado') {
                    console.log("ES UN CUADRADO");
                    const square = new Square(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder, cornerRadius);
                    square.name = "Cuadrado";
                    shapes.push(square);
                    updateElementsList();
                } else if (figuras[i].name === 'Circulo') {
                    console.log("ES UN CIRCULO");
                    const circle = new Circle(x, y, width, height, color, borderColor, opacity, strokeWeight, opacityBorder);
                    circle.name = "Circulo";
                    shapes.push(circle);
                    updateElementsList();
                } else if (figuras[i].name === 'Linea') {
                    console.log("ES UNA LINEA" + figuras[i].name);
                    const linea = new Linea(lineStartX, lineStartY, x2, y2, borderColor, 25, strokeWeight);
                    linea.name = "Linea";
                    shapes.push(linea);
              
                    updateElementsList();
                } else if (figuras[i].name === 'Texto') {
                    console.log("ES UN TEXTO");
                    const textShape = new TextShape(x, y, textString, color, 255, fontSize);
                    shapes.push(textShape);
                    updateElementsList();
                }
            
            }
            

        },
        error: function (error) {
            console.log("Error al obtener el proyecto:", error);
        }
    });
}


const guardarCambiosButton = document.getElementById('Nuevoproyecto');
guardarCambiosButton.addEventListener('click', guardarCambios);

function obtenerFigurasJson() {
    // Esta función debe ser implementada para obtener el JSON de las figuras
    let shapesJson = JSON.stringify(shapes);
    return shapesJson;
}

function obtenerFigurasTextLong() {
    // Esta función debe ser implementada para obtener las figuras como texto largo
    let shapesTextLong = convertirFigurasATextLong(shapes); // Reemplaza esta línea con tu implementación
    return shapesTextLong;
}
function convertirFigurasATextLong(figuras) {
    let shapesTextLong = '';

    // Recorrer cada figura
    for (let i = 0; i < figuras.length; i++) {
        const figura = figuras[i];

        // Crear una cadena de texto que representa la figura
        const figuraTextLong = `${figura.constructor.name},${figura.x},${figura.y},${figura.width},${figura.height},${figura.color},${figura.opacity},${figura.opacityBorder},${figura.fontSize},${figura.cornerRadius}`;

        // Agregar la cadena de texto de la figura al resultado final
        shapesTextLong += figuraTextLong;

        // Agregar un separador de figuras si no es la última figura
        if (i < figuras.length - 1) {
            shapesTextLong += ';';
        }
    }

    return shapesTextLong;
}