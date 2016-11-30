import * as React from "react";
import * as ReactDOM from "react-dom";

import {ModuleDefinition} from "./common/components/ModuleDefinition";
import {NavigationBar} from "./components/NavigationBar";
import {SidebarMenu} from "./components/SidebarMenu";
import {appData} from "./stores/AppData";
import {Menu} from "./common/ui/Menu";
import {Route, Router, browserHistory} from "react-router";
import UserManagementModule from "./modules/user-managerment";

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
        <div id="application">
          <SidebarMenu/>
          <div id="content">
            {this.props.children}
          </div>
        </div>
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
   * Filter component by types
   * @param type
   */
  filter(type: string) {
    let components: any[] = [];

    for (const module of this.props.modules as ModuleDefinition[]) {

      React.Children.map(module.props.children, child => {
        const name = child['type']['displayName'] || child['type']['name'];

        if (name === type) {
          components.push(child);
        }
      });
    }

    return components;
  }

  /**
   * called when component started to mount
   */
  componentWillMount() {
    appData.menus = this.filter("Menu") as Menu[];
  }

  /**
   * get routes from modules
   */
  get routes() {
    return this.filter("Route");
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
  document.querySelector("#root"));