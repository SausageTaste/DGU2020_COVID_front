import * as React from 'react';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader, Table, Grid } from 'semantic-ui-react';

import * as clt from "../utils/client";
import * as cst from "../utils/konst";
import i18n from '../i18n';


interface ErrorPromptProps {
    show_err_prompt: boolean;
    err_message: string;
    msg_header: string;
}

class ErrorPrompt extends React.Component<ErrorPromptProps, {}> {

    public render() {
        if (this.props.show_err_prompt) {
            return (
                <Message warning>
                    <Message.Header>{this.props.msg_header}</Message.Header>
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
    is_loading_simil: boolean,
    is_loading_mutations: boolean,

    user_input_1: string;
    user_input_2: string;

    result_cell_texts_1: string;
    result_cell_texts_2: string;
    mutation_list_texts: string[];

    err_message_list: string[];
}

export class TwoSeqComp extends React.Component<TwoSeqCompProps, TwoSeqCompState> {

    constructor(props: TwoSeqCompProps) {
        super(props);

        this.state = {
            is_loading_simil: false,
            is_loading_mutations: false,

            user_input_1: "",
            user_input_2: "",

            result_cell_texts_1: "",
            result_cell_texts_2: "",
            mutation_list_texts: [],

            err_message_list: [],
        };

        this.on_submit_btn_clicked = this.on_submit_btn_clicked.bind(this);
        this.handle_text_area_change_1 = this.handle_text_area_change_1.bind(this);
        this.handle_text_area_change_2 = this.handle_text_area_change_2.bind(this);
    }

    public render() {
        const mutation_element_list = [];
        for (const i in this.state.mutation_list_texts) {
            const value = this.state.mutation_list_texts[i];

            mutation_element_list.push(
                <Table.Row>
                    <Table.Cell textAlign="center">{value}</Table.Cell>
                </Table.Row>
            );
        }
        if (0 == mutation_element_list.length) {
            mutation_element_list.push(
                <Table.Row>
                    <Table.Cell textAlign="center">{i18n.t("no_data")}</Table.Cell>
                </Table.Row>
            );
        }

        const error_prompt_list = [];
        for (const i in this.state.err_message_list) {
            const value = this.state.err_message_list[i];

            error_prompt_list.push(
                <ErrorPrompt
                    show_err_prompt={true}
                    err_message={value}
                    msg_header={i18n.t("an_err_occured")}
                />
            );
        }

        const is_anything_loading = this.is_loading_any();

        return (
            <div>

                <Header as='h1' dividing>{i18n.t("two_seq_comp")}</Header>

                <Segment basic textAlign='center'>
                    <Form onSubmit={this.on_submit_btn_clicked}>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_or_fasta_here")}
                                value={this.state.user_input_1}
                                onChange={this.handle_text_area_change_1}
                                style={{fontFamily: "consolas"}}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_or_fasta_here")}
                                value={this.state.user_input_2}
                                onChange={this.handle_text_area_change_2}
                                style={{fontFamily: "consolas"}}
                            />
                        </Form.Field>
                        <Button primary disabled={is_anything_loading} loading={is_anything_loading} type="submit">{i18n.t("send")}</Button>
                    </Form>

                    {error_prompt_list}
                </Segment>

                <Segment basic loading={this.state.is_loading_simil} style={{maxWidth: 600}}>
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
                </Segment>

                <Segment basic loading={this.state.is_loading_mutations} style={{maxWidth: 600}}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center">{i18n.t("mutation_list")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {mutation_element_list}
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
            err_message_list: [],
        })

        const seq_1 = this.state.user_input_1;
        const seq_2 = this.state.user_input_2;

        if (seq_1.length <= 0 || seq_2.length <= 0) {
            this.setState({
                is_loading_simil: false,
                is_loading_mutations: false,

                err_message_list: [i18n.t("plz_fill_in_blanks")],
            });

            return;
        }

        this.setState({
            is_loading_simil: true,
            is_loading_mutations: true,

            result_cell_texts_1: "",
            result_cell_texts_2: "",
        });

        clt.calc_similarity_of_two_seq(seq_1, seq_2)
            .then((response) => {
                const payload = response.data;
                const error_code = payload[cst.KEY_ERROR_CODE];

                if (0 == error_code) {
                    const simi_bit_score = payload[cst.KEY_SIMILARITY_BIT_SCORE];
                    const simi_identity = payload[cst.KEY_SIMILARITY_IDENTITY];

                    this.setState({
                        result_cell_texts_1: simi_bit_score,
                        result_cell_texts_2: simi_identity,
                    })
                }
                else {
                    const err_msg = payload[cst.KEY_ERROR_TEXT];
                    const new_err_list = this.state.err_message_list.slice();
                    new_err_list.push(err_msg);

                    this.setState({
                        err_message_list: new_err_list,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                const new_err_list = this.state.err_message_list.slice();
                new_err_list.push(err);

                this.setState({
                    err_message_list: new_err_list,
                });
            })
            .then(() => {  // This is technically 'finally'
                this.setState({
                    is_loading_simil: false,
                });
            });

        clt.find_mutations(seq_1, seq_2)
            .then((response) => {
                const payload = response.data;
                const error_code = payload[cst.KEY_ERROR_CODE];

                if (0 == error_code) {
                    const change_list = payload[cst.KEY_MUT_CHANGE_LIST];
                    const indel_list = payload[cst.KEY_MUT_INDEL_LIST];

                    const result_str_list: string[] = [];

                    for (const i in indel_list) {
                        const value = indel_list[i];
                        result_str_list.push(`${value[0]} - ${value[1]}`);
                    }

                    for (const i in change_list) {
                        const value = change_list[i];
                        result_str_list.push(`${value[0]} - ${value[1]} - ${value[2]}`);
                    }

                    this.setState({
                        mutation_list_texts: result_str_list,
                    })
                }
                else {
                    const err_msg = payload[cst.KEY_ERROR_TEXT];
                    const new_err_list = this.state.err_message_list.slice();
                    new_err_list.push(err_msg);

                    this.setState({
                        err_message_list: new_err_list,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                const new_err_list = this.state.err_message_list.slice();
                new_err_list.push(err);

                this.setState({
                    err_message_list: new_err_list,
                });
            })
            .then(() => {  // This is technically 'finally'
                this.setState({
                    is_loading_mutations: false,
                });
            });

    }

    private is_loading_any() {
        if (this.state.is_loading_mutations)
            return true;
        if (this.state.is_loading_simil)
            return true;

        return false;
    }

}
