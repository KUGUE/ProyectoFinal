

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

      window.location.href = 'user-project.php?id=' + idProyecto ; 
      
    },

    error: function(xhr, status, error) {
      console.log("Error al cargar el proyecto: " + xhr.responseText);
      // Realizar acciones en caso de error
    }
  });
}

