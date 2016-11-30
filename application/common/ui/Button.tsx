import * as React from "react";

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
   * on click
   * @param event
   */
  onClick?(event: React.MouseEvent<HTMLElement>);
}

/**
 * the button
 */
export class Button extends React.Component<ButtonProps, {}> {

  render() {
    return (
      <a className={`ui button ${this.props.className || 0}`}
         onClick={this.props.onClick}
        >
        {this.props.icon && <i className={`${this.props.icon} icon`} />}
        {this.props.children}
      </a>
    )
  }
}