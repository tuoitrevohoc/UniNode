import * as React from "react";
import * as ReactDOM from "react-dom";

import {Router, Route, browserHistory} from 'react-router';
import {ModuleDefinition} from "./common/components/ModuleDefinition";
import UserManagementModule from "./modules/user-managerment/index";
import {NavigationBar} from "./components/NavigationBar";


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
      <div>
        <NavigationBar/>
        {this.props.children}
      </div>
    )
  }
}


/**
 * Module Application Props
 */
interface ModuleApplicationProps {

  /**
   *list of modules
   */
  modules: [any];
}

/**
 * Modules applications
 */
class ModuleApplication extends React.Component<ModuleApplicationProps, {}> {

  /**
   * get routes from modules
   */
  get routes() {
    let routes = [];

    for (const module of this.props.modules as ModuleDefinition[]) {

      React.Children.map(module.props.children, child => {
        const name = child['type']['displayName'];
        if (name === "Route") {
          routes.push(child);
        }
      });

    }

    console.log(routes);

    return routes;
  };

  /**
   *
   * @returns {any}
   */
  render() {
    return <Router history={browserHistory}>
      <Route path="/" component={Application}>
        {this.routes}
      </Route>
    </Router>
  }
}

ReactDOM.render(
  <ModuleApplication modules={[UserManagementModule]}/>,
  document.getElementById("root"));