

function eliminarProyecto(idProyecto) {
  $.ajax({
    url: "eliminar_proyecto.php",
    type: "POST",
    data: {
      idProyecto: idProyecto
    },
    success: function (response) {
      console.log(response);
      location.reload();
      // Realizar acciones adicionales después de eliminar el proyecto
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      // Realizar acciones en caso de error
    }
  });
  console.log
}

function editarProyecto(idProyecto) {
  // Realizar una solicitud AJAX para obtener el JSON de las figuras del proyecto
  $.ajax({
    url: "obtener_proyecto.php",
    type: "POST",
    data: {
      idProyecto: idProyecto
    },
    success: function(response) {
      const proyecto = JSON.parse(response);
      const figurasJson = proyecto.figuras_json;

      // const figuritas = JSON.parse(figurasJson);
      const figuritass = JSON.parse(figurasJson);

      console.log("el proyecto contiene esta figura: " + figurasJson);
      // console.log("el proyecto contiene esta figura: " + figuritas.name);
      console.log("el proyecto contiene esta figura: " + figuritass[0].color);
      window.location.href = 'user-project.php?id=' + idProyecto ;
      // Redirigir a la vista de proyectos
      let i=0;
     
      for(const figurita of figuritass  ) {

        if (figuritass[i].name =="Circulo") {
          circle = new Circle(figuritass[i].x, figuritass[i].y, figuritass[i].width, figuritass[i].height,figuritass[i].color , figuritass[i].borderColor, figuritass[i].opacity, figuritass[i].strokeWeight, figuritass[i].opacityBorder, 0);
          console.log(figuritass[i].x)
          circle.name = "Circulo";
          shapes.push(circle);
          pintarCirculos()
          updateElementsList();
          dibujarFiguras(shapes);
        }else{
          console.log("no entro")
        }
        
        i++;
      }
      
  // Mostrar las figuras en el lienzo

    },

    error: function(xhr, status, error) {
      console.log("Error al cargar el proyecto: " + xhr.responseText);
      // Realizar acciones en caso de error
    }
  });
}

