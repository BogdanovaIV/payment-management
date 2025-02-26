/**
 * Handles API request errors and displays appropriate toast notifications.
 *
 * @param {Object} err - The error object from the request.
 * @param {Function} showToast - A function to display toast notifications.
 * @param {Function} t - A translation function for localization.
 * @param {string} [extraMessage=""] - An optional additional message to append to the error message.
 */
export const handleRequestError = (err, showToast, t, extraMessage = "") => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  if (!showToast) {
    return;
  }
  if (!err.response) {
    showToast(
      t("toast.error_server_unavailable") + " " + extraMessage,
      "danger"
    );
  } else if (err.response.status === 500) {
    showToast(t("toast.error_server_occurred") + " " + extraMessage, "danger");
  } else if (err.response.status === 400 || err.response.status === 409) {
    showToast(
      (err.response?.data?.error || t("toast.error_occurred")) +
        " " +
        extraMessage,
      "danger"
    );
  } else if (err.response.status === 423) {
    showToast(
      (err.response?.data?.detail || t("toast.permission_denied")) +
        " " +
        extraMessage,
      "danger"
    );
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log(err.response.status);
    }
  }
};
