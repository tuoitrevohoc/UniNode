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
   * get current tabs
   * @returns {React.ReactElement<TabProps>[]}
   */
  get tabs() {
    return React.Children.map(this.props.children,
      (child, index) => {
        const element = child as React.ReactElement<TabProps>;
        element.props.isActive = index == this.state.currentTabIndex;
        return element;
      }
    );
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
                 className={`item ${tab.props.isActive && 'active'}`}>{tab.props.title}</a>
            )
          )}
        </div>
        {tabs.map(
          (tab, index) => (
            <div key={index}
                 className={`ui bottom attached tab segment ${tab.props.isActive && 'active'}`}>
              {tab}
            </div>
          )
        )}
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
      <div>this.props.children</div>
    )
  }
}