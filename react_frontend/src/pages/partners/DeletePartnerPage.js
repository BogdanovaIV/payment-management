import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ObjectDelete from "../../components/ObjectDelete";
import { getData, getPartnersUrl } from "../../api/axiosURL";

const DeletePartnerPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const url = getPartnersUrl();

  const [description, setDescription] = useState("");

  useEffect(() => {
    let isMounted = true;
    const handleMount = async () => { 
      try {
        const response = await getData(`${url}${id}/`);
        if (isMounted) {
          setDescription(
            `${t("general.id")}: ${response.data.id},  ${t(
              "partner.trade_name"
            )}: ${response.data.trade_name},  ${t("partner.bin")}: ${
              response.data.bin
            }`
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
  }, [id, t, url]);

  return (
    <ObjectDelete
      descriptionObject={description}
      url={`${url}${id}/`}
      urlBack={url}
    />
  );
};

export default DeletePartnerPage;
