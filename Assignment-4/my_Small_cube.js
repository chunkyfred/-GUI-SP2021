var cube = undefined;
var gl = undefined;

var angle = 0;

function init ()
{
  
    var canvas = document.getElementById("webgl-canvas");

    //utilities used for WebGL client
    gl = WebGLUtils.setupWebGL(canvas);

    // check if gl was actually imported
    if (!gl) 
    {
        alert("Unable to setup WebGL properly.");
        return;
    }

    gl.clearColor( 0.1, 0.3, 0.8, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    cube = new my_Cube();

    render();
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 2.0;

    cube.MV = rotate  (angle, [-1.5, 1.5, -0.5]);

    cube.render();

    requestAnimationFrame(render);

}

window.onload = init;