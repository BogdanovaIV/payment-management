import instructions from "../locales/en.json";

export const getInstructionByFormName = (formName = "", t, Trans) => {
  let object = "Object";
  let objects = "Objects";
  let object_s = "Object's";
  let nameInstruction = "object_list";

  if (formName === "PartnerList") {
    object = "Partner";
    objects = "Partners";
    object_s = "Partner's";
  } else if (formName === "PaymentRequestsList") {
    object = "Payment Request";
    objects = "Payment Requests";
    object_s = "Payment Request's";
  } else if (formName === "UserProfilePage") {
    nameInstruction = "user_profile_view";
  } else if (formName === "UserProfileEditForm") {
    nameInstruction = "user_profile_edit";
  } else if (formName === "UserPassword") {
    nameInstruction = "user_change_password";
  } else if (formName === "SignUpForm") {
    nameInstruction = "signup";
  } else {
    return <></>;
  }

  return (
    <>
      <p>
        <Trans
          i18nKey={`instructions.${nameInstruction}.introduction`}
          values={{
            object,
            objects,
            object_s,
          }}
          components={[<strong />]}
        />
      </p>
      <ol>
        {Object.entries(instructions.instructions[nameInstruction]).map(
          ([key, section]) =>
            key !== "introduction" &&
            key !== "note" && (
              <li key={key}>
                <strong>
                  {t(`instructions.${nameInstruction}.${key}.title`)}
                </strong>
                <ul>
                  {Object.entries(section).map(([subKey, subDesc]) =>
                    subKey.endsWith("_dict") ? (
                      <li key={subKey}>
                        <strong>
                          {t(
                            `instructions.${nameInstruction}.${key}.${subKey}.title`
                          )}
                        </strong>
                        <ul>
                          {Object.entries(subDesc).map(
                            ([subKeyFields, subDescFields]) =>
                              subKeyFields !== "title" && (
                                <li key={subKeyFields}>
                                  <Trans
                                    i18nKey={`instructions.${nameInstruction}.${key}.${subKey}.${subKeyFields}`}
                                    values={{
                                      object,
                                      objects,
                                      object_s,
                                    }}
                                    components={[<strong />]}
                                  />
                                </li>
                              )
                          )}
                        </ul>
                      </li>
                    ) : subKey !== "title" ? (
                      <li key={subKey}>
                        <Trans
                          i18nKey={`instructions.${nameInstruction}.${key}.${subKey}`}
                          values={{
                            object,
                            objects,
                            object_s,
                          }}
                          components={[<strong />]}
                        />
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
            <li>
              <Trans
                i18nKey="instructions.loading_indicator_desc1"
                components={[<strong />]}
              />
            </li>
            <li>{t("instructions.loading_indicator_desc2")}</li>
          </ul>
        </li>
      </ol>
      {instructions.instructions[nameInstruction]?.note && (
        <p>
          <Trans
            i18nKey={`instructions.${nameInstruction}.note`}
            values={{
              object,
              objects,
              object_s,
            }}
            components={[<strong />]}
          />
        </p>
      )}
    </>
  );
};
