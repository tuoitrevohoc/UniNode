import * as React from "react";
import * as ReactDOM from "react-dom";

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {HomePage} from "./pages/HomePage";


/**
 * Application component
 */
export class Application extends React.Component<{}, {}> {

  /**
   * component will mount
   */
  componentWillMount() {
  }

  /**
   * render the application
   */
  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={HomePage} />
    </Route>
  </Router>, document.getElementById("root"));