import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader } from 'semantic-ui-react';
import _ from 'lodash';

import * as clt from "./../utils/client";
import i18n from './../i18n';


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

                <Header as='h1' dividing>{i18n.t("seq_search")}</Header>

                <Segment basic textAlign='center'>
                    <Form onSubmit={this.onBtnClicked}>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_here")}
                                value={this.state.userInput}
                                onChange={this.handleTextAreaChange} />
                        </Form.Field>
                        <Button primary type="submit">{i18n.t("send")}</Button>
                    </Form>
                </Segment>

                <Segment basic textAlign='center'>
                    <Form>
                        <TextArea
                            readOnly
                            style={{ minHeight: 500 }}
                            placeholder={i18n.t("result_will_appear_here")}
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

        clt.get_similar_seq_ids(this.state.userInput, 10)
            .then((response) => {
                this.setState({resultStr: JSON.stringify(response.data, null, '\t')});
                this.setState({isLoading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false});
            })
    };

}
