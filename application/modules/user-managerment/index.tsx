import * as React from "react";
import {Route} from "react-router";
import {ModuleDefinition} from "../../common/components/ModuleDefinition";
import {UserList} from "./pages/UserList";

export default
<ModuleDefinition name="User-Management">
  <Route path="/users" component={UserList} />
</ModuleDefinition>;