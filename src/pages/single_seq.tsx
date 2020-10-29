import * as React from 'react';
import { Header } from 'semantic-ui-react';

import * as clt from "./../utils/client";
import i18n from './../i18n';


export class SingleSequence extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <Header as="h1" dividing>{i18n.t("single_seq")}</Header>
            </div>
        );
    }
    
}