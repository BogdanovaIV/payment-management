import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPartnerTypesUrl, getData } from "../api/axiosURL";

const useOptionsPartnerType = (extraItems = []) => {
  const { i18n } = useTranslation();
  const [optionPartnerTypes, setOptionPartnerTypes] = useState([]);

  useEffect(() => {
    const fetchPartnerTypes = async () => {
      try {
        const response = await getData(getPartnerTypesUrl());
        const newOptions = response.data.results.map((type) => [
          type.value,
          type.label,
        ]);

        setOptionPartnerTypes((prev) => [...extraItems, ...newOptions]);
      } catch (error) {
        console.error("Error fetching partner types:", error);
      }
    };

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

  return [optionPartnerTypes, setOptionPartnerTypes];
};

export default useOptionsPartnerType;
