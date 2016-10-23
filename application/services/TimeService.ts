/**
 * Hello Service class
 */
export class TimeService {

  /**
   * Say hello world
   * @returns {string}
   */
  async getTime(): Promise<Date> {
    return new Date();
  }
}