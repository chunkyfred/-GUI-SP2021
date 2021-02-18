//Ben Snook

var cube = null;
var gl = null;
var angle = 0;

function init() 
{
  var canvas = document.getElementById("webgl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);

  if(!gl) 
  {
    alert("Unable to setup WebGL");
    return;
  }

  gl.clearColor( 0.3, 0.8, 0.8, 1.0 );
  gl.enable( gl.DEPTH_TEST );

  cube = new Cube(gl, 1.0);

  render();
}

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  angle += 1.5; // degrees

  cube.MV = rotate( angle, [-1, 1, -1] );

  cube.render();

  requestAnimationFrame( render ); // schedule another call to render()
}

window.onload = init;