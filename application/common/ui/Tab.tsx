import * as React from "react";

/**
 * table properties
 */
interface TabsState {

  /**
   * current tab index
   */
  currentTabIndex: number;
}

/**
 * the tab properties
 */
interface TabProps {

  /**
   * title of the tab
   */
  title: string;

  /**
   * is tab active
   */
  isActive?: boolean;
}

/**
 * The tab that contains several tabs
 */
export class Tabs extends React.Component<{}, TabsState> {

  /**
   * The initial state
   */
  state: TabsState = {
    currentTabIndex: 0
  };

  /**
   * get current tabs
   * @returns {React.ReactElement<TabProps>[]}
   */
  get tabs() {
    return React.Children.map(this.props.children,
      (child) => child as React.ReactElement<TabProps>
    );
  }

  /**
   * check tab is active
   * @param index
   * @returns {boolean}
   */
  isActive(index: number) {
    return index === this.state.currentTabIndex;
  }

  /**
   * render the component
   */
  render() {
    const tabs = this.tabs;

    return (
      <div className="tabs">
        <div className="ui top attached tabular menu">
          {tabs.map(
            (tab, index) => (
              <a key={index}
                 onClick={() => this.setState({currentTabIndex: index})}
                 className={`item ${this.isActive(index) && 'active'}`}>{tab.props.title}</a>
            )
          )}
        </div>
        <div className="ui bottom attached tab segment active">
          {tabs[this.state.currentTabIndex]}
        </div>
      </div>
    )
  }
}

/**
 * for each tabs
 */
export class Tab extends React.Component<TabProps, {}> {

  /**
   * render the tab
   */
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}