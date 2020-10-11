import * as React from 'react';
import { Header } from 'semantic-ui-react';


export class HomePage extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <Header as="h1" textAlign="center">Home Page</Header>
            </div>
        );
    }

}
