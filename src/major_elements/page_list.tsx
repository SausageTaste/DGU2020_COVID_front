import * as React from "react";
import { Menu, Icon, Header, Dropdown } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

import "./../i18n";
import i18n from "./../i18n";


interface PageListProp {
    redraw_func: () => void;
}

export class PageList extends React.Component<PageListProp, {}> {

    channels = ["general", "random"];

    page_items = [
        <Menu.Item
            key="home"
            as={NavLink}
            to={{ pathname: `/` }}>
            <h1>{i18n.t("home")}</h1>
        </Menu.Item>,

        <Menu.Item
            key="seq_search"
            as={NavLink}
            to={{ pathname: `/seq_search` }}>
            {i18n.t("seq_search")}
        </Menu.Item>,

        <Menu.Item
            key="gl_view"
            as={NavLink}
            to={{ pathname: `/gl_view` }}>
            {i18n.t("opengl_view")}
        </Menu.Item>,
    ];

    ////////

    public render() {
        return (
            <Menu inverted pointing vertical fixed={"left"}>
                <Menu.Item>
                    <Menu.Menu>{this.page_items}</Menu.Menu>
                </Menu.Item>

                <Dropdown item simple text="Language">
                    <Dropdown.Menu>
                        <Dropdown.Item text="English" onClick={() => this.change_lang("en")} />
                        <Dropdown.Item text="한국어" onClick={() => this.change_lang("kr")} />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        );
    }

    private change_lang(lang: string) {
        i18n.changeLanguage(lang);
        this.props.redraw_func();
    }

};
