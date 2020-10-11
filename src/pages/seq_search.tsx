import * as React from 'react';
import { match } from 'react-router-dom';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader } from 'semantic-ui-react';

import { requestEcho } from "./../utils/client";


class DimmerWidget extends React.Component<{ isActivated: boolean }, {}> {

    constructor(props: { isActivated: boolean }) {
        super(props);
    }

    public render() {
        if (this.props.isActivated) {
            return (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            );
        }
        else {
            return null;
        }
    }

}


interface SequenceSearchProps {

}

interface SequenceSearchState {
    shouldReload: boolean
    isLoading: boolean

    userInput: string
    resultStr: string
}

export class SequenceSearch extends React.Component<SequenceSearchProps, SequenceSearchState> {

    constructor(props: SequenceSearchProps) {
        super(props);

        this.state = {
            shouldReload: false,
            isLoading: false,
            userInput: "",
            resultStr: "",
        };

        this.onBtnClicked = this.onBtnClicked.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }

    public render() {
        return (
            <div>
                <DimmerWidget isActivated={this.state.isLoading} />

                <Header as='h1' dividing>Seach Sequence</Header>

                <Segment basic textAlign='center'>
                    <Form onSubmit={this.onBtnClicked}>
                        <Form.Field>
                            <TextArea
                                placeholder="Put your sequence string here"
                                value={this.state.userInput}
                                onChange={this.handleTextAreaChange} />
                        </Form.Field>
                        <Button primary type="submit">Send</Button>
                    </Form>
                </Segment>

                <Segment basic textAlign='center'>
                    <Form>
                        <TextArea
                            readOnly
                            style={{ minHeight: 500 }}
                            placeholder="Result may appear here"
                            value={this.state.resultStr} />
                    </Form>
                </Segment>
            </div>
        );
    }

    private handleTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        this.setState({ userInput: event.currentTarget.value });
    }

    private onBtnClicked = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.setState({
            isLoading: true,
            resultStr: "",
        });

        requestEcho(this.state.userInput)
            .then((response) => {
                this.setState({resultStr: JSON.stringify(response, null, '\t')});
                this.setState({isLoading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false});
            })
    };

}
