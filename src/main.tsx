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
    <Route component={pag.Page404} />
</Switch>;


const routes = <BrowserRouter>
    <div id="wrapper" style={{ overflow: "hidden" }}>
        <PageList />
        <main style={{ margin: "1rem 0 1rem 16rem" }}>
            <Container>
                {switches}
            </Container>
        </main>
    </div>
</BrowserRouter>;


render(routes, document.getElementById("app"));
