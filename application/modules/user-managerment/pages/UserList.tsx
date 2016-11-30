import * as React from "react";
import {Box, Content, Header, Button} from "../../../common/ui";
import {Table, Column, Cell} from "../../../common/ui/Table";

/**
 * User list
 */
export class UserList extends React.Component<{}, {}> {



  /**
   * render the user list page
   * @returns {any}
   */
  render() {
    return (
      <Box>
        <Header>
          User Page List
        </Header>
        <Content>
          <Table onLoadData={async () => {
            return {
                data: [
                  {
                   name: "Daniel",
                    age: 20,
                    email: "daniel@clearpathdevelopment.com"
                  }
                ],
                total: 20
              }
            }
            }>
            <Column name="name" />
            <Column name="age" />
            <Column name="email" />
            <Column name="actions"
                    render={(item, name) =>
              <Cell key={name}>
                <Button className='tiny' icon='edit'>Edit</Button>
                <Button className='tiny danger' icon='trash'>Delete</Button>
              </Cell>
            }/>
          </Table>
        </Content>
      </Box>
    )
  }
}