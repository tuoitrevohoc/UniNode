import {AppModel} from "./AppModel";

/**
 * interface for user data
 */
export interface User extends AppModel {

  /**
   * name for displaying
   **/
  name: string;

  /**
   * email
   */
  email: string;

  /**
   * avatar of this user
   */
  avatar: string;

}