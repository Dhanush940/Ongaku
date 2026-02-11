import axiosInstance from "../../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActivationPage = () => {
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
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
