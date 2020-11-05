import * as React from 'react';
import { Message, Header, TextArea, Segment, Form, Button, Dimmer, Loader, Table, Grid } from 'semantic-ui-react';

import * as clt from "../utils/client";
import * as cst from "../utils/konst";
import i18n from '../i18n';


interface SeqListInDBProps {

}

interface SeqListInDBState {

}

export class SeqListInDB extends React.Component<SeqListInDBProps, SeqListInDBState> {

    constructor(props: SeqListInDBProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Header as='h1' dividing>{i18n.t("seq_list_in_db")}</Header>
            </div>
        );
    }

}
