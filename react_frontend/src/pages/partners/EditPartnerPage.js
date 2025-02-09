import React from "react";
import { useTranslation } from "react-i18next";
import ViewPartnerPage from "./ViewPartnerPage";

const EditPartnerPage = () => {
  const { t } = useTranslation();
  return (
    <ViewPartnerPage typeView="edit" objectName={t("partner.edit_partner")} />
  );
};

export default EditPartnerPage;
