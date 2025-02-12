import { getPartnersUrl, getUserProfileUrl } from "../api/axiosURL";

export const getParametersByName = (nameTable, t) => {
  if (nameTable === "partner") {
    const columns = [
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
    ];
    return { url: getPartnersUrl(), columns };
  } 
  else if (nameTable === "user_profile") {
    const columns = [
      { Header: t("auth.full_name"), accessor: "full_name" },
    ];
    return { url: getUserProfileUrl(), columns };
  }
  return { url: "", columns: "" };
};

export const getIDFromItem = (nameTable, value) => {
  if (nameTable === "partner") {
    return value.id;
  } else if (nameTable === "user_profile") {
    return value.user_id;
  }
  return "";
};

export const getNameByNameTable = (nameTable) => {
  if (nameTable === "partner") {
    return 'trade_name';
  } else if (nameTable === "user_profile") {
    return 'full_name';
  }
  return "";
};