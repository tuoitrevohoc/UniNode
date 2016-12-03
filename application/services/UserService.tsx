import {User} from "../common/model/User";
import {userAccessor} from "../server/UserAccessor";
import {PageData} from "../common/model/PageData";


/**
 * the user service
 */
export class UserService {

  /**
   * save a user to database
   * @param user the user to save
   * @return the saved user
   */
  async saveUser(user: User): Promise<User> {
    return userAccessor.create(user);
  }

  /**
   * get all users
   * @param conditions
   * @param orders order definitions
   * @param start start record to get
   * @param limit number of records need to get
   */
  async getUsers(conditions: any = null,
                 orders: any = null,
                 start: number = 0,
                 limit: number = 10): Promise<PageData<User>> {
    let query = conditions ?
      userAccessor.where(conditions) : userAccessor.find();

    if (orders) {
      query = query.sort(orders);
    }

    const total = await query.count();
    const data = await query.skip(start).limit(limit).exec();

    return {
      total,
      data
    };
  }

  /**
   * get the user
   * @param id the user to get
   * @return the user to find
   */
  async getUser(id: string): Promise<User> {
    return userAccessor.findById(id);
  }

  /**
   * delete a user by id
   * @param id id of the user
   * @return {boolean} if the user has been deleted
   */
  async deleteUser(id: string): Promise<boolean> {
    return await userAccessor.findByIdAndRemove(id) != null;
  }
}
