//Ben Snook

var canvas;
var gl;

var V; //viewing matrix

var P; //projection matrix
var near = 10; //near clipping plane
var far = 150; //far clipping plane

var time = 0.0;      // time 
var timeDelta = 0.5; // time update per frame



function init() {
  canvas = document.getElementById("webgl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  
  resize();

  window.requestAnimationFrame(render);  
}

function render() {
	time += timeDelta;
	var ms = new MatrixStack();
	gl.clearColor((Math.cos(time/15)/4) + 0.75, (Math.cos((time/15) + (3.14/2)) /4) + 0.75, (Math.cos((time/15) + 3.14)/4) + 0.75, .75);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	V = translate(0.0, 0.0, -0.3*(near + far));
	ms.load(V);  
	
	ms.push();
	const geometry = new THREE.SphereGeometry( 5, 32, 32 );
	const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	const sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );
	ms.pop();
	
	window.requestAnimationFrame(render);
}

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 45.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

window.onload = init;
window.onresize = resize;