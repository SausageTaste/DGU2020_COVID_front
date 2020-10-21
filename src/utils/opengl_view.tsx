import * as React from 'react';


function get_gl_context(selectors: string): WebGLRenderingContext {
    const canvas: any = document.querySelector(selectors);
    return canvas.getContext("webgl");
}


export interface GLUserData {
    init: (gl: WebGLRenderingContext) => void;
    draw: (gl: WebGLRenderingContext) => void;

    on_mouse_enter?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_leave?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_down?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_up?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_move?: React.MouseEventHandler<HTMLCanvasElement>;
    on_click?: React.MouseEventHandler<HTMLCanvasElement>;
}


interface GLWidgetProps {
    id: string;
    width: string;
    height: string;
    fps: number;

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
        const ud = this.props.userdata;

        return <canvas
            id={this.props.id}
            width={this.props.width}
            height={this.props.height}
            onMouseEnter={ud.on_mouse_enter}
            onMouseLeave={ud.on_mouse_leave}
            onMouseDown={ud.on_mouse_down}
            onMouseUp={ud.on_mouse_up}
            onMouseMove={ud.on_mouse_move}
            onClick={ud.on_click}
        ></canvas>;
    }

    public componentDidMount() {
        const gl = this.glfunc();
        const ud = this.props.userdata;

        ud.init(gl);
        const inter = setInterval(() => ud.draw(gl), 1000 / this.props.fps);
        this.setState({interval: inter});
    }

    public componentWillUnmount() {
        clearInterval(this.state.interval);
        this.setState({interval: null});
    }

    private glfunc() {
        return get_gl_context("#" + this.props.id);
    }

}
