import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../api/axiosURL";

const useGetOptions = (extraItems = "", url) => {
  const { i18n, t } = useTranslation();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchOptions = async () => {
      try {
        const response = await getData(url);
        const newOptions = response.data.results.map((type) => [
          type.value,
          type.label,
        ]);
        if (isMounted) {
          if (extraItems) {
            setOptions([
              ["", t(extraItems)],
              ...newOptions,
            ]);
          }
          else {
            setOptions(newOptions);
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching options:", error);
        }
      }
    };

    fetchOptions();

    // Listen for language changes
    const handleLanguageChange = () => {
      fetchOptions(); // Re-fetch options when language changes
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
      isMounted = false;
    };
  }, [i18n]);

  return [options, setOptions];
};

export default useGetOptions;
