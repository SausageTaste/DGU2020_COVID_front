import * as React from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';

import i18n from './../i18n';


export class HomePage extends React.Component<{}, {}> {

    public render() {
        return (
            <Segment basic>
            <div>
                <Header as="h1" textAlign="center">{i18n.t("home_page")}</Header>
                
                <p style={{textAlign:'center'}}>COVIDGU는 일반인들도 쉽게 이용할 수 있는 COVID19 염기서열 분석 서비스입니다.</p>
                
                <Header as="h2" style={{marginTop:35}}>저희는 다음과 같은 기능을 제공합니다.</Header>

                <Item.Group divided>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("single_seq_query")}</Item.Header>
                            <Item.Description>보유하고 있는 시퀀스와 유사한 시퀀스들을 조회할 수 있습니다.</Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("two_seq_comp")}</Item.Header>
                            <Item.Description>두 시퀀스의 유사도와 돌연변이 목록을 출력합니다.</Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("seq_list_in_db")}</Item.Header>
                            <Item.Description>우리 서비스가 갖고 있는 시퀀스의 리스트를 확인해보세요.</Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header>{i18n.t("map")}</Item.Header>
                            <Item.Description>전 세계의 지도를 손쉽게 확인할 수 있습니다.</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </div>
            <div style={{marginTop:200, bottom:0, textAlign:'center'}}>
                <Header as="h6">Developed by 24.0</Header>
                <p>윤건식 우성민 이우승 하윤영</p>
            </div>
            </Segment>
        );
    }

}
