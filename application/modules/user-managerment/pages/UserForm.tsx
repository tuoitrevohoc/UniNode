import * as React from "react";
import {Tabs, Tab} from "../../../common/ui";

/**
 * the user form interface
 */
interface UserFormProps {

  /**
   * the route params
   */
  routeParams?: {

    /**
     * id of current user to edit
     */
    id?: string;
  }
}

/**
 * the user form
 */
export class UserForm extends React.Component<UserFormProps, {}> {

  /**
   * render the form
   */
  render() {
    return (
      <div className="slideIn animated">
        <Tabs>
          <Tab title="General">
            General Tab

            <div className="bottom sheet">
              <a className="ui button">Save</a>
            </div>
          </Tab>
          <Tab title="Avatar">
            Avatar
          </Tab>
          <Tab title="Avatar">
            Avatar
          </Tab>
          <Tab title="Avatar">
            Avatar
          </Tab>
        </Tabs>

      </div>
    );
  }
}