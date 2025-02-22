export const validateField = (formName = "", t, Trans) => {
  if (formName === "user_profile") {
    return (name, value) => {
      switch (name) {
        case "first_name":
        case "last_name":
          if (!value) return t("validation.required");
          else if (value.length > 20)
            return (
              <Trans
                i18nKey="validation.more_than"
                values={{
                  length: "20",
                }}
                components={[]}
              />
            );
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return t("validation.invalid_email");
        default:
          break;
      }

      return "";
    };
  } else if (formName === "partner") {
    return (name, value) => {
      switch (name) {
        case "trade_name":
          if (!value) return t("validation.required");
          else if (value.length > 255)
            return (
              <Trans
                i18nKey="validation.more_than"
                values={{
                  length: "255",
                }}
                components={[]}
              />
            );
          break;
        case "full_name":
        case "contact_person":
          if (value.length > 255)
            return (
              <Trans
                i18nKey="validation.more_than"
                values={{
                  length: "255",
                }}
                components={[]}
              />
            );
          break;
        case "bin":
          if (!value) return t("validation.required");
          else if (value.length > 20)
            return (
              <Trans
                i18nKey="validation.more_than"
                values={{
                  length: "20",
                }}
                components={[]}
              />
            );
          break;

        case "phone_number":
          if (value.length > 255)
            return (
              <Trans
                i18nKey="validation.more_than"
                values={{
                  length: "255",
                }}
                components={[]}
              />
            );
          else if (value && !/^(\+\d{3,15})(,\s*\+\d{3,15})*$/.test(value)) {
            return t("validation.phone_number");
          }
          break;
        case "contact_person":
          if (!value) return t("validation.required");
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
            return (
              <Trans
                i18nKey="validation.between"
                values={{
                  from: "1",
                  to: "10",
                }}
                components={[]}
              />
            );
          }
          break;

        case "invoice_number":
        case "invoice_date":
          if (!value) {
            return t("validation.required");
          }
          break;
        case "payer":
        case "recipient":
          if (!value.id) {
            return t("validation.required");
          }
          break;
        case "invoice_amount":
        case "payment_amount":
          if (value < 0) {
            return (
              <Trans
                i18nKey="validation.greater_than_equal"
                values={{
                  value: "0",
                }}
                components={[]}
              />
            );
          }
          break;

        default:
          break;
      }

      return "";
    };
  }

  return () => {
    return undefined;
  };
};
