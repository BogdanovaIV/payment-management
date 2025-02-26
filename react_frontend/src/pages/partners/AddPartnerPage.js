import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

import { getPartnersUrl, getPartnerTypesUrl } from "../../api/axiosURL";

import ObjectView from "../../components/ObjectView";
import useGetOptions from "../../hooks/useGetOptions";
import { getInstructionByFormName } from "../../utils/instructions";
import { useRedirect } from "../../hooks/useRedirect";

const AddPartnerPage = () => {
  const { isLoading, shouldRedirect } = useRedirect("loggedOut");
  const { t } = useTranslation();

  const [data, setData] = useState({
    trade_name: "",
    full_name: "",
    bin: "",
    partner_type: 0,
    legal_address: "",
    actual_address: "",
    phone_number: "",
    contact_person: "",
    is_own: false,
  });

  const [optionPartnerTypes] = useGetOptions([], getPartnerTypesUrl());

  if (isLoading || shouldRedirect) {
    return null;
  }

  const fields = [
    [
      {
        id: "trade_name",
        name: "trade_name",
        type: "text",
        as: "input",
        placeholder: t("partner.trade_name"),
      },
    ],
    [
      {
        id: "full_name",
        name: "full_name",
        type: "text",
        as: "input",
        placeholder: t("partner.full_name"),
      },
    ],
    [
      {
        id: "bin",
        name: "bin",
        nameBackend: "bin",
        type: "text",
        as: "input",
        placeholder: t("partner.bin"),
      },
    ],
    [
      {
        id: "partner_type",
        name: "partner_type",
        type: "select",
        as: "select",
        placeholder: t("partner.partner_type"),
        options: optionPartnerTypes,
      },
    ],
    [
      {
        id: "legal_address",
        name: "legal_address",
        type: "textarea",
        as: "textarea",
        placeholder: t("partner.legal_address"),
        rows: 2,
      },
    ],
    [
      {
        id: "actual_address",
        name: "actual_address",
        type: "textarea",
        as: "textarea",
        placeholder: t("partner.actual_address"),
        rows: 2,
      },
    ],
    [
      {
        id: "phone_number",
        name: "phone_number",
        type: "text",
        as: "input",
        placeholder: t("partner.phone_number"),
      },
    ],
    [
      {
        id: "contact_person",
        name: "contact_person",
        type: "text",
        as: "input",
        placeholder: t("partner.contact_person"),
      },
    ],
    [
      {
        id: "is_own",
        name: "is_own",
        type: "checkbox",
        as: "input",
        placeholder: t("partner.is_own"),
      },
    ],
  ];

  const parameters = {
    data,
    setData,
    fields,
    url: getPartnersUrl(),
    objectName: t("partner.add_partner"),
    typeView: "add",
    formName: "partner",
    instructionBody: getInstructionByFormName("AddPartnerPage", t, Trans),
  };

  return <ObjectView {...parameters} />;
};

export default AddPartnerPage;
