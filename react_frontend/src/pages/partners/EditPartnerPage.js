import React from "react";
import { useTranslation } from "react-i18next";
import ViewPartnerPage from "./ViewPartnerPage";
import { useRedirect } from "../../hooks/useRedirect";

const EditPartnerPage = () => {
  const { isLoading, shouldRedirect } = useRedirect("loggedOut");
  const { t } = useTranslation();

  if (isLoading || shouldRedirect) {
    return null;
  }

  return (
    <ViewPartnerPage typeView="edit" objectName={t("partner.edit_partner")} />
  );
};

export default EditPartnerPage;
