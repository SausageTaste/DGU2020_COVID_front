import * as React from 'react';
import { Header } from 'semantic-ui-react';

import i18n from './../i18n';


interface EduNucleotideProps {

}

interface EduNucleotideState {

}

export class EduNucleotide extends React.Component<EduNucleotideProps, EduNucleotideState> {

    constructor(props: EduNucleotideProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Header as='h1' dividing>{i18n.t("title_edu_nucleotide")}</Header>
            </div>
        );
    }

}
