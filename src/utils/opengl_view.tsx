import * as React from 'react';


function glfunc(selectors: string): WebGLRenderingContext {
    const canvas: any = document.querySelector(selectors);
    return canvas.getContext("webgl");
}


export interface GLUserData {
    init_gl: (gl: WebGLRenderingContext) => void;
}


interface GLWidgetProps {
    id: string;
    width: string;
    height: string;
    fps: number;

    draw_func: (gl: WebGLRenderingContext, userdata: any) => void;
    userdata: GLUserData;
};

interface GLWidgetState {
    interval: NodeJS.Timeout;
};

export class GLWidget extends React.Component<GLWidgetProps, GLWidgetState> {

    constructor(props: GLWidgetProps) {
        super(props);

        this.state = {
            interval: null,
        };
    }

    public render() {
        return <canvas id={this.props.id} width={this.props.width} height={this.props.height}></canvas>;
    }

    public componentDidMount() {
        const gl = glfunc("#" + this.props.id);
        this.props.userdata.init_gl(gl);
        const inter = setInterval(() => this.props.draw_func(gl, this.props.userdata), 1000 / this.props.fps);
        this.setState({interval: inter});
    }

    public componentWillUnmount() {
        clearInterval(this.state.interval);
        this.setState({interval: null});
    }

}
