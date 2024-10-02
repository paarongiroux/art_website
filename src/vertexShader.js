const vertexShaderSrc = `// VERTEX SHADER ========== //
precision mediump float;

// an attribute will receive data from a buffer
attribute vec4 a_position;
attribute vec2 vertTexCoord;
varying vec2 fragTexCoord;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

// all shaders have a main function
void main() {
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    fragTexCoord = vertTexCoord;
    gl_Position = mProj * mView * mWorld * a_position; // multiplication is handled right to left.
}`

export default vertexShaderSrc;