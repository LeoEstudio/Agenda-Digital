f// Mostrar secciones
function mostrarSeccion(seccion) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(seccion).classList.remove('hidden');
}

// Guardar persona
function guardarPersona() {
  const persona = {
    id: document.getElementById('id').value.trim(),
    nombres: document.getElementById('nombres').value.trim(),
    apellidos: document.getElementById('apellidos').value.trim(),
    direccion: document.getElementById('direccion').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
  };

  if (Object.values(persona).some(val => val === '')) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  let personas = JSON.parse(localStorage.getItem('agenda')) || [];
  personas.push(persona);
  localStorage.setItem('agenda', JSON.stringify(personas));
  alert('Persona guardada correctamente.');
  document.querySelectorAll('#agregar input').forEach(input => input.value = '');
}

// Buscar persona
function buscarPersona() {
  const criterio = document.getElementById('criterio').value;
  const valor = document.getElementById('buscarInput').value.trim().toLowerCase();
  const personas = JSON.parse(localStorage.getItem('agenda')) || [];

  const resultados = personas.filter(persona =>
    persona[criterio].toLowerCase().includes(valor)
  );

  const contenedor = document.getElementById('resultadoBusqueda');
  if (resultados.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  contenedor.innerHTML = generarTabla(resultados);
}

// Listar todas las personas
function listarPersonas() {
  const personas = JSON.parse(localStorage.getItem('agenda')) || [];
  const contenedor = document.getElementById('listaPersonas');

  if (personas.length === 0) {
    contenedor.innerHTML = '<p>No hay personas registradas.</p>';
    return;
  }

  contenedor.innerHTML = generarTabla(personas);
}

// Función auxiliar para mostrar tabla
function generarTabla(personas) {
  let html = '<table><thead><tr><th>ID</th><th>Nombres</th><th>Apellidos</th><th>Dirección</th><th>Teléfono</th></tr></thead><tbody>';
  personas.forEach(p => {
    html += `<tr>
      <td>${p.id}</td>
      <td>${p.nombres}</td>
      <td>${p.apellidos}</td>
      <td>${p.direccion}</td>
      <td>${p.telefono}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  return html;
}

