import React from "react";
import Modal from "react-modal";
import "../modal.css";

const CustModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          overlayClassName={{
            base: "overlay-base",
            afterOpen: "overlay-after",
            beforeClose: "overlay-before",
          }}
          className={{
            base: "content-base",
            afterOpen: "content-after",
            beforeClose: "content-before",
          }}
          closeTimeoutMS={500}
        >
          <button onClick={() => setIsOpen(false)}>Close Modal</button>
        </Modal>
      </div>
    </>
  );
};

export default CustModal;
