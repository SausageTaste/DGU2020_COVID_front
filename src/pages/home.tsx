import * as React from 'react';
import { Header } from 'semantic-ui-react';

import i18n from './../i18n';


export class HomePage extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <Header as="h1" textAlign="center">{i18n.t("home_page")}</Header>
            </div>
        );
    }

}
