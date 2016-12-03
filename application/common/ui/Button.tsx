import * as React from "react";
import {Link} from "react-router";

/**
 * button class
 */
interface ButtonProps {

  /**
   * the class name
   */
  className?: string;

  /**
   * the button icon
   */
  icon?: string;

  /**
   * link to
   */
  linkTo?: string;

  /**
   * on click
   * @param event
   */
  onClick?(event: React.MouseEvent<Link>);
}

/**
 * the button
 */
export class Button extends React.Component<ButtonProps, {}> {

  render() {
    return (
      <Link to={this.props.linkTo}
            className={`ui button ${this.props.className || 0}`}
            onClick={this.props.onClick}
      >
        {this.props.icon && <i className={`${this.props.icon} icon`} />}
        {this.props.children}
      </Link>
    );
  }
}