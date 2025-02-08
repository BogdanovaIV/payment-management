import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getPartnersUrl,
  getPartnerTypesUrl,
  getData,
} from "../../api/axiosURL";
import ObjectList from "../../components/ObjectList";

const PartnersPage = () => {
  const { t, i18n } = useTranslation();

  const [filters, setFilters] = useState({
    trade_name: "",
    bin: "",
    partner_type: "",
    is_own: "",
  });

  const [optionPartnerTypes, setOptionPartnerTypes] = useState([
    ["", t("partner.all_types")],
  ]);

  const fetchPartnerTypes = async () => {
    try {
      const response = await getData(getPartnerTypesUrl());
      const newOptions = response.data.results.map((type) => [
        type.value,
        type.label,
      ]);
      setOptionPartnerTypes([["", t("partner.all_types")], ...newOptions]);
      console.log(newOptions);
    } catch (error) {
      console.error("Error fetching partner types:", error);
    }
  };

  useEffect(() => {
    fetchPartnerTypes();

    // Listen for language changes
    const handleLanguageChange = () => {
      fetchPartnerTypes(); // Re-fetch options when language changes
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const columns = React.useMemo(
    () => [
      { Header: t("partner.trade_name"), accessor: "trade_name" },
      { Header: t("partner.bin"), accessor: "bin" },
      { Header: t("partner.partner_type"), accessor: "partner_type_display" },
      {
        Header: t("partner.is_own"),
        accessor: "is_own",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      { Header: t("partner.contact_person"), accessor: "contact_person" },
      { Header: t("partner.phone_number"), accessor: "phone_number" },
      { Header: t("partner.created_at"), accessor: "created_at" },
    ],
    [t]
  );

  const filterFields = [
    {
      name: "trade_name",
      type: "text",
      placeholder: t("partner.search_trade_Name"),
    },
    {
      name: "bin",
      type: "text",
      placeholder: t("partner.search_bin"),
    },
    {
      name: "is_own",
      type: "select",
      placeholder: "",
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
      options: optionPartnerTypes,
    },
  ];

  const parameters = {
    filters,
    setFilters,
    columns,
    url: getPartnersUrl(),
    ObjectsName: t("partner.partners"),
    filterFields,
  };

  return <ObjectList {...parameters} />;
};

export default PartnersPage;
