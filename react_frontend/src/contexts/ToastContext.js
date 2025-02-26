import { createContext, useContext, useState, useRef, useEffect } from "react";
import Toast from "react-bootstrap/Toast";

import styles from "../styles/ToastContext.module.css";

export const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "danger",
    show: false,
  });

  const timeoutRef = useRef(null);

  const showToast = (message, type = "danger", duration = 5000) => {
    setToast((prevToast) => ({ ...prevToast, message, type, show: true }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setToast((prevToast) => ({ ...prevToast, show: false }));
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={styles.ToastContainer} 
      >
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          className={styles.Toast} 
        >
          <Toast.Header>
            <strong
              className={`me-auto ${
                toast.type === "success" ? styles.Success : styles.Error
              }`}
            >
              {toast.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </div>
    </ToastContext.Provider>
  );
};
