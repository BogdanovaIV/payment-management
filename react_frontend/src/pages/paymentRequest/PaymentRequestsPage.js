import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getPaymentRequestStatusesUrl } from "../../api/axiosURL";
import ObjectList from "../../components/ObjectList";
import { getParametersByName } from "../../utils/selectFormParameters";
import useGetOptions from "../../hooks/useGetOptions";

const PaymentRequestsPage = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    payer: { id: "", name: "" },
    recipient: { id: "", name: "" },
    user: { id: "", name: "" },
    invoice_date: "",
    invoice_number: "",
    start_deadline: "",
    end_deadline: "",
  });

  const [optionsStatus] = useGetOptions([
    ["", t("payment_request.all_statuses")]
  ], getPaymentRequestStatusesUrl());

  const parametersPaymentRequest = useMemo(() => {
    return getParametersByName("payment_request", t);
  }, [t]);

  const parametersPartner = useMemo(() => {
    return getParametersByName("partner", t);
  }, [t]);

  const parametersUserProfile = useMemo(() => {
    return getParametersByName("user_profile", t);
  }, [t]);

  const modalForms = [
    {
      foreignKey: "partner",
      url: parametersPartner.url,
      columns: parametersPartner.columns,
      queryKey: "partnerQuery",
    },
    {
      foreignKey: "user_profile",
      url: parametersUserProfile.url,
      columns: parametersUserProfile.columns,
      queryKey: "partnerUserProfile",
    },
  ];
  const filterFields = [
    {
      name: "status",
      type: "select",
      placeholder: "",
      label: t("payment_request.status"),
      options: optionsStatus,
    },
    {
      name: "payer",
      type: "text",
      placeholder: t("payment_request.search_payer"),
      label: t("payment_request.payer"),
      foreignKey: "partner",
      readOnly: true,
    },
    {
      name: "recipient",
      type: "text",
      placeholder: t("payment_request.search_recipient"),
      label: t("payment_request.recipient"),
      foreignKey: "partner",
      readOnly: true,
    },
    {
      name: "user",
      type: "text",
      placeholder: t("payment_request.search_user"),
      label: t("payment_request.user"),
      readOnly: true,
      foreignKey: "user_profile",
    },
    {
      name: "invoice_number",
      type: "text",
      placeholder: t("payment_request.search_invoice_number"),
      label: t("payment_request.invoice_number"),
    },
    {
      name: "invoice_date",
      type: "date",
      placeholder: t("payment_request.invoice_date"),
    },
    {
      name: "start_deadline",
      type: "date",
      placeholder: t("payment_request.start_deadline"),
    },
    {
      name: "end_deadline",
      type: "date",
      placeholder: t("payment_request.end_deadline"),
    },
  ];

  const parameters = {
    filters,
    setFilters,
    columns: parametersPaymentRequest.columns,
    url: parametersPaymentRequest.url,
    ObjectsName: t("payment_request.payment_requests"),
    filterFields,
    modalForms,
    queryKey: "PaymentRequestsList",
  };

  return <ObjectList {...parameters} />;
};

export default PaymentRequestsPage;
