import * as React from 'react';


export interface Canvas2DUserData {
    init: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
    draw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;

    on_mouse_enter?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_leave?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_down?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_up?: React.MouseEventHandler<HTMLCanvasElement>;
    on_mouse_move?: React.MouseEventHandler<HTMLCanvasElement>;
    on_click?: React.MouseEventHandler<HTMLCanvasElement>;
}


interface Canvas2DProps {
    id: string;
    width: string;
    height: string;
    fps: number;

    userdata: Canvas2DUserData;
}

interface Canvas2DState {
    interval: NodeJS.Timeout;
    border_style: string;
}

export class Canvas2D extends React.Component<Canvas2DProps, Canvas2DState> {

    constructor(props: Canvas2DProps) {
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
                if (ud.on_mouse_enter) {
                    ud.on_mouse_enter(e);
                }
            }}
            onMouseLeave={(e) => {
                this.setState({border_style: "hidden"});
                if (ud.on_mouse_leave) {
                    ud.on_mouse_leave(e);
                }
            }}
            onMouseDown={(e) => {
                if (ud.on_mouse_down) {
                    ud.on_mouse_down(e);
                }
            }}
            onMouseUp={(e) => {
                if (ud.on_mouse_up) {
                    ud.on_mouse_up(e);
                }
            }}
            onMouseMove={(e) => {
                if (ud.on_mouse_move) {
                    ud.on_mouse_move(e);
                }
            }}
            onClick={(e) => {
                if (ud.on_click) {
                    ud.on_click(e);
                }
            }}
        />;
    }

    private get_canvas(canvas_id: string) {
        return document.getElementById(canvas_id) as HTMLCanvasElement;
    }

    private get_context(canvas: HTMLCanvasElement) {
        return canvas.getContext('2d');
    }

    public componentDidMount() {
        const can = this.get_canvas(this.props.id);
        const ctx = this.get_context(can);
        const ud = this.props.userdata;

        ud.init(can, ctx);
        const inter = setInterval(() => ud.draw(can, ctx), 1000 / this.props.fps);
        this.setState({interval: inter});
    }

    public componentWillUnmount() {
        clearInterval(this.state.interval);
        this.setState({interval: null});
    }

}
