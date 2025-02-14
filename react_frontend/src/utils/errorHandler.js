export const handleRequestError = (err, showToast, t) => {
  if (process.env.NODE_ENV === "development") {
    console.log(err.response);
  }
  if (!err.response) {
    showToast(t("toast.error_server_unavailable"), "danger");
  } else if (err.response.status === 500) {
    showToast(t("toast.error_server_occurred"), "danger");
  } else if (err.response.status === 400) {
    showToast(err.response?.data?.error || t("toast.error_occurred"), "danger");
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log(err.response.status);
    }
  }
};
