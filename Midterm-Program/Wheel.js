//Ben Snook

var canvas;
var gl;

//---------------------------------------------------------------------------
//
//  Declare our array of wheelParts (each of which is a sphere)
//
// The list of wheelParts to render.  Uncomment any wheelParts that you are 
// including in the scene. For each wheelPart in this list, make sure to 
// set its distance from the Base, as well its size, color, and orbit
// around the Base. 

var WheelParts = {
  Base : undefined,
  Arm1_1 : undefined,
  Arm1_2 : undefined,
  Arm1_3 : undefined,
  Arm2_1 : undefined,
  Arm2_2 : undefined,
  Arm2_3 : undefined,
  Arm3_1 : undefined,
  Arm3_2 : undefined,
  Arm3_3 : undefined,
  Arm4_1 : undefined,
  Arm4_2 : undefined,
  Arm4_3 : undefined,
  Outer1 : undefined
};

// Viewing transformation parameters
var V;  // matrix storing the viewing transformation

// Projection transformation parameters
var P;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 150;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is 
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Initialize the wheelParts in the WheelParts list, including specifying
  // necesasry shaders, shader uniform variables, and other initialization
  // parameters.  This loops adds additinoal properties to each object
  // in the WheelParts object;

  for (var name in WheelParts ) {

    // Create a new sphere object for our wheelPart, and assign it into the
    // appropriate place in the WheelParts dictionary.  And to simplify the code
    // assign that same value to the local variable "p", for later use.

    var wheelPart = WheelParts[name] = new Sphere();

    // For each wheelPart, we'll add a new property (which itself is a 
    // dictionary) that contains the uniforms that we will use in
    // the associated shader programs for drawing the wheelParts.  These
    // uniform's values will be set each frame in render().

    wheelPart.uniforms = { 
      color : gl.getUniformLocation(wheelPart.program, "color"),
      MV : gl.getUniformLocation(wheelPart.program, "MV"),
      P : gl.getUniformLocation(wheelPart.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {
  time += timeDelta;

  var ms = new MatrixStack();

  gl.clearColor((-Math.cos(time/15)+ 1)/6, 0, (Math.sin(time/30)+ 1)/8 + 0.33, (-Math.cos((time)/30)+ 1)/4 + 0.6);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Specify the viewing transformation, and use it to initialize the 
  // matrix stack

  V = translate(0.0, 0.0, -0.3*(near + far));
  ms.load(V);  

  // Create a few temporary variables to make it simpler to work with
  // the various properties we'll use to render the wheelParts.  The WheelParts
  // dictionary (created in init()) can be indexed by each wheelPart's name.
  // We'll use the temporary variables "wheelPart" to reference the geometric
  // information (e.g., sphere model) we created in the WheelParts array.
  // Likewise, we'll use "data" to reference the database of information
  // about the wheelParts in ObjectList.  Look at how these are
  // used; it'll simplify the work you need to do.

  //console.log(Object.keys(ObjectList));
  
  var name, wheelPart, data;
	
  name = "Base";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false; 

  ms.push();
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  
  name = "Arm1_1";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  
  name = "Arm1_2";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  
  name = "Arm1_3";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  name = "Arm2_1";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time) + 90, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
 
  name = "Arm2_2";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time) + 90, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  
  name = "Arm2_3";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time) + 90, data.axis);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  name = "Arm3_1";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time)-180, data.axis);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();

  name = "Arm3_2";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time)-180, data.axis);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();

  name = "Arm3_3";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time)-180, data.axis);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  name = "Arm4_1";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time)-90, data.axis);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  name = "Arm4_2";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time)-90, data.axis);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  name = "Arm4_3";
  wheelPart = WheelParts[name];
  data = ObjectList[name];

  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time)-90, data.axis);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  wheelPart.render();
  ms.pop();
  
  name = "Outer1";
  wheelPart = WheelParts[name];
  data = ObjectList[name];
  
  wheelPart.PointMode = false;

  ms.push();
  ms.rotate((data.year * time), data.axis);
  ms.translate(-6, -4, 0);
  ms.scale(data.radius);
  gl.useProgram(wheelPart.program);
  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
  var i = 0;
  while (i  < 360) {
	  ms.push();
	  //ms.translate(-5*(Math.cos(15*i)), 5*(Math.sin(15*i)), 0);
	  ms.translate(data.distance*Math.cos(i), data.distance*Math.sin(i), 0);
	  gl.useProgram(wheelPart.program);
	  gl.uniformMatrix4fv(wheelPart.uniforms.MV, false, flatten(ms.current()));
	  gl.uniformMatrix4fv(wheelPart.uniforms.P, false, flatten(P));
	  gl.uniform4fv(wheelPart.uniforms.color, flatten(data.color));
	  wheelPart.render();
	  i += 2;
  }

  ms.pop();
  
  
  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 45.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;