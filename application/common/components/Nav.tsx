import * as React from "react";

/**
 * navigation bars
 */
interface NavProps {

  /**
   * class name
   */
  className?: string;

  /**
   * is the navigation bar fixed to the top
   */
  isFixed?: boolean;

  /**
   * use dark theme
   */
  useDarkTheme?: boolean;
}

/**
 * the navigation bar
 */
export class Nav extends React.Component<NavProps, {}>{

  /**
   * render the navigation bar
   */
  render() {
    return (<nav className={
                `ui top menu ${this.props.className || ''}`
                + `${this.props.isFixed ? ' fixed' : ''}`
                + `${this.props.useDarkTheme ? ' inverted' : ''}`}>
              <div className="ui container">
                {this.props.children}
              </div>
            </nav>);
  }
}

/**
 * navigation bar group props
 */
interface NavGroupProps {

  /**
   * is right aligned?/
   */
  rightAligned?: boolean;
}

/**
 * NavGroup
 */
export class Group extends React.Component<NavGroupProps, {}> {

  /**
   * render the Navigation group
   */
  render() {
    return (
      <div className={`menu ${this.props.rightAligned ? 'right' : 'left'}`}>
        {this.props.children}
      </div>
    )
  }
}

/**
 * the heading of the nav bar
 */
export class Heading extends React.Component<NavProps, {}> {

  /**
   * render the heading
   * @returns {any}
   */
  render() {
    return (
      <a className={`header item ${this.props.className || ''}`}>
        {this.props.children}
      </a>
    )
  }
}