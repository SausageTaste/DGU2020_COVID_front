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
    border_style: string;
};

export class GLWidget extends React.Component<GLWidgetProps, GLWidgetState> {

    constructor(props: GLWidgetProps) {
        super(props);

        this.state = {
            interval: null,
            border_style: "hiddle",
        };
    }

    public render() {
        const ud = this.props.userdata;

        return <canvas
            id={this.props.id}
            width={this.props.width}
            height={this.props.height}
            style={{
                borderColor: "red",
                borderWidth: 2,
                borderTopLeftRadius: 1,
                borderStyle: this.state.border_style,
            }}

            onMouseEnter={(e) => {
                this.setState({border_style: "solid"});
                if (ud.on_mouse_enter)
                    ud.on_mouse_enter(e);
            }}
            onMouseLeave={(e) => {
                this.setState({border_style: "hidden"});
                if (ud.on_mouse_leave)
                    ud.on_mouse_leave(e);
            }}
            onMouseDown={(e) => {
                if (ud.on_mouse_down)
                    ud.on_mouse_down(e);
            }}
            onMouseUp={(e) => {
                if (ud.on_mouse_up)
                    ud.on_mouse_up(e);
            }}
            onMouseMove={(e) => {
                if (ud.on_mouse_move)
                    ud.on_mouse_move(e);
            }}
            onClick={(e) => {
                if (ud.on_click)
                    ud.on_click(e);
            }}
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
