import * as React from "react";
import {PageData} from "../model/PageData";
import {Button} from "./Button";
import ReactChildren = React.ReactChildren;
import ReactNode = React.ReactNode;

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
  onLoadData(currentPage: number, sortFields: string[]): Promise<PageData<any>>;

  /**
   * editor forms
   */
  editor?: ReactNode;
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

    const editor = this.props.editor as React.Component<any, any>;

    const editingItemId = editor != null ? (
      editor.props.routeParams && editor.props.routeParams.id ? editor.props.routeParams.id : 0
    ) : null;

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
          <tr className="action-row">
            <td colSpan={columns.length}>
              <Button icon="plus"
                      linkTo="/users/create">
                Add a record
              </Button>
            </td>
          </tr>
          {editingItemId == 0 && this.renderEditor(editor, columns.length)}
        {(this.state.data || []).map((item, index) => (
          [
            // render the row
            this.renderRow(columns, item, index),
            // render editor if editing item id match
            editingItemId == item.id && this.renderEditor(editor, columns.length)]
        ))}
        </tbody>
      </table>
    )
  }

  /**
   * render a cell
   * @param column
   * @param item
   * @return {React.ReactElement<any>}
   */
  renderCell(column: ColumnProps, item: any) {
    return column.render ? column.render(item, column.name) :
      <Cell key={column.name}>{item[column.name]}</Cell>;
  }

  /**
   * render a data row
   * @param columns
   * @param item
   * @param index
   * @param editingItemId
   * @param editor
   * @return {any}
   */
  renderRow(columns: ColumnProps[],
            item: any,
            index: number,
            ) {
    return <tr key={index}>{
      columns.map(
        column => (
          this.renderCell(column, item)
        )
      )
    }</tr>
  }

  /**
   * render the editor
   * @param editor
   * @param colSpan
   * @return {any}
   */
  renderEditor(editor: ReactNode, colSpan: number) {
    return (
      <tr className="editor-row">
        <td colSpan={colSpan}>
          {editor}
        </td>
      </tr>
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
          <i className="tiny sort content ascending icon" />
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