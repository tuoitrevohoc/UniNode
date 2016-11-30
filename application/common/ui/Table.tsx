import * as React from "react";

/**
 * table data
 */
interface TableData {
  /**
   * data
   */
  data: any[];

  /**
   * total record
   */
  total: number;
}

/**
 * table properties
 */
interface TableProps {

  /**
   * table class name
   */
  className?: string;

  /**
   * on load data for the table
   * @param currentPage current page
   * @param sortFields fields to sort
   */
  onLoadData(currentPage: number, sortFields: string[]): Promise<TableData>;
}

/**
 * table state
 */
interface TableState {

  /**
   * data to display
   */
  data?: any[];

  /**
   * total record
   */
  total?: number;

  /**
   * current display
   */
  currentPage?: number;

}


type CellRender<Entity> = ((item: Entity, field?: string) => React.ReactElement<any>);

/**
 * the data table
 */
export class Table
    extends React.Component<TableProps, TableState>{

  /**
   * current table state
   */
  state: TableState = {
    data: [],
    total: 0,
    currentPage: 0
  };

  /**
   * when component did mount to the website
   */
  componentWillMount() {
    this.reloadData();
  }

  /**
   * reload data
   */
  async reloadData() {
    const {data, total} = await this.props.onLoadData(this.state.currentPage, []);

    this.setState({
      data,
      total
    })

  }

  /**
   * render the table
   */
  render() {

    const columns = React.Children.map(this.props.children,
      child => (child as React.ComponentElement<ColumnProps, any>).props
    );

    return (
      <table className={`ui celled striped table ${this.props.className || ''}`}>
        <thead>
          <tr>
            {columns.map(column => (
              <ColumnHeader key={column.name}
                >
                {column.headerContent || column.name}
              </ColumnHeader>
            ))}
          </tr>
        </thead>
        <tbody>
        {(this.state.data || []).map((item, index) => (
          <tr key={index}>{
            columns.map(
              column =>
                column.render ? column.render(item, column.name) :
                  <Cell key={column.name}>{item[column.name]}</Cell>
            )
          }</tr>
        ))}
        </tbody>
      </table>
    )
  }
}


/**
 * column header props
 */
interface ColumnHeaderProps {

  /**
   * the class name
   */
  className?: string;

  /**
   * sort field name on click
   */
  sortField?: string;
}


/**
 * Column Header class
 */
export class ColumnHeader
  extends React.Component<ColumnHeaderProps, {}>{

  /**
   * render class
   */
  render() {
    return (
      <th className={this.props.className || ''}>
        <a className="sort button">
          <i className="sort content ascending icon" />
        </a>
        {this.props.children}
      </th>
    )
  }
}

/**
 * property for columns
 */
interface ColumnProps {

  /**
   * name of the column
   */
  name: string;

  /**
   * the header text
   */
  headerContent?: React.ComponentElement<any, any> | React.ReactText;

  /**
   * able to sort by this columns
   */
  isSortable?: boolean;

  /**
   * cell render
   */
  render?: CellRender<any>;
}


/**
 * hold the definition for the columns
 */
export class Column extends React.Component<ColumnProps, {}> {

  /**
   * render this is nothing
   */
  render() {
    return null;
  }
}

/**
 * A table cell
 */
export class Cell extends React.Component<any, {}> {

  /**
   * render the cell
   */
  render() {
    return (
      <td {...this.props}>
        {this.props.children}
      </td>
    )
  }
}