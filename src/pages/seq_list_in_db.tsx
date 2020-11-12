import * as React from 'react';
import { Header, Table, Segment, Grid, Label, Button } from 'semantic-ui-react';

import * as clt from "../utils/client";
import * as cst from "../utils/konst";
import i18n from '../i18n';


interface SeqListInDBProps {

}

interface SeqListInDBState {
    is_loading_list: boolean,
    is_loading_metadata: boolean,

    current_page: number,
    items_per_page: number,

    acc_id_list: string[];
    metadata_dict: object;
}

export class SeqListInDB extends React.Component<SeqListInDBProps, SeqListInDBState> {

    private META_KEYS_TO_SKIP = new Set([
        "sequence",
    ]);

    constructor(props: SeqListInDBProps) {
        super(props);

        this.state = {
            is_loading_list: true,
            is_loading_metadata: false,

            current_page: 0,
            items_per_page: 20,

            acc_id_list: [],
            metadata_dict: {},
        };

        clt.get_all_acc_ids()
            .then(response => {
                const payload = response.data
                const error_code = payload[cst.KEY_ERROR_CODE]

                if (0 == error_code) {
                    this.setState({
                        acc_id_list: payload[cst.KEY_ACC_ID_LIST],
                    })
                }
                else {
                    const err_msg = payload[cst.KEY_ERROR_TEXT];
                    console.log(err_msg);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
            .then(() => {
                this.setState({
                    is_loading_list: false,
                })
            })
    }

    public render() {
        const acc_id_element_list: JSX.Element[] = [];
        const sliced_acc_id_list = this.slice_acc_id_list_of_cur_page();
        const head_index = this.calc_head_index_of_id_list_in_cur_page();

        for (const i in sliced_acc_id_list) {
            const acc_id = sliced_acc_id_list[i];
            let label: JSX.Element = null;
            const label_text = `[${Number(i) + head_index + 1}] ${acc_id}`;

            if (!this.state.is_loading_metadata) {
                label = (
                    <Label as="a" onClick={(e) => {this.on_label_click(e, acc_id)}}>
                        {label_text}
                    </Label>
                );
            }
            else {
                label = (<Label>{label_text}</Label>);
            }

            acc_id_element_list.push(
                <Table.Row key={`acc_id_list_${acc_id}`}>
                    <Table.Cell>
                        {label}
                    </Table.Cell>
                </Table.Row>
            );
        }

        const metadata_element_list = [];
        for (const key in this.state.metadata_dict) {
            const value = this.state.metadata_dict[key];

            if (this.META_KEYS_TO_SKIP.has(key))
                continue;

            metadata_element_list.push(
                <Table.Row key={`metadata ${key} of ${value.acc_id}`}>
                    <Table.Cell>{i18n.t(`meta_${key}`)}</Table.Cell>
                    <Table.Cell>{value}</Table.Cell>
                </Table.Row>
            )
        }

        return (
            <div style={{maxHeight: "100%"}}>
                <Header as='h1' dividing>{i18n.t("seq_list_in_db")}</Header>
                <Grid columns='equal' textAlign="center">

                    <Grid.Row>
                        <Grid columns='equal' textAlign="center" verticalAlign="middle">
                            <Grid.Column>
                                <Button compact onClick={() => {this.add_cur_page(-1)}}>{i18n.t("btn_prev")}</Button>
                            </Grid.Column>
                            <Grid.Column>
                                {`${this.state.current_page + 1} / ${this.count_acc_id_pages()}`}
                            </Grid.Column>
                            <Grid.Column>
                                <Button compact onClick={() => {this.add_cur_page(1)}}>{i18n.t("btn_next")}</Button>
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>

                    <Grid.Column width={4}>
                        <Segment basic loading={this.state.is_loading_list} style={{maxHeight: "10", overflowY: "auto"}}>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center">IDs</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {acc_id_element_list}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                            <Segment basic loading={this.state.is_loading_metadata} style={{maxHeight: "10", overflowY: "auto"}}>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan={2} textAlign="center">{i18n.t("label_metadata")}</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {metadata_element_list}
                                    </Table.Body>
                                </Table>
                            </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    private count_acc_id_pages() {
        return Math.floor(this.state.acc_id_list.length / this.state.items_per_page) + 1;
    }

    private calc_head_index_of_id_list_in_cur_page() {
        return this.state.items_per_page * this.state.current_page;
    }

    private slice_acc_id_list_of_cur_page() {
        const head = this.calc_head_index_of_id_list_in_cur_page();
        const tail = this.state.items_per_page * (this.state.current_page + 1);
        return this.state.acc_id_list.slice(head, tail);
    }

    private add_cur_page(num: number) {
        const max_page_index = this.count_acc_id_pages() - 1;
        let new_index = this.state.current_page + num;

        if (new_index < 0){
            new_index = 0;
        }
        else if (new_index > max_page_index) {
            new_index = max_page_index;
        }

        if (this.state.current_page != new_index) {
            this.setState({
                current_page: new_index,
            });
        }
    }

    private on_label_click(event: React.MouseEvent<HTMLElement>, acc_id: string) {
        event.preventDefault();

        if (this.state.is_loading_metadata)
            return;

        this.setState({
            is_loading_metadata: true,
        });
        console.log(acc_id);

        clt.get_metadata_of_seq(acc_id, [])
            .then(response => {
                const payload = response.data
                const error_code = payload[cst.KEY_ERROR_CODE]

                if (0 == error_code) {
                    this.setState({
                        metadata_dict: payload[cst.KEY_METADATA],
                    })
                }
                else {
                    const err_msg = payload[cst.KEY_ERROR_TEXT];
                    console.log(err_msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .then(() => {
                this.setState({
                    is_loading_metadata: false,
                })
            });
    }

}
