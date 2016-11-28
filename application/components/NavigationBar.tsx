import * as React from "react";
import {Nav, Group, Heading} from "../common/components/Nav";

/**
 * the application navigation bar
 */
export class NavigationBar extends React.Component<{}, {}> {

  /**
   * render the navigation bar
   */
  render() {
    return (
      <Nav isFixed={true} useDarkTheme={true}>
        <Group>
          <Heading>
            The website
          </Heading>
        </Group>
        <Group rightAligned={true}>
        </Group>
      </Nav>
    )
  }
}