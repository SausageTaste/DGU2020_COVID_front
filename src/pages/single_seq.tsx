import * as React from 'react';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader, Table, Grid, Container } from 'semantic-ui-react';
import _ from 'lodash';
import * as NumericInput from "react-numeric-input";

import { Map, GoogleApiWrapper, IMapProps, Circle, InfoWindow } from 'google-maps-react';

import '../major_elements/index.js';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

import * as cst from "../utils/konst";
import * as clt from "../utils/client";
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

class MapContainer extends React.Component<IMapProps> {

    constructor(props) {
        super(props);
    }
}


interface SequenceSearchProps {

}

interface SequenceSearchState {
    shouldReload: boolean
    isLoading: boolean
    isLoading_metadata: boolean
    isSubmit: boolean

    howmany: number;
    userInput: string;
    acc_id_list: any;
    metadata_dict: object;
    country_list: any;

    err_message_list: string[];
}


export class SingleSeq extends React.Component<SequenceSearchProps, SequenceSearchState, MapContainer> {

    private META_KEYS_TO_SKIP = new Set([
        "sequence",
    ]);

    constructor(props: SequenceSearchProps) {
        super(props);

        this.state = {
            shouldReload: false,
            isLoading: false,
            isLoading_metadata: false,
            isSubmit: false,
            howmany: 10,
            userInput: "",
            acc_id_list: [],
            metadata_dict: {},
            country_list: [],
            
            err_message_list: [],
        };

        this.onBtnClicked = this.onBtnClicked.bind(this);
        this.onCellClicked = this.onCellClicked.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);

    }

    public render() {
        const max_seq_num = 250;
        
        //sequence_list
        const lists = this.state.acc_id_list
        const seq_list = [];
        for (const acc_id in lists) {
            seq_list.push({
                acc_id: acc_id,
                simil_identity: lists[acc_id][cst.KEY_SIMILARITY_IDENTITY],
                simil_bit_score: lists[acc_id][cst.KEY_SIMILARITY_BIT_SCORE],
            });
        }
        
        //metadata_list
        const metadata_element_list = [];
        for (const key in this.state.metadata_dict) {
            const value = this.state.metadata_dict[key];
            
            if (this.META_KEYS_TO_SKIP.has(key))
            continue;
            
            metadata_element_list.push(
                <Table.Row key={`metadata ${key} of ${value.acc_id}` }>
                    <Table.Cell>{i18n.t(`meta_${key}`)}</Table.Cell>
                    <Table.Cell>{value}</Table.Cell>
                </Table.Row>
            )
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
        
        //About Bootstrap Table/////////////////////////////////////////////////////
        const columns = [
            { dataField: 'acc_id', text: i18n.t("sequence_id"), sort: true },
            { dataField: 'simil_identity', text: i18n.t("similarity"), sort: true },
            { dataField: 'simil_bit_score', text: i18n.t("bit_score"), sort: true },
        ]

        const rowEvents = {
            onClick: (e, row) => {
                {this.onCellClicked(e, `${row.acc_id}`)}
            }
        };

        //map
        const mapStyles = {
            width: '72%',
            height: '70%',
            textAlign: 'center',
          };

        const ctryinfo = this.state.country_list
        const mapinfo = [];
        if (this.state.isSubmit){
            for (const country in ctryinfo) {
                if (ctryinfo[country]['center']!=null){
                    mapinfo.push(
                    <Circle
                        strokeColor= "#FF0000"
                        trokeOpacity= {0.8}
                        strokeWeight= {2}
                        fillColor= "#FF0000"
                        fillOpacity= {0.35}
                        center= {ctryinfo[country]['center']}
                        radius= {Math.log(ctryinfo[country]['num_cases']+1)*10000}
                    />
                    )
                } else continue;
            }
        }

        return (
            <div>
                <DimmerWidget isActivated={this.state.isLoading} />

                <Header as='h1' dividing>{i18n.t("single_seq_query")}</Header>

                <Segment basic>
                    <Form onSubmit={this.onBtnClicked}>
                        {/* <Form.Field> 
                            <label >{i18n.t("put_your_seq_count")}</label>
                            <NumericInput type="text" 
                                placeholder={i18n.t("howmany")}
                                min={1} 
	                            max={max_seq_num} 
	                            step={1}
                                initValue={this.state.howmany}
                                value={this.state.howmany}
                                onChange={value => this.setState({howmany: value})} />
                        </Form.Field> */}
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
                
                

                <Grid columns='equal' textAlign="center">
                    <Grid.Column>
                        <Segment basic textAlign='center'>
                            <BootstrapTable 
                                bootstrap4
                                keyField='acc_id' 
                                data={ seq_list } 
                                columns={ columns } 
                                noDataIndication={i18n.t("no_data")}
                                // expandRow={ expandRow }
                                rowEvents={ rowEvents }
                                pagination={ paginationFactory() }/>   
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic loading={this.state.isLoading_metadata}>
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
                <div>
                    <Map
                        google={window.google}
                        zoom={2}
                        // centerAroundCurrentLocation={true}
                        style={mapStyles}
                        initialCenter={{ lat: 35, lng: 155 }}
                    >

                    {mapinfo}

                    </Map>
                </div>
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

        if (seq.length <= 0){
            this.setState({
                isLoading: false,

                err_message_list: [i18n.t("plz_fill_in_blanks")],
            });

            return;
        }

        this.setState({
            isLoading: true,
            isSubmit: true,
        });

        clt.get_similar_seq_ids(seq, 250)
            .then((response) => {
                const payload = response.data
                const error_code = payload[cst.KEY_ERROR_CODE];
                if (0 == error_code) {
                    this.setState({
                        isLoading: false,

                        acc_id_list: payload[cst.KEY_ACC_ID_LIST],
                        country_list: payload[cst.KEY_FREQ_LATLNG_MAP],
                    })
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
                new_err_list.push(err.message);

                this.setState({
                    isLoading: false,

                    err_message_list: new_err_list,
                });
            })
        };

        

    private onCellClicked(event: React.MouseEvent<HTMLElement>, acc_id: string) {
        event.preventDefault();

        if (this.state.isLoading_metadata)
            return;

        this.setState({
            isLoading_metadata: true,
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
                    isLoading_metadata: false,
                })
            });
    }

}
