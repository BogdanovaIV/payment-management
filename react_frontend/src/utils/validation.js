/**
 * Validates form fields based on the provided form name.
 * @param {string} formName - The name of the form (e.g., "user_profile", "partner", "payment_request").
 * @returns {Function} A validation function for the given form, checking field values and returning error messages.
 */
export const validateField = (formName = "") => {
  if (formName === "user_profile") {
    return (name, value) => {
      switch (name) {
        case "first_name":
        case "last_name":
          if (!value) return { i18nKey: "validation.required" };
          else if (value.length > 20)
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "20",
              },
            };
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return { i18nKey: "validation.invalid_email" };
        default:
          break;
      }

      return "";
    };
  } else if (formName === "partner") {
    return (name, value) => {
      switch (name) {
        case "trade_name":
          if (!value) return { i18nKey: "validation.required" };
          else if (value.length > 255)
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "255",
              },
            };
          break;
        case "full_name":
          if (value.length > 255)
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "255",
              },
            };
          break;
        case "bin":
          if (!value) return { i18nKey: "validation.required" };
          else if (value.length > 20)
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "20",
              },
            };
          break;

        case "phone_number":
          if (value.length > 255)
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "255",
              },
            };
          else if (value && !/^(\+\d{3,15})(,\s*\+\d{3,15})*$/.test(value)) {
            return { i18nKey: "validation.phone_number" };
          }
          break;
        case "contact_person":
          if (!value) return { i18nKey: "validation.required" };
          if (value.length > 255)
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "255",
              },
            };
          break;

        default:
          break;
      }

      return "";
    };
  } else if (formName === "payment_request") {
    return (name, value) => {
      switch (name) {
        case "payment_priority":
          if (value < 1 || value > 10) {
            return {
              i18nKey: "validation.more_than",
              values: {
                from: "1",
                to: "10",
              },
            };
          }
          break;

        case "invoice_number":
          if (!value) {
            return { i18nKey: "validation.required" };
          } else if (value.length > 255)
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "50",
              },
            };
          break;
        case "invoice_date":
          if (!value) {
            return { i18nKey: "validation.required" };
          }
          break;
        case "payer":
        case "recipient":
          if (!value.id) {
            return { i18nKey: "validation.required" };
          }
          break;
        case "invoice_amount":
        case "payment_amount":
          if (value < 0) {
            return {
              i18nKey: "validation.more_than",
              values: {
                length: "0",
              },
            };
          }
          break;

        default:
          break;
      }

      return "";
    };
  } else if (formName === "sign_in") {
    return (name, value) => {
      if (!value) {
        return { i18nKey: "validation.required" };
      }
      return "";
    };
  } else if (formName === "sign_up") {
    return (name, value) => {
      if (!value) return { i18nKey: "validation.required" };
      else if ((name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)))
        return { i18nKey: "validation.invalid_email" };
      return "";
    };
  }

  return () => {
    return undefined;
  };
};
