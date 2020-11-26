import * as React from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';

import i18n from './../i18n';


export class HomePage extends React.Component<{}, {}> {

    public render() {
        return (
            <Segment basic>
            <div>
                <Header as="h1" textAlign="center">{i18n.t("home_page")}</Header>
                
                <p style={{textAlign:'center'}}>{i18n.t("service_description")}</p>
                
                <Header as="h2" style={{marginTop:35}}>{i18n.t("function_description")}</Header>

                <Item.Group divided>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("single_seq_query")}</Item.Header>
                            <Item.Description>{i18n.t("single_seq_query_description")}</Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("two_seq_comp")}</Item.Header>
                            <Item.Description>
                                <p>{i18n.t("two_seq_comp_description")}</p>
                                <p>{i18n.t("two_seq_comp_description_2")}</p>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("seq_list_in_db")}</Item.Header>
                            <Item.Description>
                                <p>{i18n.t("seq_list_in_db_description")}</p>
                                <p>{i18n.t("seq_list_in_db_description_2")}</p>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("map")}</Item.Header>
                            <Item.Description>{i18n.t("map_description")}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </div>
            <div style={{marginTop:140, bottom:0, textAlign:'center'}}>
                <Header as="h6">Developed by 24.0</Header>
                <p>윤건식 우성민 이우승 하윤영</p>
            </div>
            </Segment>
        );
    }

}
