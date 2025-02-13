import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ObjectDelete from "../../components/ObjectDelete";
import { getData, getPaymentRequestsUrl } from "../../api/axiosURL";

const DeletePaymentRequestPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const url = getPaymentRequestsUrl();

  const [description, setDescription] = useState("");

  useEffect(() => {
    let isMounted = true;
    const handleMount = async () => {
      try {
        const response = await getData(`${url}${id}/`);
        if (isMounted) {
          setDescription(
            `${t("general.id")}: ${response.data.id}, ${t(
              "payment_request.payer"
            )}: ${response.data.payer_trade_name}, ${t(
              "payment_request.recipient"
            )}: ${response.data.recipient_trade_name}, ${t(
              "payment_request.payment_amount"
            )}: ${response.data.payment_amount}`
          );
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
      }
    };

    handleMount();
    return () => {
      isMounted = false;
    };
  }, [history, id, t, url]);

  return (
    <ObjectDelete
      descriptionObject={description}
      url={`${url}${id}/`}
      urlBack={url}
    />
  );
};

export default DeletePaymentRequestPage;
