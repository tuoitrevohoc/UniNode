import * as React from "react";
import {Nav, Group, Item} from "../common/ui";

/**
 * the application navigation bar
 */
export class NavigationBar extends React.Component<{}, {}> {

  /**
   * render the navigation bar
   */
  render() {
    return (
      <Nav isFixed={true}>
        <Group>
          <Item className='brand' icon='code'>
            Administrator Console
          </Item>
          <Item icon="content" />
        </Group>
        <Group rightAligned={true}>
          <Item icon='alarm' />
        </Group>
      </Nav>
    )
  }
}