import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';

import i18n from './../i18n';
import * as clt from "../utils/client";
import * as cst from "../utils/konst";
import { Canvas2D } from "./../utils/canvas_2d";
import { MyCanvas2DUserData } from "./../utils/seq_canvas_ud";


interface EduNucleotideProps {

}

interface EduNucleotideState {
    userdata: MyCanvas2DUserData;
}

export class EduNucleotide extends React.Component<EduNucleotideProps, EduNucleotideState> {

    private canvas_id: string = "the_canvas";

    ////

    constructor(props: EduNucleotideProps) {
        super(props);

        this.state = {
            userdata: new MyCanvas2DUserData(),
        };

        clt.get_metadata_of_seq("Argentina/C121/2020", [cst.KEY_SEQUENCE])
            .then(response => {
                const payload = response.data
                const error_code = payload[cst.KEY_ERROR_CODE]

                if (0 == error_code) {
                    const sequence = payload[cst.KEY_METADATA][cst.KEY_SEQUENCE];
                    this.state.userdata.set_seq(sequence);
                }
                else {
                    const err_msg = payload[cst.KEY_ERROR_TEXT];
                    console.log(err_msg);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    public render() {
        return (
            <div>
                <Header as='h1' dividing>{i18n.t("title_edu_nucleotide")}</Header>

                <Segment basic textAlign='center'>
                    <Canvas2D id={this.canvas_id} width="800" height="450" fps={60} userdata={this.state.userdata} />
                </Segment>
            </div>
        );
    }

}
