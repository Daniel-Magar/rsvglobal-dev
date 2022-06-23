import React from "react";

const Modal = () => {
  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Modal Title</h4>
          </div>
          <div className="modal-bodee">This is Modal-body</div>
          <div className="modal-footer">
            <button className="modal-cls-btn">Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
