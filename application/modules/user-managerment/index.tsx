import * as React from "react";
import {Route} from "react-router";
import {ModuleDefinition} from "../../common/components/ModuleDefinition";
import {UserList} from "./pages/UserList";
import {Menu} from "../../common/ui/Menu";
import {Item} from "../../common/ui/Nav";
import {UserForm} from "./pages/UserForm";

export default
<ModuleDefinition name="User-Management">
  <Route path="/users" component={UserList}>
    <Route path="/users/create" component={UserForm} />
    <Route path="/users/edit/:id" component={UserForm} />
  </Route>
  <Menu>
    <Item to='/users' icon='user'>Manage Users</Item>
  </Menu>
</ModuleDefinition>;