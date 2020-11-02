import * as React from 'react';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader, Table, Grid } from 'semantic-ui-react';

import * as clt from "../utils/client";
import * as cst from "../utils/konst";
import i18n from '../i18n';


interface ErrorPromptProps {
    show_err_prompt: boolean;
    err_message: string;
}

class ErrorPrompt extends React.Component<ErrorPromptProps, {}> {

    public render() {
        if (this.props.show_err_prompt) {
            return (
                <Message warning>
                    <Message.Header>Error occured duing processing the sequences</Message.Header>
                    <p>{this.props.err_message}</p>
                </Message>
            );
        }
        else {
            return null;
        }
    }

}


interface TwoSeqCompProps {

}

interface TwoSeqCompState {
    is_loading: boolean;
    user_input_1: string;
    user_input_2: string;

    result_cell_texts_1: string;
    result_cell_texts_2: string;

    show_err_prompt: boolean;
    err_message: string;
}

export class TwoSeqComp extends React.Component<TwoSeqCompProps, TwoSeqCompState> {

    constructor(props: TwoSeqCompProps) {
        super(props);

        this.state = {
            is_loading: false,
            user_input_1: "",
            user_input_2: "",

            result_cell_texts_1: "",
            result_cell_texts_2: "",

            show_err_prompt: false,
            err_message: "",
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
                                onChange={this.handle_text_area_change_1}
                                style={{fontFamily: "consolas"}}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_here")}
                                value={this.state.user_input_2}
                                onChange={this.handle_text_area_change_2}
                                style={{fontFamily: "consolas"}}
                            />
                        </Form.Field>
                        <Button primary disabled={this.state.is_loading} loading={this.state.is_loading} type="submit">{i18n.t("send")}</Button>
                    </Form>

                    <ErrorPrompt show_err_prompt={this.state.show_err_prompt} err_message={this.state.err_message} />
                </Segment>

                <Segment basic loading={this.state.is_loading} style={{maxWidth: 600}}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center" colSpan={2}>{i18n.t("result")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign="center" colSpan={2}>{i18n.t("similarity")}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell collapsing>{i18n.t("simi_bit_score")}</Table.Cell>
                                <Table.Cell>{this.state.result_cell_texts_1}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>{i18n.t("simi_identity")}</Table.Cell>
                                <Table.Cell>{this.state.result_cell_texts_2}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>

                    <Table celled>
                    <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center">{i18n.t("mutation_list")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign="center"></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
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
            is_loading: true,
        });

        const seq_1 = this.state.user_input_1;
        const seq_2 = this.state.user_input_2;

        clt.calc_similarity_of_two_seq(seq_1, seq_2)
            .then((response) => {
                const payload = response.data;
                const error_code = payload[cst.KEY_ERROR_CODE];
                if (0 == error_code) {
                    const simi_bit_score = payload[cst.KEY_SIMILARITY_BIT_SCORE];
                    const simi_identity = payload[cst.KEY_SIMILARITY_IDENTITY];

                    this.setState({
                        is_loading: false,

                        result_cell_texts_1: simi_bit_score,
                        result_cell_texts_2: simi_identity,

                        show_err_prompt: false,
                    })
                }
                else {
                    const err_msg = payload[cst.KEY_ERROR_TEXT];

                    this.setState({
                        is_loading: false,

                        result_cell_texts_1: "",
                        result_cell_texts_2: "",

                        show_err_prompt: true,
                        err_message: err_msg,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    is_loading: false,

                    result_cell_texts_1: "",
                    result_cell_texts_2: "",

                    show_err_prompt: true,
                    err_message: err,
                });
            })
    }

}
