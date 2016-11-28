import * as React from "react";

/**
 * properties of module definitions
 */
interface ModuleDefinitionProps {

  /**
   * name of the module
   */
  name: string;

  /**
   * the module descriptions
   */
  description?: string;
}

/**
 * The module definitions class
 */
export class ModuleDefinition
  extends React.Component<ModuleDefinitionProps, {}> {

  /**
   * render nothings at all
   */
  render() {
    return null;
  }

}