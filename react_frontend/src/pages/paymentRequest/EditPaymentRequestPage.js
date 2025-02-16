import React from 'react'
import { useTranslation } from "react-i18next";
import ViewPaymentRequestPage from './ViewPaymentRequestPage';

const EditPaymentRequestPage = () => {
    const { t } = useTranslation();
    return (
        <ViewPaymentRequestPage typeView="edit" objectName={t("payment_request.edit_payment_request")} />
      );
}

export default EditPaymentRequestPage
