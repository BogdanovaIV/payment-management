import React from "react";
import { useTranslation } from "react-i18next";
import ViewPaymentRequestPage from "./ViewPaymentRequestPage";
import { useRedirect } from "../../hooks/useRedirect";

const EditPaymentRequestPage = () => {
  const { isLoading, shouldRedirect } = useRedirect("loggedOut");
  const { t } = useTranslation();

  if (isLoading || shouldRedirect) {
    return null;
  }

  return (
    <ViewPaymentRequestPage
      typeView="edit"
      objectName={t("payment_request.edit_payment_request")}
    />
  );
};

export default EditPaymentRequestPage;
