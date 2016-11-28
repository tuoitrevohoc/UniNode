import * as React from "react";
import {Menu, Item} from "../common/ui";
import {appData} from "../stores/AppData";

/**
 * The navigation menu
 */
export class SidebarMenu extends React.Component<{}, {}> {

  render() {
    console.log(appData.menus);

    return (
      <Menu isVertical className="drawer">
        <Item to='/' icon='home'>Home</Item>
        {appData.menus.map(menu => menu.props.children)}
      </Menu>
    );
  }
}