



//base de datos local de preguntas
const bd__juego = [
    {
        id:0,
        pregunta: "¿Cuál es el país más pequeño del mundo?",
        op0: "Estado Vaticano", 
        op1: "Mónaco",
        op2:"San Marino", 
        correcta: "0"
    },
    {
        id:1,
        pregunta: "¿Cuántos océanos hay en la tierra?",
        op0: "Seis", 
        op1: "Cinco",
        op2:"Cuatro", 
        correcta: "1"
    },
    {
        id:2,
        pregunta: "¿Qué país tiene más habitantes?",
        op0: "China", 
        op1: "Estados Unidos",
        op2:"Rusia", 
        correcta: "0"
    },
    {
        id:3,
        pregunta: "¿Cuál es el país más grande del mundo?",
        op0: "Rusia", 
        op1: "Estados Unidos",
        op2:"India", 
        correcta: "0"
    },
    {
        id:4,
        pregunta: "¿Cuál es la montaña más alta del mundo?",
        op0: "Aconcagua", 
        op1: "Tabor",
        op2:"Everest", 
        correcta: "2"
    },
    {
        id:5,
        pregunta: "¿Cuál es el río más largo del mundo?",
        op0: "Nilo", 
        op1: "Amazonas",
        op2:"Éufrates", 
        correcta: "1"
    },
    {
        id:6,
        pregunta: "¿Cuál es la capital de Argentina?",
        op0: "Buenos Aires", 
        op1: "Viedma",
        op2:"Santa Fe", 
        correcta: "0"
    },
    {
        id:7,
        pregunta: "¿Cuál continente se encuentra en los cuatro hemisferios?",
        op0: "África", 
        op1: "América",
        op2:"Ninguno", 
        correcta: "0"
    },
    {
        id:8,
        pregunta: "¿Cuál es la capital de Uruguay?",
        op0: "Canelones", 
        op1: "Río Negro",
        op2:"Montevideo", 
        correcta: "2"
    },
    {
        id:9,
        pregunta: "¿Dónde se encuentra el estrecho de Magallanes?",
        op0: "En Europa", 
        op1: "En Oceanía",
        op2:"En América", 
        correcta: "2"
    }
    
]

//Guardar respuestas elegidas
let respuestas = [];
//Correctas
let cantidadCorrectas = 0;
//pregunta actual que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON

function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd__juego[numPregunta];
    //esto es para crear un div como el que tengo en html...notese que hay un solo div!!
    const contenedor = document.createElement("div");
    contenedor.className = "contenedor__pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //creación de labels con una función
    //a la función mandamos el numero de label y la opción y el texto de dicho label
    const label1 = crearLabel("0", pregunta.op0); 
    const label2 = crearLabel("1", pregunta.op1); 
    const label3 = crearLabel("2", pregunta.op2); 

    //agrego los label al contenedor de opciones. 
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //opciones al contenedor principal. 
    contenedor.appendChild(opciones);

    //esto no esta escrito raro???
    document.getElementById("juego").appendChild(contenedor);

}

//función que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = numPregunta + num;
    const input = document.createElement("input");
    input.name = "p" + numPregunta;
    input.setAttribute("type", "radio");
    input.setAttribute("onclick", "seleccionar("+numPregunta+","+num+")");
    const span = document.createElement("span");
    span.textContent = txtOpcion;
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Uso un for para cargar las preguntas de JSON
for(let i = 0; i < bd__juego.length; i++ ){
    cargarPreguntas();
    //así actualizo el número de la pregunta actual
    numPregunta++;
}

//Funcion para cargar la respuesta elegida
function seleccionar(pos, opElegida){
    //vamos a guardar todas las respuestas en un array
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function (){
    //recorro el array que tiene las respuestas y comparo
    for (let i = 0; i < bd__juego.length; i++) {
        const pregunta = bd__juego[i];
        //cargo las respuestas
        if (pregunta.correcta == respuestas[i]) {
            cantidadCorrectas++;
            let idCorrecion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor__pregunta correcta";
            document.getElementById(idCorrecion).innerHTML = "&check;";//esto está en código hexadecimal y es el visto
            document.getElementById(idCorrecion).className = "acierto";
        }else{//respuesta incorrecta 
            let id = "p" + i + !pregunta.correcta;
            let idCorrecion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor__pregunta incorrecta";
            //document.getElementById(id).innerHTML = "&#x2715;";
            //document.getElementById(id).className = "no__acierto";
            //document.getElementById(idCorrecion).innerHTML = "&check;";
            //document.getElementById(idCorrecion).className = "acierto";
        }
        corregir.disabled = true;
    }

    //deshabilitadmos todos los input
    let inputs = document.getElementsByTagName("input");
    for(i = 0; i < inputs.length; i++){
        inputs[i].disabled = true;
    }

    //hace scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad de aciertos y errores 
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantidadCorrectas + " CORRECTAS - " + (9 - cantidadCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}





// function reinicio(){
//     let reinicio = document.getElementById("reiniciar");
// }

