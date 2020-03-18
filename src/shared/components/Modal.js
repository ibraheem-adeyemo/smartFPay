import React, { memo } from "react";
import PropTypes from "prop-types";
import { Modal } from "reactstrap";
import classNames from "classnames";
import { MdClose } from "react-icons/md";

const ModalComponent = memo(
  ({ color, size, title, children, colored, header, isOpen, toggle, centered }) => {

    const modalClass = classNames({
      "modal-dialog--colored": colored,
      "modal-dialog--header": header
    });

    return (
      <div>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          size={size}
          centered={centered}
          className={`modal-dialog--${color} ${modalClass}`}
        >
          <div className="modal__header">
            <button
              className="lnr lnr-cross modal__close-btn"
              type="button"
              onClick={toggle}
            >
                <MdClose/>
            </button>
            <h4 className="bold-text  modal__title">{title}</h4>
          </div>
          <div className="modal__body">{children}</div>
        </Modal>
      </div>
    );
  }
);
ModalComponent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  header: PropTypes.bool,
};

ModalComponent.defaultProps = {
  title: "",
  message: "",
  header: false
};

export default ModalComponent;
