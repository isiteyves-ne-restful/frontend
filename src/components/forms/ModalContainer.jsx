/* eslint-disable react/prop-types */

const ModalContainer = ({ children }) => {
  return (
    <div className="modal-container" style={{ zIndex: 98 }}>
      {children}
    </div>
  );
};

export default ModalContainer;
