import * as React from 'react';
import { Header, Table, Segment, Grid, Label, } from 'semantic-ui-react';

import * as clt from "../utils/client";
import * as cst from "../utils/konst";
import i18n from '../i18n';


interface SeqListInDBProps {

}

interface SeqListInDBState {
    is_loading_list: boolean,
    is_loading_metadata: boolean,

    acc_id_list: string[];
    metadata_dict: object;
}

export class SeqListInDB extends React.Component<SeqListInDBProps, SeqListInDBState> {

    constructor(props: SeqListInDBProps) {
        super(props);

        this.state = {
            is_loading_list: true,
            is_loading_metadata: false,

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
                console.log(err);
            })
            .then(() => {
                this.setState({
                    is_loading_list: false,
                })
            })
    }

    public render() {
        const acc_id_element_list: JSX.Element[] = [];
        if (!this.state.is_loading_metadata) {
            for (const i in this.state.acc_id_list) {
                if (Number(i) > 100)
                    break;

                const acc_id = this.state.acc_id_list[i];

                acc_id_element_list.push(
                    <Table.Row>
                        <Table.Cell>
                            <Label as="a" onClick={(e) => {this.on_label_click(e, acc_id)}}>
                                {acc_id}
                            </Label>
                        </Table.Cell>
                    </Table.Row>
                );
            }
        }
        else {
            for (const i in this.state.acc_id_list) {
                if (Number(i) > 100)
                    break;

                const acc_id = this.state.acc_id_list[i];

                acc_id_element_list.push(
                    <Table.Row>
                        <Table.Cell>
                            <Label>
                                {acc_id}
                            </Label>
                        </Table.Cell>
                    </Table.Row>
                );
            }
        }

        const metadata_element_list = [];
        for (const key in this.state.metadata_dict) {
            const value = this.state.metadata_dict[key];

            metadata_element_list.push(
                <Table.Row>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{value}</Table.Cell>
                </Table.Row>
            )
        }

        return (
            <div style={{maxHeight: "100%"}}>
                <Header as='h1' dividing>{i18n.t("seq_list_in_db")}</Header>
                <Grid columns='equal' textAlign="center">

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
                                            <Table.HeaderCell colSpan={2} textAlign="center">Metadata</Table.HeaderCell>
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
