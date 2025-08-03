// Número máximo que puede ser sorteado (ajustable)
let numeroMaximo = 10;

// Declaramos variables principales del juego
let numeroSecreto = 0; // Se define luego con una función
let intentos = 1; // Contador de intentos
let listaNumerosSorteados = []; // Lista que guarda los números ya utilizados

// Función reutilizable para modificar el texto de cualquier elemento HTML
function asignarTextoElemento(elemento, texto) {
  const elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

// Función que genera un número aleatorio que no se repita
function generarNumeroSecreto() {
  // Si ya se sortearon todos los posibles números, finaliza el juego
  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento("p", "Todos los números posibles ya se han sorteado.");
    document.getElementById("reiniciar").setAttribute("disabled", true);
    return;
  }

  // Genera un número aleatorio entre 1 y numeroMaximo
  const numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  // Verifica si el número ya fue sorteado
  if (listaNumerosSorteados.includes(numeroGenerado)) {
    // Si ya fue sorteado, se vuelve a llamar a sí misma (recursividad)
    return generarNumeroSecreto();
  } else {
    // Si no está repetido, lo guarda en la lista y lo retorna
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
  }
}

// Función para limpiar el campo de entrada del usuario
function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

// Función que configura las condiciones iniciales del juego
function condicionesIniciales() {
  // Título y mensaje inicial con el rango dinámico
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);

  // Reinicia el contador de intentos
  intentos = 1;

  // Genera un nuevo número secreto
  numeroSecreto = generarNumeroSecreto();
}

// Función que se ejecuta cuando el usuario hace clic en "Intentar"
function verificarIntento() {
  // Captura y convierte a número el valor ingresado por el usuario
  const numeroUsuario = parseInt(document.getElementById("valorUsuario").value);

  // Compara el número del usuario con el número secreto
  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `¡Acertaste el número secreto en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`
    );
    // Habilita el botón "Nuevo juego"
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else if (numeroUsuario > numeroSecreto) {
    asignarTextoElemento("p", "El número secreto es menor");
  } else {
    asignarTextoElemento("p", "El número secreto es mayor");
  }

  // Limpia la caja de entrada
  limpiarCaja();

  // Incrementa el número de intentos
  intentos++;
}

// Función que reinicia el juego cuando se hace clic en "Nuevo juego"
function reiniciarJuego() {
  // Limpia la caja de entrada
  limpiarCaja();

  // Restaura las condiciones iniciales
  condicionesIniciales();

  // Desactiva el botón "Nuevo juego" hasta que el usuario acierte nuevamente
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

// Inicia el juego automáticamente al cargar la página
condicionesIniciales();