const fragmentShaderSrc = `//FRAGMENT SHADER===========//

// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    gl_FragColor = texture2D(sampler, fragTexCoord);
}`

export default fragmentShaderSrc;