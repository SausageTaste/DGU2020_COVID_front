import * as React from 'react';
import { match } from 'react-router-dom';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader } from 'semantic-ui-react';

import { GLWidget, GLUserData } from "./../utils/opengl_view"


class Mat4 {

    public data = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ];

    public transpose() {
        let new_data = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];

        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                new_data[4*i + j] = this.data[4*j + i];
            }
        }

        this.data = new_data;
    };

    public at(row: number, col: number) {
        const index = row + 4 * col;
        return this.data[index];
    }

    public set_at(row: number, col: number, value: number) {
        const index = row + 4 * col;
        this.data[index] = value;
    }

    public multiply(mat: Mat4) {
        const new_mat = new Mat4();

        for (let row = 0; row < 4; ++row) {
            for (let col = 0; col < 4; ++col) {

                let sum = 0;
                for (let i = 0; i < 4; ++i) {
                    sum += this.at(row, i) * mat.at(i, col);
                }

                new_mat.set_at(row, col, sum);
            }
        }

        return new_mat;
    }

};


function create_perspective_mat(fov_deg: number, aspect: number, n: number, f: number) {
    const fov_radian = fov_deg / 180 * Math.PI;
    const tan_half_fov = Math.tan(fov_radian / 2)
    const result = new Mat4();
    result.data = [
        1 / (aspect*tan_half_fov),                0,                      0,                      0,
                                0, 1 / tan_half_fov,                      0,                      0,
                                0,                0, -1 * (f + n) / (f - n), -1 * (2*f*n) / (f - n),
                                0,                0,                     -1,                      0,
    ];
    result.transpose();
    return result;
}

function create_translate_mat(x: number, y: number, z: number) {
    const result = new Mat4();
    result.data = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1,
    ];
    return result;
}

function create_rotate_mat(degree: number, x: number, y: number, z: number) {
    const radian = degree / 180 * Math.PI;
    const xa = radian * x;
    const ya = radian * y;
    const za = radian * z;

    const cos = Math.cos;
    const sin = Math.sin;

    const result = new Mat4();
    result.data = [
           cos(ya)*cos(za), cos(xa)*sin(za) + sin(xa)*sin(ya)*cos(za), sin(xa)*sin(za) - cos(xa)*sin(ya)*cos(za), 0.0,
        -1*cos(ya)*sin(za), cos(xa)*cos(za) - sin(xa)*sin(ya)*sin(za), sin(xa)*cos(za) + cos(xa)*sin(ya)*sin(za), 0.0,
                   sin(ya),                        -1*sin(xa)*cos(ya),                           cos(xa)*cos(ya), 0.0,
                       0.0,                                       0.0,                                       0.0, 1.0,
    ];
    result.transpose();
    return result;
}

function create_identity_mat() {
    const result = new Mat4();
    result.data = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
    return result;
}


class MyDataGL implements GLUserData {

    private vert_shader_src: string = `
attribute vec4 a_position;
attribute vec4 a_normal;

uniform mat4 u_proj_view_mat;
uniform mat4 u_model_mat;

varying vec3 v_frag_pos;
varying vec3 v_frag_normal;


void main() {
    vec4 world_pos = u_model_mat * a_position;

    v_frag_pos = world_pos.xyz;
    v_frag_normal = normalize((u_model_mat * vec4(a_normal.xyz, 0.0)).xyz);

    gl_Position = u_proj_view_mat * world_pos;
}
`;

    private frag_shader_src: string = `
precision mediump float;


uniform vec3 u_view_pos;

varying vec3 v_frag_pos;
varying vec3 v_frag_normal;


const vec3 to_light_direc = normalize(vec3(0.0, 0.0, 1.0));

const float PI = 3.14159265;
const float EPSILON = 0.0001;

const vec3 ALBEDO = vec3(1.0);
const float METALLIC = 0.0;
const float ROUGHNESS = 0.3;


float _DistributionGGX(float NdotH, float roughness) {
    float a = roughness * roughness;
    float a2 = a*a;
    float NdotH2 = NdotH*NdotH;

    float nom   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / max(denom, EPSILON); // prevent divide by zero for roughness=0.0 and NdotH=1.0
}

float _GeometrySchlickGGX(float NdotV, float roughness) {
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

float _GeometrySmith(float NdotV, float NdotL, float roughness) {
    float ggx2 = _GeometrySchlickGGX(NdotV, roughness);
    float ggx1 = _GeometrySchlickGGX(NdotL, roughness);
    return ggx1 * ggx2;
}

vec3 _fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

vec3 integratePBR(vec3 N, vec3 V, vec3 F0, vec3 L, vec3 albedo, float roughness, float metallic) {
    vec3 H = normalize(V + L);

    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.0);
    float NdotH = max(dot(N, H), 0.0);

    float NDF = _DistributionGGX(NdotH, roughness);
    float G   = _GeometrySmith(NdotV, NdotL, roughness);
    vec3  F   = _fresnelSchlick(NdotH, F0);

    vec3  nominator   = NDF * G * F;
    float denominator = 4.0 * max(dot(N, V), 0.0) * NdotL;
    vec3  specular    = nominator / max(denominator, EPSILON);

    vec3 kD = vec3(1.0) - F;
    kD *= 1.0 - metallic;

    return (kD * albedo / PI + specular) * NdotL;
}


void main() {
    vec3 viewDir    = normalize(u_view_pos - v_frag_pos);

    vec3 F0 = mix(vec3(0.04), ALBEDO, METALLIC);
    vec3 radiance = vec3(2.0);
    vec3 pbrL = integratePBR(v_frag_normal, viewDir, F0, to_light_direc, ALBEDO, ROUGHNESS, METALLIC) * radiance;

    gl_FragColor.rgb = pbrL + vec3(0.1);
    gl_FragColor.a = 1.0;
}
`;

    private default_mesh = new Float32Array([
        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0, -1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ]);

    private color_buffer_data = new Float32Array([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
    ]);

    private program: WebGLProgram = null;
    private vert_buf_pos: WebGLBuffer = null;
    private vert_buf_normal: WebGLBuffer = null;

    private camera_pos = [0, 0, 0];
    private mouse_captured = false;

    //////// Methods ////////

    constructor() {
        this.on_mouse_down = this.on_mouse_down.bind(this);
        this.on_mouse_up = this.on_mouse_up.bind(this);
        this.on_mouse_leave = this.on_mouse_leave.bind(this);
        this.on_mouse_move = this.on_mouse_move.bind(this);
    }

    public init(gl: WebGLRenderingContext) {
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        for ( let i = 0; i < this.default_mesh.length; ++i ) {
            this.default_mesh[i] = this.default_mesh[i] * 0.3;
        }

        const vert_shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vert_shader, this.vert_shader_src);
        gl.compileShader(vert_shader);
        console.log(gl.getShaderInfoLog(vert_shader));

        const frag_shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(frag_shader, this.frag_shader_src);
        gl.compileShader(frag_shader);
        console.log(gl.getShaderInfoLog(frag_shader));

        this.program = gl.createProgram();
        gl.attachShader(this.program, vert_shader);
        gl.attachShader(this.program, frag_shader);
        gl.linkProgram(this.program);

        gl.deleteShader(vert_shader);
        gl.deleteShader(frag_shader);

        this.vert_buf_pos = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vert_buf_pos);
        gl.bufferData(gl.ARRAY_BUFFER, this.default_mesh, gl.STATIC_DRAW);

        this.vert_buf_normal = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vert_buf_normal);
        gl.bufferData(gl.ARRAY_BUFFER, this.color_buffer_data, gl.STATIC_DRAW);
    }

    public draw(gl: WebGLRenderingContext) {
        const now = Date.now() / 1000;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas.
        gl.clearColor(0, 0, 0, 0.1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(this.program);

        // Turn on the attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vert_buf_pos);
        const positionLoc = gl.getAttribLocation(this.program, "a_position");
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vert_buf_normal);
        const normal_loc = gl.getAttribLocation(this.program, "a_normal");
        gl.enableVertexAttribArray(normal_loc);
        gl.vertexAttribPointer(normal_loc, 3, gl.FLOAT, false, 0, 0);

        // Uniforms
        const proj_mat = create_perspective_mat(40, gl.canvas.width / gl.canvas.height, 0.01, 100);
        const view_mat = create_translate_mat(-this.camera_pos[0], -this.camera_pos[1], -this.camera_pos[2]);
        const proj_view_mat = proj_mat.multiply(view_mat);

        const translate_mat = create_translate_mat(0, 0, -2);
        const rotate_mat = create_rotate_mat(now * 30, 0.2, 1, 0);
        const model_mat = translate_mat.multiply(rotate_mat);

        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_model_mat"), false, model_mat.data)
        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_proj_view_mat"), false, proj_view_mat.data)

        gl.uniform3f(gl.getUniformLocation(this.program, "u_view_pos"), this.camera_pos[0], this.camera_pos[1], this.camera_pos[2]);

        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }


    public on_mouse_down(e: React.MouseEvent) {
        console.log(`on_mouse_down: ${e.clientX}, ${e.clientX}`);
        this.mouse_captured = true;
    }

    public on_mouse_up(e: React.MouseEvent) {
        console.log(`on_mouse_down: ${e.clientX}, ${e.clientX}`);
        this.mouse_captured = false;
    }

    public on_mouse_leave(e: React.MouseEvent) {
        this.mouse_captured = false;
    }

    public on_mouse_move(e: React.MouseEvent) {
        const scalar = 0.003;

        if (this.mouse_captured) {
            this.camera_pos[1] += e.movementY * scalar;
            this.camera_pos[0] += -e.movementX * scalar;
        }
    }

};


interface GLViewProps { };

interface GLViewState { };

export class GLView extends React.Component<GLViewProps, GLViewState> {

    constructor(props: GLViewProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Header as='h1' dividing>OpenGL View</Header>

                <Segment basic textAlign='center'>
                    <GLWidget id="glCanvas" width="800" height="450" fps={24} userdata={new MyDataGL()} />
                </Segment>
            </div>
        );
    }

};
