import * as React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import i18n from "./../i18n";


interface PageListProp {
    redraw_func: () => void;
}

export class PageList extends React.Component<PageListProp, {}> {

    channels = ["general", "random"];

    ////////

    public render() {
        const page_items: JSX.Element[] = [
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

            <Menu.Item
                key="seq_list_in_db"
                as={NavLink}
                to={{ pathname: `/seq_list_in_db` }}>
                {i18n.t("seq_list_in_db")}
            </Menu.Item>,

            <Menu.Item
                key="single_seq"
                as={NavLink}
                to={{ pathname: `/single_seq` }}>
                {i18n.t("single_seq_query")}
            </Menu.Item>,

            <Menu.Item
                key="two_seq_comp"
                as={NavLink}
                to={{ pathname: `/two_seq_comp` }}>
                {i18n.t("two_seq_comp")}
            </Menu.Item>,

            <Menu.Item
                key="map"
                as={NavLink}
                to={{ pathname: `/map` }}>
                {i18n.t("map")}
            </Menu.Item>,
        ];

        // This is something like compiler switch
        // '//*' enables upper block
        // '/*' enables lower block
/*
        const test_items = [];
        for (let i = 0; i < 200; ++i) {
            test_items.push(
                <Menu.Item
                    key="gl_view"
                    as={NavLink}
                    to={{ pathname: `/no${i}` }}>
                    Test item {i}
                </Menu.Item>
            );
        }
        let item_list = page_items.concat(test_items);
/*/
        let item_list = page_items;
//*/

        return (
            <Menu pointing secondary vertical fixed={"left"}>
                <Menu.Item
                    key="home"
                    as={NavLink}
                    to={{ pathname: `/` }}>
                    <h1>{i18n.t("home")}</h1>
                </Menu.Item>

                <Dropdown item simple text="Language">
                    <Dropdown.Menu>
                        <Dropdown.Item text="English" onClick={() => this.change_lang("en")} />
                        <Dropdown.Item text="한국어" onClick={() => this.change_lang("kr")} />
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item style={{ maxHeight: "calc(100% - 100px)", overflowY: "auto", overflowX: "hidden" }}>
                    <Menu.Menu>{item_list}</Menu.Menu>
                </Menu.Item>
            </Menu>
        );
    }

    private change_lang(lang: string) {
        i18n.changeLanguage(lang);
        this.props.redraw_func();
    }

};
