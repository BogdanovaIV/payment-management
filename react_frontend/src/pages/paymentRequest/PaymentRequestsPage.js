import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getPaymentRequestsUrl } from "../../api/axiosURL";
import ObjectList from "../../components/ObjectList";
import { getParametersByName } from "../../utils/selectFormParameters";

const PaymentRequestsPage = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    payer: {id:"", name: ""},
    recipient: {id:"", name: ""},
    user: {id:"", name: ""},
    invoice_date: "",
    invoice_number: "",
    start_deadline: "",
    end_deadline: "",
  });

  const columns = useMemo(
    () => [
      { Header: t("payment_request.payer"), accessor: "payer_trade_name" },
      {
        Header: t("payment_request.recipient"),
        accessor: "recipient_trade_name",
      },
      { Header: t("payment_request.deadline"), accessor: "deadline" },
      {
        Header: t("payment_request.payment_amount"),
        accessor: "payment_amount",
      },
      { Header: t("payment_request.invoice_date"), accessor: "invoice_date" },
      {
        Header: t("payment_request.invoice_number"),
        accessor: "invoice_number",
      },
      { Header: t("payment_request.user"), accessor: "user_full_name" },
    ],
    [t]
  );

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
      queryKey:  "partnerQuery"
    },
    {
      foreignKey: "user_profile",
      url: parametersUserProfile.url,
      columns: parametersUserProfile.columns,
      queryKey:  "partnerUserProfile"
    },
  ];
  const filterFields = [
    {
      name: "payer",
      type: "text",
      placeholder: t("payment_request.search_payer"),
      label: t("payment_request.payer"),
      foreignKey: "partner",
      readOnly: true
    },
    {
      name: "recipient",
      type: "text",
      placeholder: t("payment_request.search_recipient"),
      label: t("payment_request.recipient"),
      foreignKey: "partner",
      readOnly: true
    },
    {
      name: "user",
      type: "text",
      placeholder: t("payment_request.search_user"),
      label: t("payment_request.user"),
      readOnly: true,
      foreignKey: "user_profile"
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
    columns,
    url: getPaymentRequestsUrl(),
    ObjectsName: t("payment_request.payment_requests"),
    filterFields,
    modalForms
  };

  return <ObjectList {...parameters} />;
};

export default PaymentRequestsPage;
