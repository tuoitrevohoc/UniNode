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
          <Table
            editor={this.props.children}
            onLoadData={async () => {
              return {
                  data: [
                    {
                      id: 1,
                      name: "Daniel",
                      age: 20,
                      email: "daniel@clearpathdevelopment.com"
                    }
                  ],
                  total: 20
                }
              }
            }
          >
            <Column name="actions"
                    render={(item, name) =>
              <Cell key={name}>
                <Button linkTo={`/users/edit/${item.id}`}
                        className='tiny icon'
                        icon='edit' />
                <Button className='tiny icon danger' icon='trash' />
              </Cell>
            }/>
            <Column name="name" />
            <Column name="email" />
            <Column name="avatar" />
          </Table>
        </Content>
      </Box>
    )
  }
}