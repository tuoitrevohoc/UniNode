import * as React from "react";

/**
 * menu properties
 */
interface MenuProps {

  /**
   * is vertical menu
   */
  isVertical?: boolean;

  /**
   * class name
   */
  className?: string;
}

/**
 * Created by banhtieu on 11/28/2016.
 */
export class Menu extends React.Component<MenuProps, {}>{

  /**
   * render
   * @returns {any}
   */
  render() {
    return (
      <div className={`ui menu ${this.props.className || ''}`
                      + (this.props.isVertical ? ' vertical' : '')}>
        {this.props.children}
      </div>
    )
  }
}