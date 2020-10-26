import * as React from "react";
import { Menu, Icon, Header, Dropdown } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";


export class PageList extends React.Component<{}, {}> {

    channels = ["general", "random"];

    page_items = [
        <Menu.Item
            key="home"
            as={NavLink}
            to={{ pathname: `/` }}>
            <h1>Home</h1>
        </Menu.Item>,

        <Menu.Item
            key="seq_search"
            as={NavLink}
            to={{ pathname: `/seq_search` }}>
            Sequence Search
        </Menu.Item>,

        <Menu.Item
            key="gl_view"
            as={NavLink}
            to={{ pathname: `/gl_view` }}>
            OpenGL View
        </Menu.Item>,
    ]

    public render() {
        return (
            <Menu inverted pointing vertical fixed={"left"}>
                <Menu.Item>
                    <Menu.Menu>{this.page_items}</Menu.Menu>
                </Menu.Item>

                <Dropdown item simple text="Language">
                    <Dropdown.Menu>
                        <Dropdown.Item text="English" />
                        <Dropdown.Item text="한국어" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        );
    }

};
