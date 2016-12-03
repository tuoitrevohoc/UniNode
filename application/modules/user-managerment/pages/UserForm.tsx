import * as React from "react";

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
      <div>
        This is the user form
      </div>
    );
  }
}