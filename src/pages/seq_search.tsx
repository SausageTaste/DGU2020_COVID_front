import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader } from 'semantic-ui-react';
import _ from 'lodash';

import * as clt from "./../utils/client";
import i18n from './../i18n';

export interface IState {
    datarecords: any[];
    datacolumns: any[];
    // schema: any[];
}

class BuildDynamicTable extends React.Component<RouteComponentProps<any>, IState> {
    //Constructor
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { 
            datarecords: [], 
            datacolumns: [],
        }
    }

    //Methods
    public componentWillMount(): void {
        response => {
            this.setState({datarecords: response.data});
            this.extractColumnNames(); 
            }
    }

    private extractColumnNames() 
    {
        const firstrecord = _.keys(this.state.datarecords[0]);
        this.setState({datacolumns: firstrecord,});
    }

    private displayRecords(key: number) {
        const datacolumns= this.state.datacolumns;
        return datacolumns.map((each_col) =>
        this.displayRecordName(each_col,key))
    }

    private displayRecordName(colname:string, key:number){
        const record = this.state.datarecords[key];
        return <th>{record[colname]}</th>
    }

    private Capitalize(str: string){
        const str_t = str.toUpperCase();
        const str_tt = str_t.replace("_", " ");
        return str_tt;
    }

    public render(){
        const datarecords = this.state.datarecords;
        const table_headers = this.state.datacolumns;
        return (
            <div>
                {datarecords.length === 0 && (
                    <div className="text-center">
                        <h2>No datarecords found at the moment</h2>
                    </div>
                )}
                <div className="container"><div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                {table_headers && table_headers.map(each_table_header => <th scope="col">{this.Capitalize(each_table_header)}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {datarecords && datarecords.map(
                                (each_datarecord, recordindex) =>
                                <tr key={each_datarecord.id}>
                                    {this.displayRecords(recordindex)}
                                </tr>
                            ) }
                        </tbody>
                    </table> 
                </div> </div> 
            </div>
        )
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

    userInput: string
    resultStr: string
}

export class SequenceSearch extends React.Component<SequenceSearchProps, SequenceSearchState> {

    constructor(props: SequenceSearchProps) {
        super(props);

        this.state = {
            shouldReload: false,
            isLoading: false,
            userInput: "",
            resultStr: "",
        };

        this.onBtnClicked = this.onBtnClicked.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }

    public render() {
        return (
            <div>
                <DimmerWidget isActivated={this.state.isLoading} />

                <Header as='h1' dividing>{i18n.t("seq_search")}</Header>

                <Segment basic textAlign='center'>
                    <Form onSubmit={this.onBtnClicked}>
                        <Form.Field>
                            <TextArea
                                placeholder={i18n.t("put_your_seq_here")}
                                value={this.state.userInput}
                                onChange={this.handleTextAreaChange} />
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
                            value={this.state.resultStr} />
                    </Form>
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
            resultStr: "",
        });

        clt.get_similar_seq_ids(this.state.userInput, 10)
            .then((response) => {
                this.setState({resultStr: JSON.stringify(response.data, null, '\t')});
                this.setState({isLoading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false});
            })
    };

}
