import React from "react";

const StateUiThree = ({ activeTime, restTime, change, done }) => {
  return (
    <div className="is-flex is-justify-content-center mt-6">
      <div>
        <div className="box has-background-light">
          <div className="has-text-centered has-text-weight-semibold is-size-5">
            <p>EXERCISE TIME</p>
            <p className="is-size-7 mt-1">{activeTime} seconds</p>
            <div className="level mb-1">
              <div className="level-item">0:10</div>
              <div className="level-item mx-6">
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
          </div>

          <div className="has-text-centered has-text-weight-semibold is-size-5">
            <p>REST TIME</p>
            <p className="is-size-7">{restTime} seconds</p>
            <div className="level mb-1">
              <div className="level-item">0:10</div>
              <div className="level-item mx-4">
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
          </div>
        </div>
        <div className=" has-text-centered">
          <button onClick={done} className="button is-link">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default StateUiThree;
