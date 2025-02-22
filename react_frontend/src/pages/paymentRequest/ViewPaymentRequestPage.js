import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  getPaymentRequestsUrl,
  getPaymentRequestStatusesUrl,
} from "../../api/axiosURL";
import { getParametersByName } from "../../utils/selectFormParameters";

import ObjectView from "../../components/ObjectView";
import useGetOptions from "../../hooks/useGetOptions";

const ViewPaymentRequestPage = ({ typeView = "view", objectName }) => {
  const { t } = useTranslation();
  objectName = objectName ?? t("payment_request.payment_request");
  const [data, setData] = useState({
    payer: { id: "", name: "", foreignKey: "partner" },
    recipient: { id: "", name: "", foreignKey: "partner" },
    user: { id: "", name: "", foreignKey: "user_profile" },
    invoice_number: "",
    invoice_date: "",
    payment_priority: 1,
    invoice_amount: 0,
    deadline: "",
    payment_amount: 0,
    comment: "",
  });

  const [optionsStatus] = useGetOptions([], getPaymentRequestStatusesUrl());

  const parametersPartner = useMemo(() => {
    return getParametersByName("partner", t);
  }, [t]);

  const modalForms = [
    {
      foreignKey: "partner",
      url: parametersPartner.url,
      columns: parametersPartner.columns,
      queryKey: "partnerQuery",
    },
  ];
  const fields = [
    [
      {
        id: "id",
        name: "id",
        type: "text",
        as: "input",
        readOnly: true,
        placeholder: t("general.id"),
      },
      {
        id: "user",
        name: "user",
        type: "text",
        as: "input",
        foreignKey: "user",
        readOnly: true,
        disabled: true,
        placeholder: t("payment_request.user"),
      },
    ],
    [
      {
        id: "created_at",
        name: "created_at",
        type: "date",
        as: "input",
        readOnly: true,
        placeholder: t("general.created_at"),
      },
      {
        id: "updated_at",
        name: "updated_at",
        type: "date",
        as: "input",
        readOnly: true,
        placeholder: t("general.updated_at"),
      },
    ],
    [
      {
        id: "payer",
        name: "payer",
        type: "text",
        placeholder: t("payment_request.payer"),
        as: "input",
        foreignKey: "partner",
        additional_filter: { is_own: "true" },
        readOnly: true,
      },
      {
        id: "recipient",
        name: "recipient",
        type: "text",
        placeholder: t("payment_request.recipient"),
        as: "input",
        foreignKey: "partner",
        additional_filter: { is_own: "false" },
        readOnly: true,
      },
    ],
    [
      {
        id: "invoice_number",
        name: "invoice_number",
        type: "text",
        as: "input",
        placeholder: t("payment_request.invoice_number"),
      },
      {
        id: "invoice_date",
        name: "invoice_date",
        type: "date",
        as: "input",
        placeholder: t("payment_request.invoice_date"),
      },
    ],
    [
      {
        id: "invoice_amount",
        name: "invoice_amount",
        type: "number",
        as: "input",
        placeholder: t("payment_request.invoice_amount"),
      },
      {
        id: "payment_priority",
        name: "payment_priority",
        type: "number",
        as: "input",
        placeholder: t("payment_request.payment_priority"),
      },
    ],
    [
      {
        id: "payment_amount",
        name: "payment_amount",
        type: "number",
        as: "input",
        placeholder: t("payment_request.payment_amount"),
        rows: 2,
      },
      {
        id: "deadline",
        name: "deadline",
        type: "date",
        as: "input",
        placeholder: t("payment_request.deadline"),
        rows: 2,
      },
    ],
    [
      {
        id: "status",
        name: "status",
        type: "select",
        as: "select",
        placeholder: t("payment_request.status"),
        options: optionsStatus,
      },
    ],
    [
      {
        id: "comment",
        name: "comment",
        type: "textarea",
        as: "textarea",
        placeholder: t("payment_request.comment"),
        rows: 2,
      },
    ],
  ];

  const parameters = {
    data,
    setData,
    fields,
    url: getPaymentRequestsUrl(),
    objectName: objectName,
    typeView,
    modalForms,
    formName: "payment_request",
  };

  return <ObjectView {...parameters} />;
};

export default ViewPaymentRequestPage;
