import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader, Table } from 'semantic-ui-react';
import _ from 'lodash';

import * as cst from "../utils/konst";
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

    userInput: string;
    acc_id_list: any;
}

export class SingleSeq extends React.Component<SequenceSearchProps, SequenceSearchState> {

    id_list = ["Identity", "BitScore"];

    ///
    // function List({id_list})(int:any) {
    //     return(
    //         <div>{id_list.Identity} {id_list.Bitscore}</div>
    //     )
    // }:void

    constructor(props: SequenceSearchProps) {
        super(props);

        this.state = {
            shouldReload: false,
            isLoading: false,
            userInput: "",
            acc_id_list: [],
        };

        this.onBtnClicked = this.onBtnClicked.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }

    public render() {
        const seq_list: JSX.Element[] = [];
        const num_of_rows = Object.keys(this.state.acc_id_list).length;

        for (let acc_id in this.state.acc_id_list) {
            const simil_data = this.state.acc_id_list[acc_id];
            const simil_identity = simil_data[cst.KEY_SIMILARITY_IDENTITY];
            const simil_bit_score = simil_data[cst.KEY_SIMILARITY_BIT_SCORE];

            seq_list.push(
                <Table.Row>
                    <Table.Cell collapsing textAlign="center">{acc_id}</Table.Cell>
                    <Table.Cell collapsing textAlign="center">{Number.isInteger(simil_identity) ? simil_identity : simil_identity.toFixed(4)}</Table.Cell>
                    <Table.Cell collapsing textAlign="center">{simil_bit_score}</Table.Cell>
                </Table.Row>
            );
        }

        return (
            <div>
                <DimmerWidget isActivated={this.state.isLoading} />

                <Header as='h1' dividing>{i18n.t("single_seq")}</Header>

                <Segment basic textAlign='center'>
                    <Form onSubmit={this.onBtnClicked}>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_here")}
                                value={this.state.userInput}
                                onChange={this.handleTextAreaChange}
                                style={{fontFamily: "consolas"}} />
                        </Form.Field>
                        <Button primary type="submit">{i18n.t("send")}</Button>
                    </Form>
                </Segment>

                <Segment basic textAlign='center'>
                    {/* <Form>
                        <TextArea
                            readOnly
                            style={{ minHeight: 500 }}
                            placeholder={i18n.t("result_will_appear_here")}
                            value={this.state.resultStr} />
                    </Form> */}

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center">{i18n.t("sequence_id")}</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">{i18n.t("similarity")}</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">{i18n.t("bit_score")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {seq_list}
                        </Table.Body>
                    </Table>
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
        });

        clt.get_similar_seq_ids(this.state.userInput, 10)
            .then((response) => {
                const payload = response.data
                // this.setState({resultStr: JSON.stringify(response.data, null, '\t')});
                this.setState({acc_id_list: payload[cst.KEY_ACC_ID_LIST]})
                this.setState({isLoading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false});
            })
    };

}
