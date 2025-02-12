import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ObjectDelete from "../../components/ObjectDelete";
import { getData, getPartnersUrl } from "../../api/axiosURL";

const DeletePartnerPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const url = getPartnersUrl();

  const [description, setDescription] = useState("");

  useEffect(() => {
    const handleMount = async () => {
      try {
        const response = await getData(`${url}${id}/`);
        setDescription(
          `${t("general.id")}: ${response.data.id},  ${t(
            "partner.trade_name"
          )}: ${response.data.trade_name},  ${t("partner.bin")}: ${
            response.data.bin
          }`
        );
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
      }
    };

    handleMount();
  }, [history, id]);

  return (
    <ObjectDelete
      descriptionObject={description}
      url={`${url}${id}/`}
      urlBack={url}
    />
  );
};

export default DeletePartnerPage;
