import { createContext, useContext, useState } from "react";
import { Toast } from "react-bootstrap";

import styles from "../styles/ToastContext.module.css";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "danger",
    show: false,
  });

  const showToast = (message, type = "danger") => {
    setToast({ message, type, show: true });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 10000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1050,
        }}
      >
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          style={{ minWidth: "250px" }}
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
