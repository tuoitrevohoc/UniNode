import * as React from "react";
import {TimeService} from "../services/TimeService";

/**
 * State of the component
 */
interface State {

  /**
   * is the component loading
   */
  isLoading?: boolean;

  /**
   * server time
   */
  serverTime?: Date;
}

/**
 * the footer
 */
export class HomePage extends React.Component<{}, State> {

  /**
   * initial state
   */
  state: State = {};

  /**
   * the time service to call
   */
  timeService = new TimeService();

  /**
   * load data for component
   */
  componentDidMount() {
  }

  /**
   * get ip address
   */
  async callGetTime() {

    try {
      this.setState({
        isLoading: true
      });

      this.setState({
        serverTime: await this.timeService.getTime(),
        isLoading: false
      });

    } catch (error) {
      console.log(error);

      this.setState({
        isLoading: false
      });
    }
  }

  /**
   * render the footer
   */
  render() {
    return (
      <div className="ui inverted vertical masthead center aligned segment">
        <div className={this.state.isLoading ? "ui active dimmer" : "ui dimmer"}>
          <div className="ui loader" />
        </div>
        <div className="ui container left aligned">
          <h1>
            Call get time on server:
            <button className="ui button" onClick={() => this.callGetTime()}>Call</button>
          </h1>
          {this.state.serverTime?(
            <h1>Result: {this.state.serverTime}</h1>
          ):null}
        </div>
      </div>
    )
  }
}