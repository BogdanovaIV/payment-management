import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ObjectDelete from "../../components/ObjectDelete";
import { getData, getPaymentRequestsUrl } from "../../api/axiosURL";
import { useRedirect } from "../../hooks/useRedirect";

const DeletePaymentRequestPage = () => {
  const { isLoading, shouldRedirect } = useRedirect("loggedOut");
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const [description, setDescription] = useState("");

  const url = getPaymentRequestsUrl();

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

  if (isLoading || shouldRedirect) {
    return null;
  }

  return (
    <ObjectDelete
      descriptionObject={description}
      url={`${url}${id}/`}
      urlBack={url}
    />
  );
};

export default DeletePaymentRequestPage;
