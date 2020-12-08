import * as React from 'react';

import i18n from './../i18n';

interface desProps {};
interface desState {
    toggle: boolean
};

export default class Describe_seq_list_in_db extends React.Component<desProps, desState> {

    constructor(props){
        super(props)
        this.state = {
            toggle: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
    }
    
    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    public render() {
        const describe_style = {
            marginLeft: '20px',
        };
        
        const open_txt = (<span onClick={this.handleToggle}>{i18n.t("describe_open")}</span>);
        const cloes_txt = (<span onClick={this.handleToggle}>{i18n.t("describe_close")}</span>);
        
        const describe_txt = (
            <div style={describe_style}>
                <br/>
                <p>{i18n.t("describe_method_seq_list_in_db")}</p>
                <br/>
                <p>{i18n.t("describe_feature_of_function")}</p>
                <div style={describe_style}>
                    <p>{i18n.t("describe_feature_1_seq_list_in_db")}</p>
                    <p>{i18n.t("describe_feature_2_seq_list_in_db")}</p>
                    <p>{i18n.t("describe_feature_3_seq_list_in_db")}</p>
                    <p>{i18n.t("describe_feature_4_seq_list_in_db")}</p>
                    <p>{i18n.t("describe_feature_5_seq_list_in_db")}</p>
                </div>
            </div>);

        return (
            <div>
                <br/>
                {this.state.toggle ? cloes_txt: open_txt}
                {this.state.toggle ? describe_txt: <div></div>}            
            </div>
            );
    }

}
