import React from "react";

const StateUiThree = ({ activeTime, restTime, change, done }) => {
  return (
    <div
      className="center-vertically"
      style={{ height: "60vh", justifyContent: "center" }}
    >
      <div>
        <div className="buttons is-centered">
          <button className="button is-link">Time</button>
          <button className="button is-link">Sets And Reps</button>
        </div>
        <div className="box has-background-light">
          <div className="has-text-centered has-text-weight-semibold is-size-5">
            <p>ACTIVE TIME DURING EXERCISE</p>
            <div className="level mb-1">
              <div className="level-item">0:10</div>
              <div className="level-item">
                <input
                  onChange={(evnt) => {
                    change("activeTime", evnt.target.value);
                  }}
                  value={activeTime}
                  min="10"
                  max="120"
                  step="5"
                  type="range"
                  name=""
                  id=""
                />
              </div>
              <div className="level-item">2:00</div>
            </div>
            <p>{activeTime} seconds</p>
          </div>
          <div className="has-text-centered has-text-weight-semibold is-size-5">
            <p>ACTIVE TIME DURING EXERCISE</p>
            <div className="level mb-1">
              <div className="level-item">0:10</div>
              <div className="level-item">
                <input
                  onChange={(evnt) => {
                    change("restTime", evnt.target.value);
                  }}
                  value={restTime}
                  min="10"
                  max="120"
                  step="5"
                  type="range"
                  name=""
                  id=""
                />
              </div>
              <div className="level-item">2:00</div>
            </div>
            <p>{restTime} seconds</p>
          </div>
        </div>
        <div className=" has-text-centered">
          <button onClick={done} className="button is-link is-large">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default StateUiThree;
