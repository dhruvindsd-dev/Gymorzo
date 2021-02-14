import React, { Component } from "react";
import exeriseImg from "../../assets/img/ex1.gif";

class DoWorkOut extends Component {
  state = {
    isRestTime: false,
    activeTime: 10,
    restTime: 20,
    intervalTimer: null,
    isPause: false,
  };
  componentDidMount() {
    this.setState({
      isRestTime: false,
      activeTime: parseInt(this.props.activeTime),
      restTime: parseInt(this.props.restTime),
      intervalTimer: setInterval(this.handleInterval, 200),
      isPause: false,
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalTimer);
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.exercise.name !== this.props.exercise.name) {
      this.componentWillUnmount();
    }
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.exercise.name !== this.props.exercise.name)
      this.componentDidMount();
  }
  handleInterval = () => {
    this.setState(
      (state) => {
        const updatedTimerState = { ...state };
        if (updatedTimerState.isRestTime) {
          updatedTimerState.restTime -= 1;
          if (updatedTimerState.restTime === 0) {
            //  resetting the rest timer
            //   updatedTimerState.restTimeRemaining = updatedTimerState.restTime;
            //   updatedTimerState.isRestTime = false;
            console.log("the rest time has ended ");
            this.props.next();
          }
        } else {
          updatedTimerState.activeTime -= 1;
          if (updatedTimerState.activeTime === 0) {
            //    resetting the active timer
            //   updatedTimerState.activeTimeRemaining = updatedTimerState.activeTime;
            updatedTimerState.isRestTime = true;
          }
        }
        return updatedTimerState;
      },
      () => {
        if (this.state.restTime < 0) {
          this.props.next();
        }
      }
    );
  };
  pause = () => {
    this.setState({ isPause: true });
    clearInterval(this.state.intervalTimer);
  };
  startInterval = () => {
    this.setState({
      isPause: false,
      intervalTimer: setInterval(this.handleInterval, 200),
    });
  };
  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-4">
          {this.state.isRestTime ? (
            <p className="is-size-1 has-text-weight-bold has-text-centered section my-6">
              Rest Time
            </p>
          ) : (
            <figure className="image is-square">
              <img src={exeriseImg} alt="" />
            </figure>
          )}
          <div className="box has-text-centered has-background-light">
            <p className="title">
              {this.state.isRestTime
                ? this.state.restTime
                : this.state.activeTime}
            </p>
            <div className="buttons is-centered are-large">
              <button
                onClick={this.props.prev}
                className="button is-link is-light is-outlined"
              >
                <span className="icon">
                  <i className="fas fa-angle-double-left"></i>
                </span>
              </button>
              <button
                onClick={this.state.isPause ? this.startInterval : this.pause}
                className="button is-link is-light is-outlined"
              >
                <span className="icon">
                  <i
                    className={
                      "fas " + (this.state.isPause ? "fa-play" : "fa-pause")
                    }
                  ></i>
                </span>
              </button>
              <button
                onClick={this.props.next}
                className="button is-link is-light is-outlined"
              >
                <span className="icon">
                  <i className="fas fa-angle-double-right"></i>
                </span>
              </button>
            </div>
            <p className="is-size-5">{this.props.exercise.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DoWorkOut;
