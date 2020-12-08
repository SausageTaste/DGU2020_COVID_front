import * as React from 'react';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader, Table, Grid, Flag, Label, Icon, Card } from 'semantic-ui-react';

import wuhan from "../utils/wuhan.js"
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


interface MutationDataPair {
    mut_text: string;
    score: number;
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
    mutation_list: MutationDataPair[];

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
            mutation_list: [],

            err_message_list: [],
        };

        this.clear_user_input_boxes = this.clear_user_input_boxes.bind(this);
        this.input_refseq = this.input_refseq.bind(this);
        this.on_submit_btn_clicked = this.on_submit_btn_clicked.bind(this);
        this.handle_text_area_change_1 = this.handle_text_area_change_1.bind(this);
        this.handle_text_area_change_2 = this.handle_text_area_change_2.bind(this);
    }

    public render() {
        const mutation_element_list: JSX.Element[] = [];
        for (const i in this.state.mutation_list) {
            const mut = this.state.mutation_list[i];

            mutation_element_list.push(
                <Table.Row key={mut.mut_text}>
                    <Table.Cell textAlign="center">{mut.mut_text}</Table.Cell>
                    {this.make_mut_score_cell(mut.score)}
                </Table.Row>
            );
        }
        if (0 == mutation_element_list.length) {
            mutation_element_list.push(
                <Table.Row key={"mutation_list_no_data"}>
                    <Table.Cell textAlign="center" colSpan="2">{i18n.t("no_data")}</Table.Cell>
                </Table.Row>
            );
        }

        const error_prompt_list: JSX.Element[] = [];
        for (const i in this.state.err_message_list) {
            const value = this.state.err_message_list[i];

            error_prompt_list.push(
                <ErrorPrompt
                    show_err_prompt={true}
                    err_message={value}
                    msg_header={i18n.t("an_err_occured")}
                    key={`two_seq_comp_err_prompt_${i}`}
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

                    <Label as='a' basic style={{float:'left'}} onClick={this.clear_user_input_boxes}>
                        <Icon name='eraser'/>{i18n.t("clear")}
                    </Label>
                    <Label as='a' basic style={{float:'right'}} onClick={this.input_refseq}>
                        <Flag name="cn"></Flag>{i18n.t("compare_with_refseq")}
                    </Label>

                </Segment>

                <Segment basic loading={this.state.is_loading_simil} style={{maxWidth: 400, margin:'0px auto'}}>
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

                <Segment basic loading={this.state.is_loading_mutations} style={{maxWidth: 600, margin:'0px auto'}}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center">{i18n.t("mutation_list")}</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">{i18n.t("danger_level")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {mutation_element_list}
                        </Table.Body>
                    </Table>
                </Segment>

                <Segment basic>
                    <Grid columns='equal' textAlign="center">
                        <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Card fluid color='olive' header={i18n.t("caution")} description={i18n.t("caution_description")}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid color='orange' header={i18n.t("warning")} description={i18n.t("warning_description")}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid color='red' header={i18n.t("danger")} description={i18n.t("danger_description")}/>
                                </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }

    private clear_user_input_boxes(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState({
            user_input_1: "",
            user_input_2: "",
        });
    }

    private input_refseq(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState({
            user_input_2: wuhan
        });
    }

    private handle_text_area_change_1(event: React.FormEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        this.setState({ user_input_1: event.currentTarget.value });
    }

    private handle_text_area_change_2(event: React.FormEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        this.setState({ user_input_2: event.currentTarget.value });
    }

    private make_mut_score_cell(mut_score: number) {
        let is_positive = false;
        let is_warning  = false;
        let is_negative = false;
        let cell_style = null;
        let cell_text: string = "";

        switch (mut_score) {

        case 0:
            cell_text = i18n.t("caution");
            is_positive = true;
            break;
        case 1:
            cell_text = i18n.t("warning");
            is_warning = true;
            break;
        case 2:
            cell_text = i18n.t("danger");
            is_negative = true;
            cell_style = {fontWeight:'bold'};
            break;
        default:
            cell_text = i18n.t("null");
            break;

        }

        return (<Table.Cell
            positive={is_positive}
            warning={is_warning}
            negative={is_negative}
            style={cell_style}
            textAlign="center"
        >{cell_text}</Table.Cell>);
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
                new_err_list.push(err.message);

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

                    const new_mut_list: MutationDataPair[] = [];

                    for (const i in indel_list) {
                        const value: [string, string, number?] = indel_list[i];
                        const indel_pos_split = value[0].split("_");
                        const pos_bigger = Math.max(parseInt(indel_pos_split[0]), parseInt(indel_pos_split[1]));

                        if (pos_bigger <= 200) {
                            continue;
                        }

                        new_mut_list.push({
                            mut_text: `${value[0]} - ${value[1]}`,
                            score: value[2],
                        });
                    }

                    for (const i in change_list) {
                        const value: [string, string, number, number?] = change_list[i];

                        if (value[2] <= 200) {
                            continue;
                        }

                        new_mut_list.push({
                            mut_text: `${value[0]} - ${value[1]} - ${value[2]}`,
                            score: value[3],
                        })
                    }

                    this.setState({
                        mutation_list: new_mut_list,
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
                new_err_list.push(err.message);

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
