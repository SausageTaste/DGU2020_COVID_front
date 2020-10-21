import * as React from 'react';
import { match } from 'react-router-dom';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader } from 'semantic-ui-react';

import { GLWidget } from "./../utils/opengl_view"


class MyDataGL {

    public r: number;
    public g: number;
    public b: number;
    
    constructor() {
        this.r = 0.1;
        this.g = 0.2;
        this.b = 0.7;
    }

}

function draw_color(gl: WebGLRenderingContext, userdata: MyDataGL) {
    const now = Date.now();
    const color = (now / 1000.0) % 1.0;

    gl.clearColor(userdata.r * color, userdata.g * color, userdata.b * color, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}


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
                    <GLWidget id="glCanvas" width="800" height="450" fps={5} draw_func={draw_color} userdata={new MyDataGL()} />
                </Segment>
            </div>
        );
    }

};
