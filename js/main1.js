(function() {
    document.getElementById('txtNombre').focus();
})();

var resultados = {
    visual: 0,
    kinestesico: 0,
    auditivo: 0
  };

let index = 0;
let correctas = [];
let preguntas = [];
let alternativas = [];
let rptas = [];
const tiempo = 10;
let countdownfunction;

function validarNombre() {
   let nombre = document.getElementById('txtNombre').value;
   if(nombre.length === 0) {
       alert('Por favor ingresa tu nombre');
       document.getElementById('txtNombre').focus();
   } else {
       bienvenida(nombre);
   }
}

function bienvenida(nombre) {

   mostrarDiv('categoria');

   let mensaje = `¡Bienvenida ${nombre}!`;
   document.getElementById('msgHola').innerHTML = mensaje;

}

function cargarPreguntasTipo(tipo) {
   
   let titulo = '';
   reiniciar();

   if(tipo === 'A') {
       preguntas = [
          
          " TEST DE ESTILOS DE APRENDIZAJE",
       ];

     

   } 

   document.getElementById('msgCategoria').innerHTML = titulo;
   mostrarDiv('jugar');
   cargarPreguntas(index);

}



function cargarPreguntas(indice) {
   
       document.getElementById('pregunta').innerHTML = preguntas[indice];
       let opciones = "";
       for(let j=0; j<alternativas[indice].length; j++) {
           opciones += "<p>";
           opciones += "<label class='lblopc'><input type='radio' class='radios' onclick='checkRpta("+j+")' name='opc' >"+ alternativas[indice][j] +"</label> ";
           opciones += "</p>";
       }
       
       document.getElementById('alternativas').innerHTML = opciones;
       
       iniciarTimer();

}



function checkRpta(rpta) {
   
   document.getElementById('divrpta').style.display = 'block';
   let mensaje = "RESPUESTA INCORRECTA :(";
   let color='red';
   

   if(rptas[index] === rpta) {
       mensaje = "RESPUESTA CORRECTA :)";
       correctas.push(index);
       color='green';
   }
   document.getElementById('divrpta').style.background =color;
   document.getElementById('divrpta').innerHTML = mensaje;
   deshabilitarRadios('radios');

}



function mostrarDiv(div) {
   let ocultos = document.getElementsByClassName('box');
   for(var i=0, len=ocultos.length; i<len; i++) {
       ocultos[i].style.display = 'none'
   }
   document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
   let rds = document.getElementsByClassName(radios);
   for(var i=0, len=rds.length; i<len; i++) {
       rds[i].disabled = true;
   }
}

function reiniciar() {
   index = 0;
   correctas = [];
   preguntas = [];
   alternativas = [];
   rptas = [];
}

function cerrarSesion(){
   window.location.reload();
}

function evaluarResultados() {
    var formulario = document.getElementById("formulario-estilos-aprendizaje");
    var resultadoDiv = document.getElementById("resultado");
  
    for (var i = 1; i <= 7; i++) {
      var selectedOption = document.querySelector(`input[name="pregunta${i}"]:checked`);
      if (selectedOption) {
        resultados[selectedOption.value]++;
      }
       
    }
  
    var estiloPredominante = Object.keys(resultados).reduce((a, b) => resultados[a] > resultados[b] ? a : b);
    var mensaje;
   
  
    switch (estiloPredominante) {
        case "visual":
          mensaje = "Tu estilo de aprendizaje predominante es Visual. Prefieres aprender mediante imágenes,"  <br> "diagramas y representaciones visuales.";
          break;
        case "kinestesico":
          mensaje = "Tu estilo de aprendizaje predominante es Kinestésico. Prefieres aprender "  <br> "a través de la experiencia práctica y el movimiento.";
          break;
        case "auditivo":
          mensaje = "Tu estilo de aprendizaje predominante es Auditivo. Prefieres aprender escuchando,"  <br> " discutiendo y participando en debates.";
          break;
        default:
          mensaje = "No se pudo determinar tu estilo de aprendizaje predominante.";
      }
      
      
  
    resultadoDiv.textContent = mensaje;
  }
