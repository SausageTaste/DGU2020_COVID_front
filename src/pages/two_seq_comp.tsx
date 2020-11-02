import * as React from 'react';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader } from 'semantic-ui-react';

import * as clt from "../utils/client";
import i18n from '../i18n';


interface TwoSeqCompProps {

}

interface TwoSeqCompState {
    is_loading: boolean;
    user_input_1: string;
    user_input_2: string;
    result_str: string;
}

export class TwoSeqComp extends React.Component<TwoSeqCompProps, TwoSeqCompState> {

    constructor(props: TwoSeqCompProps) {
        super(props);

        this.state = {
            is_loading: false,
            user_input_1: "",
            user_input_2: "",
            result_str: "",
        };

        this.on_submit_btn_clicked = this.on_submit_btn_clicked.bind(this);
        this.handle_text_area_change_1 = this.handle_text_area_change_1.bind(this);
        this.handle_text_area_change_2 = this.handle_text_area_change_2.bind(this);
    }

    public render() {
        return (
            <div>
                <Header as='h1' dividing>{i18n.t("two_seq_comp")}</Header>

                <Segment basic textAlign='center'>
                    <Form onSubmit={this.on_submit_btn_clicked}>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_here")}
                                value={this.state.user_input_1}
                                onChange={this.handle_text_area_change_1} />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_here")}
                                value={this.state.user_input_2}
                                onChange={this.handle_text_area_change_2} />
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
                            value={this.state.result_str} />
                    </Form>
                </Segment>
            </div>
        );
    }

    private handle_text_area_change_1(event: React.FormEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        this.setState({ user_input_1: event.currentTarget.value });
    }

    private handle_text_area_change_2(event: React.FormEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        this.setState({ user_input_2: event.currentTarget.value });
    }

    private on_submit_btn_clicked = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.setState({
            result_str: "",
        });

        this.setState({result_str: this.state.user_input_1 + this.state.user_input_2});
    };

}
