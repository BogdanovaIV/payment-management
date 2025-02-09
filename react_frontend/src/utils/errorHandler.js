
export const handleRequestError = (err, showToast, t) => {
  if (!err.response) {
    showToast(t("toast.error_server_unavailable"), "danger");
  } else if (err.response.status === 401) {
    showToast(t("toast.error_not_authorized"), "warning");
  } else if (err.response.status === 500) {
    showToast(t("toast.error_server_occurred"), "danger");
  } else {
    showToast(t("toast.error_occurred"), "danger");
  }
};
