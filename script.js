// Función para mostrar secciones
function mostrarSeccion(seccion) {
  document.getElementById("formulario").style.display = "none";
  document.getElementById("consulta").style.display = "none";
  document.getElementById("actualizar").style.display = "none";
  document.getElementById("eliminar").style.display = "none";

  document.getElementById(seccion).style.display = "block";
}

// Registrar persona en localStorage
function registrarPersona(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const sexo = document.getElementById("sexo").value;
  const pais = document.getElementById("pais").value;
  const departamento = document.getElementById("departamento").value;
  const ciudad = document.getElementById("ciudad").value;
  const temperatura = document.getElementById("temperatura").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;

  const persona = {
    nombre,
    telefono,
    sexo,
    pais,
    departamento,
    ciudad,
    temperatura,
    fecha_nacimiento,
  };

  let personas = JSON.parse(localStorage.getItem("personas")) || [];
  personas.push(persona);
  localStorage.setItem("personas", JSON.stringify(personas));

  alert("Persona registrada con éxito");
  document.getElementById("registroForm").reset();
}

// Consultar persona por nombre en localStorage
function consultarPersona(event) {
  event.preventDefault();

  const nombreConsulta = document.getElementById("nombre_consulta").value;
  const personas = JSON.parse(localStorage.getItem("personas")) || [];
  const resultado = personas.find(
    (p) => p.nombre.toLowerCase() === nombreConsulta.toLowerCase()
  );

  const listaResultado = document.getElementById("resultadoConsulta");
  listaResultado.innerHTML = "";

  if (resultado) {
    const p = document.createElement("p");

    // Convertimos el objeto resultado a una cadena en formato JSON y lo mostramos
    p.textContent = JSON.stringify(resultado, null, 2); // null y 2 para formato legible

    listaResultado.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.textContent = "Persona no encontrada";
    listaResultado.appendChild(p);
  }

  document.getElementById("nombre_consulta").value = "";
}

// Función para buscar y cargar los datos de la persona a actualizar
function cargarDatosParaActualizar() {
  const nombreBuscar = document.getElementById(
    "nombre_actualizar_buscar"
  ).value;
  const personas = JSON.parse(localStorage.getItem("personas")) || [];
  const persona = personas.find(
    (p) => p.nombre.toLowerCase() === nombreBuscar.toLowerCase()
  );

  if (persona) {
    // Mostrar los campos de actualización y cargar los datos en el formulario
    document.getElementById("actualizarCampos").style.display = "block";
    document.getElementById("nombre_actualizar").value = persona.nombre;
    document.getElementById("telefono_actualizar").value = persona.telefono;
    document.getElementById("sexo_actualizar").value = persona.sexo;
    document.getElementById("pais_actualizar").value = persona.pais;
    document.getElementById("departamento_actualizar").value =
      persona.departamento;
    document.getElementById("ciudad_actualizar").value = persona.ciudad;
    document.getElementById("temperatura_actualizar").value =
      persona.temperatura;
    document.getElementById("fecha_nacimiento_actualizar").value =
      persona.fecha_nacimiento;
  } else {
    alert("Persona no encontrada");
    document.getElementById("actualizarCampos").style.display = "none";
  }
}

// Función para actualizar los datos de la persona en localStorage
function actualizarPersona(event) {
  event.preventDefault();

  const nombreBuscar = document.getElementById(
    "nombre_actualizar_buscar"
  ).value;
  let personas = JSON.parse(localStorage.getItem("personas")) || [];

  let personaIndex = personas.findIndex(
    (p) => p.nombre.toLowerCase() === nombreBuscar.toLowerCase()
  );
  if (personaIndex !== -1) {
    // Actualizar los datos con los valores del formulario
    personas[personaIndex].nombre =
      document.getElementById("nombre_actualizar").value;
    personas[personaIndex].telefono = document.getElementById(
      "telefono_actualizar"
    ).value;
    personas[personaIndex].sexo =
      document.getElementById("sexo_actualizar").value;
    personas[personaIndex].pais =
      document.getElementById("pais_actualizar").value;
    personas[personaIndex].departamento = document.getElementById(
      "departamento_actualizar"
    ).value;
    personas[personaIndex].ciudad =
      document.getElementById("ciudad_actualizar").value;
    personas[personaIndex].temperatura = document.getElementById(
      "temperatura_actualizar"
    ).value;
    personas[personaIndex].fecha_nacimiento = document.getElementById(
      "fecha_nacimiento_actualizar"
    ).value;

    localStorage.setItem("personas", JSON.stringify(personas));
    alert("Persona actualizada con éxito");
    document.getElementById("actualizarForm").reset();
    document.getElementById("actualizarCampos").style.display = "none";
  } else {
    alert("Persona no encontrada");
  }
}

// Eliminar persona de localStorage
function eliminarPersona(event) {
  event.preventDefault();

  const nombreEliminar = document.getElementById("nombre_eliminar").value;
  let personas = JSON.parse(localStorage.getItem("personas")) || [];

  const personasFiltradas = personas.filter((p) => p.nombre !== nombreEliminar);

  if (personas.length !== personasFiltradas.length) {
    localStorage.setItem("personas", JSON.stringify(personasFiltradas));
    alert("Persona eliminada con éxito");
  } else {
    alert("Persona no encontrada");
  }

  document.getElementById("eliminarForm").reset();
}
