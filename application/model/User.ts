/**
 * the interface for user data
 */
export interface User {

  /**
   * id of user
   */
  id?: string;

  /**
   * name of the user
   */
  name: string;

  /**
   * email of user
   */
  email: string;
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

