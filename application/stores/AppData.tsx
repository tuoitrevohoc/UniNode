import {Menu} from "../common/ui/Menu";
import * as React from "react";

/**
 * The application store
 */
interface AppStore {

  /**
   * list of menus in applications
   */
  menus: Menu[];

  /**
   * list of components
   */
  components: React.Component<any, any>[];
}

/**
 * the application data
 */
export const appData: AppStore = {
  menus: [],
  components: []
};