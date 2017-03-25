
var lista_total_clases = [];
var lista_clases = [];
var matriz_adyacente = [];
var lista_aulas = [];
var lista_horarios = [];
var lista_total_hora_clase = [];



function Distribuciones_secciones (){
	var date = new Date;
	console.log(date);

	var alumnos_clase = document.getElementById("alumnos_clase").value; //obtiene los elemntos del text area
	var lista_alumnos_clase = alumnos_clase.split("\n"); //crea el arreglo divido por el salto de linea
	var aulas = document.getElementById("aulas").value; //obtiene los elemntos del text area
	var lista_aulas = alumnos_clase.split("\n"); //crea el arreglo divido por el salto de linea
	var horarios = document.getElementById("horarios").value; //obtiene los elemntos del text area
	var lista_horarios = alumnos_clase.split("\n"); //crea el arreglo divido por el salto de linea
	creacion_lista_clase(lista_alumnos_clase); // metodo para determinar la cantidad de clases distintas
	matriz_adyacente = matrix();
	division_adyacencia(lista_alumnos_clase);
//	print(matriz_adyacente);
	obtener_no_adyacentes();
	lista_total_hora_clase.sort(function (a, b) {
  return b.length - a.length;
});



	console.log(lista_total_hora_clase);
	var date2 = new Date;
	console.log(date2);


}

function creacion_lista_clase(lista_alumnos_clase){
	var temp_alumnos_clase;
	var clase;
	var alumno = "";

	for (var i = 0; i < lista_alumnos_clase.length; i++) { //for que recorre las conjuntos alumnos clase
		temp_alumnos_clase = lista_alumnos_clase[i].split(","); //se divide el conjunto en alumno-clase

		if (alumno !== temp_alumnos_clase[0] ) {
			obtener_lista_clases(lista_clases);
			alumno = temp_alumnos_clase[0];
			lista_clases = [];
			lista_clases.push(temp_alumnos_clase[1]);
			//console.log("entre donde es distinto");
		} else {
			lista_clases.push(temp_alumnos_clase[1]);
			//console.log("entre donde es igual");
		}
	}
	obtener_lista_clases(lista_clases);
}
function obtener_lista_clases (lista_clases) { //lista clase contiene las clases del mismo alumno
	var temp1;
		for (var i = 0; i < lista_clases.length; i++) {
		//	console.log(lista_clases[i] + i)
			temp1 = lista_total_clases.indexOf(lista_clases[i]);
			if (temp1 === -1) { //if que evalua si en el arreglo ya existe la clase
					lista_total_clases.push(lista_clases[i]);
				}
		}

}
function matrix(){

	//console.log(lista_total_clases.length)
	var arr  = [];
  // Creates all lines:
  for(var i=0; i < lista_total_clases.length; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push( new Array(lista_total_clases.length));

      for(var j=0; j < lista_total_clases.length; j++){
        // Initializes:
				if (i===j) {
					arr[i][j] = "X";
				} else {
					arr[i][j] = "0";
				}

      }
  }
	return arr;

} //construir la matriz //construccion de la matriz_adyacente //creacion de la matriz
function print(arr){
	var arrText='';
	for (var i = 0; i < arr.length; i++) {
		arrText=lista_total_clases[i] + ' ';
            for (var j = 0; j < arr[i].length; j++) {
                arrText+=arr[i][j]+' ';
            }
            console.log(arrText);

        }
} //metodo para imprimir la matriz
function division_adyacencia(lista_alumnos_clase){
	lista_clases = [];
	var temp_alumnos_clase;
	var clase;
	var alumno = "";
	for (var i = 0; i < lista_alumnos_clase.length; i++) { //for que recorre las conjuntos alumnos clase
		temp_alumnos_clase = lista_alumnos_clase[i].split(","); //se divide el conjunto en alumno-clase
		if (alumno !== temp_alumnos_clase[0] ) {
			agregar_adyacencia(lista_clases);
			alumno = temp_alumnos_clase[0];
			lista_clases = [];
			lista_clases.push(temp_alumnos_clase[1]);
		} else {
			lista_clases.push(temp_alumnos_clase[1]);
		}
	}
	agregar_adyacencia(lista_clases);
}




function agregar_adyacencia(lista_clase){
	//console.log(lista_clase)
	var temp1;
	var temp2;
	for (var i = 0; i < lista_clase.length; i++) {
		for (var j = 0; j < lista_clase.length; j++) {
			if (i!==j) {
				temp1 = lista_total_clases.indexOf(lista_clases[i]);
				temp2 = lista_total_clases.indexOf(lista_clases[j]);
				//console.log(temp1)
				//console.log(temp2)
				matriz_adyacente[temp1][temp2] = "1";
			}
		}
	}
}



function 	obtener_no_adyacentes(){
	var marcados = [];
	var temp = [];
	var temp_por_hora = [];
	var flag;

	for (var i = 0; i < lista_total_clases.length; i++) {
		if (marcados.indexOf(lista_total_clases[i]) === -1 ) { // aqui tambien
			temp.push(i);
			marcados.push(lista_total_clases[i]);
			temp_por_hora.push(lista_total_clases[i]);


			for (var j = 0; j < matriz_adyacente[i].length; j++) {
				if (matriz_adyacente[i][j] === "0" && marcados.indexOf(lista_total_clases[j]) === -1 ) { //aqui deberia ir la validacion de las aulas
					temp.push(j);
					//console.log(temp);
					if (temp.length > 2) {
						//console.log(1);
						flag = validar_no_adyacentes(temp);
						if (flag) {
							marcados.push(lista_total_clases[j]);
							temp_por_hora.push(lista_total_clases[j]);
						} else {
							temp.splice(temp[temp.length-1], 1);
							console.log(1)
						}
					} else {

						marcados.push(lista_total_clases[j]);
						temp_por_hora.push(lista_total_clases[j]);
					}

				}
			}

			lista_total_hora_clase.push(temp_por_hora);
			temp_por_hora = [];
			temp = [];

		}

	}
	//console.log("sali del todo no adyacentes")
}

function validar_no_adyacentes(temp){
	var row = 0;
	var col = temp[temp.length-1]; // el elemento en la ultima posicion

	for (var i = 0; i < temp.length-1; i++) {
		row = temp[i];
		if (matriz_adyacente[row][col] === "0" || matriz_adyacente[row][col] === "X") {

		} else{

			return false;
		}
	}
	return true;
}
