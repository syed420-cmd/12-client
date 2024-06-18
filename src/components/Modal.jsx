import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        {children}
        <button onClick={onClose} className="btn btn-secondary mt-4">
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
