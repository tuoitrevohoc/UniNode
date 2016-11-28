import * as React from "react";
import {Link} from "react-router";

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
              {this.props.children}
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
 * the item properties
 */
interface ItemProps {

  /**
   * link to
   */
  to?: string;

  /**
   * class name
   */
  className?: string;

  /**
   * active class name
   */
  activeClassName?: string;

  /**
   * render icon
   */
  icon?: string;

  /**
   * on click event
   * @param event
   */
  onClick?(event: React.MouseEvent);
}

/**
 * an item
 */
export class Item extends React.Component<ItemProps, {}> {

  /**
   * render the item
   */
  render() {
    return (
      <Link to={this.props.to}
            className={`ui item ${this.props.className || ''}`}
            activeClassName={this.props.activeClassName}
            onClick={this.props.onClick}
        >
        {this.props.icon ? (
          <i className={`icon ${this.props.icon}`} />
        ) : null}
        {this.props.children}
      </Link>
    )
  }
}