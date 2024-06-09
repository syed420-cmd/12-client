import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const useToast = () => {
  const showToast = (text) => {
    Toastify({
      text: text,
      position: 'right',
      style: {
        background: 'linear-gradient(to right, #1f5ebc, #0083d6, #00a1cb, #00b9a4, #2ecc71)',
      },
    }).showToast();
  };

  return {
    showToast,
  };
};

export default useToast;
