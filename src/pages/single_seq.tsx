import * as React from 'react';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader, Table, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import * as NumericInput from "react-numeric-input";

// import { BootstrapTable } from 'react-bootstrap-table-next';

import * as cst from "../utils/konst";
import * as clt from "./../utils/client";
import i18n from './../i18n';


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

    howmany: number;
    userInput: string;
    acc_id_list: any;

    err_message_list: string[];
}

class AccordionExampleFluid extends React.Component {
    state = { activeIndex: 0 }
  
    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
  
      this.setState({ activeIndex: newIndex })
    }
}

export class SingleSeq extends React.Component<SequenceSearchProps, SequenceSearchState, AccordionExampleFluid> {

    constructor(props: SequenceSearchProps) {
        super(props);

        this.state = {
            shouldReload: false,
            isLoading: false,
            howmany: 10,
            userInput: "",
            acc_id_list: [],
            
            err_message_list: [],
        };

        this.onBtnClicked = this.onBtnClicked.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);

    }

    public render() {
        const max_seq_num = 100;
        const seq_list: JSX.Element[] = [];
        const num_of_rows = Object.keys(this.state.acc_id_list).length;
        let i=1;
        
        
        // const lists = this.state.acc_id_list
        // // const listKeys = Object.keys(lists);

        // for (let id in lists) {
        //     const simil_data = this.state.acc_id_list[id];
        //     const simil_identity = simil_data[cst.KEY_SIMILARITY_IDENTITY];
        //     const simil_bit_score = simil_data[cst.KEY_SIMILARITY_BIT_SCORE];
        //     // seq_list[id] = {id: {id}, similarity: {simil_identity}, bitscore: {simil_bit_score}}
        // }
        
        // const columns = [
        //     // { dataField: 'index', text: 'Index' },
        //     { dataField: 'id', text: 'ID' },
        //     { dataField: 'similarity', text: 'Similarity' },
        //     { dataField: 'bitscore', text: 'Bitscore' },
        // ]
           
        // for (let acc_id in this.state.acc_id_list) {
        //     const simil_data = this.state.acc_id_list[acc_id];
        //     const simil_identity = simil_data[cst.KEY_SIMILARITY_IDENTITY];
        //     const simil_bit_score = simil_data[cst.KEY_SIMILARITY_BIT_SCORE];
        //     // var b = {index: i, id: acc_id, similarity: simil_identity, bitscore: simil_bit_score}
            
            // seq_list.push({id: {acc_id}, similarity: {simil_identity}, bitscore: {simil_bit_score}})
        //     // Object.keys(this.state.acc_id_list).forEach(key=>seq_list.push({index: i, id: acc_id, similarity: simil_identity, bitscore: simil_bit_score}))
    
        //     i++
        // }
        

        // this.state.acc_id_list.map

        for (let acc_id in this.state.acc_id_list) {
            const simil_data = this.state.acc_id_list[acc_id];
            const simil_identity = simil_data[cst.KEY_SIMILARITY_IDENTITY];
            const simil_bit_score = simil_data[cst.KEY_SIMILARITY_BIT_SCORE];

            seq_list.push(
                <Table.Row>
                    <Table.Cell collapsing textAlign="center">{i}</Table.Cell>
                    <Table.Cell textAlign="center">{acc_id}</Table.Cell>
                    <Table.Cell textAlign="center">{Number.isInteger(simil_identity) ? simil_identity : simil_identity.toFixed(4)}</Table.Cell>
                    <Table.Cell textAlign="center">{simil_bit_score}</Table.Cell>
                </Table.Row>
            );

            i++;
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

        
        return (
            <div>
                <DimmerWidget isActivated={this.state.isLoading} />

                <Header as='h1' dividing>{i18n.t("single_seq_query")}</Header>

                <Segment basic>
                    <Form onSubmit={this.onBtnClicked}>
                        <Form.Field> 
                            <label >{i18n.t("put_your_seq_count")}</label>
                            <NumericInput type="text" 
                                placeholder={i18n.t("howmany")}
                                min={1} 
	                            max={max_seq_num} 
	                            step={1}
                                initValue={this.state.howmany}
                                value={this.state.howmany}
                                onChange={value => this.setState({howmany: value})} />
                        </Form.Field>
                        <Form.Field>    
                            <TextArea
                                placeholder={i18n.t("put_your_seq_here")}
                                value={this.state.userInput}
                                onChange={this.handleTextAreaChange}
                                style={{fontFamily: "consolas", whiteSpace: "normal"}} />
                        </Form.Field>
                        <Grid>
                            <Grid.Column textAlign="center">
                                <Button primary type="submit">{i18n.t("send")}</Button>
                            </Grid.Column>
                        </Grid>
                    </Form>

                    {error_prompt_list}

                </Segment>

                <Segment basic textAlign='center'>
                    {/* <BootstrapTable keyField='id' data={ seq_list } columns={ columns } /> */}
                    <Table striped celled>
                        <Table.Header>
                            <Table.Row>                                
                                <Table.HeaderCell textAlign="center" collapsing>{i18n.t("index")}</Table.HeaderCell>
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

    

    private handleTextAreaChange(event) {
        // event.preventDefault();
        this.setState({ userInput: event.currentTarget.value });
    }

    private onBtnClicked = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.setState({
            err_message_list: [],
        })
        
        const seq = this.state.userInput
        const hm = Number(this.state.howmany)

        if (seq.length <= 0){
            this.setState({
                isLoading: false,

                err_message_list: [i18n.t("plz_fill_in_blanks")],
            });

            return;
        }

        this.setState({
            isLoading: true,
        });

        clt.get_similar_seq_ids(seq, hm)
            .then((response) => {
                const payload = response.data
                const error_code = payload[cst.KEY_ERROR_CODE];
                if (0 == error_code) {
                    
                    this.setState({
                        isLoading: false,

                        acc_id_list: payload[cst.KEY_ACC_ID_LIST],
                    })
                    // for (let acc_id in payload.acc_id_list){
                    //     clt.get_metadata_of_seq(acc_id, [])
                                                


                    // }
                    
                }
                else {
                    const err_msg = payload[cst.KEY_ERROR_TEXT];
                    const new_err_list = this.state.err_message_list.slice();
                    new_err_list.push(err_msg);

                    this.setState({
                        isLoading: false,

                        err_message_list: new_err_list,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                const new_err_list = this.state.err_message_list.slice();
                new_err_list.push(err);

                this.setState({
                    isLoading: false,

                    err_message_list: new_err_list,
                });
            })

    };

}
