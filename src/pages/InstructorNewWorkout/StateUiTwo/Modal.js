import React from "react";

const Modal = ({ exercise, changed, close }) => (
  <div className="modal is-active">
    <div className="modal-background" onClick={close}></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Exercises</p>
        <button className="delete" onClick={close}></button>
      </header>
      <section className="modal-card-body has-background-light">
        {exercise.map((item, i) => (
          <div key={i}>
            <label className="checkbox is-unselectable">
              <input
                checked={item.checked ? true : false}
                onChange={changed.bind(this, i)}
                type="checkbox"
                id=""
                className="mr-2"
              />
              <span className="is-size-5">{item.name}</span>
            </label>
            <br />
          </div>
        ))}
      </section>
      <footer className="modal-card-foot">
        <button className="button is-link" onClick={close}>
          Done
        </button>
      </footer>
    </div>
  </div>
);

export default Modal;
