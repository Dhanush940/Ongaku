import axiosInstance from "../../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ActivationPage = () => {
  const { t } = useTranslation('auth');
  const { activation_token } = useParams<{ activation_token: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axiosInstance
          .post("/user/activation", {
            activation_token,
          })
          .then(() => {})
          .catch(() => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>{t('activation_expired')}</p>
      ) : (
        <p>{t('activation_success')}</p>
      )}
    </div>
  );
};

export default ActivationPage;
