import React, { useState, useMemo } from "react";
import { useTranslation, Trans } from "react-i18next";
import ObjectList from "../../components/ObjectList";
import { getParametersByName } from "../../utils/selectFormParameters";
import { getPartnerTypesUrl } from "../../api/axiosURL";
import useGetOptions from "../../hooks/useGetOptions";
import { getInstructionByFormName } from "../../utils/instructions";
import { useRedirect } from "../../hooks/useRedirect";

const PartnersPage = () => {
  const { isLoading, shouldRedirect } = useRedirect("loggedOut");
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    trade_name: "",
    bin: "",
    partner_type: "",
    is_own: "",
  });

  const [optionPartnerTypes] = useGetOptions(
    [["", t("partner.all_types")]],
    getPartnerTypesUrl()
  );

  const parametersPartner = useMemo(() => {
    return getParametersByName("partner", t);
  }, [t]);

  if (isLoading || shouldRedirect) {
    return null;
  }

  const filterFields = [
    {
      name: "trade_name",
      type: "text",
      placeholder: t("partner.search_trade_Name"),
      label: t("partner.trade_name"),
    },
    {
      name: "bin",
      type: "text",
      placeholder: t("partner.search_bin"),
      label: t("partner.bin"),
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
    queryKey: "PartnersList",
    instructionBody: getInstructionByFormName("PartnerList", t, Trans),
  };

  return <ObjectList {...parameters} />;
};

export default PartnersPage;
