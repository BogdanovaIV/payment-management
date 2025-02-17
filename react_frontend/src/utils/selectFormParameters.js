import {
  getPartnersUrl,
  getUserProfileUrl,
  getPaymentRequestsUrl,
} from "../api/axiosURL";

export const getParametersByName = (nameTable, t) => {
  if (nameTable === "partner") {
    const columns = [
      {
        Header: t("partner.trade_name"),
        accessor: "trade_name",
        width: "15%",
      },
      {
        Header: t("partner.bin"),
        accessor: "bin",
        width: "15%",
      },
      {
        Header: t("partner.partner_type"),
        accessor: "partner_type_display",
        width: "10%",
      },
      {
        Header: t("partner.is_own"),
        accessor: "is_own",
        Cell: ({ value }) => (value ? "Yes" : "No"),
        width: "10%",
      },
      {
        Header: t("partner.contact_person"),
        accessor: "contact_person",
        width: "20%",
      },
      {
        Header: t("partner.phone_number"),
        accessor: "phone_number",
        width: "20%",
      },
      {
        Header: t("general.created_at"),
        accessor: "created_at",
        width: "10%",
      },
    ];
    return { url: getPartnersUrl(), columns };
  } else if (nameTable === "user_profile") {
    const columns = [
      {
        Header: t("auth.full_name"),
        accessor: "full_name",
        width: "100%",
      },
    ];
    return { url: getUserProfileUrl(), columns };
  } else if (nameTable === "payment_request") {
    const columns = [
      {
        Header: t("payment_request.payer"),
        accessor: "payer_trade_name",
        width: "15%",
      },
      {
        Header: t("payment_request.recipient"),
        accessor: "recipient_trade_name",
        width: "15%",
      },
      {
        Header: t("payment_request.deadline"),
        accessor: "deadline",
        width: "10%",
      },
      {
        Header: t("payment_request.payment_amount"),
        accessor: "payment_amount",
        width: "10%",
      },
      {
        Header: t("payment_request.invoice_date"),
        accessor: "invoice_date",
        width: "10%",
      },
      {
        Header: t("payment_request.invoice_number"),
        accessor: "invoice_number",
        width: "15%",
      },
      {
        Header: t("payment_request.user"),
        accessor: "user_full_name",
        width: "10%",
      },
      {
        Header: t("payment_request.status"),
        accessor: "status_display",
        width: "10%",
      },
    ];
    return { url: getPaymentRequestsUrl(), columns };
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
    return "trade_name";
  } else if (nameTable === "user_profile") {
    return "full_name";
  }
  return "";
};
