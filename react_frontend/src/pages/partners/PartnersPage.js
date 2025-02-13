import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ObjectList from "../../components/ObjectList";
import useOptionsPartnerType from "../../hooks/useOptionsPartnerType";
import { getParametersByName } from "../../utils/selectFormParameters";

const PartnersPage = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    trade_name: "",
    bin: "",
    partner_type: "",
    is_own: "",
  });

  const [optionPartnerTypes] = useOptionsPartnerType([
    ["", t("partner.all_types")],
  ]);

  const parametersPartner = useMemo(() => {
    return getParametersByName("partner", t);
  }, [t]);

  const filterFields = [
    {
      name: "trade_name",
      type: "text",
      placeholder: t("partner.search_trade_Name"),
      label: t("partner.trade_name")
    },
    {
      name: "bin",
      type: "text",
      placeholder: t("partner.search_bin"),
      label: t("partner.bin")
    },
    {
      name: "is_own",
      type: "select",
      placeholder: "",
      label: t("partner.is_own"),
      options: [
        ["", t("partner.all_partners")],
        ["true", t("partner.own_partner")],
        ["false", t("partner.non_own_partner")],
      ],
    },
    {
      name: "partner_type",
      type: "select",
      placeholder: "",
      label: t("partner.partner_type"),
      options: optionPartnerTypes,
    },
  ];

  const parameters = {
    filters,
    setFilters,
    columns: parametersPartner.columns,
    url: parametersPartner.url,
    ObjectsName: t("partner.partners"),
    filterFields,
    queryKey : "PartnersList"
  };

  return <ObjectList {...parameters} />;
};

export default PartnersPage;
