import * as React from "react";
import { render } from "react-dom";
import { Switch } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { PageList } from "./major_elements/page_list";
import * as pag from "./pages";


const switches = <Switch>
    <Route
        exact={true}
        path="/"
        component={pag.HomePage} />
    <Route
        exact={true}
        path="/seq_search"
        component={pag.SequenceSearch} />
    <Route
        exact={true}
        path="/gl_view"
        component={pag.GLView} />
</Switch>;


interface MainAppState {
    assign_anythong_to_redraw: number;
}

class MainApp extends React.Component<{}, MainAppState> {

    constructor(props) {
        super(props);
        this.state = {assign_anythong_to_redraw: 0};
    }

    public redraw() {
        if (0 == this.state.assign_anythong_to_redraw) {
            this.setState({assign_anythong_to_redraw: 1});
        }
        else {
            this.setState({assign_anythong_to_redraw: 0});
        }
    }

    public render() {
        return (
            <BrowserRouter>
                <div id="wrapper" style={{ overflow: "hidden" }}>
                    <PageList redraw_func={() => this.redraw()}/>
                    <main style={{ margin: "1rem 0 1rem 16rem" }}>
                        <Container>
                            {switches}
                        </Container>
                    </main>
                </div>
            </BrowserRouter>
        );
    }

}


const routes = <MainApp />;
render(routes, document.getElementById("app"));
