import * as React from "react";


/**
 * The module box
 */
export class Box extends React.Component<{}, {}> {

  /**
   * render the box
   */
  render() {
    return (
      <div className="box-container">
        <div className="box-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

/**
 * The content tabs
 */
export class Content extends React.Component<any, {}> {

  /**
   * render the box
   */
  render() {
    return (
      <div className="content" {...this.props}>
        {this.props.children}
      </div>
    )
  }
}


/**
 * The content tabs
 */
export class Header extends React.Component<any, {}> {

  /**
   * render the box
   */
  render() {
    return (
      <div className="header" {...this.props}>
        {this.props.children}
      </div>
    )
  }
}