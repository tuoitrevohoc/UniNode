import {AppModel} from "./AppModel";
/**
 * the interface for user data
 */
export interface User extends AppModel {

  /**
   * name of the user
   */
  name: string;

  /**
   * email of user
   */
  email: string;

  /**
   * avatar of user
   */
  avatar?: string;
}

/**
 * the login result
 */
export interface LoginResult {

  /**
   * the logged in user
   */
  user: User;

  /**
   * the access token
   */
  token: string;
}

