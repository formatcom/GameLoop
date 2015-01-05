var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');

var maxfps = 60;
var frameCount = 0,
currentFps = 0,
drawInterval = 1000/maxfps,
lastFps = new Date().getTime();

// Tamaño del lienzo
myCanvas.width=300;
myCanvas.height=300;

// Lo primero que se inicia una sola vez
function contenedor(){
	var intervalo = window.setInterval(gameLoop,drawInterval);
}

// Depurador
function log(texto,nueva){
	var capa=document.getElementById("log");
	if (nueva)
		capa.innerHTML+="<br/>"+texto;
	else
		capa.innerHTML=texto;
}

//Actualiza el fps
function fpsUpdate(){
	// Calculamos el tiempo desde el ultimo frame.
	var thisFrame = new Date().getTime(),
	diffTime = Math.ceil((thisFrame - lastFps));

	if (diffTime >= 1000){
		currentFps = frameCount;
		frameCount = 0.0;
		lastFps = thisFrame;
	}

	frameCount++;
}

//Borra todo el contenido del canvas
function borrarCanvas(){
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}


//------------ Funciones para dibujar en canvas --------------//

function dibujarFondo(){
	ctx.strokeRect(0,0,myCanvas.width,myCanvas.height);
}

function dibujarRect(obj, color){
	ctx.save();
		ctx.fillStyle = color;
		ctx.fillRect(obj.x,obj.y,obj.width,obj.height);
	ctx.restore();
}

function dibujarTexto(x, y, color, tipo, px, fuente, texto){
	ctx.save();
		ctx.fillStyle = color;
		ctx.font = tipo+' '+px+' '+fuente;
		ctx.fillText(texto, x, y);
	ctx.restore();
}

function dibujarFps(){
	dibujarTexto(10, 20, 'black', 'bold', '12px', 'sans-serif', 'FPS: ' + currentFps + '/' + maxfps);
}

function depurar(){
	/*aqui pueden utilizar la funcion log() para
	ir monitoreando las variables o las funciones del
	simulador de juego que esten desarrollando.*/
}

//------------ GameLoop - Ciclo infinito --------------//

function gameLoop(){
	borrarCanvas();
	fpsUpdate();
	dibujarFondo();
	dibujarFps();
	depurar();
}

contenedor();