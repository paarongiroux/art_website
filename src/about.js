import React from 'react';
import NavBar from './NavBar';
import './App.css';
import vertexShaderSrc from './vertexShader.js';
import fragmentShaderSrc from './fragmentShader.js';
import aviModel from './body.json';
import aviTexture from './avi_flo.jpg';
import * as glMatrix from 'gl-matrix';
const { mat4 } = glMatrix;

function About() {
    var canvasWidth = window.innerWidth * 0.9;
    var canvasHeight = 600;
    if (canvasWidth > 800) {
        canvasWidth = 800
    } else {
        canvasHeight = canvasWidth * 0.75;
    }
    console.log(canvasWidth);
    return (
        <div onLoad= {initDemo}>
            <NavBar/>
            <div className="imgContainer">
            <div className="about">
                ABOUT ME
            </div>
            <canvas id="canvas" width={canvasWidth} height="600"></canvas>
            <div className="about">
                Age: 26 <br></br>
                Sex: M <br></br>
                Height: 182cm <br></br>
                Wing span: 186cm <br></br>
                Location: San Diego <br></br>
                {/* Fav color: <span style="color:blue">blue</span><br></br> */}
                Contact: p.aaron.giroux@gmail.com <br></br>
            </div>
            </div>
        </div>
    );
}

async function initDemo() {
    let aviTextureImage = new Image(aviTexture);
    aviTextureImage.src = aviTexture
    await new Promise(r => setTimeout(r, 500));;
    console.log(aviTextureImage);
    runDemo(vertexShaderSrc, fragmentShaderSrc, aviModel, aviTextureImage);
}


function runDemo(vertexShaderText, fragmentShaderText, headModel, headTextureImg) {
    // get canvas and webgl context
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        alert("unable to load webgl");
    }
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);
    var program = createProgram(gl, vertexShader, fragmentShader)

    // three 2d points + color
    var headVertices = headModel.meshes[0].vertices;
    var headIndices = [].concat.apply([], headModel.meshes[0].faces);
    var headTexCoords = headModel.meshes[0].texturecoords[0];

    // create and bind boxVertices to ARRAY_BUFFER
    var headPosVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, headPosVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headVertices), gl.STATIC_DRAW);

    var headTexCoordVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, headTexCoordVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headTexCoords), gl.STATIC_DRAW);

    var headIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, headIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(headIndices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, headPosVertexBuffer);
    // get position and color attributes.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    // create attribute pointers 
    gl.vertexAttribPointer(
        positionAttributeLocation,
        3, // num elements per attribute (x, y, z);
        gl.FLOAT, // type
        gl.FALSE, //not normalized
        3 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex (x,y,z)
        0 // offset from beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, headTexCoordVertexBuffer)
    var texCoordAttributeLocation = gl.getAttribLocation(program, "vertTexCoord");
    gl.vertexAttribPointer(
        texCoordAttributeLocation,
        2, // num elements per attribute (u, v);
        gl.FLOAT, // type
        gl.FALSE, //not normalized
        2 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex (x,y)
        0
    );

    // enable attrib arrays... for position and color... this tells webgl to use ARRAY_BUFFER with these attributes / pointers
    
    gl.enableVertexAttribArray(texCoordAttributeLocation);

    // create texture
    var headTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, headTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		headTextureImg
	);
	gl.bindTexture(gl.TEXTURE_2D, null);

    gl.useProgram(program);

    // enable depth buffering and back face culling when drawing
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK)

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
    // generate a camera
    // mat4.identity(viewMatrix);
    // mat4.identity(projMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -3], [0, 0, 0], [0, 1, 0]); // position of view, point the viewer is looking at, vec3 pointing up.
    mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0)// FOV in radians, aspect ratio (w/h), near plane and far plane

    // 4x4 uniform matrix
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);

    // resize and clear.
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(1, 1, 1, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // main render loop
    var angle = 0;
    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);


    function loop() {
        angle = performance.now() / 1000 / 3 * 2 * Math.PI; // 1 full rotation (2pi) every 3 seconds
        mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]); // rotate world about identity by angle around y axis
        mat4.rotate(xRotationMatrix, identityMatrix, Math.PI * 1.5, [1, 0, 0]); // rotate world about identity by angle around y axis
        mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
        
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindTexture(gl.TEXTURE_2D, headTexture);
		gl.activeTexture(gl.TEXTURE0);

        // draww using element array buffer (indices array)
        gl.drawElements(gl.TRIANGLES, headIndices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
}


export default About;