import React, { useState, useMemo } from "react";
import { useTranslation, Trans } from "react-i18next";

import { getPaymentRequestsUrl } from "../../api/axiosURL";
import { getParametersByName } from "../../utils/selectFormParameters";

import ObjectView from "../../components/ObjectView";
import { getInstructionByFormName } from "../../utils/instructions";

const AddPaymentRequestPage = () => {
  const { t } = useTranslation();

  const [data, setData] = useState({
    payer: { id: "", name: "" },
    recipient: { id: "", name: "" },
    invoice_number: "",
    invoice_date: "",
    payment_priority: 1,
    invoice_amount: 0,
    deadline: "",
    payment_amount: 0,
    comment: "",
  });

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
        name: "payer",
        type: "text",
        placeholder: t("payment_request.payer"),
        as: "input",
        foreignKey: "partner",
        additional_filter: { is_own: "true" },
        readOnly: true,
      },
      {
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
    objectName: t("payment_request.add_payment_request"),
    typeView: "add",
    modalForms,
    formName: "payment_request",
    instructionBody: getInstructionByFormName("AddPaymentRequestPage", t, Trans),
  };

  return <ObjectView {...parameters} />;
};

export default AddPaymentRequestPage;
