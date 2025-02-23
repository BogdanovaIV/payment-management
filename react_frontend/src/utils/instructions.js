import instructions from "../locales/en.json";

export const getInstructionByFormName = (formName = "", t, Trans) => {
  let object = "Object";
  let objects = "Objects";
  let objectS = "Object's";
  let nameInstruction = "object_list";
  let additionalNotes = "";

  if (formName === "PartnerList") {
    object = t("partner.partner");
    objects = t("partner.partners");
    objectS = t("partner.partner_s");
  } else if (formName === "PaymentRequestsList") {
    object = t("payment_request.payment_request");
    objects = t("payment_request.payment_requests");
    objectS = t("payment_request.payment_request_s");
  } else if (formName === "UserProfilePage") {
    nameInstruction = "user_profile_view";
  } else if (formName === "UserProfileEditForm") {
    nameInstruction = "user_profile_edit";
  } else if (formName === "UserPassword") {
    nameInstruction = "user_change_password";
  } else if (formName === "SignUpForm") {
    nameInstruction = "signup";
  } else if (formName === "ViewPartnerPage") {
    nameInstruction = "object_view";
    object = t("partner.partner");
    objects = t("partner.partners");
    objectS = t("partner.partner_s");
  } else if (formName === "ViewPaymentRequestPage") {
    nameInstruction = "object_view";
    object = t("payment_request.payment_request");
    objects = t("payment_request.payment_requests");
    objectS = t("payment_request.payment_request_s");
    additionalNotes = t("payment_request.instructuon_note");
  } else if (formName === "AddPartnerPage" || formName === "EditPartnerPage") {
    nameInstruction = "add_edit_partner";
    object = t("partner.partner");
    objects = t("partner.partners");
    objectS = t("partner.partner_s");
  } else if (
    formName === "AddPaymentRequestPage" ||
    formName === "EditPaymentRequestPage"
  ) {
    nameInstruction = "add_edit_payment_request";
    object = t("payment_request.payment_request");
    objects = t("payment_request.payment_requests");
    objectS = t("payment_request.payment_request_s");
  } else {
    return <></>;
  }

  const callTrans = (key) => {
    return (
      <Trans
        i18nKey={key}
        values={{
          object,
          objects,
          object_s: objectS,
          additional_notes: additionalNotes,
        }}
        components={[<strong />]}
      />
    );
  };

  return (
    <>
      <p>{callTrans(`instructions.${nameInstruction}.introduction`)}</p>
      <ol>
        {Object.entries(instructions.instructions[nameInstruction]).map(
          ([key, section]) =>
            key !== "introduction" &&
            key !== "note" && (
              <li key={key}>
                <strong>
                  {callTrans(`instructions.${nameInstruction}.${key}.title`)}
                </strong>
                <ul>
                  {Object.entries(section).map(([subKey, subDesc]) =>
                    subKey.endsWith("_dict") ? (
                      <li key={subKey}>
                        <strong>
                          {callTrans(
                            `instructions.${nameInstruction}.${key}.${subKey}.title`
                          )}
                        </strong>
                        <ul>
                          {Object.entries(subDesc).map(
                            ([subKeyFields, subDescFields]) =>
                              subKeyFields !== "title" && (
                                <li key={subKeyFields}>
                                  {callTrans(
                                    `instructions.${nameInstruction}.${key}.${subKey}.${subKeyFields}`
                                  )}
                                </li>
                              )
                          )}
                        </ul>
                      </li>
                    ) : subKey !== "title" ? (
                      <li key={subKey}>
                        {callTrans(
                          `instructions.${nameInstruction}.${key}.${subKey}`
                        )}
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            )
        )}
        <li>
          <strong>{t("instructions.loading_indicator")}</strong>
          <ul>
            <li>{callTrans("instructions.loading_indicator_desc1")}</li>
            <li>{callTrans("instructions.loading_indicator_desc2")}</li>
          </ul>
        </li>
      </ol>
      {instructions.instructions[nameInstruction]?.note && (
        <p>{callTrans(`instructions.${nameInstruction}.note`)}</p>
      )}
    </>
  );
};
