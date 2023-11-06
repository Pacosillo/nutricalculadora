// Base de datos de alimentos
const baseDeDatosAlimentos = {
  papa: {
    calorias: 77,
    proteinas: 2,
    grasas: 0.1,
    carbohidratos: 17,
    fibra: 2.2,
    colesterol: 0
  },
  arroz: {
    calorias: 204,
    proteinas: 4.2,
    grasas: 0.44,
    carbohidratos: 28,
    fibra: 0.6,
    colesterol: 0
  },
  huevo: {
    calorias: 80,
    proteinas: 6,
    grasas: 5,
    carbohidratos: 1,
    fibra: 0.3,
    colesterol: 200
  },
  queso: {
    calorias: 375,
    proteinas: 22,
    grasas: 31,
    carbohidratos: 1.5,
    fibra: 0,
    colesterol: 70
  }
};
// Función para calcular los nutrientes
function calcularNutrientes() {
  // Obtenemos valores del formulario
  const cantidades = {
    papa: parseFloat(document.getElementById("peso-papas").value) / 1000,
    arroz: parseFloat(document.getElementById("peso-arroz").value) / 1000,
    huevo: parseInt(document.getElementById("cantidad-huevo").value),
    queso: parseFloat(document.getElementById("peso-queso").value) / 1000
  };
  // Calculamos los nutrientes
  const nutrientes = calcularTotalNutrientes(cantidades);
  // Mostramos los resultados
  mostrarResultados(nutrientes);
  // Mostramos los totales
  mostrarTotales(nutrientes);
}
// Calcula los totales de cada nutriente
function calcularTotalNutrientes(cantidades) {
  const totalNutrientes = {};
  for (let alimento in cantidades) {
    let nutriente = baseDeDatosAlimentos[alimento];
    totalNutrientes[alimento] = {};
    for (let tipoNutriente in nutriente) {
      let cantidad = nutriente[tipoNutriente] * cantidades[alimento];
      totalNutrientes[alimento][tipoNutriente] = cantidad;
    }
  }
  return totalNutrientes;
}
// Muestra los resultados en una tabla
function mostrarResultados(nutrientes) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";
  for (let alimento in nutrientes) {
    let titulo = document.createElement("h3");
    titulo.innerText = alimento;
    contenedor.appendChild(titulo);
    let tabla = document.createElement("table");
    for (let nutriente in nutrientes[alimento]) {
      let fila = tabla.insertRow();
      let nombre = fila.insertCell();
      let cantidad = fila.insertCell();
      nombre.innerText = nutriente;
      cantidad.innerText = nutrientes[alimento][nutriente].toFixed(2);
    }
    contenedor.appendChild(tabla);
  }
}
// Muestra los totales de todos los nutrientes
function mostrarTotales(nutrientes) {
  const totales = calcularTotalNutrientesTotal(nutrientes);
  const contenedor = document.getElementById("resultados");
  let titulo = document.createElement("h3");
  titulo.innerText = "Totales";
  contenedor.appendChild(titulo);
  for (let nutriente in totales) {
    let p = document.createElement("p");
    p.innerText = `${nutriente}: ${totales[nutriente].toFixed(2)}`;
    contenedor.appendChild(p);
  }
}
// Calcula los totales generales de todos los nutrientes
function calcularTotalNutrientesTotal(nutrientes) {
  const totales = {};
  for (let alimento in nutrientes) {
    let nutrients = nutrientes[alimento];
    for (let tipo in nutrients) {
      if (!totales[tipo]) {
        totales[tipo] = 0;
      }
      totales[tipo] += nutrients[tipo];
    }
  }
  return totales;
}
// Limpia los campos del formulario
function limpiarFormulario() {
  document.getElementById("peso-papas").value = "";
  document.getElementById("peso-arroz").value = "";
  document.getElementById("cantidad-huevo").value = "";
  document.getElementById("peso-queso").value = "";
}