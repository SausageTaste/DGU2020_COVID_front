import * as React from 'react';
import { Header, Table, Segment, Grid, Label, Button } from 'semantic-ui-react';
import * as copy_text_to_clipboard from 'copy-to-clipboard';

import { Map, GoogleApiWrapper, IMapProps, Circle, InfoWindow } from 'google-maps-react';

import * as clt from "../utils/client";
import * as cst from "../utils/konst";
import i18n from '../i18n';
import { Canvas2D } from "./../utils/canvas_2d";
import { MyCanvas2DUserData } from "./../utils/seq_canvas_ud";


interface SeqListInDBProps {

}

interface SeqListInDBState {
    is_loading_list: boolean,
    is_loading_metadata: boolean,
    is_showing_copied_prompt: boolean,

    current_page: number,
    items_per_page: number,

    acc_id_list: string[];
    metadata_dict: object;
    country_list: any,

    userdata: MyCanvas2DUserData;

    //map
    info_box_lat: number,
    info_box_lng: number,
    map: any,
    cases: number,
    country: string,
    showingInfoWindow: boolean,
}

interface MapContainerState {
    zoom_level: number;
    info_box_lat: number,
    info_box_lng: number,
  
    map: any,
  }
  
class MapContainer extends React.Component<IMapProps, MapContainerState> {
    
    constructor(props) {
      super(props);
  
      this.state = {
        zoom_level: 2,
        info_box_lat: 35,
        info_box_lng: 155,
  
        map: null,
      }
    }
    //   this.on_zoom_changed = this.on_zoom_changed.bind(this);

}  

export class SeqListInDB extends React.Component<SeqListInDBProps, SeqListInDBState, MapContainer> {

    private META_KEYS_TO_SKIP = new Set([
        "sequence",
    ]);

    constructor(props: SeqListInDBProps) {
        super(props);

        this.state = {
            is_loading_list: true,
            is_loading_metadata: false,
            is_showing_copied_prompt: false,

            current_page: 0,
            items_per_page: 20,

            acc_id_list: [],
            metadata_dict: {},
            country_list: [],

            userdata: new MyCanvas2DUserData(),

            //map
            info_box_lat: 35,
            info_box_lng: 155,
            map: null,
            cases: 0,
            country: "",
            showingInfoWindow: false,
        };

        this.Mouseover_Circle = this.Mouseover_Circle.bind(this);
        this.Mouseout_Circle = this.Mouseout_Circle.bind(this);

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

                const first_acc_id = payload[cst.KEY_ACC_ID_LIST][0];
                this.select_a_data(first_acc_id);
            })
            .catch(err => {
                console.log(err.message);
            })
            .then(() => {
                this.setState({
                    is_loading_list: false,
                })
            })

        clt.num_cases_per_country()
            .then(response => {
            const payload = response.data
            const error_code = payload[cst.KEY_ERROR_CODE]
    
            if (0 == error_code) {
                this.setState({
                    country_list: payload[cst.KEY_RESULT]
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

        const metadata_element_list: JSX.Element[] = [];
        for (const key in this.state.metadata_dict) {
            if (this.META_KEYS_TO_SKIP.has(key)) {
                continue;
            }

            metadata_element_list.push(
                <Table.Row key={`metadata ${key} of ${this.state.metadata_dict["strain"]}`}>
                    <Table.Cell>{i18n.t(`meta_${key}`)}</Table.Cell>
                    <Table.Cell>{this.state.metadata_dict[key]}</Table.Cell>
                </Table.Row>
            );
        }

        let copied_prompt = null;
        if (this.state.is_showing_copied_prompt) {
            copied_prompt = <Label pointing="left">{i18n.t("copied")}</Label>;
        }

        //map
        const mapStyles = {
            width: '98%',
            height: '500px',
            textAlign: 'center',
          };
      
        const ctryinfo = this.state.country_list
        const mapinfo = [];
        for (const country in ctryinfo) {
            if (ctryinfo[country]['center']!=null){
                mapinfo.push(
                <Circle
                    key={`Circle of ${country}`}
                    country={i18n.t(`${country}`)}
                    cases={`${ctryinfo[country]['num_cases']}`}
                    strokeColor= "#FF0000"
                    trokeOpacity= {0.8}
                    strokeWeight= {0.8}
                    fillColor= "#FF0000"
                    fillOpacity= {0.35}
                    onMouseover={this.Mouseover_Circle}
                    onMouseout={this.Mouseout_Circle}
                    center= {ctryinfo[country]['center']}
                    radius= {Math.log(ctryinfo[country]['num_cases']+1)*30000}
                />
                )
            } else continue;
        }

        return (
            <div style={{maxHeight: "100%"}}>
                <Header as='h1' dividing>{i18n.t("seq_list_in_db")}</Header>

                <Segment basic>
                    <Map
                        google={window.google}
                        zoom={2}
                        style={mapStyles}
                        initialCenter={{ lat: 35, lng: 155 }}
                        >
                        {mapinfo}
                        <InfoWindow
                            marker={null}
                            google={window.google}
                            map={this.state.map}
                            position={{ lat: this.state.info_box_lat, lng: this.state.info_box_lng }}
                            visible={this.state.showingInfoWindow}
                        >
                            <p style={{fontWeight:'bold', textTransform: 'capitalize'}}>{this.state.country}</p>
                            <p>{this.state.cases}</p>
                        </InfoWindow>
                    </Map>
                </Segment>

                <Grid columns='equal' textAlign="center" style={{marginTop:500}}>

                    <Grid.Row>
                        <Grid columns={3}>
                            <Grid.Column textAlign="right">
                                <Button compact onClick={() => {this.add_cur_page(-1)}}>{i18n.t("btn_prev")}</Button>
                            </Grid.Column>
                            <Grid.Column>
                                {`${this.state.current_page + 1} / ${this.count_acc_id_pages()}`}
                            </Grid.Column>
                            <Grid.Column textAlign="left">
                                <Button compact onClick={() => {this.add_cur_page(1)}}>{i18n.t("btn_next")}</Button>
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>

                    <Grid.Column width={5}>
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
                        <Segment basic textAlign='center'>
                            <Canvas2D id={"seq_canvas"} width="600" height="250" fps={60} userdata={this.state.userdata} />
                        </Segment>

                        <Segment basic textAlign='left'>
                            <Button
                                compact
                                onClick={() => this.on_copy_btn_clicked()}

                            >{i18n.t("copy_seq_clipboard")}</Button>
                            {copied_prompt}
                        </Segment>

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

    private select_a_data(acc_id: string) {
        if (this.state.is_loading_metadata)
            return;

        this.setState({
            is_loading_metadata: true,
        });

        clt.get_metadata_of_seq(acc_id, [])
            .then(response => {
                const payload = response.data
                const error_code = payload[cst.KEY_ERROR_CODE]

                if (0 == error_code) {
                    this.state.userdata.set_seq(payload[cst.KEY_METADATA][cst.KEY_SEQUENCE]);
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

    private on_label_click(event: React.MouseEvent<HTMLElement>, acc_id: string) {
        event.preventDefault();
        this.select_a_data(acc_id);
    }

    private on_copy_btn_clicked() {
        copy_text_to_clipboard(this.state.metadata_dict[cst.KEY_SEQUENCE]);

        this.setState({
            is_showing_copied_prompt: true,
        });

        setTimeout(() => this.setState({is_showing_copied_prompt: false}), 3000);
    }

    //map_event
    private Mouseover_Circle(a:any, map?: google.maps.Map,) {
    this.setState({
        showingInfoWindow: true,
        info_box_lat: a.center.lat,
        info_box_lng: a.center.lng,
        country: a.country,
        cases: a.cases,
        map: map,
        })
    }

    private Mouseout_Circle() {
    if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
        })
    }};

}
