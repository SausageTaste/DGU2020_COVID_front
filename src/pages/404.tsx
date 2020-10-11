import * as React from 'react';
import { Header } from 'semantic-ui-react';


export class Page404 extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <Header as="h1" textAlign="center">Page not found!</Header>
            </div>
        );
    }

}
