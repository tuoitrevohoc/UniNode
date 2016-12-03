/**
 * table data
 */
export interface PageData<T> {
  /**
   * data
   */
  data: T[];

  /**
   * total record
   */
  total: number;
}