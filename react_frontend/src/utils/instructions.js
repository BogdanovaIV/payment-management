import instructions from "../locales/en.json";

export const getInstructionByFormName = (formName = "", t, Trans) => {
  if (formName === "UserProfilePage") {
    return (
      <>
        <p>{t("instructions.user_profile_view.introduction")}</p>
        <ol>
          <li>
            <strong>
              {t("instructions.user_profile_view.profile_information")}
            </strong>
            <ul>
              <li>
                {t("instructions.user_profile_view.profile_information_desc1")}
              </li>
              <li>
                <Trans
                  i18nKey="instructions.user_profile_view.profile_information_desc2"
                  components={[<strong />]}
                />
              </li>
            </ul>
          </li>
          <li>
            <strong>{t("instructions.user_profile_view.edit_profile")}</strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.user_profile_view.edit_profile_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>{t("instructions.user_profile_view.edit_profile_desc2")}</li>
            </ul>
          </li>
          <li>
            <strong>
              {t("instructions.user_profile_view.changing_password")}
            </strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.user_profile_view.changing_password_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>
                {t("instructions.user_profile_view.changing_password_desc2")}
              </li>
            </ul>
          </li>
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
      </>
    );
  } else if (formName === "UserProfileEditForm") {
    return (
      <>
        <p>{t("instructions.user_profile_edit.introduction")}</p>
        <ol>
          <li>
            <strong>
              {t("instructions.user_profile_edit.profile_information")}
            </strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.user_profile_edit.profile_information_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="instructions.user_profile_edit.profile_information_desc2"
                  components={[<strong />]}
                />
                <ul>
                  <li>
                    <Trans
                      i18nKey="instructions.user_profile_edit.profile_information_desc2_field1"
                      components={[<strong />]}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey="instructions.user_profile_edit.profile_information_desc2_field2"
                      components={[<strong />]}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey="instructions.user_profile_edit.profile_information_desc2_field3"
                      components={[<strong />]}
                    />
                  </li>
                </ul>
              </li>
              <li>
                {t("instructions.user_profile_edit.profile_information_desc3")}
              </li>
            </ul>
          </li>
          <li>
            <strong>
              {t("instructions.user_profile_edit.saving_changes")}
            </strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.user_profile_edit.saving_changes_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>
                {t("instructions.user_profile_edit.saving_changes_desc2")}
              </li>
            </ul>
          </li>
          <li>
            <strong>
              {t("instructions.user_profile_edit.error_handling")}
            </strong>
            <ul>
              <li>
                {t("instructions.user_profile_edit.error_handling_desc1")}
              </li>
              <li>
                {t("instructions.user_profile_edit.error_handling_desc2")}
              </li>
              <li>
                {t("instructions.user_profile_edit.error_handling_desc3")}
              </li>
            </ul>
          </li>
          <li>
            <strong>
              {t("instructions.user_profile_edit.canceling_changes")}
            </strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.user_profile_edit.canceling_changes_desc1"
                  components={[<strong />]}
                />
              </li>
            </ul>
          </li>
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
        <p>
          <Trans
            i18nKey="instructions.user_profile_edit.note"
            components={[<strong />]}
          />
        </p>
      </>
    );
  } else if (formName === "UserPassword") {
    return (
      <>
        <p>{t("instructions.user_change_password.introduction")}</p>
        <ol>
          <li>
            <strong>
              {t("instructions.user_change_password.filling_out")}
            </strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.user_change_password.filling_out_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="instructions.user_change_password.filling_out_desc2"
                  components={[<strong />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="instructions.user_change_password.filling_out_desc3"
                  components={[<strong />]}
                />
              </li>
              <li>
                {t("instructions.user_change_password.filling_out_desc4")}
              </li>
            </ul>
          </li>
          <li>
            <strong>{t("instructions.user_change_password.submitting")}</strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.user_change_password.submitting_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>{t("instructions.user_change_password.submitting_desc2")}</li>
              <li>{t("instructions.user_change_password.submitting_desc3")}</li>
            </ul>
          </li>
        </ol>
      </>
    );
  } else if (formName === "SignUpForm") {
    return (
      <>
        <p>{t("instructions.signup.introduction")}</p>
        <ol>
          <li>
            <strong>{t("instructions.signup.filling_out")}</strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.signup.filling_out_desc1"
                  components={[<strong />]}
                />
                <ul>
                  <li>{t("instructions.signup.filling_out_desc1_ul1")}</li>
                  <li>{t("instructions.signup.filling_out_desc1_ul2")}</li>
                </ul>
              </li>
              <li>
                <Trans
                  i18nKey="instructions.signup.filling_out_desc2"
                  components={[<strong />]}
                />
                <ul>
                  <li>{t("instructions.signup.filling_out_desc2_ul1")}</li>
                </ul>
              </li>
              <li>
                <Trans
                  i18nKey="instructions.signup.filling_out_desc3"
                  components={[<strong />]}
                />
                <ul>
                  <li>{t("instructions.signup.filling_out_desc3_ul1")}</li>
                </ul>
              </li>
              <li>
                <Trans
                  i18nKey="instructions.signup.filling_out_desc4"
                  components={[<strong />]}
                />
                <ul>
                  <li>{t("instructions.signup.filling_out_desc4_ul1")}</li>
                  <li>{t("instructions.signup.filling_out_desc4_ul2")}</li>
                </ul>
              </li>
              <li>
                <Trans
                  i18nKey="instructions.signup.filling_out_desc5"
                  components={[<strong />]}
                />
                <ul>
                  <li>{t("instructions.signup.filling_out_desc5_ul1")}</li>
                  <li>{t("instructions.signup.filling_out_desc5_ul2")}</li>
                </ul>
              </li>
              <li>
                <Trans
                  i18nKey="instructions.signup.filling_out_desc6"
                  components={[<strong />]}
                />
                <ul>
                  <li>{t("instructions.signup.filling_out_desc6_ul1")}</li>
                  <li>{t("instructions.signup.filling_out_desc6_ul2")}</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>{t("instructions.signup.submitting")}</strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.signup.submitting_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>{t("instructions.signup.submitting_desc2")}</li>
              <li>
                {t("instructions.signup.submitting_desc3")}
                <ul>
                  <li>{t("instructions.signup.submitting_desc3_ul1")}</li>
                  <li>{t("instructions.signup.submitting_desc3_ul2")}</li>
                  <li>{t("instructions.signup.submitting_desc3_ul3")}</li>
                  <li>{t("instructions.signup.submitting_desc3_ul4")}</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>{t("instructions.signup.additional_notes")}</strong>
            <ul>
              <li>
                <Trans
                  i18nKey="instructions.signup.additional_notes_desc1"
                  components={[<strong />]}
                />
              </li>
              <li>{t("instructions.signup.additional_notes_desc2")}</li>
            </ul>
          </li>
        </ol>
      </>
    );
  } else if (formName === "PartnerList" || formName === "PaymentRequestsList") {
    let object = "Object";
    let objects = "Objects";
    let object_s = "Object's";
    if (formName === "PartnerList") {
      object = "Partner";
      objects = "Partners";
      object_s = "Partner's";
    } else if (formName === "PaymentRequestsList") {
      object = "Payment Request";
      objects = "Payment Requests";
      object_s = "Payment Request's";
    }
    return (
      <>
        <p>
          <Trans
            i18nKey="instructions.object_list.introduction"
            values={{
              object,
              objects,
              object_s,
            }}
            components={[<strong />]}
          />
        </p>
        <ol>
          {Object.entries(instructions.instructions.object_list).map(
            ([key, section]) =>
              key !== "introduction" && (
                <li key={key}>
                  <strong>{t(`instructions.object_list.${key}.title`)}</strong>
                  <ul>
                    {Object.entries(section).map(
                      ([subKey, subDesc]) =>
                        subKey !== "title" && (
                          <li key={subKey}>
                            <Trans
                              i18nKey={`instructions.object_list.${key}.${subKey}`}
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
              )
          )}
        </ol>
      </>
    );
  }
  return <></>;
};
