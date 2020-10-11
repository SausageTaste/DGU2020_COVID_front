import * as React from 'react';
import { match } from 'react-router-dom';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader } from 'semantic-ui-react';


const FPS = 10;


interface GLWidgetProps {
    id: string
    width: string
    height: string
}

interface GLWidgetState {
    interval: any
}

class GLWidget extends React.Component<GLWidgetProps, GLWidgetState> {

    constructor(props: GLWidgetProps) {
        super(props);

        this.state = {
            interval: null,
        };

        this.draw = this.draw.bind(this);
    }

    public render() {
        return <canvas id={this.props.id} width={this.props.width} height={this.props.height}></canvas>;
    }

    public componentDidMount() {
        const inter = setInterval(() => this.draw(), 1000 * 1 / FPS);
        this.setState({interval: inter});
    }

    public componentWillUnmount() {
        clearInterval(this.state.interval);
        this.setState({interval: null});
    }

    private draw() {
        const canvas: any = document.querySelector("#" + this.props.id);
        const gl = canvas.getContext("webgl");

        const now = Date.now();
        const color = (now / 1000.0) % 1.0;

        gl.clearColor(color, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

}


interface SequenceSearchMatch {
    channelName: string
}

interface GLViewProps {
    match: match<SequenceSearchMatch>
}

interface GLViewState {

}

export class GLView extends React.Component<GLViewProps, GLViewState> {

    constructor(props: GLViewProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Header as='h1' dividing>OpenGL View</Header>

                <Segment basic textAlign='center'>
                    <GLWidget id="glCanvas" width="800" height="450" />
                </Segment>
            </div>
        );
    }

}
